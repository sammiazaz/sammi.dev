import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Navbar from './components/Navbar/Navbar';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import IlanBackground from '../ilian-background/IlanBackground';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Experience from './pages/Experience/Experience';
import Resume from './pages/Resume/Resume';
import Contact from './pages/Contact/Contact';
import Persona from './pages/Persona/Persona';
import Credentials from './pages/Credentials/Credentials';

import './styles/globals.css';

function AppContent() {
  const { siteTheme } = useTheme();

  return (
    <>
      <ScrollToTop />
      {siteTheme === 'ilian' && <IlanBackground />}
      <Navbar />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
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

export default function App() {
  return (
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
        <AppContent />
      </ReactLenis>
    </ThemeProvider>
  );
}

