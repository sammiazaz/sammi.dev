import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Projects from './pages/project/Projects';
import Experience from './pages/experience/Experience';
import Resume from './pages/resume/Resume';
import Contact from './pages/contact/Contact';
import Persona from './pages/persona/Persona';
import Credentials from './pages/credentials/Credentials';
import SmoothScroll from './components/common/SmoothScroll';
import Navbar from './components/layout/Navbar';
import './index.css';



function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (['b&w', 'nitro', 'zprox', 'codecademy'].includes(saved)) {
      return saved;
    }
    return 'codecademy';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <SmoothScroll>
      <Navbar theme={theme} setTheme={setTheme} />

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
    </SmoothScroll>
  );
}

export default App;
