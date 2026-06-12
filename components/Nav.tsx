'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // actieve anker-markering — degradeert netjes zonder JS
  useEffect(() => {
    const ids = site.nav.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Escape sluit; focus blijft in het open menu (focus trap)
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = Array.from(
      panel?.querySelectorAll<HTMLElement>('a, button') ?? [],
    );
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === 'Tab' && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  const linkClass = (href: string) =>
    `relative py-1 text-sm font-medium text-havennacht transition-colors duration-150 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:bg-kraan after:transition-transform after:duration-200 ${
      active === href ? 'after:scale-x-100' : 'after:scale-x-0'
    }`;

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-lijn bg-beton/90 backdrop-blur">
      <nav
        aria-label="Hoofdnavigatie"
        className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6"
      >
        <a href="/" className="flex items-center gap-2" aria-label="4M Enterprise — home">
          <span className="inline-flex items-center justify-center rounded-[2px] border-[1.5px] border-havennacht px-1.5 py-0.5 font-display text-sm font-extrabold leading-none">
            4M
          </span>
          <span className="font-mono text-sm font-medium tracking-[0.12em]">
            Enterprise
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </a>
          ))}
          <a href={site.navCta.href} className="btn-primary !px-4 !py-2.5">
            {site.navCta.label}
          </a>
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobiel-menu"
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`h-0.5 w-5 bg-havennacht transition-transform duration-200 ${open ? 'translate-y-1 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-5 bg-havennacht transition-transform duration-200 ${open ? '-translate-y-1 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {open && (
        <div
          id="mobiel-menu"
          ref={panelRef}
          className="absolute inset-x-0 top-16 flex flex-col gap-1 border-b border-lijn bg-wit px-6 py-4 md:hidden"
        >
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-3 text-base font-medium text-havennacht"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.navCta.href}
            className="btn-primary mt-2"
            onClick={() => setOpen(false)}
          >
            {site.navCta.label}
          </a>
        </div>
      )}
    </header>
  );
}
