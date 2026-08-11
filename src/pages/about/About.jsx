import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';
import locationMapImg from '../../assets/images/delhi_location_map.png';
import hoverImg1 from '../../assets/hover_image/iStock-1025313432-2-EDITED-Header_Mobile.jpg';
import hoverImg2 from '../../assets/hover_image/istockphoto-471052720-612x612.webp';
import hoverImg3 from '../../assets/hover_image/istockphoto-482557081-612x612.webp';
import hoverImg4 from '../../assets/hover_image/photo-1548013146-72479768bada.avif';
import hoverImg5 from '../../assets/hover_image/premium_photo-1661962542692-4fe7a4ad6b54.avif';

const HOVER_IMAGES = [hoverImg1, hoverImg2, hoverImg3, hoverImg4, hoverImg5];

const HEATMAP_DATA = Array.from({ length: 364 }, (_, i) => {
  const seed = (i * 37 + 13) % 100;
  if (seed > 88) return 4;
  if (seed > 68) return 3;
  if (seed > 48) return 2;
  if (seed > 28) return 1;
  return 0;
});

const CONTACT_ITEMS = [
  {
    letter: 'C',
    label: 'GitHub',
    href: 'https://github.com/sammiazaz',
    color: '#ffffff',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    )
  },
  {
    letter: 'O',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sammiazazse',
    color: '#0077b5',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    letter: 'N',
    label: 'LeetCode',
    href: 'https://leetcode.com/u/sammiazaz21/',
    color: '#ffa116',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    )
  },
  {
    letter: 'T',
    label: 'Email',
    href: 'mailto:sammi.dev.contact@gmail.com',
    color: '#ea4335',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  },
  {
    letter: 'A',
    label: 'HackerRank',
    href: 'https://hackerrank.com',
    color: '#00ea64',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    )
  },
  {
    letter: 'C',
    label: 'X',
    href: 'https://x.com',
    color: '#e7e9ea',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    letter: 'T',
    label: 'Resume',
    href: '/resume',
    isRouterLink: true,
    color: '#a855f7',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    )
  }
];

export default function About() {
  const [lcData, setLcData] = useState({
    totalSolved: 56,
    totalQuestions: 4017,
    easySolved: 21,
    totalEasy: 958,
    mediumSolved: 31,
    totalMedium: 2098,
    hardSolved: 4,
    totalHard: 961
  });

  const [ghData, setGhData] = useState({
    total: 283,
    heatmap: HEATMAP_DATA.slice(-182)
  });

  const [indiaHoverIndex, setIndiaHoverIndex] = useState(0);
  const [isIndiaHovered, setIsIndiaHovered] = useState(false);

  const handleIndiaMouseEnter = () => {
    setIndiaHoverIndex((prev) => (prev + 1) % HOVER_IMAGES.length);
    setIsIndiaHovered(true);
  };

  const handleIndiaMouseLeave = () => {
    setIsIndiaHovered(false);
  };

  useEffect(() => {
    // Fetch LeetCode Data
    fetch('https://leetcode-stats-api.herokuapp.com/sammiazaz21')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === 'success' && data.totalSolved) {
          setLcData({
            totalSolved: data.totalSolved,
            totalQuestions: data.totalQuestions || 4017,
            easySolved: data.easySolved,
            totalEasy: data.totalEasy || 958,
            mediumSolved: data.mediumSolved,
            totalMedium: data.totalMedium || 2098,
            hardSolved: data.hardSolved,
            totalHard: data.totalHard || 961
          });
        }
      })
      .catch(() => {});

    // Fetch GitHub Contributions Data (Last 6 Months = 182 Days)
    fetch('https://github-contributions-api.jogruber.de/v4/sammiazaz?y=last')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.contributions && data.contributions.length > 0) {
          const levels = data.contributions.slice(-182).map((c) => c.level || 0);
          setGhData({
            total: data.total?.lastYear || 283,
            heatmap: levels
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="about-page">
      <div className="about-container">

        <motion.div
          className="persona-page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="persona-main-title">About</h1>
          <p className="section-description">A brief overview of who I am, my philosophy, and my coding journey.</p>
        </motion.div>

        {/* Main Content Layout with Side Vertical Pill Bar */}
        <div className="about-main-wrapper">
          {/* Vertical Side Bar with 3D Flip Contact tiles */}
          <div className="vertical-side-pill-bar">
            {CONTACT_ITEMS.map((item, idx) => {
              const Content = (
                <div
                  className="side-flip-card"
                  style={{ '--delay-idx': idx, '--item-color': item.color }}
                >
                  <div className="flip-card-inner">
                    {/* Front: Letter Tile */}
                    <div className="flip-front side-letter-tile">
                      {item.letter}
                    </div>
                    {/* Back: Icon Tile */}
                    <div className="flip-back side-icon-tile" style={{ color: item.color }}>
                      {item.icon}
                      <span className="side-tile-tooltip">{item.label}</span>
                    </div>
                  </div>
                </div>
              );

              if (item.isRouterLink) {
                return (
                  <Link key={idx} to={item.href} className="side-card-link">
                    {Content}
                  </Link>
                );
              }

              return (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="side-card-link"
                >
                  {Content}
                </a>
              );
            })}
          </div>

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

          {/* Middle Row: 50% / 50% Split (LeetCode & GitHub Contributions) */}
          <div className="bento-middle-row">
            {/* Box 3: LeetCode Stats */}
            <motion.div
              className="bento-card bento-leetcode-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onClick={() => window.open('https://leetcode.com/u/sammiazaz21/', '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <div className="leetcode-stats-row">
                {/* Left Side: Circular Arc Gauge */}
                <div className="lc-gauge-wrapper">
                  <svg width="150" height="150" viewBox="0 0 150 150" className="lc-gauge-svg">
                    {/* Easy Track Arc (135° to 205°) */}
                    <circle
                      cx="75"
                      cy="75"
                      r="58"
                      fill="none"
                      stroke="#203a37"
                      strokeWidth="4"
                      strokeDasharray="71 364.4"
                      strokeLinecap="round"
                      transform="rotate(135 75 75)"
                    />
                    {/* Easy Solved Arc */}
                    <circle
                      cx="75"
                      cy="75"
                      r="58"
                      fill="none"
                      stroke="#00b8a3"
                      strokeWidth="5"
                      strokeDasharray="14 364.4"
                      strokeLinecap="round"
                      transform="rotate(135 75 75)"
                    />
                    {/* Easy Start Dot */}
                    <circle cx="34" cy="116" r="3.5" fill="#00b8a3" />

                    {/* Medium Track Arc (215° to 305°) */}
                    <circle
                      cx="75"
                      cy="75"
                      r="58"
                      fill="none"
                      stroke="#483c1b"
                      strokeWidth="4"
                      strokeDasharray="91 364.4"
                      strokeLinecap="round"
                      transform="rotate(215 75 75)"
                    />
                    {/* Medium Solved Arc */}
                    <circle
                      cx="75"
                      cy="75"
                      r="58"
                      fill="none"
                      stroke="#ffa116"
                      strokeWidth="5"
                      strokeDasharray="18 364.4"
                      strokeLinecap="round"
                      transform="rotate(215 75 75)"
                    />
                    {/* Medium Start Dot */}
                    <circle cx="27.5" cy="41.7" r="3.5" fill="#ffa116" />

                    {/* Hard Track Arc (315° to 395°) */}
                    <circle
                      cx="75"
                      cy="75"
                      r="58"
                      fill="none"
                      stroke="#482424"
                      strokeWidth="4"
                      strokeDasharray="81 364.4"
                      strokeLinecap="round"
                      transform="rotate(315 75 75)"
                    />
                    {/* Hard Solved Arc */}
                    <circle
                      cx="75"
                      cy="75"
                      r="58"
                      fill="none"
                      stroke="#ef4743"
                      strokeWidth="5"
                      strokeDasharray="8 364.4"
                      strokeLinecap="round"
                      transform="rotate(315 75 75)"
                    />
                    {/* Hard Start Dot */}
                    <circle cx="116" cy="34" r="3.5" fill="#ef4743" />
                  </svg>
                  
                  <div className="lc-gauge-center-content">
                    <div className="lc-main-solved-num">
                      <span className="lc-solved-big">{lcData.totalSolved}</span>
                      <span className="lc-total-slash">/{lcData.totalQuestions || 4017}</span>
                    </div>
                    <div className="lc-solved-status">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#2cbb5d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Solved</span>
                    </div>
                    <div className="lc-attempting-status">
                      0 Attempting
                    </div>
                  </div>
                </div>

                {/* Right Side: Stacked Difficulty Cards */}
                <div className="lc-diff-pills-column">
                  <div className="lc-diff-pill">
                    <span className="lc-pill-label easy">Easy</span>
                    <span className="lc-pill-val"><strong>{lcData.easySolved}</strong><span className="lc-pill-total">/{lcData.totalEasy || 958}</span></span>
                  </div>
                  <div className="lc-diff-pill">
                    <span className="lc-pill-label medium">Med.</span>
                    <span className="lc-pill-val"><strong>{lcData.mediumSolved}</strong><span className="lc-pill-total">/{lcData.totalMedium || 2098}</span></span>
                  </div>
                  <div className="lc-diff-pill">
                    <span className="lc-pill-label hard">Hard</span>
                    <span className="lc-pill-val"><strong>{lcData.hardSolved}</strong><span className="lc-pill-total">/{lcData.totalHard || 961}</span></span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box 4: GitHub Contributions Heatmap */}
            <motion.div
              className="bento-card bento-github-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => window.open('https://github.com/sammiazaz', '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <div className="github-heatmap-header">
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>

              <div className="github-heatmap-grid">
                {ghData.heatmap.map((level, index) => (
                  <div key={index} className={`heatmap-cell level-${level}`} />
                ))}
              </div>

              <div className="github-heatmap-footer">
                <span className="contrib-count"><span className="highlight-gold">{ghData.total}</span> contributions in the last year</span>
                <div className="contrib-legend">
                  <span>Less</span>
                  <span className="legend-cell level-0" />
                  <span className="legend-cell level-1" />
                  <span className="legend-cell level-2" />
                  <span className="legend-cell level-3" />
                  <span className="legend-cell level-4" />
                  <span>More</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: 3 Focus Cards (Growth, Focus, Craft) */}
          <div className="bento-bottom-row">
            {/* Card 1: GROWTH */}
            <motion.div
              className="bento-card bento-focus-card focus-card-growth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h3 className="focus-title growth">GROWTH</h3>
              <p>An explorer of systems, driven by curiosity and understanding.</p>
            </motion.div>

            {/* Card 2: FOCUS */}
            <motion.div
              className="bento-card bento-focus-card focus-card-focus"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="focus-title focus">FOCUS</h3>
              <p>Deep work on efficiency and precision in every layer built.</p>
            </motion.div>

            {/* Card 3: CRAFT */}
            <motion.div
              className="bento-card bento-focus-card focus-card-craft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h3 className="focus-title craft">CRAFT</h3>
              <p>Discipline and dedication in every single line of code.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
