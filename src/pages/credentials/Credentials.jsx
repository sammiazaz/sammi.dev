import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CERTIFICATIONS, ACADEMIC_HONORS, SKILL_BADGES } from '../../data/credentials';
import './Credentials.css';

export default function Credentials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentCert = CERTIFICATIONS[currentIndex];
  const totalCerts = CERTIFICATIONS.length;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalCerts);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalCerts) % totalCerts);
  };

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 25 : -25,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -25 : 25,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section className="credentials-editorial-page">
      <div className="credentials-editorial-container">

        {/* ─── Header Section ─── */}
        <motion.div
          className="credentials-editorial-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="credentials-hud-eyebrow">
            <span className="hud-badge">CREDENTIALS // 03</span>
            <span className="hud-eyebrow-tag">VERIFIED ARCHIVES & HONORS</span>
          </div>
          <h1 className="credentials-main-title">Certifications & Achievements</h1>
          <p className="credentials-lead-desc">
            A verified record of industry-recognized certifications, academic distinctions, and specialized technical competencies.
          </p>
        </motion.div>

        {/* ─── EXACT SPEC SINGLE SHOWCASE BOX ─── */}
        <div className="cert-single-showcase-container">
          <div className="cert-preview-card">
            
            {/* ─── LEFT: Certificate Document Image ─── */}
            <div className="cert-preview-left">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentCert.credentialId || currentIndex}
                  className="cert-doc-viewport"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <img
                    src={currentCert.image}
                    alt={currentCert.title}
                    className="cert-doc-image"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ─── RIGHT: Certificate Details & Controls ─── */}
            <div className="cert-preview-right">
              {/* Top Row: Tags + Arrow Controls */}
              <div className="cert-tags-arrows-row">
                <div className="cert-pills-wrap">
                  {currentCert.skills.map((tag) => (
                    <span key={tag} className="cert-meta-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrows to browse certificates */}
                <div className="cert-arrow-controls">
                  <span className="cert-step-counter">
                    {currentIndex + 1}/{totalCerts}
                  </span>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="cert-arrow-button"
                    aria-label="Previous Certificate"
                    title="Previous"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="cert-arrow-button active-arrow"
                    aria-label="Next Certificate"
                    title="Next"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Animated Main Content */}
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentCert.credentialId || currentIndex}
                  className="cert-details-content"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* Title */}
                  <h2 className="cert-main-heading">{currentCert.title}</h2>

                  {/* Subhead: Issuer (italicized/highlighted) — Date */}
                  <div className="cert-issuer-dateline">
                    <span className="cert-issuer-name">{currentCert.issuer}</span>
                    <span className="cert-dash">—</span>
                    <span className="cert-date-text">{currentCert.date}</span>
                  </div>

                  {/* Description Paragraph */}
                  <p className="cert-summary-paragraph">
                    {currentCert.description}
                  </p>

                  {/* Bottom Row: Shield ID + Verify Certificate Button */}
                  <div className="cert-bottom-action-bar">
                    <div className="cert-id-shield-wrap">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shield-icon">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span className="cert-id-value">{currentCert.credentialId}</span>
                    </div>

                    <a
                      href={currentCert.verifyUrl && currentCert.verifyUrl !== '#' ? currentCert.verifyUrl : 'https://github.com/sammiazaz'}
                      target="_blank"
                      rel="noreferrer"
                      className="cert-verify-action-btn"
                    >
                      <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.2" fill="none" className="ext-link-icon">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      <span>Verify Certificate</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>
        </div>

        {/* ─── ACADEMIC DISTINCTION & VERIFIED COMPETENCIES ─── */}
        <div className="academic-competencies-grid">
          
          {/* Academic Distinction */}
          <motion.div
            className="telemetry-box academic-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="telemetry-box-header">
              <span className="telemetry-box-label">ACADEMIC DISTINCTION</span>
              <span className="telemetry-sub-tag">IILM UNIVERSITY</span>
            </div>

            {ACADEMIC_HONORS.map((item, idx) => (
              <div key={idx} className="academic-content">
                <div className="academic-degree-badge">B.TECH CSE</div>
                <h3 className="academic-degree-title">{item.title}</h3>
                <p className="academic-institution">{item.institution}</p>
                <div className="academic-metrics-row">
                  <div className="metric-pill">
                    <span className="metric-lbl">TENURE</span>
                    <span className="metric-val">{item.year}</span>
                  </div>
                  <div className="metric-pill highlight-pill-card">
                    <span className="metric-lbl">CUMULATIVE CGPA</span>
                    <span className="metric-val highlight-metric">7.05 / 10</span>
                  </div>
                  <div className="metric-pill">
                    <span className="metric-lbl">STANDING</span>
                    <span className="metric-val">4th Year Undergrad</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Verified Competencies */}
          <motion.div
            className="telemetry-box competencies-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="telemetry-box-header">
              <span className="telemetry-box-label">VERIFIED COMPETENCIES</span>
              <span className="telemetry-sub-tag">CORE PROFICIENCIES</span>
            </div>

            <div className="competencies-list">
              {SKILL_BADGES.map((badge, idx) => (
                <div key={idx} className="competency-row">
                  <div className="comp-left">
                    <span className="comp-icon">{badge.icon}</span>
                    <span className="comp-name">{badge.name}</span>
                  </div>
                  <span className={`comp-level-badge level-${badge.level.toLowerCase()}`}>
                    {badge.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
