"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const next = total <= 0 ? 0 : (window.scrollY / total) * 100;
      setProgress(Math.max(0, Math.min(100, next)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[rgba(247,240,227,0.64)]">
        <span>Reading progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#d89a2b,#1e8f86)] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
