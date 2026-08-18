import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const NAV_ITEMS = [
  { path: '/projects', label: 'Projects' },
  { path: '/credentials', label: 'Credentials' },
  { path: '/persona', label: 'Persona' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar({ theme, setTheme }) {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isThemeModalOpen && !e.target.closest('.theme-selector-wrapper')) {
        setIsThemeModalOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isThemeModalOpen]);

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

        {/* Magnetic Nav Links */}
        <ul className="nav-tabs">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/');
            return (
              <li key={item.path} className="nav-tab-item">
                <Link to={item.path} className={`nav-tab-link ${isActive ? 'active' : ''}`}>
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

        {/* Actions (Theme & Buttons) */}
        <div className="nav-actions-group">
          
          {/* AI Bot Button */}
          <button className="nav-icon-btn" title="AI Assistant" aria-label="Open AI Assistant">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" />
              <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
              <path d="M12 2v5" />
              <circle cx="12" cy="2" r="1" fill="currentColor" />
            </svg>
          </button>

          {/* Theme Selector */}
          <div className="theme-selector-wrapper">
            <button
              className="nav-icon-btn theme-toggle-btn"
              onClick={() => setIsThemeModalOpen(!isThemeModalOpen)}
              title="Select Theme"
              aria-expanded={isThemeModalOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </button>

            <AnimatePresence>
              {isThemeModalOpen && (
                <motion.div 
                  className="theme-dropdown-glass"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="theme-header">Appearance</div>
                  <div className="theme-options">
                    {[
                      { id: 'b&w', name: 'Monochrome', desc: 'Minimal B&W' },
                      { id: 'nitro', name: 'Nitro', desc: 'Cyan & Orange' },
                      { id: 'zprox', name: 'zPROx.AI', desc: 'Red & Carbon' },
                      { id: 'codecademy', name: 'Codecademy', desc: 'Cream & Navy' },
                    ].map(t => (
                      <button
                        key={t.id}
                        className={`theme-glass-btn ${(theme === t.id || (t.id === 'b&w' && theme === 'dark')) ? 'active' : ''}`}
                        onClick={() => { setTheme(t.id); setIsThemeModalOpen(false); }}
                      >
                        <span className={`theme-dot dot-${t.id === 'b&w' ? 'bw' : t.id}`} />
                        <div className="theme-text">
                          <span className="theme-label">{t.name}</span>
                          <span className="theme-sub">{t.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/resume" className="nav-resume-btn">
            Resume
          </Link>

        </div>
      </div>
    </motion.nav>
  );
}
