// Generates the README images in docs/ from the built component. Run `npm run build` first.
import { mkdirSync, writeFileSync } from 'node:fs';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { SevenSegmentDisplay } from '../dist/index.mjs';

const PADDING = 24;
const OFF = 'rgba(255,255,255,0.08)';

/** Lays out rows of digits as a single dark SVG. Each row: { text, color?, width?, height?, gap?, rounded? } */
async function render(rows) {
  const placed = [];
  let y = PADDING;
  let maxWidth = 0;

  for (const { text, color = '#ff2b2b', width = 40, height = 8, gap = 10, rounded = false } of rows) {
    const cellWidth = width + 2 * height;
    const cellHeight = 2 * width + 3 * height;
    let x = PADDING;

    for (const char of text) {
      const app = createSSRApp({
        render: () => h(SevenSegmentDisplay, { value: char, segmentWidth: width, segmentHeight: height, onColor: color, offColor: OFF, rounded })
      });
      placed.push(`<g transform="translate(${x} ${y})">${await renderToString(app)}</g>`);
      x += cellWidth + gap;
    }

    maxWidth = Math.max(maxWidth, x - gap + PADDING);
    y += cellHeight + PADDING;
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${maxWidth}" height="${y}" viewBox="0 0 ${maxWidth} ${y}">` +
    `<rect width="100%" height="100%" rx="12" fill="#111"/>${placed.join('')}</svg>\n`
  );
}

const images = {
  'digits.svg': [{ text: '0123456789' }],
  'rounded.svg': [{ text: '0123456789', rounded: true }],
  'examples.svg': [
    { text: '2025', color: '#ffb000' },
    { text: '12345', color: '#35e0a1', width: 24, height: 5, gap: 8, rounded: true },
    { text: '6789', color: '#4db8ff', width: 16, height: 4, gap: 6 }
  ]
};

mkdirSync(new URL('../docs/', import.meta.url), { recursive: true });

for (const [name, rows] of Object.entries(images)) {
  writeFileSync(new URL(`../docs/${name}`, import.meta.url), await render(rows));
  console.log(`wrote docs/${name}`);
}
