"use client";

/**
 * FAQSection
 * ──────────
 * Top-centred section heading, then two-column layout:
 *   Left  — FAQ.png illustration only
 *   Right — accordion (all items collapsed by default; click to expand one)
 */

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

/* ── FAQ data ─────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "What is NLAMS?",
    a: "NLAMS (National Land Acquisition & Management System) is a unified national platform that digitises and connects the complete land acquisition lifecycle — from project initiation and land identification to scrutiny, approvals, notification, compensation, rehabilitation & resettlement, possession and closure.",
  },
  {
    q: "How is NLAMS different from existing systems?",
    a: "NLAMS does not replace existing state land-record or departmental systems. Instead, it connects them through a unified workflow and intelligent routing engine, providing a common view of projects, parcels, stakeholders and acquisition progress across jurisdictions.",
  },
  {
    q: "Who can use NLAMS?",
    a: "NLAMS is designed for government authorities and stakeholders involved in land acquisition, including LRBs, PIAs, District Collectors, State Government departments, LAO/CALA officers, R&R authorities and other authorised stakeholders. Access is controlled through role-based permissions.",
  },
  {
    q: "Which projects and acquisition mechanisms are covered?",
    a: "NLAMS can support land acquisition for national and state infrastructure projects such as highways, railways and other major public infrastructure. Its configurable workflows can accommodate different acquisition routes, authorities, state policies and applicable statutory processes.",
  },
  {
    q: "Does NLAMS replace state land-record systems?",
    a: "No. NLAMS works as an integration and coordination layer over existing systems. It can integrate with state land records, BhuNaksha, DILRMP, LACRIS, cadastral maps and other government platforms through secure APIs, while maintaining links to the authoritative source systems.",
  },
  {
    q: "Is the platform secure and compliant with government standards?",
    a: "NLAMS is designed with government-grade security and governance in mind, including role-based access control, authentication, audit trails, secure system integration and controlled data access. The platform architecture can be configured to align with applicable government security, privacy and compliance requirements.",
  },
];

/* ── Accordion item ───────────────────────────────────────────────────────── */
function FaqItem({
  item,
  index,
  open,
  onToggle,
  visible,
}: {
  item: (typeof faqs)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
  visible: boolean;
}) {
  return (
    <div
      className={`faq-item${open ? " faq-item--open" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
        transition: `opacity 0.5s ease ${0.15 + index * 0.07}s, transform 0.5s ease ${0.15 + index * 0.07}s`,
      }}
    >
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-btn-${index}`}
      >
        <span className="faq-question-text">{item.q}</span>
        <span className="faq-icon" aria-hidden="true">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className="faq-answer-wrap"
      >
        <div className="faq-answer-inner">
          <p className="faq-answer">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  /* -1 = all collapsed; set to index to open that item */
  const [openIdx, setOpenIdx] = useState<number>(-1);

  /* Entrance observer */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Toggle: click open item to close it, or open a new one */
  const toggle = useCallback(
    (idx: number) => setOpenIdx((prev) => (prev === idx ? -1 : idx)),
    []
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="faq-section"
    >
      {/* ── Centred section heading ────────────────────────────────────────── */}
      <div
        className="faq-header"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >

        <h2 id="faq-heading" className="hiw-headline faq-headline text-center">
          Frequently Asked Questions
        </h2>
      </div>

      {/* ── Two-column body ───────────────────────────────────────────────── */}
      <div className="faq-container">

        {/* LEFT — illustration only */}
        <div
          className="faq-left"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s",
          }}
          aria-hidden="true"
        >
          <div className="faq-illustration">
            <Image
              src="/images/FAQ.png"
              alt=""
              fill
              sizes="(max-width: 1523px) 70vw, 380px"
              className="faq-illustration-img"
            />
          </div>
        </div>

        {/* RIGHT — accordion */}
        <div className="faq-right" role="list" aria-label="FAQ accordion">
          {faqs.map((item, idx) => (
            <FaqItem
              key={idx}
              item={item}
              index={idx}
              open={openIdx === idx}
              onToggle={() => toggle(idx)}
              visible={visible}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
