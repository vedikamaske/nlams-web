"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

/* ── Step data ───────────────────────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    badgeColor: "#1B5EC7",
    title: "Project Initiation",
    description:
      "LRB/PIA initiates the land acquisition proposal by filling the form with required details.",
    image: "/images/step-1.png",
    alt: "Step 1 – Project Initiation: Government officers filling a New Proposal form",
  },
  {
    num: "02",
    badgeColor: "#16A34A",
    title: "Document & Data Digitisation",
    description:
      "Digitise and verify documents using AI-powered OCR and data standardisation.",
    image: "/images/step-2.png",
    alt: "Step 2 – Document & Data Digitisation: Scanning documents on a computer",
  },
  {
    num: "03",
    badgeColor: "#1B5EC7",
    title: "Land Identification & GIS Mapping",
    description:
      "Identify land parcels with GIS, satellite imagery and integrated land records.",
    image: "/images/step-3.png",
    alt: "Step 3 – Land Identification & GIS Mapping: GIS map displayed on screen",
  },
  {
    num: "04",
    badgeColor: "#EA580C",
    title: "Scrutiny & Approvals",
    description:
      "Multi-level scrutiny and approvals by concerned authorities with configurable workflows.",
    image: "/images/step-4.png",
    alt: "Step 4 – Scrutiny & Approvals: District Collector reviewing documents",
  },
  {
    num: "05",
    badgeColor: "#DC2626",
    title: "Notification",
    description:
      "Issue notifications to affected stakeholders and publish details on the portal.",
    image: "/images/step-5.png",
    alt: "Step 5 – Notification: Government notification broadcast to stakeholders",
  },
  {
    num: "06",
    badgeColor: "#0D9488",
    title: "Compensation & R&R",
    description:
      "Calculate, disburse compensation and manage rehabilitation & resettlement.",
    image: "/images/step-6.png",
    alt: "Step 6 – Compensation & R&R: Officer handling compensation documents",
  },
  {
    num: "07",
    badgeColor: "#2563EB",
    title: "Possession & Closure",
    description:
      "Handover of land, update records and complete the acquisition process.",
    image: "/images/step-7.png",
    alt: "Step 7 – Possession & Closure: Land handover certificate being signed",
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */
export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef   = useRef<HTMLDivElement>(null);
  const [visible, setVisible]     = useState(false);
  const [canLeft, setCanLeft]     = useState(false);
  const [canRight, setCanRight]   = useState(true);

  /* Entrance animation observer */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Track scroll position to enable / disable nav arrows */
  const syncArrows = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncArrows, { passive: true });
    syncArrows(); // initial state
    return () => el.removeEventListener("scroll", syncArrows);
  }, [syncArrows]);

  /* Scroll by ~2 card widths */
  const scrollBy = (dir: -1 | 1) => {
    stripRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="hiw-heading"
      className="hiw-section"
    >
      <div className="hiw-container">

        {/* Headline + subtitle */}
        <div
          className="hiw-headline-wrap"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.65s ease 0.12s, transform 0.65s ease 0.12s",
          }}
        >
          <h2 id="hiw-heading" className="hiw-headline">
            From proposal to possession 
          </h2>
          <span className="hiw-capsule">A complete digital journey.</span>
        </div>

        {/* ── Carousel: nav arrows + scrollable strip ─────────────────── */}
        <div className="hiw-carousel-wrap">

          {/* LEFT arrow */}
          <button
            className={`hiw-nav-btn hiw-nav-btn--left${canLeft ? "" : " hiw-nav-btn--disabled"}`}
            onClick={() => scrollBy(-1)}
            disabled={!canLeft}
            aria-label="Scroll steps left"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Scrollable strip */}
          <div
            ref={stripRef}
            className="hiw-strip-wrapper"
            role="list"
            aria-label="Land acquisition process steps"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.25s",
            }}
          >
            <div className="hiw-strip">
              {steps.map((step, idx) => (
                <div key={step.num} className="hiw-step-group" role="listitem">
                  {/* Step card — transparent background */}
                  <div
                    className="hiw-card"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(28px)",
                      transition: `opacity 0.55s ease ${0.3 + idx * 0.08}s, transform 0.55s ease ${0.3 + idx * 0.08}s`,
                    }}
                  >
                    {/* Illustration */}
                    <div className="hiw-card-img-wrap">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        sizes="(max-width: 768px) 45vw, 220px"
                        className="hiw-card-img"
                        priority={idx < 2}
                      />
                    </div>

                    {/* Text */}
                    <div className="hiw-card-body">
                      <h3 className="hiw-card-title">{step.title}</h3>
                      <p className="hiw-card-desc">{step.description}</p>
                    </div>
                  </div>

                  {/* Arrow connector between cards */}
                  {idx < steps.length - 1 && (
                    <div className="hiw-arrow" aria-hidden="true">
                      <svg viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0 8h32M26 2l8 6-8 6"
                          stroke="#93A3B8"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT arrow */}
          <button
            className={`hiw-nav-btn hiw-nav-btn--right${canRight ? "" : " hiw-nav-btn--disabled"}`}
            onClick={() => scrollBy(1)}
            disabled={!canRight}
            aria-label="Scroll steps right"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>
        {/* end carousel */}

      </div>

      {/* ── Bottom banner ────────────────────────────────────────────────── */}
      <div className="hiw-banner" aria-label="Process philosophy">
        <div className="hiw-banner-bg" aria-hidden="true">
          <Image
            src="/images/how-it-works-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="hiw-banner-bg-img"
          />
        </div>

        <div
          className="hiw-banner-content"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.8s",
          }}
        >
          {/* Clock icon */}
          <div className="hiw-banner-icon" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="#1B5EC7" strokeWidth="2" />
              <path d="M20 10v10l6 4" stroke="#1B5EC7" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="hiw-banner-text">
            <p className="hiw-banner-title">
              A TRANSPARENT, EFFICIENT AND CITIZEN-CENTRIC PROCESS
            </p>
            <p className="hiw-banner-pills">
              <span>Digitised</span>
              <span className="hiw-dot" aria-hidden="true">·</span>
              <span>Accountable</span>
              <span className="hiw-dot" aria-hidden="true">·</span>
              <span>Time-bound</span>
              <span className="hiw-dot" aria-hidden="true">·</span>
              <span>For a Better India</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
