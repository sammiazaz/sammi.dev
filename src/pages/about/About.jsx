import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';
import { HEATMAP_DATA } from '../../data/about';
import locationMapImg from '../../assets/images/delhi_location_map.png';
import hoverImg1 from '../../assets/hover_image/iStock-1025313432-2-EDITED-Header_Mobile.jpg';
import hoverImg2 from '../../assets/hover_image/istockphoto-471052720-612x612.webp';
import hoverImg3 from '../../assets/hover_image/istockphoto-482557081-612x612.webp';
import hoverImg4 from '../../assets/hover_image/photo-1548013146-72479768bada.avif';
import hoverImg5 from '../../assets/hover_image/premium_photo-1661962542692-4fe7a4ad6b54.avif';

const HOVER_IMAGES = [hoverImg1, hoverImg2, hoverImg3, hoverImg4, hoverImg5];

const PILLARS = [
  {
    num: '01',
    title: 'Architecture & Craft',
    desc: 'Prioritizing clean separation of concerns, defensive programming, and code that is clear, scalable, and easy to maintain.',
    badge: 'Core Philosophy'
  },
  {
    num: '02',
    title: 'Security by Default',
    desc: 'Designing zero-knowledge architectures, client-side encryption (AES-256), and safe identity handling at the ground level.',
    badge: 'Security Focus'
  },
  {
    num: '03',
    title: 'Intelligent Systems',
    desc: 'Training machine learning models and supervised classifiers (XGBoost, Random Forest) to solve real-world detection challenges.',
    badge: 'ML & AI'
  }
];

const DOMAINS = [
  {
    title: 'Frontend Engineering',
    tag: 'Web & UI',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Framer Motion', 'TailwindCSS', 'CSS3 Architecture'],
    desc: 'Building responsive, accessible web interfaces with rich micro-animations, glassmorphism, and performance-first rendering.'
  },
  {
    title: 'Backend & APIs',
    tag: 'Systems',
    skills: ['Python', 'FastAPI', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Docker', 'REST APIs'],
    desc: 'Architecting robust server-side services, database persistence layers, authentication flows, and containerized deployments.'
  },
  {
    title: 'Machine Learning',
    tag: 'AI & Data',
    skills: ['Scikit-Learn', 'XGBoost', 'SMOTE', 'Pandas', 'NumPy', 'TF-IDF', 'Classification Pipelines'],
    desc: 'Data preprocessing, feature engineering, and deploying predictive ML models for anomaly detection and automated intelligence.'
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
      .catch(() => { });

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
      .catch(() => { });
  }, []);

  return (
    <section className="about-page" aria-labelledby="about-title">
      <main className="about-container">

        {/* ─── Page Header ─── */}
        <header className="persona-page-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 id="about-title" className="persona-main-title">
              About <span className="title-work-muted">Philosophy</span>
            </h1>
            <p className="section-description">
              An overview of my engineering principles, real-time developer activity, and core technical domains.
            </p>
          </motion.div>
        </header>

        {/* ─── Section 1: Split Story (Bio / Location + Engineering Pillars) ─── */}
        <div className="ab-split-story-grid">

          {/* Left: Bio & Origin Card */}
          <motion.article
            className="ab-card ab-bio-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="ab-bio-header">
              <div className="ab-avatar-badge">SA</div>
              <div>
                <h2 className="ab-bio-name">Sammi Azaz</h2>
                <p className="ab-bio-role">CS Undergrad @ IILM University</p>
              </div>
            </div>

            <p className="ab-bio-text">
              I am a software engineer focused on architecting resilient web platforms, zero-knowledge privacy systems, and practical machine learning solutions. I care deeply about craftsmanship, elegant system design, and building software that respects user trust.
            </p>

            {/* Interactive Location Sub-Card */}
            <div
              className={`ab-location-subcard ${isIndiaHovered ? 'hover-active' : ''}`}
              onMouseEnter={handleIndiaMouseEnter}
              onMouseLeave={handleIndiaMouseLeave}
            >
              <div
                className="ab-map-bg"
                style={{ backgroundImage: `url(${isIndiaHovered ? HOVER_IMAGES[indiaHoverIndex] : locationMapImg})` }}
              />
              <div className="ab-map-overlay" />
              <div className="ab-map-info">
                <span className="ab-map-tag">📍 Based in</span>
                <h3 className="ab-map-city">Delhi, India</h3>
                <span className="ab-map-coords">28.6139° N, 77.2090° E • GMT+5:30</span>
              </div>
            </div>
          </motion.article>

          {/* Right: 3 Core Engineering Pillars */}
          <div className="ab-pillars-column">
            {PILLARS.map((p, idx) => (
              <motion.div
                key={idx}
                className="ab-card ab-pillar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="ab-pillar-top">
                  <span className="ab-pillar-num">{p.num}</span>
                  <span className="ab-pillar-badge">{p.badge}</span>
                </div>
                <h3 className="ab-pillar-title">{p.title}</h3>
                <p className="ab-pillar-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ─── Section 2: Real-time Developer Metrics (LeetCode & GitHub) ─── */}
        <div className="ab-metrics-grid">

          {/* LeetCode Live Card */}
          <motion.article
            className="ab-card ab-metric-card ab-leetcode-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => window.open('https://leetcode.com/u/sammiazaz21/', '_blank')}
          >
            <div className="ab-card-top-bar">
              <span className="ab-card-label">🧠 Algorithm Mastery</span>
              <span className="ab-card-source">LeetCode ↗</span>
            </div>

            <div className="ab-lc-body">
              {/* Circular Gauge */}
              <div className="ab-lc-gauge-wrap">
                <svg width="130" height="130" viewBox="0 0 130 130" className="ab-gauge-svg">
                  <circle cx="65" cy="65" r="50" fill="none" stroke="#222" strokeWidth="6" />
                  <circle
                    cx="65"
                    cy="65"
                    r="50"
                    fill="none"
                    stroke="#ffa116"
                    strokeWidth="6"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * Math.min(lcData.totalSolved, 200) / 200)}
                    strokeLinecap="round"
                    transform="rotate(-90 65 65)"
                  />
                </svg>
                <div className="ab-gauge-center">
                  <span className="ab-gauge-big">{lcData.totalSolved}</span>
                  <span className="ab-gauge-small">Solved</span>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="ab-lc-pills">
                <div className="ab-diff-row">
                  <span className="ab-diff-tag easy">Easy</span>
                  <span className="ab-diff-count">{lcData.easySolved} <span className="muted">/ {lcData.totalEasy || 958}</span></span>
                </div>
                <div className="ab-diff-row">
                  <span className="ab-diff-tag medium">Medium</span>
                  <span className="ab-diff-count">{lcData.mediumSolved} <span className="muted">/ {lcData.totalMedium || 2098}</span></span>
                </div>
                <div className="ab-diff-row">
                  <span className="ab-diff-tag hard">Hard</span>
                  <span className="ab-diff-count">{lcData.hardSolved} <span className="muted">/ {lcData.totalHard || 961}</span></span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* GitHub Heatmap Live Card */}
          <motion.article
            className="ab-card ab-metric-card ab-github-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => window.open('https://github.com/sammiazaz', '_blank')}
          >
            <div className="ab-card-top-bar">
              <span className="ab-card-label">⚡ Continuous Shipping</span>
              <span className="ab-card-source">GitHub ↗</span>
            </div>

            <div className="ab-gh-body">
              <div className="ab-gh-headline">
                <span className="ab-gh-count">{ghData.total}</span>
                <span className="ab-gh-sub">contributions in the last year</span>
              </div>

              {/* Heatmap Grid */}
              <div className="ab-gh-heatmap-grid" aria-hidden="true">
                {ghData.heatmap.map((level, index) => (
                  <div key={index} className={`ab-heat-cell lvl-${level}`} />
                ))}
              </div>

              <div className="ab-gh-footer">
                <span className="ab-gh-username">@sammiazaz</span>
                <div className="ab-gh-legend">
                  <span>Less</span>
                  <span className="ab-heat-cell lvl-0" />
                  <span className="ab-heat-cell lvl-1" />
                  <span className="ab-heat-cell lvl-2" />
                  <span className="ab-heat-cell lvl-3" />
                  <span className="ab-heat-cell lvl-4" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </motion.article>

        </div>

        {/* ─── Section 3: Technical Domain Expertise (3 Bento Cards) ─── */}
        <div className="ab-domains-grid">
          {DOMAINS.map((dom, idx) => (
            <motion.article
              key={idx}
              className="ab-card ab-domain-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="ab-domain-top">
                <span className="ab-domain-tag">{dom.tag}</span>
              </div>
              <h3 className="ab-domain-title">{dom.title}</h3>
              <p className="ab-domain-desc">{dom.desc}</p>

              <div className="ab-domain-skills">
                {dom.skills.map((sk, sIdx) => (
                  <span key={sIdx} className="ab-skill-chip">{sk}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* ─── Footer Action Bar ─── */}
        <div className="ab-footer-cta-row">
          <Link to="/projects" className="ab-cta-btn primary">
            Explore Selected Projects →
          </Link>
          <Link to="/credentials" className="ab-cta-btn secondary">
            View Certifications
          </Link>
          <Link to="/persona" className="ab-cta-btn secondary">
            Developer Persona
          </Link>
        </div>

      </main>
    </section>
  );
}
