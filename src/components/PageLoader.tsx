"use client";

import { useEffect, useState } from "react";
import { ensureGsap } from "@/lib/gsap";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { gsap } = ensureGsap();

    // List of all images to preload
    const imagesToLoad = [
      "/images/6.jpg", // Hero background
      "/images/10.jpg", // Center tile
      "/images/11.jpg", // Left tile
      "/images/12.jpg", // Top-right tile
      "/images/13.jpg", // Bottom-right tile
      "/images/adia-removebg-preview.png", // Logo
      "/images/4.jpg", // SectionGP background
      "/images/1.jpg", // Gallery images
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
    ];

    // Preload all images
    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve even on error to not block loading
        img.src = src;
      });
    };

    // Wait for all images to load (or timeout after 5 seconds)
    const loadAllImages = async () => {
      try {
        await Promise.all([
          Promise.all(imagesToLoad.map(loadImage)),
          new Promise((resolve) => setTimeout(resolve, 500)), // Minimum 500ms for smooth UX
        ]);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        // Fade out loader
        gsap.to(".page-loader", {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            setIsLoading(false);
          },
        });
      }
    };

    // Start loading with a timeout fallback (max 5 seconds)
    const timeout = setTimeout(() => {
      if (isLoading) {
        gsap.to(".page-loader", {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            setIsLoading(false);
          },
        });
      }
    }, 5000);

    loadAllImages();

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="page-loader fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-mist/60 text-sm tracking-wider uppercase">Loading</p>
      </div>
    </div>
  );
}

