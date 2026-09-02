import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#about');
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle hash scrolling when coming from another page
  useEffect(() => {
    if (location.hash === '#about') {
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <div className="navbar-logo-section">
          <Link to="/" onClick={scrollToTop} style={{ textDecoration: 'none' }}>
            <div className="navbar-logo">SAMMI AZAZ</div>
          </Link>
        </div>
        
        <div className="navbar-center">
          <div className="navbar-links">
            <a href="#about" onClick={handleAboutClick} className="nav-link">About</a>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink>
            <NavLink to="/experience" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Experience</NavLink>
            <NavLink to="/credentials" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Credentials</NavLink>
            <NavLink to="/persona" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Persona</NavLink>
          </div>
        </div>

        <div className="navbar-right">
          {/* Empty to balance the flex layout */}
        </div>
      </div>
    </nav>
  );
}
