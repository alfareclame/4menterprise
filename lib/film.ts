// The homepage film: nine Seedance legs joined into one take by scripts/film.sh, played as one
// scroll-driven frame sequence (components/FilmHero). Captions are placed in film frames, so they
// stay on the footage they describe whatever the scroll length.
//
// Storyboard ("één dag in Rotterdam"): one photoreal, continuous camera move through the city.
//   L1 blue-hour Maas + Erasmusbrug -> shop street, installer mounting lit letters (Reclame & Signing)
//   L2 through the shop window -> counter: phone call + chat on the laptop        (AI & Automatisering)
//   L3 counter -> man with live GPS map on his phone, van passing outside          (Mobiliteit & Telematica)
//   L4 phone screen -> tablet in a kitchen under renovation                         (Wonen & Verbouwen)
//   L5 renovation -> finished kitchen
//   L6 kitchen -> front door, handshake with the tradesman                          (Platforms & Bemiddeling)
//   L7 street at dusk -> EV charging from a street-lamp post                        (Innovatie)
//   L8 up through the clouds -> Cappadocia at sunrise, balloons                     (Reizen & Toerisme)
//   L9 back through the clouds -> Erasmusbrug at night                              (settle: contact)
import type { PaceSpan } from './pace';

/** Frame folder; rename (film-v3, ...) whenever the footage changes: frames are cached immutable. */
export const FILM_NAME = 'film-v2';

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

/** Scroll length: ~1.27vh per frame, the rate that read calm on grynnstudio.nl (1416 frames / 1800vh). */
export const filmScrollVh = Math.round(filmFrameCount * 1.27);

export const filmSrc = (set: 'desktop' | 'phone') => (i: number) =>
  `/frames/${FILM_NAME}/${set}/frame_${String(i + 1).padStart(4, '0')}.webp`;

export const filmPoster = `/frames/${FILM_NAME}/poster.jpg`;

/** Even pacing: the legs all move at a steady gimbal speed. */
export const filmPace: readonly PaceSpan[] = [];

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
export const filmSettleFrame = inLeg(8, 0.75);
