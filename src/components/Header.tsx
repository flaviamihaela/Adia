"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Use Lenis scroll event if available
    const lenisRoot = document.querySelector("[data-lenis-root]");
    if (lenisRoot) {
      lenisRoot.addEventListener("scroll", handleScroll);
      return () => lenisRoot.removeEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use Lenis if available, otherwise fallback to native scroll
      const lenis = (window as Window & { lenis?: { scrollTo: (element: HTMLElement, options: { offset: number; duration: number }) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: 0, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const navItems = [
    { label: "Acasa", id: "hero" },
    { label: "Proiecte", id: "proiecte" },
    { label: "Despre Noi", id: "despre-noi" },
    { label: "Events", id: "evenimente" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
    <nav className="w-full px-4 md:px-10 py-4 md:py-6">
    <div className="flex items-center justify-between">
        <button
        onClick={() => scrollToSection("hero")}
        className="
            relative
            flex
            items-center
            justify-center
            w-10 md:w-14
            h-10 md:h-14
            overflow-hidden
            ml-3 md:ml-10
            hover:opacity-80
            transition-opacity
        "
        >
        <img
          src="/images/adia.png"
          alt="ADIA logo"
          className="h-[140%] w-[140%] object-cover"
        />
        {/* Vignette overlay - dark edges, bright center */}
        <div className="absolute inset-0 pointer-events-none" 
             style={{
               background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.6) 100%)'
             }}
        />
        </button>

        <ul
        className="
            flex
            items-center
            gap-6 md:gap-8
            ml-auto
            mr-2 md:mr-4 lg:mr-6
        "
        >
        {navItems.map((item) => (
            <li key={item.id}>
            <button
                onClick={() => scrollToSection(item.id)}
                className="
                text-sm md:text-base
                text-mist/70
                hover:text-white
                transition-colors
                uppercase
                tracking-wider
                "
            >
                {item.label}
            </button>
            </li>
        ))}
        </ul>
    </div>
    </nav>


    </header>
  );
}

