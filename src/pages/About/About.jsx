import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './About.css';
import CompetitiveJourney from '../../components/CompetitiveJourney/CompetitiveJourney';
import { ACADEMIC_TRANSCRIPT_DATA } from '../../data/academicTranscript';
import locationMapImg from './assets/images/delhi_location_map.png';
import hoverImg1 from './assets/hover_image/iStock-1025313432-2-EDITED-Header_Mobile.jpg';
import hoverImg2 from './assets/hover_image/istockphoto-471052720-612x612.webp';
import hoverImg3 from './assets/hover_image/istockphoto-482557081-612x612.webp';
import hoverImg4 from './assets/hover_image/photo-1548013146-72479768bada.avif';
import hoverImg5 from './assets/hover_image/premium_photo-1661962542692-4fe7a4ad6b54.avif';

const HOVER_IMAGES = [hoverImg1, hoverImg2, hoverImg3, hoverImg4, hoverImg5];

const SEM_POINTS = [
  { sem: 1, label: 'S1', x: 30, spiY: 71, cpiY: 71, spi: 5.85, cpi: 5.85 },
  { sem: 2, label: 'S2', x: 90, spiY: 72, cpiY: 71, spi: 5.80, cpi: 5.83 },
  { sem: 3, label: 'S3', x: 150, spiY: 49, cpiY: 63, spi: 7.13, cpi: 6.31 },
  { sem: 4, label: 'S4', x: 210, spiY: 48, cpiY: 59, spi: 7.19, cpi: 6.57 },
  { sem: 5, label: 'S5', x: 270, spiY: 34, cpiY: 53, spi: 8.03, cpi: 6.93 },
  { sem: 6, label: 'S6', x: 330, spiY: 59, cpiY: 54, spi: 6.56, cpi: 6.86 }
];

export default function About() {
  const { siteTheme, colorMode } = useTheme();
  const isIlian = siteTheme === 'ilian';
  const isLight = colorMode === 'light';
  const spiColor = isIlian ? (isLight ? '#09090b' : '#ffffff') : '#00e5ff';
  const cpiColor = isIlian ? (isLight ? '#71717a' : '#a1a1aa') : '#f59e0b';

  const [indiaHoverIndex, setIndiaHoverIndex] = useState(0);
  const [isIndiaHovered, setIsIndiaHovered] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [activeSemTab, setActiveSemTab] = useState(6);
  const [hoveredSem, setHoveredSem] = useState(null);

  const handleIndiaMouseEnter = () => {
    setIndiaHoverIndex((prev) => (prev + 1) % HOVER_IMAGES.length);
    setIsIndiaHovered(true);
  };

  const handleIndiaMouseLeave = () => {
    setIsIndiaHovered(false);
  };

  return (
    <section className="about-page">
      <div className="about-container">

                {/* ─── PAGE HEADER (Matches Competitive Journey) ─── */}
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="about-header-title">
            About <span className="about-title-highlight">Me</span>
          </h1>
          <p className="about-subtitle">
            A brief overview of who I am, my philosophy, and my coding journey.
          </p>
        </motion.div>

        {/* Main Content Bento Layout */}
        <div className="about-main-wrapper">
          {/* ─── Bento Grid Layout ─── */}
          <div className="bento-layout">
          {/* Top Row: 50% / 50% Split (Location & About) */}
          <div className="bento-top-row">
            {/* Box 1: Location Card */}
            <motion.div
              className={`bento-card bento-location-card ${isIndiaHovered ? 'is-india-hovered' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={handleIndiaMouseEnter}
              onMouseLeave={handleIndiaMouseLeave}
            >
              <div
                className={`location-map-bg ${isIndiaHovered ? 'hover-active' : ''}`}
                style={{
                  backgroundImage: `url(${isIndiaHovered ? HOVER_IMAGES[indiaHoverIndex] : locationMapImg})`
                }}
              />
              <div className="location-overlay" />
              <div className="location-laser-line" />



              <div className="location-info">
                <h2 className="location-country">
                  <span className="highlight-cyan hover-india-btn">INDIA</span>
                </h2>
                <p className="location-coords"><span className="highlight-gold">28.6139° N, 77.2090° E</span></p>
                <p className="location-timezone"><span className="highlight-gold">GMT+5:30</span></p>
              </div>
            </motion.div>

            {/* Box 2: About Bio Card */}
            <motion.div
              className="bento-card bento-bio-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bio-top-tag">/ ABOUT</div>
              <p className="bio-main-p">
                I'm <strong>Sammi</strong> — a CS student at <strong>IILM University</strong>, building at the intersection of full-stack systems and machine learning. I care deeply about clean architecture, meaningful products, and open-source collaboration.
              </p>
              <div className="bio-divider-line" />
              <p className="bio-quote">
                "Where tradition meets technology."
              </p>
            </motion.div>
          </div>

          {/* ─── Academic Trend Banner Card (Placed below Location & About) ─── */}
          <motion.div
            className="bento-card bento-academic-trend-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="academic-left">
              <span className="academic-ref-label">TRANSCRIPT REF · {ACADEMIC_TRANSCRIPT_DATA.refNo}</span>

              <div className="academic-header-row">
                <h3 className="academic-title">ACADEMIC TREND</h3>
                <span className="academic-sem-badge">{ACADEMIC_TRANSCRIPT_DATA.completedSems}/{ACADEMIC_TRANSCRIPT_DATA.totalSems} SEMS</span>
                <button
                  type="button"
                  className="academic-verify-btn"
                  onClick={() => setIsTranscriptOpen(true)}
                  title="View Official University Grade Card Records"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  <span>VERIFY</span>
                </button>
              </div>

              <div className="academic-metric-row">
                <span className="academic-cpi-val">{ACADEMIC_TRANSCRIPT_DATA.overallCgpa.toFixed(2)}</span>
                <span className="academic-cpi-label">CURRENT CPI</span>
              </div>

              <p className="academic-subtext">Consistent growth across 6 sems, peak 8.03 SPI in Sem 5</p>

              <div className="academic-legend-row">
                <div className="academic-legend-item" style={{ color: spiColor }}>
                  <span className="legend-dash spi" style={{ background: spiColor }} />
                  <span>SPI</span>
                </div>
                <div className="academic-legend-item" style={{ color: cpiColor }}>
                  <span className="legend-dash cpi" style={{ background: cpiColor }} />
                  <span>CPI</span>
                </div>
              </div>
            </div>

            <div className="academic-right-chart">
              <svg width="360" height="125" viewBox="0 0 360 125" className="academic-chart-svg">
                <defs>
                  <filter id="glowCyan" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor={spiColor} floodOpacity="0.8" />
                  </filter>
                  <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={cpiColor} floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* IILM - UN Watermark */}
                <text
                  x="225"
                  y="92"
                  textAnchor="middle"
                  fill="rgba(0, 184, 163, 0.05)"
                  fontSize="44"
                  fontWeight="900"
                  fontFamily="sans-serif"
                  letterSpacing="2"
                  className="academic-watermark"
                >
                  IILM - UN
                </text>

                {/* CPI Line */}
                <path
                  d="M 30,71 L 90,71 L 150,63 L 210,59 L 270,53 L 330,54"
                  fill="none"
                  stroke={cpiColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* SPI Line */}
                <path
                  d="M 30,71 L 90,72 L 150,49 L 210,48 L 270,34 L 330,59"
                  fill="none"
                  stroke={spiColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* CPI Data Points */}
                {SEM_POINTS.map((pt) => (
                  <circle
                    key={`cpi-${pt.sem}`}
                    cx={pt.x}
                    cy={pt.cpiY}
                    r={pt.sem === 6 ? 3.2 : 2.6}
                    fill={cpiColor}
                    filter={pt.sem === 6 ? 'url(#glowGold)' : undefined}
                  />
                ))}

                {/* SPI Data Points */}
                {SEM_POINTS.map((pt) => (
                  <circle
                    key={`spi-${pt.sem}`}
                    cx={pt.x}
                    cy={pt.spiY}
                    r={pt.sem === 5 ? 4.2 : 3.2}
                    fill={spiColor}
                    filter={pt.sem === 5 ? 'url(#glowCyan)' : undefined}
                  />
                ))}

                {/* Interactive Click & Hover Targets */}
                {SEM_POINTS.map((pt) => (
                  <g
                    key={`target-${pt.sem}`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredSem(pt)}
                    onMouseLeave={() => setHoveredSem(null)}
                    onClick={() => {
                      setActiveSemTab(pt.sem);
                      setIsTranscriptOpen(true);
                    }}
                  >
                    <circle cx={pt.x} cy={pt.spiY} r="14" fill="transparent" />
                    <text
                      x={pt.x}
                      y="110"
                      textAnchor="middle"
                      fill={hoveredSem?.sem === pt.sem ? (isLight ? '#09090b' : '#ffffff') : (isLight ? '#52525b' : '#666666')}
                      fontSize="11"
                      fontFamily="monospace"
                      fontWeight={hoveredSem?.sem === pt.sem ? '700' : '500'}
                    >
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Floating Tooltip when hovering over semester */}
              {hoveredSem && (
                <div
                  className="academic-chart-tooltip"
                  style={
                    hoveredSem.sem >= 5
                      ? { right: '4px', left: 'auto', transform: 'translateY(-100%)' }
                      : hoveredSem.sem <= 2
                      ? { left: '4px', right: 'auto', transform: 'translateY(-100%)' }
                      : { left: `${(hoveredSem.x / 360) * 100}%`, transform: 'translateX(-50%) translateY(-100%)' }
                  }
                >
                  <span className="tooltip-sem">Sem {hoveredSem.sem}</span>
                  <span className="tooltip-spi">SPI: <strong>{hoveredSem.spi.toFixed(2)}</strong></span>
                  <span className="tooltip-cpi">CPI: <strong>{hoveredSem.cpi.toFixed(2)}</strong></span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── OFFICIAL TRANSCRIPT MODAL ─── */}
      <AnimatePresence>
        {isTranscriptOpen && (
          <motion.div
            className="transcript-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsTranscriptOpen(false)}
          >
            <motion.div
              className="transcript-modal-container"
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="tm-header">
                <div className="tm-header-info">
                  <div className="tm-tag-row">
                    <span className="tm-institution-badge">{ACADEMIC_TRANSCRIPT_DATA.institution}</span>
                    <span className="tm-ref-badge">REF: {ACADEMIC_TRANSCRIPT_DATA.refNo}</span>
                  </div>
                  <h2 className="tm-student-name">{ACADEMIC_TRANSCRIPT_DATA.studentName}</h2>
                  <p className="tm-degree">{ACADEMIC_TRANSCRIPT_DATA.degree}</p>
                </div>

                <div className="tm-header-metrics">
                  <div className="tm-metric-pill highlight">
                    <span className="tm-pill-label">CUMULATIVE CGPA</span>
                    <span className="tm-pill-val">{ACADEMIC_TRANSCRIPT_DATA.overallCgpa.toFixed(2)}</span>
                  </div>
                  <div className="tm-metric-pill">
                    <span className="tm-pill-label">CREDITS EARNED</span>
                    <span className="tm-pill-val">{ACADEMIC_TRANSCRIPT_DATA.totalCreditsEarned}</span>
                  </div>
                  <button
                    type="button"
                    className="tm-close-btn"
                    onClick={() => setIsTranscriptOpen(false)}
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Semester Switcher Tabs */}
              <div className="tm-tabs-bar">
                {ACADEMIC_TRANSCRIPT_DATA.semesters.map((sem) => (
                  <button
                    key={sem.semNumber}
                    type="button"
                    className={`tm-tab-btn ${activeSemTab === sem.semNumber ? 'active' : ''}`}
                    onClick={() => setActiveSemTab(sem.semNumber)}
                  >
                    <span>Sem {sem.semNumber}</span>
                    <span className="tm-tab-sub">SGPA {sem.sgpa.toFixed(2)}</span>
                  </button>
                ))}
                <button
                  type="button"
                  className={`tm-tab-btn ${activeSemTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveSemTab('all')}
                >
                  <span>All Sems</span>
                  <span className="tm-tab-sub">Overview</span>
                </button>
              </div>

              {/* Grade Card Table Body */}
              <div className="tm-body">
                {activeSemTab === 'all' ? (
                  <div className="tm-all-sems-wrapper">
                    {ACADEMIC_TRANSCRIPT_DATA.semesters.map((sem) => (
                      <div key={sem.semNumber} className="tm-sem-block">
                        <div className="tm-sem-block-header">
                          <h3>Semester {sem.semNumber}</h3>
                          <div className="tm-sem-header-stats">
                            <span>Credits: <strong>{sem.totalCredits.toFixed(2)}</strong></span>
                            <span>Credit Pts: <strong>{sem.totalCreditPoints.toFixed(2)}</strong></span>
                            <span className="tm-stat-sgpa">SGPA: <strong>{sem.sgpa.toFixed(2)}</strong></span>
                            <span className="tm-stat-cpi">CPI: <strong>{sem.cpi.toFixed(2)}</strong></span>
                          </div>
                        </div>
                        <div className="tm-table-responsive">
                          <table className="tm-table">
                            <thead>
                              <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Credit</th>
                                <th>Grade</th>
                                <th>Grade Points</th>
                                <th>Credit Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sem.courses.map((course, cIdx) => (
                                <tr key={cIdx}>
                                  <td className="tm-mono-cell">{course.code}</td>
                                  <td className="tm-course-name">{course.name}</td>
                                  <td>{course.credit}</td>
                                  <td>
                                    <span className={`tm-grade-tag grade-${course.grade.replace('+', '-plus')}`}>
                                      {course.grade}
                                    </span>
                                  </td>
                                  <td>{course.gradePoints.toFixed(2)}</td>
                                  <td>{course.creditPoints.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  (() => {
                    const currentSem = ACADEMIC_TRANSCRIPT_DATA.semesters.find((s) => s.semNumber === activeSemTab) || ACADEMIC_TRANSCRIPT_DATA.semesters[0];
                    return (
                      <div className="tm-single-sem-block">
                        <div className="tm-table-responsive">
                          <table className="tm-table">
                            <thead>
                              <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Credit</th>
                                <th>Grade</th>
                                <th>Grade Points</th>
                                <th>Credit Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentSem.courses.map((course, cIdx) => (
                                <tr key={cIdx}>
                                  <td className="tm-mono-cell">{course.code}</td>
                                  <td className="tm-course-name">{course.name}</td>
                                  <td>{course.credit}</td>
                                  <td>
                                    <span className={`tm-grade-tag grade-${course.grade.replace('+', '-plus')}`}>
                                      {course.grade}
                                    </span>
                                  </td>
                                  <td>{course.gradePoints.toFixed(2)}</td>
                                  <td>{course.creditPoints.toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Semester Summary Footer */}
                        <div className="tm-sem-summary-footer">
                          <div className="tm-sum-item">
                            <span className="tm-sum-label">Total Credits</span>
                            <span className="tm-sum-val">{currentSem.totalCredits.toFixed(2)}</span>
                          </div>
                          <div className="tm-sum-item">
                            <span className="tm-sum-label">Total Credit Points</span>
                            <span className="tm-sum-val">{currentSem.totalCreditPoints.toFixed(2)}</span>
                          </div>
                          <div className="tm-sum-item highlight-cyan">
                            <span className="tm-sum-label">Semester SGPA</span>
                            <span className="tm-sum-val">{currentSem.sgpa.toFixed(2)}</span>
                          </div>
                          <div className="tm-sum-item highlight-gold">
                            <span className="tm-sum-label">Cumulative CPI</span>
                            <span className="tm-sum-val">{currentSem.cpi.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>

              {/* Modal Footer */}
              <div className="tm-footer">
                <div className="tm-footer-status">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2cbb5d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  <span>Official University Grade Card Records Verified</span>
                </div>
                <div className="tm-footer-actions">
                  <Link to="/credentials" className="tm-btn-secondary" onClick={() => setIsTranscriptOpen(false)}>
                    View Certificates
                  </Link>
                  <button
                    type="button"
                    className="tm-btn-primary"
                    onClick={() => setIsTranscriptOpen(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Competitive Journey Dashboard ─── */}
      <CompetitiveJourney />
    </div>
  </section>
  );
}

