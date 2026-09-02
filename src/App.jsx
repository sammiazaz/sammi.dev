import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DotfieldBackground from './components/layout/DotfieldBackground/DotfieldBackground';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Experience from './pages/Experience/Experience';
import Projects from './pages/Projects/Projects';
import Credentials from './pages/Credentials/Credentials';
import Persona from './pages/Persona/Persona';
import Footer from './components/layout/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <DotfieldBackground theme="dark" />
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <About />
              </>
            } />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/persona" element={<Persona />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
