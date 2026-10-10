import { mount } from '@vue/test-utils';
import { SevenSegmentDisplay } from './SevenSegmentDisplay';
import { DIGIT_SEGMENTS } from './segments';

const lit = (wrapper: ReturnType<typeof mount>) =>
  wrapper.findAll('[data-on="true"]').map(el => el.attributes('data-segment')).join('');

describe('SevenSegmentDisplay', () => {
  it.each(DIGIT_SEGMENTS.map((segments, digit) => [digit, segments.join('')] as const))(
    'lights the right segments for %i',
    (digit, expected) => {
      expect(lit(mount(SevenSegmentDisplay, { props: { value: digit } }))).toBe(expected);
    }
  );

  it('accepts numeric strings', () => {
    const wrapper = mount(SevenSegmentDisplay, { props: { value: '7' } });
    expect(wrapper.attributes('aria-label')).toBe('7');
    expect(lit(wrapper)).toBe('abc');
  });

  it('defaults to 0', () => {
    expect(lit(mount(SevenSegmentDisplay))).toBe('abcdef');
  });

  it('uses on/off colours', () => {
    const wrapper = mount(SevenSegmentDisplay, { props: { value: 1, onColor: 'lime', offColor: 'gray' } });
    expect(wrapper.find('[data-segment="b"]').attributes('fill')).toBe('lime');
    expect(wrapper.find('[data-segment="a"]').attributes('fill')).toBe('gray');
  });

  it('sizes the svg from segment width and height', () => {
    const wrapper = mount(SevenSegmentDisplay, { props: { segmentWidth: 40, segmentHeight: 10 } });
    expect(wrapper.attributes('width')).toBe('60');
    expect(wrapper.attributes('height')).toBe('110');
  });

  it('draws polygons by default and rects when rounded', () => {
    expect(mount(SevenSegmentDisplay).findAll('polygon')).toHaveLength(7);
    const rounded = mount(SevenSegmentDisplay, { props: { rounded: true } });
    expect(rounded.findAll('rect')).toHaveLength(7);
    expect(rounded.findAll('polygon')).toHaveLength(0);
  });

  it('passes class and style attributes to the svg', () => {
    const wrapper = mount(SevenSegmentDisplay, { attrs: { class: 'clock', style: 'margin: 4px' } });
    expect(wrapper.classes()).toContain('clock');
    expect(wrapper.attributes('style')).toContain('margin: 4px');
    expect(wrapper.attributes('style')).toContain('display: inline-block');
  });

  it.each([-1, 10, 1.5, NaN, '', 'A', ' '])('throws for invalid value %p', value => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => mount(SevenSegmentDisplay, { props: { value } })).toThrow(RangeError);
  });
});
