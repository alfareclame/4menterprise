// The homepage film: nine Seedance legs joined into one take by scripts/film.sh, played as one
// scroll-driven frame sequence (components/FilmHero). Captions are placed in film frames, so they
// stay on the footage they describe whatever the scroll length.
//
// Storyboard ("één dag in Rotterdam"): one photoreal, continuous camera move through the city.
//   L1 blue-hour Maas + Erasmusbrug -> shop street, installer mounting lit letters (Reclame & Signing)
//   L2 through the shop window -> counter: phone call + chat on the laptop        (AI & Automatisering)
//   L3 counter -> man with live GPS map on his phone, van passing outside          (Mobiliteit & Telematica)
//   L4 phone screen -> tablet in a kitchen under renovation                         (Wonen & Verbouwen)
//   L5 renovation time-lapse -> finished handleless kitchen, flush built-in appliances
//   L6 kitchen -> front door, handshake with the tradesman                          (Platforms & Bemiddeling)
//   L7 street at dusk -> EV charging from a street-lamp post                        (Innovatie)
//   L8 up through the clouds -> Cappadocia at sunrise, balloons                     (Reizen & Toerisme)
//   L9 back through the clouds -> Erasmusbrug at night                              (settle: contact)
import type { PaceSpan } from './pace';

/** Frame folder; rename (film-v3, ...) whenever the footage changes: frames are cached immutable. */
export const FILM_NAME = 'film-v3';

/** Frames per leg as fed to film.sh, and the xfade overlap between legs (0.25 s at 24 fps). */
const LEG_FRAMES = [241, 241, 241, 241, 241, 241, 241, 241, 241] as const;
const OVERLAP = 6;

/** First film frame of each leg. */
export const legStart: readonly number[] = LEG_FRAMES.map((_, i) =>
  LEG_FRAMES.slice(0, i).reduce((sum, n) => sum + n - OVERLAP, 0),
);

export const filmFrameCount = LEG_FRAMES.reduce((sum, n) => sum + n, 0) - OVERLAP * (LEG_FRAMES.length - 1);

/** Film frame at a fraction (0..1) of a leg. */
const inLeg = (leg: number, t: number) => Math.round(legStart[leg] + t * (LEG_FRAMES[leg] - 1));


export const filmSrc = (set: 'desktop' | 'phone') => (i: number) =>
  `/frames/${FILM_NAME}/${set}/frame_${String(i + 1).padStart(4, '0')}.webp`;

export const filmPoster = `/frames/${FILM_NAME}/poster.jpg`;

/**
 * Motion-weighted pacing: Seedance speeds the camera up mid-leg (window push-ins, cloud climbs), so
 * equal scroll per frame made those stretches flash past. Weight = local picture change / 4 (mean
 * abs luma difference between neighbouring frames, 1.5 s window, 320px greyscale), clamped 1..3.5,
 * so every scroll step shows roughly the same amount of change. Re-measure after new footage:
 *   ffmpeg -framerate 24 -i public/frames/<film>/phone/frame_%04d.webp -vf "scale=320:-1,format=gray,
 *     tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" -f null -
 */
export const filmPace: readonly PaceSpan[] = [
  { from: 33, to: 44, weight: 1.5 },
  { from: 44, to: 124, weight: 2 },
  { from: 124, to: 129, weight: 2.5 },
  { from: 129, to: 135, weight: 3 },
  { from: 135, to: 178, weight: 3.5 },
  { from: 178, to: 186, weight: 3 },
  { from: 186, to: 194, weight: 2.5 },
  { from: 194, to: 202, weight: 2 },
  { from: 202, to: 213, weight: 1.5 },
  { from: 264, to: 269, weight: 1.5 },
  { from: 269, to: 274, weight: 2 },
  { from: 274, to: 279, weight: 2.5 },
  { from: 279, to: 284, weight: 3 },
  { from: 284, to: 331, weight: 3.5 },
  { from: 331, to: 337, weight: 3 },
  { from: 337, to: 344, weight: 2.5 },
  { from: 344, to: 351, weight: 2 },
  { from: 351, to: 358, weight: 1.5 },
  { from: 544, to: 583, weight: 1.5 },
  { from: 818, to: 865, weight: 1.5 },
  { from: 1224, to: 1291, weight: 1.5 },
  { from: 1324, to: 1354, weight: 1.5 },
  { from: 1416, to: 1429, weight: 1.5 },
  { from: 1429, to: 1437, weight: 2 },
  { from: 1437, to: 1454, weight: 1.5 },
  { from: 1516, to: 1549, weight: 1.5 },
  { from: 1660, to: 1672, weight: 1.5 },
  { from: 1672, to: 1682, weight: 2 },
  { from: 1682, to: 1733, weight: 2.5 },
  { from: 1733, to: 1754, weight: 3 },
  { from: 1754, to: 1764, weight: 2.5 },
  { from: 1764, to: 1774, weight: 2 },
  { from: 1774, to: 1784, weight: 1.5 }
];

/** Scroll length: ~1.27vh per unweighted frame, the rate that read calm on grynnstudio.nl (1416 frames / 1800vh). */
export const filmScrollVh = Math.round(
  1.27 * filmPace.reduce((sum, s) => sum + (s.to - s.from) * (s.weight - 1), filmFrameCount),
);

export type FilmBeat =
  | { kind: 'divisie'; divisie: string; at: readonly [number, number] }
  | { kind: 'innovatie'; at: readonly [number, number] };

export const filmBeats: readonly FilmBeat[] = [
  { kind: 'divisie', divisie: 'reclame', at: [inLeg(0, 0.7), inLeg(1, 0.3)] },
  { kind: 'divisie', divisie: 'ai', at: [inLeg(1, 0.6), inLeg(2, 0.3)] },
  { kind: 'divisie', divisie: 'mobiliteit', at: [inLeg(2, 0.6), inLeg(3, 0.3)] },
  { kind: 'divisie', divisie: 'wonen', at: [inLeg(3, 0.7), inLeg(4, 0.95)] },
  { kind: 'divisie', divisie: 'platforms', at: [inLeg(5, 0.75), inLeg(6, 0.15)] },
  { kind: 'innovatie', at: [inLeg(6, 0.65), inLeg(7, 0.25)] },
  { kind: 'divisie', divisie: 'reizen', at: [inLeg(7, 0.75), inLeg(8, 0.3)] },
];

/** The closing block appears here and stays until the film scrolls away. */
export const filmSettleFrame = inLeg(8, 0.6);
