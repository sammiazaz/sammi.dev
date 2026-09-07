import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CompetitiveJourney.css';

const DEFAULT_PLATFORMS_DATA = {
  leetcode: {
    name: 'LeetCode',
    totalSolved: 75,
    totalQuestions: 4042,
    easy: { solved: 24, total: 962, pct: '2.5%' },
    medium: { solved: 44, total: 2109, pct: '2.1%' },
    hard: { solved: 7, total: 971, pct: '0.7%' },
    attempting: 1,
    contestRating: '1950',
    highestRating: '1950',
    globalRank: 'Top 3%',
    acceptanceRate: '72.5%',
    streak: {
      days: '120 Day Streak',
      tagline: "Keep it up! You're on fire.",
      longest: '215 Days',
      activeDays: 540,
    },
    badge: {
      count: 1,
      name: '50 Days Badge 2026',
      tag: '50',
      sub: 'DAYS',
    },
  },
  codechef: {
    name: 'CodeChef',
    totalSolved: 285,
    totalQuestions: 1200,
    easy: { solved: 140, total: 400, pct: '35.0%' },
    medium: { solved: 110, total: 500, pct: '22.0%' },
    hard: { solved: 35, total: 300, pct: '11.6%' },
    attempting: 6,
    contestRating: '1724',
    highestRating: '1780',
    globalRank: '3★ Div 2',
    acceptanceRate: '68.4%',
    streak: {
      days: '45 Day Streak',
      tagline: 'Consistent weekend contest competitor.',
      longest: '90 Days',
      activeDays: 210,
    },
    badge: {
      count: 3,
      name: 'Star Coder Division 2',
      tag: '3★',
      sub: 'CODER',
    },
  },
  hackerrank: {
    name: 'HackerRank',
    totalSolved: 195,
    totalQuestions: 600,
    easy: { solved: 85, total: 200, pct: '42.5%' },
    medium: { solved: 80, total: 250, pct: '32.0%' },
    hard: { solved: 30, total: 150, pct: '20.0%' },
    attempting: 4,
    contestRating: 'Gold Badges',
    highestRating: '5 Stars',
    globalRank: 'Top 5%',
    acceptanceRate: '84.2%',
    streak: {
      days: '60 Day Streak',
      tagline: 'Systematic algorithmic drills completed.',
      longest: '110 Days',
      activeDays: 180,
    },
    badge: {
      count: 6,
      name: 'Problem Solving 5 Stars',
      tag: '5★',
      sub: 'GOLD',
    },
  },
  geeksforgeeks: {
    name: 'GeeksforGeeks',
    totalSolved: 340,
    totalQuestions: 1500,
    easy: { solved: 150, total: 500, pct: '30.0%' },
    medium: { solved: 145, total: 700, pct: '20.7%' },
    hard: { solved: 45, total: 300, pct: '15.0%' },
    attempting: 8,
    contestRating: 'Score 1180',
    highestRating: 'Max 1220',
    globalRank: 'Institute 1st',
    acceptanceRate: '76.8%',
    streak: {
      days: '80 Day Streak',
      tagline: 'Problem of the day streak champion.',
      longest: '140 Days',
      activeDays: 320,
    },
    badge: {
      count: 4,
      name: 'POTD 100 Days Badge',
      tag: '100',
      sub: 'DAYS',
    },
  },
};

const LEETCODE_HEATMAP_MONTHS = [
  { name: 'Sep', cols: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]] },
  { name: 'Oct', cols: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]] },
  { name: 'Nov', cols: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]] },
  { name: 'Dec', cols: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]] },
  { name: 'Jan', cols: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]] },
  { name: 'Feb', cols: [[0,0,0,0,0,0,0],[0,0,0,0,0,2,0],[0,0,0,0,0,0,0],[0,0,0,1,0,0,0]] },
  { name: 'Mar', cols: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,2,0,0,0,0]] },
  { name: 'Apr', cols: [[0,1,0,1,2,3,2],[0,2,3,4,3,2,0],[1,0,2,0,0,1,0],[2,1,0,0,0,0,0]] },
  { name: 'May', cols: [[0,0,0,2,0,0,0],[0,0,1,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,2]] },
  { name: 'Jun', cols: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]] },
  { name: 'Jul', cols: [[0,0,0,1,2,0,0],[0,2,0,3,2,1,0],[0,3,2,0,1,2,3],[1,4,2,0,3,0,0]] },
  { name: 'Aug', cols: [[0,2,1,0,2,3,0],[0,0,2,4,3,0,0],[0,2,0,3,4,0,0],[0,3,0,2,0,2,0],[0,0,2,0,0,0,0]] },
];

const PLATFORM_KEYS = [
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'codechef', label: 'CodeChef' },
  { id: 'hackerrank', label: 'HackerRank' },
  { id: 'geeksforgeeks', label: 'GeeksforGeeks' },
];

export default function CompetitiveJourney() {
  const [platformsData, setPlatformsData] = useState(DEFAULT_PLATFORMS_DATA);
  const [activePlatformKey, setActivePlatformKey] = useState('leetcode');

  // Keep exact user-specified profile stats intact
  useEffect(() => {
    // API fallback for live stats
  }, []);

  const data = platformsData[activePlatformKey];

  // LeetCode Gauge Arc Calculations matching reference proportions
  const easyRatio = (data.easy && data.easy.total > 0) ? (data.easy.solved / data.easy.total) : 0;
  const easyArc = Math.max(data.easy?.solved > 0 ? 8 : 0, Math.min(Math.round(easyRatio * 71), 71));

  const medRatio = (data.medium && data.medium.total > 0) ? (data.medium.solved / data.medium.total) : 0;
  const medArc = Math.max(data.medium?.solved > 0 ? 10 : 0, Math.min(Math.round(medRatio * 91), 91));

  const hardRatio = (data.hard && data.hard.total > 0) ? (data.hard.solved / data.hard.total) : 0;
  const hardArc = Math.max(data.hard?.solved > 0 ? 5 : 0, Math.min(Math.round(hardRatio * 81), 81));

  return (
    <section className="competitive-journey-section" id="competitive-journey" aria-labelledby="cj-title">
      <div className="competitive-journey-container">
        
        {/* ─── 1. PAGE HEADER ─── */}
        <motion.div
          className="cj-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 id="cj-title" className="cj-title">
            Competitive <span className="cj-title-highlight">Journey</span>
          </h2>
          <p className="cj-subtitle">
            Tracking my problem-solving consistency, global rankings, and algorithmic growth across coding platforms.
          </p>
        </motion.div>

        {/* ─── 2. MAIN DASHBOARD CONTAINER (Matches Bento Card) ─── */}
        <motion.div
          className="bento-card cj-dashboard-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* A. PLATFORM TABS */}
          <div className="cj-tabs-wrapper">
            <div className="cj-tabs-bar" role="tablist" aria-label="Competitive Coding Platforms">
              {PLATFORM_KEYS.map((plat) => {
                const isActive = activePlatformKey === plat.id;
                return (
                  <button
                    key={plat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`cj-tab-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActivePlatformKey(plat.id)}
                  >
                    {plat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. THREE-COLUMN DASHBOARD CONTENT */}
          <AnimatePresence mode="wait">
            {activePlatformKey === 'leetcode' ? (
              <motion.div
                key="leetcode-layout"
                className="cj-leetcode-layout"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {/* ─── TOP ROW: 2 EQUAL-WIDTH CARDS ─── */}
                <div className="cj-lc-top-row">
                  {/* Top-Left: Stats Gauge & Difficulty Pills */}
                  <div className="cj-lc-stats-card">
                    <div className="leetcode-stats-row">
                      {/* Circular Arc Gauge */}
                      <div className="lc-gauge-wrapper">
                        <svg width="138" height="138" viewBox="0 0 150 150" className="lc-gauge-svg">
                          <defs>
                            <filter id="gaugeGlowEasy" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#00b8a3" floodOpacity="0.6" />
                            </filter>
                            <filter id="gaugeGlowMed" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#ffa116" floodOpacity="0.6" />
                            </filter>
                            <filter id="gaugeGlowHard" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#ef4743" floodOpacity="0.6" />
                            </filter>
                          </defs>

                          {/* Easy Track Arc (135° to 205°) */}
                          <circle
                            cx="75"
                            cy="75"
                            r="58"
                            fill="none"
                            stroke="#203a37"
                            strokeWidth="4.5"
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
                            strokeWidth="4.5"
                            strokeDasharray={`${easyArc} 364.4`}
                            strokeLinecap="round"
                            transform="rotate(135 75 75)"
                            filter="url(#gaugeGlowEasy)"
                          />
                          <circle cx="34" cy="116" r="2.8" fill="#00b8a3" filter="url(#gaugeGlowEasy)" />

                          {/* Medium Track Arc (215° to 305°) */}
                          <circle
                            cx="75"
                            cy="75"
                            r="58"
                            fill="none"
                            stroke="#483c1b"
                            strokeWidth="4.5"
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
                            strokeWidth="4.5"
                            strokeDasharray={`${medArc} 364.4`}
                            strokeLinecap="round"
                            transform="rotate(215 75 75)"
                            filter="url(#gaugeGlowMed)"
                          />
                          <circle cx="27.5" cy="41.7" r="2.8" fill="#ffa116" filter="url(#gaugeGlowMed)" />

                          {/* Hard Track Arc (315° to 395°) */}
                          <circle
                            cx="75"
                            cy="75"
                            r="58"
                            fill="none"
                            stroke="#482424"
                            strokeWidth="4.5"
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
                            strokeWidth="4.5"
                            strokeDasharray={`${hardArc} 364.4`}
                            strokeLinecap="round"
                            transform="rotate(315 75 75)"
                            filter="url(#gaugeGlowHard)"
                          />
                          <circle cx="116" cy="34" r="2.8" fill="#ef4743" filter="url(#gaugeGlowHard)" />
                        </svg>

                        {/* Gauge Center Content */}
                        <div className="lc-gauge-center-content">
                          <div className="lc-main-solved-num">
                            <span className="lc-solved-big">{data.totalSolved}</span>
                            <span className="lc-total-slash">/{data.totalQuestions || 4042}</span>
                          </div>
                          <div className="lc-solved-status">
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#2cbb5d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Solved</span>
                          </div>
                          <div className="lc-attempting-status">
                            {data.attempting || 1} Attempting
                          </div>
                        </div>
                      </div>

                      {/* Stacked Difficulty Pills */}
                      <div className="lc-diff-pills-column">
                        <div className="lc-diff-pill">
                          <span className="lc-pill-label easy">Easy</span>
                          <span className="lc-pill-val">
                            <strong>{data.easy?.solved ?? 24}</strong>
                            <span className="lc-pill-total">/{data.easy?.total ?? 962}</span>
                          </span>
                        </div>
                        <div className="lc-diff-pill">
                          <span className="lc-pill-label medium">Med.</span>
                          <span className="lc-pill-val">
                            <strong>{data.medium?.solved ?? 44}</strong>
                            <span className="lc-pill-total">/{data.medium?.total ?? 2109}</span>
                          </span>
                        </div>
                        <div className="lc-diff-pill">
                          <span className="lc-pill-label hard">Hard</span>
                          <span className="lc-pill-val">
                            <strong>{data.hard?.solved ?? 7}</strong>
                            <span className="lc-pill-total">/{data.hard?.total ?? 971}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top-Center: Contest Rating & Global Rank Card */}
                  <div
                    className="cj-lc-rating-card"
                    onClick={() => window.open('https://leetcode.com/u/sammiazaz21/', '_blank')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="cj-lc-rating-top">
                      <div className="cj-lc-rating-header-left">
                        <span className="cj-lc-badge-label">Contest Rating</span>
                        <div className="cj-lc-rating-val-wrap">
                          <span className="cj-lc-rating-val">{data.contestRating || '1950'}</span>
                          <span className="cj-lc-rating-tag">Knight</span>
                        </div>
                        <span className="cj-lc-rating-sub">Highest: {data.highestRating || '1950'}</span>
                      </div>
                      <div className="cj-metric-icon-box" style={{ width: 38, height: 38 }}>
                        <svg className="cj-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                          <path d="M4 22h16" />
                          <path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34" />
                          <path d="M18 4H6v7a6 6 0 0 0 12 0V4Z" />
                        </svg>
                      </div>
                    </div>

                    <div className="cj-lc-rating-bottom">
                      <div className="cj-lc-rank-item">
                        <span className="cj-lc-badge-label">Global Rank</span>
                        <span className="cj-lc-rank-val">{data.globalRank || 'Top 3%'}</span>
                      </div>
                      <div className="cj-lc-rank-divider" />
                      <div className="cj-lc-rank-item">
                        <span className="cj-lc-badge-label">Acceptance</span>
                        <span className="cj-lc-rank-val">{data.acceptanceRate || '72.5%'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top-Right: Badges Card */}
                  <div
                    className="cj-lc-badges-card"
                    onClick={() => window.open('https://leetcode.com/u/sammiazaz21/', '_blank')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="cj-lc-badge-top">
                      <div className="cj-lc-badge-count-wrap">
                        <span className="cj-lc-badge-label">Badges</span>
                        <span className="cj-lc-badge-count">{data.badge?.count || 1}</span>
                      </div>
                      <div className="cj-lc-badge-arrow" aria-label="View Badges">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>

                    {/* Center Hexagon Badge Visual */}
                    <div className="cj-lc-badge-visual">
                      <svg width="105" height="105" viewBox="0 0 100 100" className="cj-lc-badge-svg">
                        <defs>
                          <linearGradient id="badgeHexBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2c2f38" />
                            <stop offset="100%" stopColor="#14151a" />
                          </linearGradient>
                          <linearGradient id="badgeHexBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8e95a5" />
                            <stop offset="50%" stopColor="#3a3e4a" />
                            <stop offset="100%" stopColor="#7a8190" />
                          </linearGradient>
                          <radialGradient id="badgeGreenSphere" cx="38%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#86efac" />
                            <stop offset="40%" stopColor="#22c55e" />
                            <stop offset="85%" stopColor="#15803d" />
                            <stop offset="100%" stopColor="#052e16" />
                          </radialGradient>
                        </defs>
                        <polygon
                          points="50,6 88,28 88,72 50,94 12,72 12,28"
                          fill="url(#badgeHexBg)"
                          stroke="url(#badgeHexBorder)"
                          strokeWidth="3.5"
                          strokeLinejoin="round"
                        />
                        <polygon
                          points="50,11 83,30 83,70 50,89 17,70 17,30"
                          fill="none"
                          stroke="rgba(0,0,0,0.5)"
                          strokeWidth="2"
                        />
                        <circle cx="65" cy="51" r="16.5" fill="url(#badgeGreenSphere)" />
                        <path
                          d="M26,38 L48,38 A15,15 0 0,1 63,53 A15,15 0 0,1 48,68 L28,68"
                          fill="none"
                          stroke="#d1d5db"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="43" cy="53" r="13" fill="none" stroke="#9ca3af" strokeWidth="2.5" />
                        <rect x="20" y="47" width="21" height="11" rx="2" fill="#14151a" stroke="#4b5563" strokeWidth="1" />
                        <text x="30.5" y="55" fontSize="5.5" fontWeight="800" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">DAYS</text>
                      </svg>
                    </div>

                    <div className="cj-lc-badge-footer">
                      <span className="cj-lc-badge-recent-label">Most Recent Badge</span>
                      <span className="cj-lc-badge-recent-title">{data.badge?.name || '50 Days Badge 2026'}</span>
                    </div>
                  </div>
                </div>

                {/* ─── BOTTOM ROW: FULL-WIDTH SUBMISSIONS HEATMAP CARD ─── */}
                <div className="cj-lc-heatmap-card">
                  <div className="cj-lc-hm-header">
                    <div className="cj-lc-hm-title-group">
                      <span className="cj-lc-hm-total-bold">{data.totalSolved || 95}</span>
                      <span className="cj-lc-hm-total-text">submissions in the past one year</span>
                      <span className="cj-lc-hm-info-icon" title="Submissions recorded over trailing 12 months">ⓘ</span>
                    </div>

                    <div className="cj-lc-hm-meta-group">
                      <span className="cj-lc-hm-meta">Total active days: <strong>{data.streak?.activeDays || 61}</strong></span>
                      <span className="cj-lc-hm-meta">Max streak: <strong>{data.streak?.longest || '11'}</strong></span>
                      <div className="cj-lc-hm-filter-pill">
                        <span>Current</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Contribution Matrix */}
                  <div className="cj-lc-hm-matrix-wrapper">
                    <div className="cj-lc-hm-months-row">
                      {LEETCODE_HEATMAP_MONTHS.map((m, mIdx) => (
                        <div key={mIdx} className="cj-lc-hm-month-col">
                          <div className="cj-lc-hm-month-grid">
                            {m.cols.map((col, cIdx) => (
                              <div key={cIdx} className="cj-lc-hm-day-col">
                                {col.map((lvl, rIdx) => (
                                  <div
                                    key={rIdx}
                                    className={`cj-hm-cell level-${lvl}`}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                          <span className="cj-lc-hm-month-name">{m.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* 3-Column Bento Content for other platforms */
              <motion.div
                key={activePlatformKey}
                className="cj-bento-grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {/* COLUMN 1: PLATFORM OVERVIEW */}
                <div className="cj-col cj-leetcode-card">
                  <div className="cj-overview-header">
                    <div className="cj-overview-title-wrap">
                      <span className="cj-indicator-bar" />
                      <span className="cj-overview-heading">{data.name} Overview</span>
                    </div>
                    <span className="cj-overview-count-ratio">
                      {data.totalSolved}
                      <span className="cj-ratio-total">/{data.totalQuestions}</span>
                    </span>
                  </div>

                  <div className="leetcode-stats-row">
                    <div className="lc-gauge-wrapper">
                      <svg width="155" height="155" viewBox="0 0 150 150" className="lc-gauge-svg">
                        <defs>
                          <filter id="gaugeGlowEasy2" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#00b8a3" floodOpacity="0.5" />
                          </filter>
                          <filter id="gaugeGlowMed2" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#ffa116" floodOpacity="0.5" />
                          </filter>
                          <filter id="gaugeGlowHard2" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#ef4743" floodOpacity="0.5" />
                          </filter>
                        </defs>
                        <circle cx="75" cy="75" r="58" fill="none" stroke="rgba(0, 184, 163, 0.16)" strokeWidth="4" strokeDasharray="71 364.4" strokeLinecap="round" transform="rotate(135 75 75)" />
                        <circle cx="75" cy="75" r="58" fill="none" stroke="#00b8a3" strokeWidth="5" strokeDasharray={`${easyArc} 364.4`} strokeLinecap="round" transform="rotate(135 75 75)" filter="url(#gaugeGlowEasy2)" />
                        <circle cx="34" cy="116" r="3.2" fill="#00b8a3" filter="url(#gaugeGlowEasy2)" />

                        <circle cx="75" cy="75" r="58" fill="none" stroke="rgba(255, 192, 30, 0.16)" strokeWidth="4" strokeDasharray="91 364.4" strokeLinecap="round" transform="rotate(215 75 75)" />
                        <circle cx="75" cy="75" r="58" fill="none" stroke="#ffa116" strokeWidth="5" strokeDasharray={`${medArc} 364.4`} strokeLinecap="round" transform="rotate(215 75 75)" filter="url(#gaugeGlowMed2)" />
                        <circle cx="27.5" cy="41.7" r="3.2" fill="#ffa116" filter="url(#gaugeGlowMed2)" />

                        <circle cx="75" cy="75" r="58" fill="none" stroke="rgba(239, 71, 67, 0.16)" strokeWidth="4" strokeDasharray="81 364.4" strokeLinecap="round" transform="rotate(315 75 75)" />
                        <circle cx="75" cy="75" r="58" fill="none" stroke="#ef4743" strokeWidth="5" strokeDasharray={`${hardArc} 364.4`} strokeLinecap="round" transform="rotate(315 75 75)" filter="url(#gaugeGlowHard2)" />
                        <circle cx="116" cy="34" r="3.2" fill="#ef4743" filter="url(#gaugeGlowHard2)" />
                      </svg>
                      <div className="lc-gauge-center-content">
                        <div className="lc-main-solved-num">
                          <span className="lc-solved-big">{data.totalSolved}</span>
                          <span className="lc-total-slash">/{data.totalQuestions}</span>
                        </div>
                        <div className="lc-solved-status">
                          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#2cbb5d" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Solved</span>
                        </div>
                        <div className="lc-attempting-status">{data.attempting || 0} Attempting</div>
                      </div>
                    </div>

                    <div className="lc-diff-pills-column">
                      <div className="lc-diff-pill">
                        <span className="lc-pill-label easy">Easy</span>
                        <span className="lc-pill-val"><strong>{data.easy?.solved ?? 0}</strong><span className="lc-pill-total">/{data.easy?.total ?? 0}</span></span>
                      </div>
                      <div className="lc-diff-pill">
                        <span className="lc-pill-label medium">Med.</span>
                        <span className="lc-pill-val"><strong>{data.medium?.solved ?? 0}</strong><span className="lc-pill-total">/{data.medium?.total ?? 0}</span></span>
                      </div>
                      <div className="lc-diff-pill">
                        <span className="lc-pill-label hard">Hard</span>
                        <span className="lc-pill-val"><strong>{data.hard?.solved ?? 0}</strong><span className="lc-pill-total">/{data.hard?.total ?? 0}</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: PERFORMANCE STATS */}
                <div className="cj-col cj-metrics-stack">
                  <div className="cj-metric-item">
                    <div className="cj-metric-icon-box">
                      <svg className="cj-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34" />
                        <path d="M18 4H6v7a6 6 0 0 0 12 0V4Z" />
                      </svg>
                    </div>
                    <div className="cj-metric-text">
                      <span className="cj-metric-label">Contest Rating</span>
                      <span className="cj-metric-sub">Highest: {data.highestRating}</span>
                    </div>
                    <span className="cj-metric-badge">{data.contestRating}</span>
                  </div>

                  <div className="cj-metric-item">
                    <div className="cj-metric-icon-box">
                      <svg className="cj-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <div className="cj-metric-text">
                      <span className="cj-metric-label">Global Rank</span>
                      <span className="cj-metric-sub">Competitive Standings</span>
                    </div>
                    <span className="cj-metric-badge">{data.globalRank}</span>
                  </div>

                  <div className="cj-metric-item">
                    <div className="cj-metric-icon-box">
                      <svg className="cj-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <div className="cj-metric-text">
                      <span className="cj-metric-label">Problems Solved</span>
                      <span className="cj-metric-sub">Completed Challenges</span>
                    </div>
                    <span className="cj-metric-badge">{data.totalSolved}</span>
                  </div>

                  <div className="cj-metric-item">
                    <div className="cj-metric-icon-box">
                      <svg className="cj-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                    </div>
                    <div className="cj-metric-text">
                      <span className="cj-metric-label">Acceptance Rate</span>
                      <span className="cj-metric-sub">Submission Accuracy</span>
                    </div>
                    <span className="cj-metric-badge">{data.acceptanceRate}</span>
                  </div>
                </div>

                {/* COLUMN 3: STREAK & ACHIEVEMENTS */}
                <div className="cj-col cj-streaks-col">
                  <div className="cj-streak-banner">
                    <div className="cj-streak-flame-icon">
                      <svg className="cj-flame-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="cj-streak-text">
                      <span className="cj-streak-title">{data.streak.days}</span>
                      <span className="cj-streak-sub">{data.streak.tagline}</span>
                    </div>
                    <span className="cj-streak-arrow">→</span>
                  </div>

                  <div className="cj-mini-stats-row">
                    <div className="cj-mini-stat-card">
                      <div className="cj-mini-stat-header">
                        <svg className="cj-mini-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                        <span className="cj-mini-stat-title">Longest Streak</span>
                      </div>
                      <span className="cj-mini-stat-val">{data.streak.longest}</span>
                    </div>

                    <div className="cj-mini-stat-card">
                      <div className="cj-mini-stat-header">
                        <svg className="cj-mini-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span className="cj-mini-stat-title">Active Days</span>
                      </div>
                      <span className="cj-mini-stat-val">{data.streak.activeDays}</span>
                    </div>
                  </div>

                  <div className="cj-badges-card">
                    <div className="cj-badge-header">
                      <span className="cj-badge-title">Badges & Accolades</span>
                      <span className="cj-badge-total-num">{data.badge.count}</span>
                    </div>
                    <div className="cj-badge-content">
                      <div className="cj-badge-icon-wrap">
                        <svg className="cj-badge-hex-svg" viewBox="0 0 100 100">
                          <polygon
                            points="50 3, 90 25, 90 75, 50 97, 10 75, 10 25"
                            className="cj-badge-poly"
                          />
                        </svg>
                        <div className="cj-badge-inner-text">
                          <span className="cj-badge-tag">{data.badge.tag}</span>
                          <span className="cj-badge-tag-sub">{data.badge.sub}</span>
                        </div>
                      </div>
                      <div className="cj-badge-details">
                        <span className="cj-badge-active-name">{data.badge.name}</span>
                        <span className="cj-badge-status">
                          <span className="cj-pulse-dot" /> Verified Platform Credential
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
}
