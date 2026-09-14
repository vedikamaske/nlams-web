"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

export interface ChallengeHexagonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Icon colour + border accent */
  accentColor: string;
  /** Outer glow rgba colour */
  glowColor: string;
  delay?: number;
  visible?: boolean;
}

/**
 * Pointy-top hexagon challenge card.
 * Background matches the section navy, with an accent-tinted border glow.
 * Orientation: pointy-top → polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)
 */
export default function ChallengeHexagon({
  icon: Icon,
  title,
  description,
  accentColor,
  glowColor,
  delay = 0,
  visible = false,
}: ChallengeHexagonProps) {
  return (
    <div
      className="chex-wrapper"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {/* Ambient outer glow */}
      <div
        className="chex-outer-glow"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 68%)`,
        }}
        aria-hidden="true"
      />

      {/* Hexagon card */}
      <div
        className="chex-card"
        style={
          {
            "--hex-accent": accentColor,
            "--hex-glow": glowColor,
          } as React.CSSProperties
        }
        role="article"
      >
        {/* Top-left gloss shine */}
        <div className="chex-gloss" aria-hidden="true" />

        {/* Content */}
        <div className="chex-content">
          {/* Icon circle */}
          <div
            className="chex-icon-ring"
            style={{ borderColor: `${accentColor}90` }}
            aria-hidden="true"
          >
            <Icon
              className="chex-icon"
              style={{ color: accentColor }}
              aria-hidden="true"
            />
          </div>

          {/* Title */}
          <h3 className="chex-title">{title}</h3>

          {/* Description */}
          <p className="chex-desc">{description}</p>
        </div>
      </div>
    </div>
  );
}
