"use client";

import { ReactNode, useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 600,
}: ScrollRevealProps) {
  // Trigger when section is near the middle of the viewport
  const { ref, isVisible } = useScrollReveal({
    threshold: 0,
    rootMargin: "0px 0px -10% 0px", // relaxed so above-the-fold triggers sooner
  });

  // avoid rendering hidden state on the server — only apply hiding after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(40px)";
      case "down":
        return "translateY(-40px)";
      case "left":
        return "translateX(40px)";
      case "right":
        return "translateX(-40px)";
      case "none":
        return "none";
      default:
        return "translateY(40px)";
    }
  };

  const hidden = mounted ? !isVisible : false;

  return (
    <div
      ref={ref}
      className={cn(className, "reveal", hidden && "reveal--hidden")}
      style={
        {
          // allow per-instance duration/delay via CSS variables
          ["--reveal-duration" as any]: `${duration}ms`,
          ["--reveal-delay" as any]: `${delay}ms`,
          // only apply transform when hidden (client-side) so server output remains visible
          transform: hidden ? getTransform() : "none",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
