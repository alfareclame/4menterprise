// Scroll pacing for a frame sequence. By default every frame gets the same scroll distance;
// a pace span gives a stretch of frames `weight` times more scroll (used where the footage
// moves fast). The film timeline and the captions both use this one mapping, so captions stay
// on the footage moment they describe.

export type PaceSpan = { from: number; to: number; weight: number };
export type Segment = { from: number; to: number; duration: number };

/** Ordered segments covering frames 0..count-1, with durations summing to 1. */
export function paceSegments(count: number, spans: readonly PaceSpan[] = []): Segment[] {
  const last = count - 1;
  const cuts = [...spans].sort((a, b) => a.from - b.from);
  const raw: { from: number; to: number; w: number }[] = [];
  let at = 0;
  for (const s of cuts) {
    const from = Math.max(at, Math.min(s.from, last));
    const to = Math.max(from, Math.min(s.to, last));
    if (from > at) raw.push({ from: at, to: from, w: 1 });
    if (to > from) raw.push({ from, to, w: s.weight });
    at = to;
  }
  if (at < last) raw.push({ from: at, to: last, w: 1 });
  const total = raw.reduce((t, r) => t + (r.to - r.from) * r.w, 0) || 1;
  return raw.map(r => ({ from: r.from, to: r.to, duration: ((r.to - r.from) * r.w) / total }));
}

/** Scroll progress (0..1) at which a given frame is shown. */
export function progressOfFrame(frame: number, segments: readonly Segment[]): number {
  let p = 0;
  for (const s of segments) {
    if (frame >= s.to) { p += s.duration; continue; }
    if (frame > s.from) p += s.duration * ((frame - s.from) / (s.to - s.from));
    break;
  }
  return Math.min(1, p);
}
