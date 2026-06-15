'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx('relative min-h-[66vh] w-full overflow-hidden md:min-h-screen', className)}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex min-h-[66vh] w-full flex-col justify-center gap-5 px-[6vw] py-12 md:min-h-screen md:justify-between md:gap-6 md:px-[4vw] md:py-0 md:pt-[clamp(2rem,8vw,4vw)] md:pb-[4vw]',
        'will-change-transform',
      )}
      style={{ transformOrigin: 'bottom left', ...style }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Pinning + rotation is desktop-only: GSAP pin is janky on touch and the
  // panels overflow on small screens. On mobile they render as normal sections.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root || reducedMotion) return;

      // Pin + rotate ONLY on desktop. gsap.matchMedia auto-reverts (clears every
      // prop it set, including the rotation) below the breakpoint, so on phones
      // the panels are always plain stacked sections, regardless of device width.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const sections = Array.from(
          root.querySelectorAll<HTMLElement>('[data-flow-section]'),
        );
        if (sections.length === 0) return;

        sections.forEach((section, i) => {
          gsap.set(section, { zIndex: i + 1 });
          const inner = section.querySelector<HTMLElement>('.flow-art-container');
          if (!inner) return;

          if (i > 0) {
            gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
            gsap.to(inner, {
              rotation: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 25%',
                scrub: true,
              },
            });
          }

          if (i < sections.length - 1) {
            ScrollTrigger.create({
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              pin: true,
              pinSpacing: false,
            });
          }
        });

        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </div>
  );
};

export default FlowArt;
