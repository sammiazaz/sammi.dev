import React from 'react';
import { motion } from 'framer-motion';
import './Persona.css';
import iilmImg from './images.jpg';

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    handle: "sammiazaz",
    url: "https://github.com/sammiazaz",
    color: "#ffffff",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    )
  },
  {
    name: "LinkedIn",
    handle: "sammiazazse",
    url: "https://linkedin.com/in/sammiazazse",
    color: "#0077b5",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    name: "LeetCode",
    handle: "sammiazaz21",
    url: "https://leetcode.com/u/sammiazaz21/",
    color: "#ffa116",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    )
  },
  {
    name: "Email",
    handle: "sammi.dev.contact",
    url: "mailto:sammi.dev.contact@gmail.com",
    color: "#ea4335",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  },
  {
    name: "HackerRank",
    handle: "your_handle",
    url: "#",
    color: "#00ea64",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    )
  },
  {
    name: "X",
    handle: "your_handle",
    url: "#",
    color: "#e7e9ea",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: "Resume",
    handle: "PDF Resume",
    url: "/resume",
    color: "#a855f7",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    )
  },
  {
    name: "GitLab",
    handle: "your_handle",
    url: "#",
    color: "#fc6d26",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
      </svg>
    )
  }
];

export default function Persona() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="persona-page">
      <div className="persona-container">

        {/* Header */}
        <div className="persona-page-header">
          <p className="who-i-am-label">WHO I AM</p>
          <h1 className="persona-main-title">Persona</h1>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section 1: Intro + Education */}
          <motion.div variants={itemVariants} className="persona-hero-grid">
            {/* Intro */}
            <div className="persona-intro-block">
              <h2 className="section-subheading">Hi, I'm <span className="highlight-cyan">Sammi</span></h2>
              <div className="bio-paragraphs">
                <p>
                  2nd-year <span className="highlight-cyan">Undergrad</span> student at{' '}
                  <span className="highlight-cyan">IILM University</span> — CPI <span className="highlight-gold">8.5 / 10</span>,
                  graduating <span className="highlight-gold">August 2027</span>. I build at the intersection of full-stack engineering and applied ML.
                </p>
                <p>
                  My current focus: developing scalable web applications using React.js and Node.js ecosystems,
                  with a growing interest in integrating machine learning models into practical web solutions.
                  I am passionate about creating clean, accessible user interfaces and robust APIs.
                </p>
              </div>
              <div className="persona-tags-row">
                <span className="persona-pill-tag">Delhi, India</span>
                <span className="persona-pill-tag"><span className="highlight-cyan">IILM University</span> · <span className="highlight-gold">2027</span></span>
              </div>
            </div>

            {/* Education */}
            <div className="persona-education-block">
              <h2 className="section-subheading">Education</h2>
              <div className="education-card-wrapper">
                <div className="education-card-box">
                  <div className="edu-header">
                    <div className="edu-badge">IILM</div>
                    <div className="edu-info">
                      <div className="edu-title-line">
                        <h3>IILM University</h3>
                        <span className="photo-hint">hover for photo</span>
                      </div>
                      <p className="edu-degree">Bachelor of Technology in Computer Science and Engineering</p>
                      <p className="edu-dates">2023 – <span className="highlight-gold">2027</span></p>
                      <div className="edu-cpi-row">
                        <span className="cpi-text">CPI 4TH SEM</span>
                        <span className="cpi-val highlight-gold">8.50</span>
                        <span className="cpi-denom">/ 10</span>
                        <span className="year-badge">2nd Year</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Photo Popover */}
                <div className="photo-popover">
                  <div className="popover-card">
                    <img
                      src={iilmImg}
                      alt="IILM University campus"
                      className="popover-img"
                    />
                    <div className="popover-footer">
                      <span className="popover-inst">IILM University</span>
                      <span className="popover-est">Greater Noida, India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: GitHub Contributions Chart */}
          <motion.div variants={itemVariants} className="persona-section-card github-card">
            <div className="card-top-bar">
              <div className="top-bar-left">
                <span className="cyan-dot-pulse"></span>
                <span className="card-top-title">GitHub Contributions</span>
              </div>
              <a
                href="https://github.com/sammiazaz"
                target="_blank"
                rel="noopener noreferrer"
                className="card-ext-link"
              >
                sammiazaz
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            </div>
            <div className="card-content-body">
              <img
                src="https://ghchart.rshah.org/ffffff/sammiazaz"
                alt="Sammi's GitHub contribution chart"
                className="gh-chart-img"
              />
              <div className="chart-legend">
                <span className="legend-txt">Less</span>
                <span className="legend-box level-1"></span>
                <span className="legend-box level-2"></span>
                <span className="legend-box level-3"></span>
                <span className="legend-box level-4"></span>
                <span className="legend-box level-5"></span>
                <span className="legend-txt">More</span>
              </div>
            </div>
          </motion.div>

          {/* Section 3: LeetCode Activity Chart */}
          <motion.div variants={itemVariants} className="persona-section-card leetcode-card">
            <div className="card-top-bar leetcode-border">
              <div className="top-bar-left">
                <span className="orange-dot-pulse"></span>
                <span className="card-top-title">LeetCode Activity</span>
              </div>
              <a
                href="https://leetcode.com/u/sammiazaz21/"
                target="_blank"
                rel="noopener noreferrer"
                className="card-ext-link orange-hover"
              >
                sammiazaz21
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            </div>
            <div className="card-content-body">
              <div className="leetcode-stats-row">
                <div className="lc-stat-pill">
                  <span className="lc-stat-val">350+</span>
                  <span className="lc-stat-lbl">Problems Solved</span>
                </div>
                <div className="lc-stat-pill">
                  <span className="lc-stat-val">1750+</span>
                  <span className="lc-stat-lbl">Contest Rating</span>
                </div>
                <div className="lc-stat-pill">
                  <span className="lc-stat-val">Top 8%</span>
                  <span className="lc-stat-lbl">Global Ranking</span>
                </div>
              </div>
              <div className="chart-legend">
                <span className="legend-txt">Less</span>
                <span className="legend-box lc-1"></span>
                <span className="legend-box lc-2"></span>
                <span className="legend-box lc-3"></span>
                <span className="legend-box lc-4"></span>
                <span className="legend-box lc-5"></span>
                <span className="legend-txt">More</span>
              </div>
            </div>
          </motion.div>

          {/* Section 4: Support My Work (Sponsors Card) */}
          <motion.div variants={itemVariants} className="support-section">
            <h2 className="section-subheading">Support my work</h2>
            <div className="persona-section-card iframe-sponsor-card">
              <iframe
                src="https://github.com/sponsors/sammiazaz/card"
                title="Sponsor sammiazaz"
                height="225"
                width="600"
                className="sponsor-iframe"
              />
            </div>
          </motion.div>

          {/* Section 5: Find Me On (Social Links Grid) */}
          <motion.div variants={itemVariants} className="socials-section">
            <h2 className="section-subheading">Find me on</h2>
            <div className="socials-grid">
              {SOCIAL_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-item"
                  style={{ '--brand-color': link.color }}
                >
                  <div className="social-icon-wrapper" style={{ color: link.color }}>
                    {link.icon}
                  </div>
                  <div className="social-meta">
                    <div className="social-name">{link.name}</div>
                    <div className="social-handle">{link.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
