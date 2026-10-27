'use client';
// Canvas image-sequence scrubbed by scroll.
//
// Smoothness model (measured with scripts/scroll-bench.mjs):
// - Compressed frames (Blob, ~50 KB) are fetched for the whole leg in coarse-to-fine order
//   (every 8th frame first, then 4th, 2nd, all), nearest to the playhead first. A fast flick
//   therefore always finds a nearby frame instead of freezing on a stale one.
// - Only a window of frames around the playhead is decoded (ImageBitmap at source size, off
//   the main thread), decoding ahead in the scroll direction first.
// - The playhead is fractional: neighbouring decoded frames are cross-blended, so motion
//   stays continuous between frames and across gaps that are still loading.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { paceSegments, type PaceSpan } from '@/lib/pace';

export type ScrollSequenceProps = {
  /** e.g. (i) => `/frames/kitchen/desktop/frame_${String(i + 1).padStart(4, '0')}.webp` */
  src: (index: number) => string;
  frameCount: number;
  /** scroll distance the sequence occupies, e.g. "400vh" */
  scrollLength?: string;
  /** frames decoded on each side of the playhead */
  memoryWindow?: number;
  /** numeric = seconds of catch-up smoothing; true = 1:1 */
  scrub?: boolean | number;
  /** cap on devicePixelRatio (1.5 is invisible on moving footage) */
  maxDpr?: number;
  /** width / height of the source frames */
  aspect?: number;
  /** poster shown until the first frame is drawn */
  poster?: string;
  /** true = start fetching on mount (first leg); false = when within three viewports */
  eager?: boolean;
  /** frame spans that get more scroll distance (fast camera moves) */
  pace?: readonly PaceSpan[];
  onTimeline?: (tl: gsap.core.Timeline, st: ScrollTrigger) => void;
  onProgress?: (progress: number, frame: number) => void;
  children?: ReactNode;
  /** 'contain' letterboxes the whole frame instead of filling the screen (phones) */
  fit?: 'cover' | 'contain';
  className?: string;
};

type SeqDebug = { requested: number; misses: number; gapSum?: number; gapMax?: number; blits?: number };
// ?seqdebug: counts draws whose nearest decoded frame is more than one frame away
const debug: SeqDebug | null =
  typeof window !== 'undefined' && window.location.search.includes('seqdebug')
    ? ((window as unknown as { __seq?: SeqDebug }).__seq ??= { requested: 0, misses: 0 })
    : null;

const isIOS = () =>
  typeof navigator !== 'undefined' &&
  (/iP(hone|ad|od)/.test(navigator.platform) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

/** 0 for every 8th frame, 1 for every 4th, 2 for every 2nd, 3 for the rest */
const coarseLevel = (i: number) => (i % 8 === 0 ? 0 : i % 4 === 0 ? 1 : i % 2 === 0 ? 2 : 3);
const FETCH_CONCURRENCY = 6;
const LEVEL_WEIGHT = 12; // a stride-8 frame 36 frames away ranks with an odd frame next door

export default function ScrollSequence({
  src,
  frameCount,
  scrollLength = '400vh',
  memoryWindow = 24, // ~50 decoded 1080p frames ≈ 400 MB of GPU memory
  scrub = true,
  maxDpr = 1.5,
  aspect = 16 / 9,
  fit = 'cover',
  poster,
  eager = true,
  pace,
  onTimeline,
  onProgress,
  children,
  className = '',
}: ScrollSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const blobs = useRef<(Blob | undefined)[]>([]);
  const fetching = useRef<Set<number>>(new Set());
  const bitmaps = useRef<Map<number, ImageBitmap>>(new Map());
  const decoding = useRef<Set<number>>(new Set());
  const playhead = useRef({ frame: 0 });
  const direction = useRef(1);
  const lastKey = useRef('');
  const started = useRef(false);
  const alive = useRef(true);
  // css-pixel cover rect + backing-store size of one decoded frame
  const geo = useRef({ w: 0, h: 0, dpr: 1, dx: 0, dy: 0, dw: 0, dh: 0 });
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);

  // ---------- drawing ----------
  const nearest = (from: number, step: 1 | -1) => {
    for (let i = from, n = 0; i >= 0 && i < frameCount && n <= 64; i += step, n++) {
      if (bitmaps.current.has(i)) return i;
    }
    return -1;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const { w, dx, dy, dw, dh } = geo.current;
    if (!canvas || !w) return;
    const f = Math.min(Math.max(playhead.current.frame, 0), frameCount - 1);
    let a = nearest(Math.floor(f), -1);
    let b = nearest(Math.ceil(f), 1);
    if (a < 0 && b < 0) return;
    if (a < 0) a = b;
    if (b < 0) b = a;
    const t = b === a ? 0 : (f - a) / (b - a);
    const alpha = Math.round(t * 50) / 50; // 2% steps: invisible, avoids redundant blits
    if (debug) {
      debug.requested++;
      const gap = Math.min(Math.abs(a - f), Math.abs(b - f));
      if (gap > 1) debug.misses++;
      debug.gapSum = (debug.gapSum ?? 0) + gap;
      debug.gapMax = Math.max(debug.gapMax ?? 0, gap);
    }
    const key = `${a}:${b}:${alpha}`;
    if (key === lastKey.current) return;
    lastKey.current = key;
    if (debug) debug.blits = (debug.blits ?? 0) + 1;
    const ctx = canvas.getContext('2d', { alpha: false })!;
    ctx.globalAlpha = 1;
    ctx.drawImage(bitmaps.current.get(a)!, dx, dy, dw, dh);
    if (b !== a && alpha > 0) {
      ctx.globalAlpha = alpha;
      ctx.drawImage(bitmaps.current.get(b)!, dx, dy, dw, dh);
      ctx.globalAlpha = 1;
    }
    if (!readyRef.current) { readyRef.current = true; setReady(true); }
  };

  // ---------- loading ----------
  const fetchFrame = async (i: number) => {
    fetching.current.add(i);
    try {
      const res = await fetch(src(i), { priority: i < 12 ? 'high' : 'low' } as RequestInit);
      if (!res.ok) throw new Error(String(res.status));
      blobs.current[i] = await res.blob();
    } catch (e) {
      console.warn('frame fetch failed', i, e);
    } finally {
      fetching.current.delete(i);
      if (alive.current) schedule();
    }
  };

  const decodeFrame = async (i: number) => {
    const blob = blobs.current[i];
    if (!blob) return;
    decoding.current.add(i);
    try {
      // decode at source size: the resize options of createImageBitmap ran on the main thread
      // and blocked scrolling while frames streamed in (p95 16.6 -> 4.3 ms without them);
      // drawImage scales on the GPU instead
      const bmp = await createImageBitmap(blob);
      if (!alive.current || Math.abs(i - playhead.current.frame) > memoryWindow + 12) bmp.close();
      else {
        bitmaps.current.set(i, bmp);
        draw();
      }
    } catch (e) {
      console.warn('frame decode failed', i, e);
    } finally {
      decoding.current.delete(i);
      if (alive.current) schedule();
    }
  };

  const schedule = () => {
    if (!started.current || !geo.current.w) return; // not armed, or hidden by a gate (size 0)
    const center = playhead.current.frame;
    const dir = direction.current;

    // fetch: coarse-to-fine, nearest first
    while (fetching.current.size < FETCH_CONCURRENCY) {
      let best = -1, bestScore = Infinity;
      for (let i = 0; i < frameCount; i++) {
        if (blobs.current[i] || fetching.current.has(i)) continue;
        const score = Math.abs(i - center) + coarseLevel(i) * LEVEL_WEIGHT;
        if (score < bestScore) { bestScore = score; best = i; }
      }
      if (best < 0) break;
      fetchFrame(best);
    }

    // decode: inside the window, ahead of the direction of travel first
    // 6 parallel decodes: benchmark showed 3-4 leave 15-25% of draws >1 frame from a decoded one
    const decodeConcurrency = isIOS() ? 1 : 6;
    while (decoding.current.size < decodeConcurrency) {
      let best = -1, bestScore = Infinity;
      const lo = Math.max(0, Math.floor(center - memoryWindow));
      const hi = Math.min(frameCount - 1, Math.ceil(center + memoryWindow));
      for (let i = lo; i <= hi; i++) {
        if (!blobs.current[i] || bitmaps.current.has(i) || decoding.current.has(i)) continue;
        const d = (i - center) * dir;
        const score = (d >= -1 ? d : -d * 2) + coarseLevel(i) * 2;
        if (score < bestScore) { bestScore = score; best = i; }
      }
      if (best < 0) break;
      decodeFrame(best);
    }

    // evict decoded frames that fell out of the window
    bitmaps.current.forEach((bmp, i) => {
      if (Math.abs(i - center) > memoryWindow + 12) {
        bmp.close();
        bitmaps.current.delete(i);
      }
    });
  };

  const resize = () => {
    const canvas = canvasRef.current, sticky = stickyRef.current;
    if (!canvas || !sticky) return;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const w = sticky.clientWidth, h = sticky.clientHeight;
    // object-fit (cover fills the screen; contain shows the whole frame), computed once per size
    const dw = fit === 'contain' ? Math.min(w, h * aspect) : Math.max(w, h * aspect);
    const dh = dw / aspect;
    // contain sits a little below centre: the lead card takes the top of the first screen,
    // the captions sit underneath the band
    const dy = (h - dh) * (fit === 'contain' ? 0.6 : 0.5);
    geo.current = { w, h, dpr, dx: (w - dw) / 2, dy, dw, dh };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d', { alpha: false })!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingQuality = 'high'; // GPU scaling of the source-size bitmaps
    lastKey.current = ''; // the canvas was cleared by the resize: force a redraw
    draw();
    schedule(); // also resumes loading if a gate had hidden the sequence
  };

  // ---------- setup ----------
  useEffect(() => {
    alive.current = true;
    resize();

    const start = () => {
      if (started.current) return;
      started.current = true;
      schedule();
    };
    // later legs start fetching three viewports ahead, so their coarse pass is in before arrival
    const io = new IntersectionObserver(
      entries => { if (entries.some(e => e.isIntersecting)) { io.disconnect(); start(); } },
      { rootMargin: '300% 0px' },
    );
    if (eager) start(); else io.observe(rootRef.current!);

    const ro = new ResizeObserver(() => resize());
    ro.observe(stickyRef.current!);
    const bmps = bitmaps.current;
    return () => {
      alive.current = false;
      io.disconnect();
      ro.disconnect();
      bmps.forEach(b => b.close());
      bmps.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub,
          invalidateOnRefresh: true,
          onUpdate: self => onProgress?.(self.progress, Math.round(playhead.current.frame)),
        },
      });
      let prev = 0;
      const onUpdate = () => {
        const f = playhead.current.frame;
        if (f !== prev) direction.current = f > prev ? 1 : -1;
        prev = f;
        draw();
        schedule();
      };
      // one linear tween per pace segment: slow spans get proportionally more scroll
      for (const s of paceSegments(frameCount, pace)) {
        tl.to(playhead.current, { frame: s.to, ease: 'none', duration: s.duration, onUpdate });
      }
      onTimeline?.(tl, tl.scrollTrigger!);
    },
    { scope: rootRef, dependencies: [frameCount, pace] },
  );

  return (
    <section ref={rootRef} className={`relative ${className}`} style={{ height: scrollLength }}>
      <div ref={stickyRef} className="sticky top-0 h-[100svh] w-full overflow-hidden bg-canvas">
        {poster && !ready && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            fetchPriority={eager ? 'high' : 'low'}
            loading={eager ? 'eager' : 'lazy'}
            className="seq-poster absolute inset-0 h-full w-full object-cover"
          />
        )}
        <canvas ref={canvasRef} aria-hidden="true" tabIndex={-1} className="absolute inset-0 block" />
        <div className="pointer-events-none absolute inset-0">{children}</div>
      </div>
    </section>
  );
}
