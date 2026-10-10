export type SegmentName = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

/** Segments lit for each digit, indexed by digit. */
export const DIGIT_SEGMENTS: readonly (readonly SegmentName[])[] = [
  ['a', 'b', 'c', 'd', 'e', 'f'],
  ['b', 'c'],
  ['a', 'b', 'd', 'e', 'g'],
  ['a', 'b', 'c', 'd', 'g'],
  ['b', 'c', 'f', 'g'],
  ['a', 'c', 'd', 'f', 'g'],
  ['a', 'c', 'd', 'e', 'f', 'g'],
  ['a', 'b', 'c'],
  ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  ['a', 'b', 'c', 'd', 'f', 'g']
];

export const SEGMENT_NAMES: readonly SegmentName[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export type Shape =
  | { type: 'polygon'; points: string }
  | { type: 'rect'; x: number; y: number; width: number; height: number; rx: number };

/**
 * Shapes for each segment in a viewBox of (length + 2 * thickness) x
 * (2 * length + 3 * thickness).
 *
 * Pointy segments are hexagons whose tips meet their neighbours. Rounded
 * segments are pills separated by a small gap.
 */
export function segmentShapes(length: number, thickness: number, rounded: boolean): Record<SegmentName, Shape> {
  const t = thickness;
  const h = t / 2;
  const w = length + 2 * t;

  if (rounded) {
    const gap = t * 0.12;
    const horizontal = (y: number): Shape => ({ type: 'rect', x: t + gap, y, width: length - 2 * gap, height: t, rx: h });
    const vertical = (x: number, y: number): Shape => ({ type: 'rect', x, y, width: t, height: length - 2 * gap, rx: h });
    const topRow = t + gap;
    const bottomRow = length + 2 * t + gap;

    return {
      a: horizontal(0),
      g: horizontal(length + t),
      d: horizontal(2 * length + 2 * t),
      f: vertical(0, topRow),
      b: vertical(w - t, topRow),
      e: vertical(0, bottomRow),
      c: vertical(w - t, bottomRow)
    };
  }

  const horizontal = (y: number): Shape => ({
    type: 'polygon',
    points: [[h, y + h], [t, y], [w - t, y], [w - h, y + h], [w - t, y + t], [t, y + t]].join(' ')
  });
  const vertical = (x: number, y: number): Shape => ({
    type: 'polygon',
    points: [[x + h, y], [x + t, y + h], [x + t, y + length + h], [x + h, y + length + t], [x, y + length + h], [x, y + h]].join(' ')
  });
  const topRow = h;
  const bottomRow = length + 3 * h;

  return {
    a: horizontal(0),
    g: horizontal(length + t),
    d: horizontal(2 * length + 2 * t),
    f: vertical(0, topRow),
    b: vertical(w - t, topRow),
    e: vertical(0, bottomRow),
    c: vertical(w - t, bottomRow)
  };
}
