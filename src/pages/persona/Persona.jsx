import React from 'react';
import { motion } from 'framer-motion';
import { PERSONA_SOCIAL_LINKS as SOCIAL_LINKS } from '../../data/social';
import './Persona.css';
import iilmImg from './images.jpg';

export default function Persona() {

  return (
    <section className="persona-editorial-page">
      <div className="persona-editorial-container">

        {/* ─── HERO SECTION: Left Intro, Right College ─── */}
        <div className="persona-hero-editorial-grid">

          {/* Left Column: Intro & Profile */}
          <motion.div
            className="persona-hero-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="persona-hud-eyebrow">
              <span className="hud-badge">PERSONA // 04</span>
              <span className="hud-eyebrow-tag">ENGINEERING MINDSET & PHILOSOPHY</span>
            </div>

            <h1 className="persona-main-title">
              Hi, I'm <span className="title-highlight-name">Sammi</span>
            </h1>

            <div className="persona-bio-text">
              <p>
                4th-year Computer Science undergraduate at <strong className="highlight-text-red">IILM University</strong> — cumulative <strong className="highlight-text-red">CGPA 7.05 / 10</strong>, graduating <strong className="highlight-text-red">August 2027</strong>. Full Stack Developer with hands-on experience building responsive React.js applications and scalable Node.js/Express.js REST APIs.
              </p>
              <p>
                Skilled in MongoDB, MySQL, Git/GitHub, and deploying applications on cloud platforms. Strong collaborator with a problem-solving mindset, currently expanding expertise in Next.js and authentication systems (JWT, OAuth).
              </p>
            </div>

            {/* Micro Tags */}
            <div className="persona-tags-row">
              <span className="persona-tag-pill">Delhi, India</span>
              <span className="persona-tag-pill">IILM University · 2027</span>
              <span className="persona-tag-pill highlight-pill">CGPA: 7.05 / 10</span>
            </div>
          </motion.div>

          {/* Right Column: College (IILM University Showcase Card) */}
          <motion.div
            className="persona-hero-right"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="college-card-editorial">
              {/* Card Topbar */}
              <div className="college-card-topbar">
                <span className="college-badge">EDUCATION</span>
                <span className="college-location-tag">GREATER NOIDA, IN</span>
              </div>

              {/* Campus Photo Preview */}
              <div className="college-photo-frame">
                <div className="doc-crosshair top-left">+</div>
                <div className="doc-crosshair top-right">+</div>
                <div className="doc-crosshair bottom-left">+</div>
                <div className="doc-crosshair bottom-right">+</div>

                <img
                  src={iilmImg}
                  alt="IILM University campus"
                  className="college-campus-img"
                />
                <div className="college-photo-vignette" />
              </div>

              {/* College Details */}
              <div className="college-card-body">
                <div className="college-name-row">
                  <div className="college-logo-badge">IILM</div>
                  <div>
                    <h3 className="college-name">IILM University</h3>
                    <p className="college-degree">B.Tech in Computer Science & Engineering</p>
                  </div>
                </div>

                <div className="college-metrics-row">
                  <div className="metric-col">
                    <span className="col-lbl">TIMELINE</span>
                    <span className="col-val">2023 – 2027</span>
                  </div>
                  <div className="metric-col">
                    <span className="col-lbl">CUMULATIVE CGPA</span>
                    <span className="col-val highlight-val">7.05 / 10</span>
                  </div>
                  <div className="metric-col">
                    <span className="col-lbl">STANDING</span>
                    <span className="col-val">4th Year</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ─── Core Manifest: Large Editorial Statement ─── */}
        <motion.div
          className="persona-statement-box"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="statement-top-meta">
            <span className="statement-meta-badge">CORE PRINCIPLE</span>
            <span className="statement-meta-rule">SIMPLICITY · RESILIENCE · UTILITY</span>
          </div>

          <blockquote className="statement-quote">
            "Build systems that are <span className="statement-highlight">simple to understand</span>, <span className="statement-highlight">hard to break</span>, and <span className="statement-highlight">useful in practice</span>."
          </blockquote>

          <p className="statement-explanation">
            I approach software engineering not as an exercise in adding complexity, but as a discipline of eliminating friction. Whether designing full-stack web platforms or training machine learning classification pipelines, the goal remains the same: clean architectures that deliver real-world precision and reliability.
          </p>
        </motion.div>

        {/* ─── Three Supporting Pillars (01, 02, 03) ─── */}
        <div className="persona-pillars-grid">

          {/* Pillar 01 */}
          <motion.div
            className="persona-pillar-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pillar-header">
              <span className="pillar-num">01</span>
              <span className="pillar-tag">FULL-STACK & SYSTEMS</span>
            </div>
            <h3 className="pillar-title">Clean Boundaries & First Principles</h3>
            <p className="pillar-desc">
              I structure applications with modular boundaries, clean API contracts, and defensive error handling. From React/Vite interfaces to Node/Express and FastAPI servers, code should be self-documenting, maintainable, and built to scale effortlessly.
            </p>
            <div className="pillar-focus-tags">
              <span className="pillar-pill">Modular Architecture</span>
              <span className="pillar-pill">REST & Async APIs</span>
              <span className="pillar-pill">Resilient State</span>
            </div>
          </motion.div>

          {/* Pillar 02 */}
          <motion.div
            className="persona-pillar-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pillar-header">
              <span className="pillar-num">02</span>
              <span className="pillar-tag">AI & APPLIED ML</span>
            </div>
            <h3 className="pillar-title">Pragmatic AI Grounded in Real Data</h3>
            <p className="pillar-desc">
              In artificial intelligence, I prioritize applied models that solve concrete operational challenges over hype. My focus centers on supervised classification pipelines, SMOTE data balancing, anomaly detection, and bridging models directly into production web apps.
            </p>
            <div className="pillar-focus-tags">
              <span className="pillar-pill">Feature Engineering</span>
              <span className="pillar-pill">Classification Pipelines</span>
              <span className="pillar-pill">FastAPI Inference</span>
            </div>
          </motion.div>

          {/* Pillar 03 */}
          <motion.div
            className="persona-pillar-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pillar-header">
              <span className="pillar-num">03</span>
              <span className="pillar-tag">ENGINEERING DISCIPLINE</span>
            </div>
            <h3 className="pillar-title">Continuous Algorithmic Craft</h3>
            <p className="pillar-desc">
              Deep technical competence is built through consistent daily practice. With 350+ solved algorithmic problems and a Top 8% global ranking on LeetCode, I continually sharpen my problem-solving intuition, memory efficiency, and systematic debugging habits.
            </p>
            <div className="pillar-focus-tags">
              <span className="pillar-pill">Algorithmic Rigor</span>
              <span className="pillar-pill">Performance Profiling</span>
              <span className="pillar-pill">Continuous Growth</span>
            </div>
          </motion.div>

        </div>

        {/* ─── Connect Channels (Editorial Link Grid) ─── */}
        <motion.div
          className="persona-connect-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="connect-header-bar">
            <span className="connect-label-tag">NETWORK & CHANNELS</span>
            <span className="connect-status-tag">ACTIVE ONLINE</span>
          </div>

          <div className="connect-links-grid">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="connect-channel-tile"
                style={{ '--channel-color': link.color }}
              >
                <div className="channel-icon-side" style={{ color: link.color }}>
                  {link.icon}
                </div>
                <div className="channel-meta-side">
                  <span className="channel-name">{link.name}</span>
                  <span className="channel-handle">
                    {link.handle.startsWith('@') || link.handle.includes(' ') ? link.handle : `@${link.handle}`}
                  </span>
                </div>
                <div className="channel-arrow">↗</div>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
