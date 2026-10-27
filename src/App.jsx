import React from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Expertise from './components/Expertise';
import Certificates from './components/Certificates';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="portfolio-app-root">
      {/* Smooth Awwwards Custom Cursor */}
      <CustomCursor />

      {/* Floating Glass Minimalist Header with Live IST Clock */}
      <Navbar />

      {/* Hero Section with Interactive 3D Canvas Scene */}
      <main>
        <Hero />

        {/* Selected Works & Interactive Case Studies */}
        <Projects />

        {/* Core Expertise & Technical Capabilities Matrix */}
        <Expertise />

        {/* Certifications & Milestones with Fullscreen Image Inspector */}
        <Certificates />

        {/* About Section with Real-Time Discord Presence & Bio */}
        <About />
      </main>

      {/* Contact & Interactive Footer */}
      <Footer />
    </div>
  );
}

export default App;
