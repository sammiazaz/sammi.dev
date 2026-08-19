import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Home from './pages/home/Home';
import Projects from './pages/project/Projects';
import Experience from './pages/experience/Experience';
import Resume from './pages/resume/Resume';
import Contact from './pages/contact/Contact';
import Persona from './pages/persona/Persona';
import Credentials from './pages/credentials/Credentials';
import SmoothScroll from './components/common/SmoothScroll';
import Navbar from './components/layout/Navbar';
import VantaBackground from './components/layout/VantaBackground';
import ChatAssistant from './components/chat/ChatAssistant';
import './index.css';
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('portfolio-mode');
    if (['light', 'dark'].includes(savedMode)) return savedMode;
    return 'dark';
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (['default', 'editorial'].includes(savedTheme)) return savedTheme;
    return 'default';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-mode', mode);
    localStorage.setItem('portfolio-theme', theme);
  }, [mode, theme]);

  return (
    <>
      <SmoothScroll>
        <VantaBackground mode={mode} theme={theme} />
        <Navbar mode={mode} setMode={setMode} theme={theme} setTheme={setTheme} setIsChatOpen={setIsChatOpen} />
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
        <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </SmoothScroll>
    </>
  );
}

export default App;
