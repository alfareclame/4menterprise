'use client';
// Homepage film: one photoreal camera move through Rotterdam, played frame by frame as the visitor scrolls.
// One canvas (ScrollSequence) plays the whole take; captions sit on a sticky overlay driven by
// one scrubbed timeline. All copy comes from content/*, so the film never says more than the site.
import { useMemo, useRef } from 'react';
import ScrollSequence from '@/components/ScrollSequence';
import { contact, hero, innovatieIntro } from '@/content/copy';
import { bedrijvenVan, divisies } from '@/content/groep';
import { innovatieProjecten } from '@/content/innovatie';
import { site } from '@/content/site';
import {
  filmBeats,
  filmFrameCount,
  filmPace,
  filmPoster,
  filmScrollVh,
  filmSettleFrame,
  filmSrc,
  type FilmBeat,
} from '@/lib/film';
import { gsap, MOBILE_FRAMES_QUERY, prefersReducedMotion, useGSAP } from '@/lib/gsap';
import { paceSegments, progressOfFrame } from '@/lib/pace';

const SHADOW = '0 1px 2px rgb(16 28 40 / 0.6), 0 2px 14px rgb(16 28 40 / 0.5), 0 0 40px rgb(16 28 40 / 0.4)';
const pad = (n: number) => String(n).padStart(2, '0');

function BeatCaption({ beat }: { beat: FilmBeat }) {
  if (beat.kind === 'innovatie') {
    return (
      <>
        <p className="font-mono text-[13px] tracking-[0.14em] text-kraan-licht">{innovatieIntro.eyebrow}</p>
        <p className="mt-3 font-display text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.05] text-wit">
          {innovatieIntro.h2}
        </p>
        <ul className="mt-5 space-y-1 text-lg text-wit/90">
          {innovatieProjecten.map((p) => (
            <li key={p.id}>
              {p.name} <span className="font-mono text-[13px] text-staal-licht">· {p.status}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }
  const i = divisies.findIndex((d) => d.id === beat.divisie);
  const divisie = divisies[i];
  return (
    <>
      <p className="font-mono text-[13px] tracking-[0.14em] text-kraan-licht">
        {pad(i + 1)}/{pad(divisies.length)} · {divisie.naam.toUpperCase()}
      </p>
      <p className="mt-3 font-display text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.05] text-wit">
        {bedrijvenVan(divisie.id).map((b) => (
          <span key={b.id} className="block">
            {b.naam}
            {b.status !== 'Actief' && (
              <span className="ml-3 align-middle font-mono text-[13px] font-normal tracking-normal text-staal-licht">
                {b.status.toLowerCase()}
              </span>
            )}
          </span>
        ))}
      </p>
      <p className="mt-5 max-w-[34rem] text-lg text-wit/90">{divisie.omschrijving}</p>
    </>
  );
}

export default function FilmHero() {
  const root = useRef<HTMLDivElement>(null);
  // chosen once per page load: the static export has no window and renders desktop; the client
  // re-evaluates on hydration before any frame is fetched
  const film = useMemo(() => {
    const phone = typeof window !== 'undefined' && window.matchMedia(MOBILE_FRAMES_QUERY).matches;
    return { phone, src: filmSrc(phone ? 'phone' : 'desktop') };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true },
      });
      const ramp = 0.012;
      // calm mode (OS "reduce motion"): the film still follows the scroll, text only fades
      const calm = prefersReducedMotion();
      const rise = calm ? 0 : 24;
      const segments = paceSegments(filmFrameCount, filmPace);
      const at = (frame: number) => progressOfFrame(frame, segments);
      gsap.utils.toArray<HTMLElement>('[data-beat]').forEach((el, i) => {
        const a = at(filmBeats[i].at[0]);
        const b = at(filmBeats[i].at[1]);
        // opacity + transform only: a scrubbed blur filter repaints every frame
        tl.fromTo(el, { autoAlpha: 0, y: rise }, { autoAlpha: 1, y: 0, duration: ramp }, a);
        tl.to(el, { autoAlpha: 0, y: calm ? 0 : -16, duration: ramp }, b - ramp);
      });
      // the settle reveal must end by 1: a timeline longer than 1 is squeezed onto the scroll and
      // every caption above would show early, off the footage it describes
      const settle = gsap.utils.toArray<HTMLElement>('[data-settle] > *');
      const settleAt = at(filmSettleFrame);
      const fit = Math.min(1, (1 - settleAt) / (0.04 + 0.015 * (settle.length - 1)));
      tl.fromTo(
        settle,
        { autoAlpha: 0, y: calm ? 0 : 28 },
        { autoAlpha: 1, y: 0, duration: 0.04 * fit, stagger: 0.015 * fit, ease: 'power3.out' },
        settleAt,
      );
      tl.set({}, {}, 1);
    },
    { scope: root, dependencies: [film] },
  );

  return (
    <div id="hero" className="relative bg-havennacht">
      {/* First screen: phones get it in flow above the film; from md it lies over the film's
          first screen and scrolls away with it. */}
      <div className="relative z-10 px-6 pb-10 pt-14 md:pointer-events-none md:absolute md:inset-x-0 md:top-0 md:h-[calc(100svh-4rem)] md:p-0">
        <div className="relative mx-auto md:h-full md:max-w-[1200px]">
          <div className="max-w-[44rem] md:pointer-events-auto md:absolute md:bottom-[10svh] md:left-6" style={{ textShadow: SHADOW }}>
            <p className="font-mono text-[13px] tracking-[0.14em] text-kraan-licht">{hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.02] text-wit">
              {hero.h1}
            </h1>
            <p className="mt-6 max-w-[36rem] text-lg text-wit/90">{hero.subline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4" style={{ textShadow: 'none' }}>
              <a href={hero.primaryCta.href} className="btn-primary active:translate-y-px">
                {hero.primaryCta.label}
              </a>
              <a href={hero.secondaryCta.href} className="btn-ghost active:translate-y-px">
                {hero.secondaryCta.label}
              </a>
            </div>
            <dl className="mt-10 grid max-w-[36rem] grid-cols-4 gap-4 border-t border-wit/20 pt-5">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-wit">{s.value}</dd>
                  <dd className="mt-1 text-[13px] leading-snug text-staal-licht">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div ref={root} className="relative">
        <ScrollSequence
          frameCount={filmFrameCount}
          scrollLength={`${filmScrollVh}vh`}
          poster={filmPoster}
          src={film.src}
          pace={filmPace}
          fit={film.phone ? 'contain' : 'cover'}
          maxDpr={film.phone ? 3 : 1.5}
          memoryWindow={film.phone ? 16 : 24}
        />
        <div className="pointer-events-none absolute inset-0">
          <div className="sticky top-0 h-[100svh]">
            <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_25%_80%,rgb(16_28_40/0.6),transparent_70%)]" />
            {filmBeats.map((beat, i) => (
              <div
                key={i}
                data-beat
                className="invisible absolute bottom-[5svh] left-6 right-6 max-w-[40rem] md:bottom-[12svh] md:left-12"
                style={{ textShadow: SHADOW }}
              >
                <BeatCaption beat={beat} />
              </div>
            ))}
            <div data-settle className="absolute bottom-[12svh] left-6 right-6 max-w-[40rem] md:left-12" style={{ textShadow: SHADOW }}>
              <p className="invisible font-mono text-[13px] tracking-[0.14em] text-kraan-licht">{contact.eyebrow}</p>
              <h2 className="invisible mt-4 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.05] text-wit">
                {contact.h2}
              </h2>
              <p className="invisible mt-5 text-lg text-wit/90">{contact.subline}</p>
              <div className="pointer-events-auto invisible mt-8 flex flex-wrap items-center gap-4" style={{ textShadow: 'none' }}>
                <a href={`mailto:${site.email}`} className="btn-primary active:translate-y-px">
                  {contact.buttonLabel}
                </a>
                <a href={hero.primaryCta.href} className="btn-ghost active:translate-y-px">
                  {hero.primaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
