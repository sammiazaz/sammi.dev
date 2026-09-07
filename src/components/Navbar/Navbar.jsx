import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const NAV_ITEMS = [
  { path: '/projects', label: 'Projects' },
  { path: '/credentials', label: 'Credentials' },
  { path: '/persona', label: 'Persona' },
  { path: '/contact', label: 'Contact' },
];

const MOBILE_DOCK_ITEMS = [
  {
    path: '/',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V10.5z" />
      </svg>
    ),
  },
  {
    path: '/projects',
    label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.1">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    path: '/credentials',
    label: 'Credentials',
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M15 13l2.5 8-5.5-3-5.5 3 2.5-8" />
      </svg>
    ),
  },
  {
    path: '/persona',
    label: 'Persona',
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </svg>
    ),
  },
  {
    path: '/contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const { siteTheme, colorMode, toggleSiteTheme, toggleColorMode } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = React.useState(false);

  useLenis((lenis) => {
    const scrolled = lenis.scroll > 15;
    setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
  });

  React.useEffect(() => {
    setIsScrolled(window.scrollY > 15);
  }, [location.pathname]);

  return (
    <>
      <nav className={`export-navbar ${isHome ? 'is-home' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
        <Link to="/" className="logo">
          sammiazaz
        </Link>

        {/* Desktop Links (Hidden on mobile) */}
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'accent active' : 'accent')}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Top Bar Actions (Always on top) */}
        <div className="nav-actions">
          <div className="social-links">
            <a href="https://github.com/sammiazaz" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/sammiazazse" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleSiteTheme}
            className={`site-theme-toggle-btn ${siteTheme}`}
            title={`Active: ${siteTheme === 'sammi' ? 'SAMMI Theme' : 'ILIAN Theme'} (Click to switch)`}
            aria-label="Switch between Sammi and Ilian visual themes"
          >
            <span className="theme-toggle-indicator" />
            <span className="theme-toggle-text">{siteTheme === 'sammi' ? 'SAMMI' : 'ILIAN'}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleColorMode}
            className="theme-toggle-btn"
            aria-label="Toggle Light/Dark Theme"
          >
            {colorMode === 'light' ? (
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          <Link to="/resume" className="btn btn-solid">
            Resume
          </Link>
        </div>
      </nav>

      {/* ─── Mobile Bottom Floating Navigation Dock (Reference Pill Design) ─── */}
      <nav className="mobile-bottom-dock" aria-label="Mobile Navigation Dock">
        <div className="mobile-dock-inner">
          {MOBILE_DOCK_ITEMS.map((item) => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`mobile-dock-item ${isActive ? 'is-active' : ''}`}
                aria-label={item.label}
              >
                <span className="mobile-dock-icon">{item.icon}</span>
                <span className="mobile-dock-label">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
