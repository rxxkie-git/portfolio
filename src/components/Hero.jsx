import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Coffee } from 'lucide-react';
import InteractiveScene3D from './InteractiveScene3D';

const Hero = ({ onOpenPayment }) => {
    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '8rem 2rem 4rem 2rem',
                maxWidth: '1440px',
                margin: '0 auto',
                overflow: 'hidden'
            }}
        >
            {/* Top Eyebrow Tag */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                }}
            >
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.35rem 0.9rem',
                        borderRadius: '100px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: '0.75rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'rgba(255, 255, 255, 0.7)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                    }}
                >
                    <span
                        style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#38bdf8',
                            boxShadow: '0 0 10px #38bdf8'
                        }}
                    />
                    MULTIDISCIPLINARY DEVELOPER & AI ENTHUSIAST
                </div>

                <span
                    className="hide-mobile"
                    style={{
                        fontSize: '0.75rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'rgba(255, 255, 255, 0.35)',
                    }}
                >
                    • BENGALURU, INDIA
                </span>
            </motion.div>

            {/* Grid Layout: Editorial Title & 3D Interactive Scene */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3rem',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {/* Left: Editorial Hero Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
                >
                    <h1
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
                            fontWeight: 700,
                            lineHeight: 1.02,
                            letterSpacing: '-0.035em',
                            color: '#ffffff',
                            margin: 0,
                            textTransform: 'uppercase'
                        }}
                    >
                        Building <br />
                        <span style={{ color: 'rgba(255, 255, 255, 0.45)', fontStyle: 'italic', fontWeight: 400 }}>intelligent</span> <br />
                        Digital Products.
                    </h1>

                    <p
                        style={{
                            fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                            lineHeight: 1.65,
                            color: 'rgba(255, 255, 255, 0.65)',
                            fontFamily: "'Inter', sans-serif",
                            maxWidth: '560px',
                            margin: 0,
                            fontWeight: 400
                        }}
                    >
                        Hi, I’m <strong>Srinand</strong>. I bridge creative frontend design, full-stack architecture, and agentic AI. Helping founders and teams transform ambitious ideas into memorable, production-grade applications.
                    </p>

                    {/* Skill Tags */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            paddingTop: '0.5rem'
                        }}
                    >
                        {['Agentic AI & RAG', 'React & Next.js', 'Real-Time WebSockets', 'Python & Node', 'Interactive 3D / WebGL'].map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontSize: '0.75rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: 'rgba(255, 255, 255, 0.75)',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '6px'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            paddingTop: '1rem'
                        }}
                    >
                        <button
                            onClick={() => scrollTo('#work')}
                            className="btn-dtampe-primary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                padding: '0.9rem 1.8rem',
                                borderRadius: '100px',
                                background: '#ffffff',
                                color: '#000000',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                fontFamily: "'Inter', sans-serif",
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease'
                            }}
                        >
                            <span>Selected Works</span>
                            <ArrowDown size={16} />
                        </button>

                        <button
                            onClick={() => scrollTo('#contact')}
                            className="btn-dtampe-secondary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                padding: '0.9rem 1.6rem',
                                borderRadius: '100px',
                                background: 'transparent',
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                fontFamily: "'Inter', sans-serif",
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease'
                            }}
                        >
                            <span>Get in Touch</span>
                            <ArrowUpRight size={16} />
                        </button>

                        {onOpenPayment && (
                            <button
                                onClick={onOpenPayment}
                                title="Support / Tip Srinand via UPI"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    padding: '0.9rem 1.2rem',
                                    borderRadius: '100px',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Coffee size={16} />
                                <span>Support</span>
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Right: Interactive 3D Hero Scene */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                        width: '100%',
                        height: '460px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: 0,
                        overflow: 'visible'
                    }}
                >
                    <InteractiveScene3D />
                </motion.div>
            </div>

            {/* Bottom Highlight Metrics Strip */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '5rem',
                    paddingTop: '2.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
            >
                {[
                    { label: 'FEATURED PROJECTS', value: '04+', note: 'Full-stack & AI applications' },
                    { label: 'CREDENTIALS & CERTS', value: '06+', note: 'Agentic AI, Python, Cisco' },
                    { label: 'LOCATION & TIMEZONE', value: 'BENGALURU', note: 'IST (UTC +5:30) • Remote friendly' },
                    { label: 'AVAILABILITY', value: 'OPEN', note: 'Freelance & Internship opportunities' }
                ].map((stat, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <span
                            style={{
                                fontSize: '0.7rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                letterSpacing: '0.08em',
                                color: 'rgba(255, 255, 255, 0.45)'
                            }}
                        >
                            {stat.label}
                        </span>
                        <span
                            style={{
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                fontFamily: "'Space Grotesk', sans-serif",
                                color: '#ffffff'
                            }}
                        >
                            {stat.value}
                        </span>
                        <span
                            style={{
                                fontSize: '0.8rem',
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            {stat.note}
                        </span>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default Hero;
