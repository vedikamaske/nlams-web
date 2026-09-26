"use client";

import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="footer-section" role="contentinfo">
      <div className="footer-container">

        {/* ── Main 5-Column Grid ─────────────────────────────────────────────── */}
        <div className="footer-grid">

          {/* Column 1: Brand & Emblem */}
          <div className="footer-col footer-col--brand">
            <div className="footer-emblem-wrap">
              <Image
                src="/images/GOI-white.png"
                alt="Government of India Emblem"
                width={56}
                height={68}
                className="footer-emblem-img"
              />
              <div className="footer-brand-titles">
                <h3 className="footer-brand-name">SANKALP</h3>
                <p className="footer-brand-fullname">
                  National Land Acquisition &amp; Management System
                </p>
              </div>
            </div>

            <p className="footer-tagline">
              Digitising Land. Enabling Progress. <br />
              For a Better India.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#about" className="footer-link">About</a></li>
              <li><a href="#platform" className="footer-link">Platform</a></li>
              <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
              <li><a href="#gis-explorer" className="footer-link">GIS Explorer</a></li>
              <li><a href="#resources" className="footer-link">Resources</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Platform</h4>
            <ul className="footer-links-list">
              <li><a href="#land-acq" className="footer-link">Land Acquisition</a></li>
              <li><a href="#workflow" className="footer-link">Workflow Engine</a></li>
              <li><a href="#gis-intelligence" className="footer-link">GIS &amp; Parcel Intelligence</a></li>
              <li><a href="#monitoring" className="footer-link">Monitoring &amp; Analytics</a></li>
              <li><a href="#integrations" className="footer-link">Integrations</a></li>
              <li><a href="#decision-support" className="footer-link">Decision Support</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Resources</h4>
            <ul className="footer-links-list">
              <li><a href="#documentation" className="footer-link">Documentation</a></li>
              <li><a href="#policy" className="footer-link">Policy &amp; Acts</a></li>
              <li><a href="#reports" className="footer-link">Reports</a></li>
              <li><a href="#faq" className="footer-link">FAQs</a></li>
              <li><a href="#support" className="footer-link">Help &amp; Support</a></li>
            </ul>
          </div>

          {/* Column 5: Connect With Us */}
          <div className="footer-col footer-col--social">
            <h4 className="footer-col-heading">Connect With Us</h4>
            <div className="footer-social-icons">
              {/* X (Twitter) */}
              <a href="#x" aria-label="X (Twitter)" className="footer-social-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#linkedin" aria-label="LinkedIn" className="footer-social-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.6 1.6 0 1 0 1.6 1.6c0-.88-.72-1.6-1.6-1.6Z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="#youtube" aria-label="YouTube" className="footer-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Link icon */}
              <a href="#link" aria-label="Official Links" className="footer-social-btn">
                <LinkIcon size={16} />
              </a>
            </div>

            <div className="footer-copyright">
              <p>© 2026 SANKALP Prototype</p>
              <p>All rights reserved.</p>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────────────── */}
        <div className="footer-bottom">
          {/* Left policy links */}
          <div className="footer-bottom-left">
            <a href="#terms" className="footer-bottom-link">Terms of Use</a>
            <span className="footer-divider">|</span>
            <a href="#privacy" className="footer-bottom-link">Privacy Policy</a>
            <span className="footer-divider">|</span>
            <a href="#accessibility" className="footer-bottom-link">Accessibility Statement</a>
            <span className="footer-divider">|</span>
            <a href="#sitemap" className="footer-bottom-link">Sitemap</a>
          </div>

          {/* Right national tags & Indian Flag */}
          <div className="footer-bottom-right">
            <span className="footer-tag">Digital India</span>
            <span className="footer-divider">|</span>
            <span className="footer-tag">Make In India</span>
            <span className="footer-divider">|</span>
            <span className="footer-tag">Jai Hind</span>
            
            <div className="footer-flag-wrap">
              <Image
                src="/images/indian-flag.jpg"
                alt="Indian National Flag"
                width={28}
                height={18}
                className="footer-flag-img"
              />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
