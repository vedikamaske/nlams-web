"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Landmark, Check } from "lucide-react";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      aria-label="Join NLAMS Ecosystem"
      className="cta-section"
    >
      <div className="cta-container">
        {/* Banner Card */}
        <div
          className="cta-banner"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Background image */}
          <div className="cta-bg-wrap">
            <Image
              src="/images/CTA-bg.png"
              alt="NLAMS National Land Acquisition Highway Landscape"
              fill
              sizes="(max-width: 1500px) 100vw, 1500px"
              className="cta-bg-img"
              priority
            />
            {/* Dark gradient overlay */}
            <div className="cta-bg-overlay" />
          </div>

          {/* Banner content grid */}
          <div className="cta-content">
            {/* LEFT side: Title, Subtitle, Action Buttons */}
            <div className="cta-left">
              <div className="cta-eyebrow">
                A MORE TRANSPARENT, EFFICIENT AND CONNECTED INDIA
              </div>

              <h2 className="cta-headline">
                Be a part of a smarter <br className="hidden sm:inline" />
                land acquisition ecosystem.
              </h2>

              <p className="cta-subtitle">
                Explore NLAMS and experience a transparent, efficient and
                citizen-centric approach to land acquisition and management.
              </p>

              <div className="cta-actions">
                <a href="#login" className="cta-btn cta-btn--primary">
                  Login to Portal <ArrowRight size={16} />
                </a>

                <a href="#gis" className="cta-btn cta-btn--outline">
                  View GIS Explorer <ArrowRight size={16} />
                </a>

                
              </div>
            </div>


            {/* RIGHT side: Stats Header & Feature Checkmarks */}
            <div className="cta-right">
              {/* Stat box: 28 States & 8 Union Territories */}
              <div className="cta-stat-box">
                <div className="cta-stat-icon">
                  <Landmark size={28} />
                </div>
                <div className="cta-stat-text">
                  <div className="cta-stat-val">28 States</div>
                  <div className="cta-stat-val">8 Union Territories</div>
                </div>
              </div>

              {/* Feature checkmark list */}
              <div className="cta-features">
                <div className="cta-feature-item">
                  <div className="cta-check-icon">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span>Multi-State</span>
                </div>

                <div className="cta-feature-item">
                  <div className="cta-check-icon">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span>Configurable Policies</span>
                </div>

                <div className="cta-feature-item">
                  <div className="cta-check-icon">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span>Interoperable</span>
                </div>

                <div className="cta-feature-item">
                  <div className="cta-check-icon">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span>Scalable for National Deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
