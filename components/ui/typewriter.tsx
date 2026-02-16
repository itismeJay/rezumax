"use client"

import { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypeWriter({ text, delay = 80, className = "", onComplete }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, delay, text, onComplete, isComplete]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse" />
      )}
    </span>
  );
}
