import { defineComponent, h } from 'vue';
import { DIGIT_SEGMENTS, SEGMENT_NAMES, segmentShapes } from './segments';

function parseDigit(value: number | string): number {
  const digit = typeof value === 'string' && value.trim() === '' ? NaN : Number(value);

  if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
    throw new RangeError(`vue-seven-segment-display: "value" must be an integer between 0 and 9, received ${String(value)}`);
  }

  return digit;
}

export const SevenSegmentDisplay = defineComponent({
  name: 'SevenSegmentDisplay',
  props: {
    /** The digit to display, 0-9. Numbers and numeric strings are accepted. */
    value: { type: [String, Number], default: 0 },
    /** Length of a segment, in px. */
    segmentWidth: { type: [Number, String], default: 25 },
    /** Thickness of a segment, in px. */
    segmentHeight: { type: [Number, String], default: 5 },
    /** Colour of lit segments. */
    onColor: { type: String, default: '#f00' },
    /** Colour of unlit segments. */
    offColor: { type: String, default: 'transparent' },
    /** Draw segments as rounded pills instead of pointy hexagons. */
    rounded: { type: Boolean, default: false }
  },
  setup(props) {
    return () => {
      const digit = parseDigit(props.value);
      const length = Number(props.segmentWidth);
      const thickness = Number(props.segmentHeight);
      const lit = DIGIT_SEGMENTS[digit]!;
      const shapes = segmentShapes(length, thickness, props.rounded);
      const width = length + 2 * thickness;
      const height = 2 * length + 3 * thickness;

      return h(
        'svg',
        {
          role: 'img',
          'aria-label': String(digit),
          width,
          height,
          viewBox: `0 0 ${width} ${height}`,
          style: { display: 'inline-block' }
        },
        SEGMENT_NAMES.map(name => {
          const on = lit.includes(name);
          const shape = shapes[name];
          const common = { key: name, 'data-segment': name, 'data-on': String(on), fill: on ? props.onColor : props.offColor };

          return shape.type === 'polygon'
            ? h('polygon', { ...common, points: shape.points })
            : h('rect', { ...common, x: shape.x, y: shape.y, width: shape.width, height: shape.height, rx: shape.rx });
        })
      );
    };
  }
});
