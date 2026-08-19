import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const NAV_ITEMS = [
  { path: '/projects', label: 'Projects' },
  { path: '/credentials', label: 'Credentials' },
  { path: '/persona', label: 'Persona' },
  { path: '/contact', label: 'Contact' },
];

const THEMES = ['default', 'editorial'];
const THEME_ICONS = {
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  editorial: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  ),
};
const THEME_LABELS = { default: 'Color', editorial: 'Editorial' };

export default function Navbar({ mode, setMode, theme, setTheme, setIsChatOpen }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme);
    setTheme(THEMES[(idx + 1) % THEMES.length]);
  };

  return (
    <motion.nav
      className="magnetic-navbar"
      aria-label="Main navigation"
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="nav-brand" aria-label="Home">
          <div className={`nav-brand-icon ${location.pathname === '/' ? 'active-home' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        </Link>

        {/* Nav Links */}
        <ul className={`nav-tabs ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="nav-tab-item">
                <Link 
                  to={item.path} 
                  className={`nav-tab-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="nav-active-pill"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="nav-tab-text">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="nav-actions-group">
          {/* Mobile Menu Toggle (3 lines) */}
          <button 
            className="nav-icon-btn mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>

          {/* AI Bot Button */}
          <button 
            className="nav-icon-btn" 
            title="AI Assistant" 
            aria-label="Open AI Assistant"
            onClick={() => setIsChatOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" />
              <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
              <path d="M12 2v5" />
              <circle cx="12" cy="2" r="1" fill="currentColor" />
            </svg>
          </button>

          {/* Theme Cycle Button */}
          <button
            className={`nav-icon-btn nav-theme-cycle-btn ${theme !== 'default' ? 'theme-active' : ''}`}
            onClick={cycleTheme}
            title={`Theme: ${THEME_LABELS[theme]} → Click to switch`}
          >
            {THEME_ICONS[theme]}
          </button>

          {/* Dark/Light Mode Toggle */}
          <button
            className="nav-icon-btn theme-toggle-btn"
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            title="Toggle Light/Dark Mode"
          >
            {mode === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

        </div>
      </div>
    </motion.nav>
  );
}
