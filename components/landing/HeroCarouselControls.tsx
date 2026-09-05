"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroCarouselControlsProps {
  totalSlides?: number;
  activeSlide?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onGoTo?: (index: number) => void;
}

export default function HeroCarouselControls({
  totalSlides = 3,
  activeSlide = 0,
  onPrev,
  onNext,
  onGoTo,
}: HeroCarouselControlsProps) {
  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Slide navigation"
    >
      {/* Pagination dots */}
      <div className="flex items-center gap-1.5 mr-1" role="tablist" aria-label="Slides">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeSlide}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onGoTo?.(i)}
            className={cn(
              "rounded-full transition-all duration-300 cursor-pointer",
              i === activeSlide
                ? "bg-white w-5 h-2"
                : "bg-white/45 w-2 h-2 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Previous button */}
      <button
        onClick={onPrev}
        className={cn(
          "flex items-center justify-center rounded-full border border-white/30",
          "bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-white active:scale-95"
        )}
        style={{ width: 36, height: 36 }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        className={cn(
          "flex items-center justify-center rounded-full",
          "bg-[#0B3A68] hover:bg-[#082D4A] text-white transition-colors cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-white active:scale-95"
        )}
        style={{ width: 36, height: 36 }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
