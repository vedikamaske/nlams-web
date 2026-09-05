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

export default function NLAMSHero() {
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
      className="relative w-full overflow-hidden"
      style={{ height: "535px" }}
      aria-label="NLAMS platform overview — image slider"
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

      {/* ── 2. Gradient overlay — dark left, transparent right ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(3,30,52,0.97) 0%, rgba(4,36,60,0.92) 22%, rgba(4,36,60,0.55) 42%, rgba(4,36,60,0.15) 58%, rgba(4,36,60,0.03) 70%, transparent 82%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ── 5. Carousel controls — bottom right ────────────── */}
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

      {/* ── 6. Hero text content ───────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{ zIndex: 5 }}
      >
        <div
          className="w-full mx-auto px-6 lg:px-16 xl:px-20 flex flex-col h-full"
          style={{ maxWidth: "1500px" }}
        >
          {/* Left content column */}
          <div className="flex flex-col flex-1 gap-2.5 pt-[52px]" style={{ maxWidth: "640px" }}>
            {/* Eyebrow */}
            <p
              className="text-white uppercase font-medium tracking-[0.38em] text-[12px] leading-none"
              aria-label="A Unified National Platform"
            >
              A&nbsp; U N I F I E D&nbsp; N A T I O N A L&nbsp; P L A T F O R M
            </p>

            {/* Orange accent bar */}
            <div
              className="bg-[#F5A623] rounded-sm mt-[18px] mb-[14px]"
              style={{ width: 50, height: 4 }}
              aria-hidden="true"
            />

            {/* Headline */}
            <h1
              className="text-white font-extrabold leading-[1.02] tracking-[-0.01em]"
              style={{ fontSize: "clamp(40px, 3.6vw, 56px)" }}
            >
              One Platform.
              <br />
              <span className="text-white">Every Parcel.&nbsp;</span>
              <span style={{ color: "#6EDFF4" }}>Every Stage.</span>
            </h1>

            {/* Description */}
            <p
              className="text-white/85 leading-relaxed mt-4"
              style={{ fontSize: "clamp(15px, 1.2vw, 17.5px)", maxWidth: "600px" }}
            >
              Digitising and connecting the complete land acquisition lifecycle {" "}
              from project proposal and land identification to compensation,
              rehabilitation, possession and national monitoring.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Button
                className={cn(
                  "border border-[#3A7DBF]/60 bg-[#0A477D] hover:bg-[#083B6A] text-white",
                  "font-semibold rounded-md gap-2",
                  "focus-visible:outline-2 focus-visible:outline-white"
                )}
                style={{ height: "54px", minWidth: "248px", fontSize: "14.5px" }}
              >
                Explore the Platform
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>

              <Button
                className={cn(
                  "border border-white/70 bg-white/[0.07] hover:bg-white/[0.14] text-white",
                  "font-semibold rounded-md",
                  "focus-visible:outline-2 focus-visible:outline-white"
                )}
                style={{ height: "54px", minWidth: "188px", fontSize: "14.5px" }}
              >
                Login to Portal
              </Button>
            </div>
          </div>

          {/* Bottom — capability bar */}
          <div className="pb-5">
            <HeroCapabilityBar />
          </div>
        </div>
      </div>

      {/* ── Mobile carousel controls ──────────────────────── */}
      <div
        className="lg:hidden absolute bottom-4 left-0 right-0 flex justify-center"
        style={{ zIndex: 6 }}
      >
        <HeroCarouselControls
          totalSlides={slides.length}
          activeSlide={active}
          onPrev={() => handleManualNav(goPrev)}
          onNext={() => handleManualNav(goNext)}
          onGoTo={(i) => handleManualNav(() => goTo(i))}
        />
      </div>
    </section>
  );
}
