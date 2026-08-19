import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

import { Home, Briefcase, Award, User, Mail, Check } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home, mobileOnly: true },
  { path: '/projects', label: 'Projects', icon: Briefcase },
  { path: '/credentials', label: 'Credentials', icon: Award },
  { path: '/persona', label: 'Persona', icon: User },
  { path: '/contact', label: 'Contact', icon: Mail },
];

const THEME_OPTIONS = [
  {
    id: 'default',
    name: 'Default (Cyber Green)',
    desc: 'Vibrant emerald glow & glass',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <circle cx="12" cy="12" r="5" fill="#22c55e" opacity="0.4"/>
        <circle cx="12" cy="12" r="10" stroke="#22c55e" />
      </svg>
    ),
  },
  {
    id: 'editorial',
    name: 'Editorial',
    desc: 'Monochrome minimalist layout',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" />
        <path d="M3 9h18M9 3v18" stroke="currentColor" />
      </svg>
    ),
  },
];

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

export default function Navbar({ mode, setMode, theme, setTheme, setIsChatOpen }) {
  const location = useLocation();
  const [isThemePopupOpen, setIsThemePopupOpen] = useState(false);
  const themeDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target)) {
        setIsThemePopupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav
      className="magnetic-navbar"
      aria-label="Main navigation"
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="navbar-container">

        {/* Brand Logo & Home Group */}
        <div className="nav-brand-group desktop-only">
          {/* Logo.png */}
          <Link to="/" className="nav-logo-link" aria-label="Logo">
            <img src={logoImg} alt="Sammi Logo" className="nav-logo-img" />
          </Link>

          {/* Home Icon */}
          <Link to="/" className="nav-brand" aria-label="Home">
            <div className={`nav-brand-icon ${location.pathname === '/' ? 'active-home' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="nav-tabs">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            return (
              <li key={item.path} className={`nav-tab-item ${item.mobileOnly ? 'mobile-only' : ''}`}>
                <Link 
                  to={item.path} 
                  className={`nav-tab-link ${isActive ? 'active' : ''}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="nav-active-pill"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <IconComponent className="nav-tab-icon" />
                  <span className="nav-tab-text">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="nav-actions-group">

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

          {/* Theme Selector Pop-up Wrapper */}
          <div className="theme-selector-wrapper" ref={themeDropdownRef}>
            <button
              className={`nav-icon-btn nav-theme-cycle-btn ${isThemePopupOpen ? 'theme-active' : ''}`}
              onClick={() => setIsThemePopupOpen((prev) => !prev)}
              title="Select Theme"
              aria-label="Select Theme"
            >
              {THEME_ICONS[theme] || THEME_ICONS.default}
            </button>

            <AnimatePresence>
              {isThemePopupOpen && (
                <motion.div
                  className="theme-dropdown-glass"
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 10 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="theme-header">Theme Selector</div>
                  <div className="theme-options">
                    {THEME_OPTIONS.map((opt) => {
                      const isSelected = theme === opt.id;
                      return (
                        <button
                          key={opt.id}
                          className={`theme-glass-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            setTheme(opt.id);
                            setIsThemePopupOpen(false);
                          }}
                        >
                          <div className="theme-btn-left">
                            <div className="theme-icon-box">
                              {opt.icon}
                            </div>
                            <div className="theme-text">
                              <span className="theme-label">{opt.name}</span>
                              <span className="theme-sub">{opt.desc}</span>
                            </div>
                          </div>
                          {isSelected && <Check className="theme-active-check" size={16} />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
