"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const element = el.current!;
    gsap.set(element, { opacity: 0, y: 24 });

    const anim = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay]);

  return <div ref={el}>{children}</div>;
}
