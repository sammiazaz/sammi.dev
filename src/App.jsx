import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Projects from './pages/project/Projects';
import Experience from './pages/experience/Experience';
import Resume from './pages/resume/Resume';
import Contact from './pages/contact/Contact';
import Persona from './pages/persona/Persona';
import Credentials from './pages/credentials/Credentials';
import blackHoleBg from './assets/images/blackhole-bg.png';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function GlobalBackground() {
  return (
    <div className="fixed-global-bg-container">
      <img src="./a3ea7022-116c-4365-8579-ffc545d8cacf.png" alt="Persona Background" className="fixed-global-bg-img" />
      <div className="fixed-global-bg-overlay" />
    </div>
  );
}



const NAV_ITEMS = [
  { path: '/projects', label: 'Projects' },
  { path: '/credentials', label: 'Credentials' },
  { path: '/persona', label: 'Persona' },
  { path: '/contact', label: 'Contact' },
];



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'b&w');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <>
      <ScrollToTop />
      <GlobalBackground />
      <nav className="floating-navbar">
        <Link to="/" className="logo">
          <svg className="nav-home-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="logo-text">sammiazaz</span>
        </Link>

        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'accent active' : 'accent')}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="theme-selector-wrapper">
            <button
              className="theme-nav-btn"
              onClick={() => setIsThemeModalOpen(!isThemeModalOpen)}
              title="Choose Theme"
            >
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span>{theme === 'nitro' ? 'Nitro' : theme === 'littlebird' ? 'Littlebird' : theme === 'zprox' ? 'zPROx.AI' : 'B&W'}</span>
            </button>

            {isThemeModalOpen && (
              <div className="theme-dropdown-popup">
                <div className="theme-popup-header">Select Theme</div>
                <button
                  className={`theme-option-btn ${theme === 'b&w' ? 'active' : ''}`}
                  onClick={() => { setTheme('b&w'); setIsThemeModalOpen(false); }}
                >
                  <span className="theme-color-preview bw-preview"></span>
                  <div className="theme-info">
                    <span className="theme-name">B&W</span>
                    <span className="theme-desc">Default Monochrome</span>
                  </div>
                </button>
                <button
                  className={`theme-option-btn ${theme === 'nitro' ? 'active' : ''}`}
                  onClick={() => { setTheme('nitro'); setIsThemeModalOpen(false); }}
                >
                  <span className="theme-color-preview nitro-preview"></span>
                  <div className="theme-info">
                    <span className="theme-name">Nitro</span>
                    <span className="theme-desc">Cyan & Orange Accent</span>
                  </div>
                </button>
                <button
                  className={`theme-option-btn ${theme === 'littlebird' ? 'active' : ''}`}
                  onClick={() => { setTheme('littlebird'); setIsThemeModalOpen(false); }}
                >
                  <span className="theme-color-preview littlebird-preview"></span>
                  <div className="theme-info">
                    <span className="theme-name">Littlebird</span>
                    <span className="theme-desc">Warm Gold & Olive</span>
                  </div>
                </button>
                <button
                  className={`theme-option-btn ${theme === 'zprox' ? 'active' : ''}`}
                  onClick={() => { setTheme('zprox'); setIsThemeModalOpen(false); }}
                >
                  <span className="theme-color-preview zprox-preview"></span>
                  <div className="theme-info">
                    <span className="theme-name">zPROx.AI</span>
                    <span className="theme-desc">Vibrant Red & Carbon Dark</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button className="nav-bot-btn" title="AI Assistant">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor" />
              <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
              <path d="M12 2v5" />
              <circle cx="12" cy="2" r="1" fill="currentColor" />
            </svg>
          </button>

          <Link to="/resume" className="btn btn-solid">
            Resume
          </Link>
        </div>
      </nav>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/persona" element={<Persona />} />
          <Route path="/credentials" element={<Credentials />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
