"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function SectionGP({
  id,
  label,
  title,
  children,
  buttonText,
  buttonUrl,
}: {
  id?: string;
  label: string;
  title: string;
  children?: React.ReactNode;
  buttonText?: string;
  buttonUrl?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <section
      id={id}
      className="
        relative
        min-h-[95vh]
        flex
        items-center
        justify-center
        px-6 md:px-12
        py-16
        bg-[url('/images/2.jpg')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      {/* optional overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-4xl mx-auto text-center text-mist">
        {/* Label */}
        <Reveal>
          <p className="text-xs tracking-wideish uppercase text-mist/70 mb-4">
            {label}
          </p>
        </Reveal>

        {/* Title */}
        <Reveal delay={0.05}>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
            {title}
          </h2>
        </Reveal>

        {/* Content */}
        {children && (
          <Reveal delay={0.1}>
            <div className="text-sm md:text-base text-mist/80 leading-relaxed max-w-2xl mx-auto mb-8">
              {children}
            </div>
          </Reveal>
        )}

        {/* Button */}
        {buttonText && buttonUrl && (
          <Reveal delay={0.15}>
            <a
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
              className="inline-block px-8 py-3 md:px-12 md:py-4 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 backdrop-blur-sm text-mist hover:text-white transition-all duration-300 uppercase tracking-wider text-sm md:text-base font-medium relative"
            >
              {buttonText}
            </a>
          </Reveal>
        )}

        {/* Cursor tooltip */}
        {isHovering && buttonUrl && (
          <div
            className="fixed pointer-events-none z-50 px-3 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded text-white text-xs font-mono"
            style={{
              left: `${mousePosition.x + 15}px`,
              top: `${mousePosition.y + 15}px`,
              transform: "translate(0, 0)",
            }}
          >
            www.ghidulparintelui.online
          </div>
        )}
      </div>
    </section>
  );
}
