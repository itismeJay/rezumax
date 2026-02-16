"use client"

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useScrollReveal({ threshold = 0.1, root = null, rootMargin = "0px" }: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, root: root as any, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin]);

  return { ref, isVisible } as const;
}
