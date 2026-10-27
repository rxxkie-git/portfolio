import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Expertise from './components/Expertise';
import Certificates from './components/Certificates';
import About from './components/About';
import Footer from './components/Footer';
import PaymentModal from './components/PaymentModal';

function App() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  return (
    <div className="portfolio-app-root">
      {/* Smooth Awwwards Custom Cursor */}
      <CustomCursor />

      {/* Floating Glass Minimalist Header with Live IST Clock */}
      <Navbar onOpenPayment={() => setPaymentModalOpen(true)} />

      {/* Hero Section with Interactive 3D Canvas Scene */}
      <main>
        <Hero onOpenPayment={() => setPaymentModalOpen(true)} />

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

      {/* Direct UPI Support Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />
    </div>
  );
}

export default App;
