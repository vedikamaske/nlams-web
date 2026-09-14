"use client";

import { useRef, useEffect, useState } from "react";
import {
  Database,
  FileText,
  Eye,
  Clock,
  GitBranch,
  BarChart3,
} from "lucide-react";
import ChallengeHexagon from "./ChallengeHexagon";

/* ── Challenge data ──────────────────────────────────────────────────────── */
const challenges = [
  {
    title: "Fragmented Data",
    description: "Information exists across disconnected systems.",
    icon: Database,
    accentColor: "#5FE7F2",
    glowColor: "rgba(95,231,242,0.18)",
  },
  {
    title: "Manual Coordination",
    description: "Paper-based processes slow down decisions.",
    icon: FileText,
    accentColor: "#A78BFA",
    glowColor: "rgba(167,139,250,0.18)",
  },
  {
    title: "Limited Visibility",
    description: "No unified view of project and parcel progress.",
    icon: Eye,
    accentColor: "#34D399",
    glowColor: "rgba(52,211,153,0.16)",
  },
  {
    title: "Delays & Bottlenecks",
    description: "Approvals and statutory timelines often get delayed.",
    icon: Clock,
    accentColor: "#FDBA74",
    glowColor: "rgba(253,186,116,0.18)",
  },
  {
    title: "Data Inconsistency",
    description: "Different formats across states and departments.",
    icon: GitBranch,
    accentColor: "#F5C451",
    glowColor: "rgba(245,196,81,0.16)",
  },
  {
    title: "Lack of Real-time Monitoring",
    description: "Decision-makers lack timely, accurate information.",
    icon: BarChart3,
    accentColor: "#60A5FA",
    glowColor: "rgba(96,165,250,0.18)",
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */
export default function ChallengesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLeftVisible(true);
          setTimeout(() => setCardsVisible(true), 180);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="challenges"
      aria-labelledby="challenges-heading"
      className="chal-section"
    >
      {/* ── SVG topographic contour lines ──────────────────────────────── */}
      <svg
        className="chal-bg-svg"
        viewBox="0 0 1440 580"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M-100,60  C200,-30  460,140  780,50  S1160,0  1540,70" />
        <path d="M-100,130 C220,30   500,220  800,110 S1200,55 1540,140" />
        <path d="M-100,200 C200,90   500,310  800,180 S1220,120 1540,215" />
        <path d="M-100,280 C220,160  510,380  810,255 S1230,190 1540,290" />
        <path d="M-100,360 C200,240  500,450  800,320 S1220,260 1540,370" />
        <path d="M-100,440 C220,320  520,510  820,390 S1240,330 1540,450" />
        <path d="M-100,510 C200,395  500,570  800,450 S1220,400 1540,520" />
        <path d="M-100,20  C300,-70  650,190  950,75  S1330,20 1560,90" />
        <path d="M-100,580 C220,465  540,625  850,510 S1260,460 1560,580" />
        <path d="M180,-20  C400,50  700,-20  1020,80 S1380,110 1560,30" />
        <path d="M-100,95  C140,30   400,185  700,100 S1120,50 1440,125" />
        <path d="M0,480    C300,380  620,510  920,415 S1310,365 1560,475" />
      </svg>

      {/* ── Radial glow on the right side ─────────────────────────────── */}
      <div className="chal-bg-glow" aria-hidden="true" />

      {/* ── Main container ────────────────────────────────────────────── */}
      <div className="chal-container">

        {/* LEFT — intro text */}
        <div
          className="chal-left"
          style={{
            opacity: leftVisible ? 1 : 0,
            transform: leftVisible ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <p className="chal-eyebrow" aria-hidden="true">THE CHALLENGE</p>
          <div className="chal-gold-bar" aria-hidden="true" />

          <h2 id="challenges-heading" className="chal-heading">
            Multiple challenges.
            <br />
            A need for a unified
            <br />
            <span className="chal-heading-cyan">solution.</span>
          </h2>

          <p className="chal-body">
            Land acquisition involves multiple authorities, processes and data
            sources, leading to delays, fragmentation and limited transparency.
          </p>

          <div className="chal-quote-block" aria-label="Platform vision">
            <div className="chal-quote-rule" aria-hidden="true" />
            <p className="chal-quote-text">
              &ldquo;A more transparent, efficient
              <br />
              and connected India.&rdquo;
            </p>
          </div>
        </div>

        {/* RIGHT — 3 × 2 pointy-top hexagon grid */}
        <div className="chal-right" aria-label="Key challenges in land acquisition">
          {/* Row 1 */}
          <div className="chal-hex-row">
            {challenges.slice(0, 3).map((c, i) => (
              <ChallengeHexagon
                key={c.title}
                {...c}
                delay={i * 110}
                visible={cardsVisible}
              />
            ))}
          </div>

          {/* Row 2 — honeycomb offset */}
          <div className="chal-hex-row chal-hex-row--offset">
            {challenges.slice(3).map((c, i) => (
              <ChallengeHexagon
                key={c.title}
                {...c}
                delay={330 + i * 110}
                visible={cardsVisible}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
