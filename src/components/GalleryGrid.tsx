"use client";

import { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal";

const items = [
  { src: "/images/mnac.jpg" },
  { src: "/images/feminitate.jpeg" },
  { src: "/images/arta.jpeg" },
  { src: "/images/teatru_carte.jpeg" },
  { src: "/images/tablou_meli.jpeg" },
  { src: "/images/mareabritanie.jpeg" },
  { src: "/images/coroanabrad.jpeg" },
  { src: "/images/stelute.jpeg" },
  { src: "/images/iubireromantica.jpeg" },
  { src: "/images/dana.jpeg" },

  { src: "/images/rochiealbastra.jpeg" },
  { src: "/images/panoupoze.jpeg"},
  { src: "/images/tort.jpeg" },
  { src: "/images/frunze.jpeg" },
  { src: "/images/frunzeumbrela.jpeg" },

  { src: "/images/grup.jpeg" },
  { src: "/images/decernari.jpeg" },
  { src: "/images/andreea.jpeg" },
  { src: "/images/ingeri.jpeg" },
  { src: "/images/noulsediu.jpeg" },

  { src: "/images/colaj.jpeg" },
  { src: "/images/festivalfilmfrancez.jpeg" },
  { src: "/images/luminacalda.jpeg" },
  { src: "/images/scaune.jpeg" },
  { src: "/images/stillstand.jpeg" },

  { src: "/images/fridakahlo1.jpeg" },
  { src: "/images/fridakahlo2.jpeg" },
  { src: "/images/dovleac.jpg" },
  { src: "/images/halloween.jpg" },
  { src: "/images/floareintreflori.jpg" },
];

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (selectedIndex !== null) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const openLightbox = (index: number) => {
    openLightboxWithReset(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      const nextIndex = (selectedIndex + 1) % items.length;
      setSelectedIndex(nextIndex);
      setLightboxLoaded(false);
    }
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      const prevIndex = (selectedIndex - 1 + items.length) % items.length;
      setSelectedIndex(prevIndex);
      setLightboxLoaded(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleLightboxImageLoad = () => {
    setLightboxLoaded(true);
  };

  const openLightboxWithReset = (index: number) => {
    setSelectedIndex(index);
    setLightboxLoaded(false);
    // Preload the image to ensure it's ready for lightbox
    const img = new Image();
    img.src = items[index].src;
    img.onload = () => {
      // Image is ready, but let the actual img element handle the load event
      setTimeout(() => {
        if (selectedIndex === index) {
          setLightboxLoaded(true);
        }
      }, 100);
    };
  };

  // Preload images on hover
  const handleMouseEnter = (index: number) => {
    // Preload the grid image
    if (!preloadedImages.has(index) && !loadedImages.has(index)) {
      const img = new Image();
      img.src = items[index].src;
      img.onload = () => {
        setPreloadedImages((prev) => new Set(prev).add(index));
      };
    }
    
    // Preload adjacent images for smoother lightbox navigation
    const nextIndex = (index + 1) % items.length;
    const prevIndex = (index - 1 + items.length) % items.length;
    
    [nextIndex, prevIndex].forEach((adjIndex) => {
      if (!preloadedImages.has(adjIndex)) {
        const img = new Image();
        img.src = items[adjIndex].src;
        setPreloadedImages((prev) => new Set(prev).add(adjIndex));
      }
    });
  };

  // Intersection Observer for lazy loading optimization
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    containerRefs.current.forEach((container, index) => {
      if (!container) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Preload when image comes into view
              if (!preloadedImages.has(index)) {
                const img = new Image();
                img.src = items[index].src;
                img.onload = () => {
                  setPreloadedImages((prev) => new Set(prev).add(index));
                };
              }
              observer.unobserve(container);
            }
          });
        },
        {
          rootMargin: "50px", // Start loading 50px before entering viewport
          threshold: 0.1,
        }
      );

      observer.observe(container);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [preloadedImages]);

  return (
    <>
      {/* Banner Section */}
      <section className="px-6 md:px-12 pt-12 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="w-full aspect-[16/6] rounded-2xl overflow-hidden bg-mist/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/fondatoarele.jpeg"
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="px-6 md:px-12 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-5 gap-6">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <article
                onClick={() => openLightbox(i)}
                onMouseEnter={() => handleMouseEnter(i)}
                className="group rounded-2xl overflow-hidden bg-mist/5 border border-mist/10 cursor-pointer"
              >
                <div
                  ref={(el) => {
                    containerRefs.current[i] = el;
                  }}
                  className="aspect-[4/5] overflow-hidden relative bg-mist/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                    src={it.src}
                    alt={`Gallery image ${i + 1}`}
                    loading={i < 3 ? "eager" : "lazy"}
                    fetchPriority={i < 3 ? "high" : "auto"}
                    onLoad={() => handleImageLoad(i)}
                    className="h-full w-full object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700"
                  />
                </div>
                <div className="p-4 flex items-center justify-end">
                  <div className="text-xs uppercase tracking-wideish text-mist/60 group-hover:text-mist transition-colors">
                    View
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Blurred background */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Image container */}
          <div
            className="relative z-10 max-w-7xl mx-auto px-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-20 text-white/80 hover:text-white transition-colors text-2xl md:text-4xl"
            >
              ×
            </button>

            {/* Image */}
            <div className="relative">
              {!lightboxLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={`lightbox-${selectedIndex}`}
                src={items[selectedIndex].src}
                alt={`Gallery image ${selectedIndex + 1}`}
                onLoad={handleLightboxImageLoad}
                onError={() => {
                  setLightboxLoaded(true);
                }}
                loading="eager"
                decoding="async"
                className={`max-h-[90vh] w-auto mx-auto object-contain transition-opacity duration-300 ${
                  lightboxLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Navigation buttons */}
            {items.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors text-2xl md:text-4xl"
                >
                  ‹
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors text-2xl md:text-4xl"
                >
                  ›
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedIndex + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
