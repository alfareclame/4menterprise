'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface Branch {
  id: string;
  label: string;
  dashed: boolean; // dashed = nog niet geleverd (innovatie)
  href: string | null;
}

const BRANCHES: Branch[] = [
  { id: 'aanloopai', label: 'AANLOOPAI', dashed: false, href: '#ventures' },
  { id: 'piekai', label: 'PIEKAI', dashed: false, href: '#ventures' },
  { id: 'laadpunten', label: 'LAADPUNTEN', dashed: true, href: null },
  { id: 'schadedetectie', label: 'SCHADEDETECTIE', dashed: true, href: null },
];

// orthogonale "circuit-trace" routing met 45°-chamfers, vanaf de node (90,240)
const DESKTOP_PATHS = [
  'M116 240 H178 L190 228 V112 L202 100 H400',
  'M116 240 H208 L220 228 V202 L232 190 H400',
  'M116 240 H238 L250 252 V278 L262 290 H400',
  'M116 240 H268 L280 252 V368 L292 380 H400',
];
const DESKTOP_Y = [100, 190, 290, 380];

// mobiel: vereenvoudigde verticale routing — node boven, ladder eronder
const MOBILE_Y = [150, 240, 330, 420];
const MOBILE_TRUNK_SOLID = 'M48 70 V240';
const MOBILE_TRUNK_DASHED = 'M48 240 V420';

const ARIA_LABEL =
  'Schema: één centrale node (M) met vier vertakkingen — AanloopAI (actief) en PiekAI (in ontwikkeling), plus Laadpunten en Schadedetectie (in onderzoek)';

export default function VentureMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInstant(true);
      setDrawn(true);
      return;
    }
    const element = containerRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const solidStyle = (index: number): CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: drawn ? 0 : 1,
    transition: instant
      ? 'none'
      : `stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
  });

  const fadeStyle = (index: number): CSSProperties => ({
    opacity: drawn ? 1 : 0,
    transition: instant ? 'none' : `opacity 0.5s ease-out ${index * 0.08}s`,
  });

  const renderEndpoint = (
    branch: Branch,
    index: number,
    terminalX: number,
    labelX: number,
    y: number,
    fontSize: number,
  ) => {
    const content = (
      <>
        <rect
          x={terminalX}
          y={y - 3}
          width={6}
          height={6}
          fill={branch.dashed ? 'none' : 'var(--color-havennacht)'}
          stroke="var(--color-havennacht)"
          strokeWidth={1}
        />
        <text
          x={labelX}
          y={y + 4}
          className="font-mono"
          fontSize={fontSize}
          letterSpacing="0.08em"
          fill="var(--color-staal)"
        >
          {branch.label}
        </text>
      </>
    );
    return branch.href ? (
      <a key={branch.id} href={branch.href} className="vm-el" style={fadeStyle(index)}>
        {content}
      </a>
    ) : (
      <g key={branch.id} className="vm-el" style={fadeStyle(index)}>
        {content}
      </g>
    );
  };

  return (
    <div ref={containerRef}>
      <noscript>
        <style>{`.vm-line{stroke-dashoffset:0 !important;opacity:1 !important}.vm-el{opacity:1 !important}`}</style>
      </noscript>

      {/* desktop: rechterhelft van de hero */}
      <svg
        viewBox="0 0 560 480"
        role="img"
        aria-label={ARIA_LABEL}
        className="hidden w-full max-w-[560px] md:block"
      >
        {BRANCHES.map((branch, index) => (
          <path
            key={branch.id}
            className="vm-line"
            d={DESKTOP_PATHS[index]}
            fill="none"
            stroke="var(--color-havennacht)"
            strokeWidth={1.5}
            {...(branch.dashed
              ? { strokeDasharray: '3 6', style: fadeStyle(index) }
              : { pathLength: 1, style: solidStyle(index) })}
          />
        ))}
        {BRANCHES.map((branch, index) =>
          renderEndpoint(branch, index, 397, 412, DESKTOP_Y[index], 11),
        )}
        <circle cx={90} cy={240} r={26} fill="var(--color-kraan)" />
        <text
          x={90}
          y={246}
          textAnchor="middle"
          className="font-mono"
          fontSize={16}
          fontWeight={500}
          fill="var(--color-wit)"
        >
          M
        </text>
      </svg>

      {/* mobiel: volle breedte onder de hero-tekst, verticale routing */}
      <svg
        viewBox="0 0 360 470"
        role="img"
        aria-label={ARIA_LABEL}
        className="w-full md:hidden"
      >
        <path
          className="vm-line"
          d={MOBILE_TRUNK_SOLID}
          fill="none"
          stroke="var(--color-havennacht)"
          strokeWidth={1.5}
          pathLength={1}
          style={solidStyle(0)}
        />
        <path
          className="vm-line"
          d={MOBILE_TRUNK_DASHED}
          fill="none"
          stroke="var(--color-havennacht)"
          strokeWidth={1.5}
          strokeDasharray="3 6"
          style={fadeStyle(5)}
        />
        {BRANCHES.map((branch, index) => (
          <path
            key={branch.id}
            className="vm-line"
            d={`M48 ${MOBILE_Y[index]} H77`}
            fill="none"
            stroke="var(--color-havennacht)"
            strokeWidth={1.5}
            {...(branch.dashed
              ? { strokeDasharray: '3 6', style: fadeStyle(index + 1) }
              : { pathLength: 1, style: solidStyle(index + 1) })}
          />
        ))}
        {BRANCHES.map((branch, index) =>
          renderEndpoint(branch, index + 1, 77, 92, MOBILE_Y[index], 12),
        )}
        <circle cx={48} cy={48} r={22} fill="var(--color-kraan)" />
        <text
          x={48}
          y={53}
          textAnchor="middle"
          className="font-mono"
          fontSize={14}
          fontWeight={500}
          fill="var(--color-wit)"
        >
          M
        </text>
      </svg>
    </div>
  );
}
