import { createApp, h } from 'vue';
import { SevenSegmentDisplay } from '../src';

const digits = Array.from({ length: 10 }, (_, i) => i);
const row = (rounded: boolean) =>
  h(
    'div',
    { style: { background: '#111', padding: '16px', marginBottom: '8px' } },
    digits.map(i =>
      h(SevenSegmentDisplay, { key: i, value: i, segmentWidth: 40, segmentHeight: 10, offColor: 'rgba(255,255,255,0.08)', rounded, style: { marginRight: '5px' } })
    )
  );

createApp({ render: () => h('div', [row(false), row(true)]) }).mount('#app');
