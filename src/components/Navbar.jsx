import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import resumePdf from '../assets/resume.pdf';

const Navbar = ({ onOpenPayment }) => {
    const [scrolled, setScrolled] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Live clock for Bengaluru (IST)
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            setCurrentTime(timeString);
        };

        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    // Scroll listener for sticky background blur
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Work', href: '#work' },
        { label: 'Expertise', href: '#expertise' },
        { label: 'Certificates', href: '#certificates' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ];

    const scrollTo = (href) => {
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                background: scrolled
                    ? 'rgba(5, 5, 5, 0.85)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled
                    ? '1px solid rgba(255, 255, 255, 0.07)'
                    : '1px solid transparent',
            }}
        >
            <div
                style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'padding 0.35s ease',
                }}
            >
                {/* Brand & Live Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <a
                        href="#"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            textDecoration: 'none',
                            color: '#ffffff',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            fontSize: '1rem',
                            fontFamily: "'Space Grotesk', sans-serif"
                        }}
                    >
                        <span
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#ffffff',
                                display: 'inline-block',
                            }}
                        />
                        SRINAND
                    </a>

                    <div
                        className="hide-mobile"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.75rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            color: 'rgba(255, 255, 255, 0.5)',
                            paddingLeft: '1.25rem',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                    >
                        <span>BENGALURU, IN</span>
                        <span>•</span>
                        <span style={{ color: '#ffffff' }}>{currentTime || '13:00 IST'}</span>
                    </div>
                </div>

                {/* Desktop Nav Items */}
                <nav
                    className="hide-mobile"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '0.45rem 1.25rem',
                        borderRadius: '100px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => scrollTo(item.href)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                fontFamily: "'Inter', sans-serif",
                                cursor: 'pointer',
                                transition: 'color 0.2s ease',
                                padding: '0.2rem 0',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                            onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.7)')}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Right Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    {/* Available for Work Pill */}
                    <div
                        className="hide-mobile"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.4rem 0.9rem',
                            background: 'rgba(34, 197, 94, 0.08)',
                            border: '1px solid rgba(34, 197, 94, 0.25)',
                            borderRadius: '100px',
                            fontSize: '0.72rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            color: '#4ade80',
                            letterSpacing: '0.04em'
                        }}
                    >
                        <span
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#22c55e',
                                boxShadow: '0 0 10px #22c55e'
                            }}
                        />
                        AVAILABLE FOR WORK
                    </div>

                    {/* Resume CTA */}
                    <a
                        href={resumePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-dtampe-nav"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.45rem 1rem',
                            borderRadius: '100px',
                            background: '#ffffff',
                            color: '#000000',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif",
                            textDecoration: 'none',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        <span>Resume</span>
                        <ArrowUpRight size={14} />
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="show-mobile-only"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            color: '#ffffff',
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                        aria-label="Toggle Navigation Menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'rgba(8, 8, 8, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '2rem 1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#4ade80', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                            AVAILABLE FOR WORK • BENGALURU ({currentTime})
                        </div>

                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => scrollTo(item.href)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#ffffff',
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    padding: '0.5rem 0',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                }}
                            >
                                {item.label}
                            </button>
                        ))}

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <a
                                href={resumePdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    padding: '0.8rem',
                                    textAlign: 'center',
                                    background: '#ffffff',
                                    color: '#000000',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    fontSize: '0.9rem'
                                }}
                            >
                                View Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
