"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

export default function Hero({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const centerTileRef = useRef<HTMLDivElement>(null);
  const leftTileRef = useRef<HTMLDivElement>(null);
  const topRightTileRef = useRef<HTMLDivElement>(null);
  const bottomRightTileRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsap();

    // Set initial states
    gsap.set([centerTileRef.current, leftTileRef.current, topRightTileRef.current, bottomRightTileRef.current], {
      opacity: 0,
      scale: 0.8,
    });
    gsap.set([titleRef.current, textRef.current, kickerRef.current], {
      opacity: 0,
      y: 20,
    });

    // Create timeline
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate center tile
    tl.to(centerTileRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
    });

    // Animate other tiles with stagger
    tl.to([leftTileRef.current, topRightTileRef.current, bottomRightTileRef.current], {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    }, "-=0.6");

    // Animate title and text
    tl.to([titleRef.current, textRef.current, kickerRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="
        relative
        min-h-screen
        bg-[url('/images/6.jpg')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative flex min-h-screen items-end justify-center pb-16">
        <div className="max-w-3xl">
          {/* Kicker */}
          <p ref={kickerRef} className="tracking-[0.25em] uppercase text-mist/70 mb-4 leading-none text-center">
            Asociatia de Dezvoltare Intelectuala si Arta
          </p>

          {/* Center tile – unchanged */}
          <div
            ref={centerTileRef}
            className="
              hero-tile
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-[22rem] md:w-[32rem]
              aspect-[2/3] md:aspect-square
              overflow-hidden
              border border-black/20
              bg-white/5
              backdrop-blur-sm
              shadow-xl
            "
          >
            <img
              src="/images/10.jpg"
              alt="Artwork"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Mid-left tile – bottom aligned to center tile */}
          <div
            ref={leftTileRef}
            className="
              hero-tile
              absolute
              hidden
              lg:block
              left-20
              top-[25rem] md:top-[12rem]
              w-32 md:w-56
              aspect-square
              border border-white/20
              bg-white/5
              backdrop-blur-sm
              shadow-lg
              group
            "
          >
            <img
              src="/images/11.jpg"
              alt="Artwork"
              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-200 ease-out"
            />
          </div>

          {/* Top-right tile */}
          <div
            ref={topRightTileRef}
            className="
              hero-tile
              absolute
              hidden
              lg:block
              right-4 md:left-[calc(50%+16rem)]
              top-24 md:top-24
              w-32 md:w-40
              aspect-square
              border border-white/20
              bg-white/5
              backdrop-blur-sm
              shadow-lg
              group
            "
          >
            <img
              src="/images/12.jpg"
              alt="Artwork"
              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-200 ease-out"
            />
          </div>

          {/* Bottom-right tile - glued to top-right tile */}
          <div
            ref={bottomRightTileRef}
            className="
              hero-tile
              absolute
              hidden
              lg:block
              left-[calc(100%-1rem)] md:left-[calc(50%+16rem+10rem)]
              top-[14rem] md:top-[16rem]
              w-44 md:w-56
              aspect-square
              border border-white/20
              bg-white/5
              backdrop-blur-sm
              shadow-lg
              group
            "
          >
            <img
              src="/images/13.jpg"
              alt="Artwork"
              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-200 ease-out"
            />
          </div>

          {/* Big title */}
          <h1 ref={titleRef} className="font-serif text-[12rem] md:text-[20rem] leading-none text-center tracking-tight">
            ADIA
          </h1>

          {/* Top-left text */}
          <div ref={textRef} className="absolute hidden lg:block top-24 md:top-28 left-20 max-w-xs md:max-w-sm">
            <p className="text-mist/80 text-sm md:text-base leading-relaxed">
              Fii Tu, intr-un spatiu simplu, elegant si creativ. Contribuie la
              povestea noastra, iar impreuna putem redescoperi bucuria de a
              crea si de a fi prezenti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
