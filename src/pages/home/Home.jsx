import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import About from '../about/About';
import { CONTACT_ITEMS } from '../../data/about';
import './Home.css';

const TECH_BADGES = [
  '⚡ React.js',
  '▲ Next.js',
  '🐍 Python',
  '🚀 FastAPI',
  '🔷 TypeScript',
  '🟢 Node.js',
  '🧠 Scikit-Learn',
  '🐳 Docker',
  '🍃 MongoDB',
  '🐘 PostgreSQL',
  '🎨 Tailwind CSS',
  '☁️ AWS',
  '🛡️ Cybersecurity',
  '🔒 AES-256',
  '📊 Pandas & NumPy',
  '🌐 REST APIs',
];

const STATS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    value: '6+ Projects',
    label: 'Built & Deployed',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    value: '280+',
    label: 'Contributions (Year)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    value: '56+ Solved',
    label: 'LeetCode Problems',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    value: 'Zero-Knowledge',
    label: 'Security & ML Focus',
  },
];

export default function Home() {
  const scrollToAbout = () => {
    const aboutEl = document.getElementById('about-section');
    if (!aboutEl) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(aboutEl, { duration: 1.2, offset: -20 });
    } else {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="home-page" style={{ position: 'relative', zIndex: 1 }}>
      {/* ─── Hero Section (Split Left & Right Layout) ─── */}
      <section className="home-hero-section" id="hero">
        <div className="home-hero-split-container">

          {/* ─── Left Section: Info, Headlines, CTAs ─── */}
          <motion.div
            className="hero-split-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main Heading */}
            <h1 className="hero-main-heading">
              Building <span className="hero-gradient-text">intelligent<br />systems</span> & resilient<br />software.
            </h1>

            {/* Status Capsule */}
            <div className="hero-status-pill">
              <span className="status-dot-pulse" />
              <span className="status-text">Available for Opportunities</span>
              <span className="status-divider" />
              <span className="status-location">Delhi, India</span>
            </div>

            {/* Tagline */}
            <div className="hero-tagline">
              Software Engineer & ML Builder
            </div>

            {/* Subtitle */}
            <p className="hero-sub-p">
              CS student at <strong>IILM University</strong> crafting full-stack architectures, machine learning pipelines, and security-centric digital experiences with clean engineering.
            </p>

            {/* Action Buttons */}
            <div className="hero-actions-row">
              <Link to="/projects" className="hero-btn-primary">
                Explore Projects
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link to="/resume" className="hero-btn-secondary">
                Resume
              </Link>
            </div>
          </motion.div>

          {/* ─── Right Section: Interactive Code Terminal & Bento Stats ─── */}
          <motion.div
            className="hero-split-right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Terminal Window Card */}
            <div className="hero-terminal-card">
              <div className="terminal-topbar">
                <div className="terminal-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="terminal-title">developer.config.ts</span>
                <span className="terminal-lang">TypeScript</span>
              </div>
              <div className="terminal-code-body">
                <p className="code-line"><span className="code-keyword">const</span> <span className="code-var">engineer</span> = &#123;</p>
                <p className="code-line indent"><span className="code-prop">name</span>: <span className="code-str">'Sammi Azaz'</span>,</p>
                <p className="code-line indent"><span className="code-prop">university</span>: <span className="code-str">'IILM University'</span>,</p>
                <p className="code-line indent"><span className="code-prop">stack</span>: [<span className="code-str">'React'</span>, <span className="code-str">'Next.js'</span>, <span className="code-str">'FastAPI'</span>, <span className="code-str">'Python'</span>],</p>
                <p className="code-line indent"><span className="code-prop">focus</span>: <span className="code-str">'Zero-Knowledge Security & ML'</span>,</p>
                <p className="code-line indent"><span className="code-prop">status</span>: <span className="code-val">Status.ReadyToBuild</span></p>
                <p className="code-line">&#125;;</p>
              </div>
            </div>

            {/* 2x2 Bento Stats Grid */}
            <div className="hero-stats-grid">
              {STATS.map((st, i) => (
                <div key={i} className="hero-stat-card">
                  {st.icon}
                  <div className="stat-value">{st.value}</div>
                  <div className="stat-label">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Contact Pillar Ribbon */}
            <div className="hero-contact-pillar" aria-label="Social and contact links">
              {CONTACT_ITEMS.map((item, idx) => {
                const Content = (
                  <div
                    className="side-flip-card hero-flip-tile"
                    style={{ '--delay-idx': idx, '--item-color': item.color }}
                  >
                    <div className="flip-card-inner">
                      <div className="flip-front side-letter-tile" aria-hidden="true">
                        {item.letter}
                      </div>
                      <div className="flip-back side-icon-tile" style={{ color: item.color }}>
                        {item.icon}
                        <span className="side-tile-tooltip hero-tile-tooltip">{item.label}</span>
                      </div>
                    </div>
                  </div>
                );

                if (item.isRouterLink) {
                  return (
                    <Link key={idx} to={item.href} className="side-card-link" aria-label={`Go to ${item.label}`}>
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
                    aria-label={`Visit my ${item.label}`}
                  >
                    {Content}
                  </a>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Infinite Tech Marquee Stream */}
        <div className="hero-marquee-wrapper" aria-hidden="true">
          <div className="hero-marquee-track">
            {TECH_BADGES.concat(TECH_BADGES).map((badge, idx) => (
              <span key={idx} className="marquee-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <button
          type="button"
          className="home-scroll-indicator"
          onClick={scrollToAbout}
          aria-label="Scroll to about section"
        >
          <div className="scroll-mouse-icon">
            <div className="scroll-mouse-wheel" />
          </div>
          <span>Scroll to explore</span>
        </button>
      </section>

      {/* ─── Integrated About Section ─── */}
      <div id="about-section">
        <About />
      </div>

      {/* ─── Persona Footer Anchor ─── */}
      <div className="persona-link-container">
        <Link to="/persona" className="persona-btn">
          Explore Persona →
        </Link>
      </div>
      </div>
    </>
  );
}
