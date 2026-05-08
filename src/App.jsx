import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Twitter, Mail, Instagram, Linkedin } from 'lucide-react'
import DiscordStatus from './DiscordStatus'
import SkillsMarquee from './SkillsMarquee'
import InteractiveBackground from './InteractiveBackground'
import Navbar from './Navbar'
import CertificateRotator from './CertificateRotator'
import './SkillsMarquee.css'
import './index.css'
import Projects from './Projects'
import HeroProfile from './HeroProfile'

function App() {
  const [count, setCount] = useState(0)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120 }
    }
  }

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <Navbar />

      {/* Hero Section */}
      <motion.section
        id="about"
        className="hero hero-section-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <InteractiveBackground />

        {/* Floating Discord Status */}
        <div className="discord-status-container">
          <DiscordStatus />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <HeroProfile />
        </div>
      </motion.section>

      {/* Skills Section */}
      <section id="skills" style={{ maxWidth: '100vw', margin: '4rem 0', padding: '0' }}>
        <h2 className="section-heading-gradient section-heading-responsive">
          Skills
        </h2>
        <SkillsMarquee />
      </section>

      {/* Certifications Section */}
      <section id="certifications" style={{ maxWidth: '100vw', margin: '4rem 0', padding: '0' }}>
        <h2 className="section-heading-gradient section-heading-responsive">
          Certifications
        </h2>
        <CertificateRotator />
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Footer / Contact */}
      <footer id="contact" className="footer-container">
        {/* Large Watermark Text */}
        <div className="footer-watermark">
          SRINAND
        </div>

        {/* Social Icons Removed as per request */}

        {/* Copyright */}
        <p style={{
          color: '#a1a1aa',
          fontSize: '0.9rem',
          zIndex: 10,
          position: 'absolute',
          bottom: '1rem',
          width: '100%',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          © 2025 | Made with ❤️
        </p>
      </footer>
    </div>
  )
}

const SocialLink = ({ icon, href }) => (
  <motion.a
    href={href}
    whileHover={{ y: -3, color: '#fff' }}
    style={{
      color: '#aaa', // Light grey/beige
      padding: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)', // Very subtle border
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      background: 'transparent',
      transition: 'all 0.3s ease'
    }}
  >
    {icon}
  </motion.a>
)



export default App
