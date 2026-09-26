"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HeroCapabilityBar from "./HeroCapabilityBar";
import HeroCarouselControls from "./HeroCarouselControls";


/* ── Slide data ────────────────────────────────────────────── */
const slides = [
  {
    image: "/images/nlams-hero.png",
    alt: "Aerial view — highway expansion through agricultural fields and villages",
  },
  {
    image: "/images/nlams-hero-2.png",
    alt: "Aerial view — land parcels and rural settlements across the plains",
  },
  {
    image: "/images/nlams-hero-3.png",
    alt: "Aerial view — green agricultural parcels and river basin terrain",
  },
];

const AUTOPLAY_INTERVAL = 8000; // 8 s

export default function SANKALPHero() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setActive(((index % slides.length) + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  /* ── Auto-play ──────────────────────────────────────────── */
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goNext]);

  /* Restart timer on manual navigation */
  const handleManualNav = useCallback(
    (fn: () => void) => {
      if (timerRef.current) clearInterval(timerRef.current);
      fn();
    },
    []
  );

  return (
    <section
      className="relative w-full overflow-hidden min-h-[580px] lg:h-[535px] lg:min-h-0"
      aria-label="SANKALP platform overview — image slider"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── 1. Slide images (stacked, crossfade) ───────────── */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 0 }}
        aria-live="off"
      >
        {slides.map((slide, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            aria-hidden={i !== active}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
      </div>

      {/* ── 2. Gradient overlay — mobile: full coverage vertical gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,30,52,0.96) 0%, rgba(4,36,60,0.88) 50%, rgba(3,30,52,0.96) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ── 3. Gradient overlay — desktop: left dark, transparent right ── */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(3,30,52,0.97) 0%, rgba(4,36,60,0.92) 22%, rgba(4,36,60,0.55) 42%, rgba(4,36,60,0.15) 58%, rgba(4,36,60,0.03) 70%, transparent 82%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ── 4. Carousel controls (desktop) — bottom right ────────────── */}
      <div
        className="absolute bottom-4 right-6 lg:right-10 xl:right-16 hidden lg:flex"
        style={{ zIndex: 10 }}
      >
        <HeroCarouselControls
          totalSlides={slides.length}
          activeSlide={active}
          onPrev={() => handleManualNav(goPrev)}
          onNext={() => handleManualNav(goNext)}
          onGoTo={(i) => handleManualNav(() => goTo(i))}
        />
      </div>

      {/* ── 5. Hero content container ──────────────────────── */}
      <div
        className="relative lg:absolute lg:inset-0 flex flex-col justify-between py-6 sm:py-8 lg:py-0"
        style={{ zIndex: 5 }}
      >
        <div
          className="w-full mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 flex flex-col justify-between h-full"
          style={{ maxWidth: "1500px" }}
        >
          {/* Left content column */}
          <div className="flex flex-col flex-1 gap-2 sm:gap-2.5 pt-2 sm:pt-4 lg:pt-[52px] max-w-full lg:max-w-[640px]">
            {/* Eyebrow */}
            <p
              className="text-white uppercase font-semibold tracking-[0.18em] sm:tracking-[0.32em] text-[10.5px] sm:text-[12px] leading-none whitespace-nowrap"
              aria-label="A Unified National Platform"
            >
              A UNIFIED NATIONAL PLATFORM
            </p>

            {/* Orange accent bar */}
            <div
              className="bg-[#F5A623] rounded-sm mt-3 mb-2 sm:mt-[18px] sm:mb-[14px]"
              style={{ width: 48, height: 4 }}
              aria-hidden="true"
            />

            {/* Headline */}
            <h1
              className="text-white font-extrabold leading-[1.08] sm:leading-[1.02] lg:leading-[1.02] tracking-[-0.01em] text-[30px] sm:text-[42px] lg:text-[52px] xl:text-[52px]"
            >
              One Platform.{" "}
              <br />
              <span className="text-white">Every Parcel.</span>
              
              <span style={{ color: "#6EDFF4" }}> Every Stage.</span>
            </h1>

            {/* Description */}
            <p
              className="text-white/90 sm:text-white/85 leading-relaxed mt-2.5 sm:mt-4 text-[13.5px] sm:text-[15.5px] lg:text-[17px] max-w-full lg:max-w-[600px]"
            >
              Digitising and connecting the complete land acquisition lifecycle {" "}
              from project proposal and land identification to compensation,
              rehabilitation, possession and national monitoring.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 sm:mt-6">
              <Button
                className={cn(
                  "border border-[#3A7DBF]/60 bg-[#0A477D] hover:bg-[#083B6A] text-white",
                  "font-semibold rounded-md gap-2 justify-center",
                  "h-[48px] sm:h-[54px] px-6 text-[14px] sm:text-[14.5px] w-full sm:w-auto sm:min-w-[230px]",
                  "focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
                )}
              >
                Explore the Platform
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>

              <Button
                className={cn(
                  "border border-white/70 bg-white/[0.07] hover:bg-white/[0.14] text-white",
                  "font-semibold rounded-md justify-center",
                  "h-[48px] sm:h-[54px] px-6 text-[14px] sm:text-[14.5px] w-full sm:w-auto sm:min-w-[170px]",
                  "focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
                )}
              >
                Login to Portal
              </Button>
            </div>
          </div>

          {/* Bottom — mobile controls + capability bar */}
          <div className="pt-6 sm:pt-8 pb-3 sm:pb-4 lg:pb-5 flex flex-col gap-3.5 sm:gap-4">
            {/* Mobile carousel controls */}
            <div className="flex lg:hidden items-center justify-between pt-2">
              <span className="text-white/70 text-[11.5px] font-medium tracking-wide">
                Slide {active + 1} of {slides.length}
              </span>
              <HeroCarouselControls
                totalSlides={slides.length}
                activeSlide={active}
                onPrev={() => handleManualNav(goPrev)}
                onNext={() => handleManualNav(goNext)}
                onGoTo={(i) => handleManualNav(() => goTo(i))}
              />
            </div>

            <HeroCapabilityBar />
          </div>
        </div>
      </div>
    </section>
  );
}
