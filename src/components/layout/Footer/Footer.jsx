import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-logo">SAMMI AZAZ</h2>
          <p className="footer-tagline">Creative Technologist & Design Engineer.</p>
        </div>
        
        <div className="footer-right">
          <div className="footer-links">
            <h4>Connect</h4>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
          <div className="footer-links">
            <h4>Say Hello</h4>
            <a href="mailto:hello@sammi.dev">hello@sammi.dev</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Sammi Azaz. All rights reserved.</p>
        <p className="footer-built">Designed & Engineered with passion.</p>
      </div>
    </footer>
  );
}
