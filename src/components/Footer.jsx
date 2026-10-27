import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, MessageSquare, Terminal, Sparkles } from 'lucide-react';
import resumePdf from '../assets/resume.pdf';

const EMAIL = '5420380.x.srinand@gmail.com';

const Footer = () => {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [timeStr, setTimeStr] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTimeStr(
                now.toLocaleTimeString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                })
            );
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
    };

    return (
        <footer
            id="contact"
            style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '8rem 2rem 3rem 2rem',
                position: 'relative'
            }}
        >
            {/* Top Prompt */}
            <div style={{ marginBottom: '3rem' }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontSize: '0.75rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'rgba(255, 255, 255, 0.5)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '1rem'
                    }}
                >
                    <span>● (05) / GET IN TOUCH</span>
                    <span>•</span>
                    <span>PROJECT INQUIRIES & COLLABORATIONS</span>
                </div>

                <h2
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2.6rem, 7vw, 6rem)',
                        fontWeight: 700,
                        lineHeight: 1.05,
                        letterSpacing: '-0.035em',
                        color: '#ffffff',
                        margin: 0,
                        textTransform: 'uppercase'
                    }}
                >
                    Let's Build <br />
                    <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontStyle: 'italic', fontWeight: 400 }}>Something</span> <br />
                    Memorable.
                </h2>
            </div>

            {/* Interactive Email Box */}
            <div
                style={{
                    background: '#090909',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}
            >
                <div>
                    <span
                        style={{
                            fontSize: '0.75rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            color: 'rgba(255, 255, 255, 0.45)',
                            letterSpacing: '0.08em',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}
                    >
                        DIRECT COMMUNICATION
                    </span>
                    <a
                        href={`mailto:${EMAIL}`}
                        style={{
                            fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            color: '#ffffff',
                            textDecoration: 'none',
                            letterSpacing: '-0.02em',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                    >
                        {EMAIL}
                    </a>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <button
                        onClick={copyEmail}
                        className="btn-dtampe-copy"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.85rem 1.6rem',
                            borderRadius: '100px',
                            background: copiedEmail ? '#22c55e' : '#ffffff',
                            color: copiedEmail ? '#ffffff' : '#000000',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif",
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                        <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Email'}</span>
                    </button>

                    <a
                        href={`mailto:${EMAIL}`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.85rem 1.4rem',
                            borderRadius: '100px',
                            background: 'transparent',
                            color: '#ffffff',
                            fontSize: '0.88rem',
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <span>Send Mail</span>
                        <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>

            {/* Bottom Sitemap & Metadata Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '3.5rem',
                    paddingBottom: '3.5rem'
                }}
            >
                {/* Col 1: Identity & Time */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <img
                            src="/brand-logo.png"
                            alt="Logo"
                            style={{ width: '20px', height: '18px', objectFit: 'contain' }}
                        />
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: '#ffffff' }}>
                            SRINAND NIHAL
                        </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.6, margin: 0 }}>
                        Multidisciplinary Developer & AI Engineer based in Bengaluru, India.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: '#4ade80' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                        <span>BENGALURU • {timeStr} IST</span>
                    </div>
                </div>

                {/* Col 2: Navigation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>
                        NAVIGATION
                    </span>
                    {['#work:Selected Work', '#expertise:Expertise & Stack', '#certificates:Certificates', '#about:About Perspective'].map((link) => {
                        const [href, label] = link.split(':');
                        return (
                            <a
                                key={href}
                                href={href}
                                style={{
                                    fontSize: '0.85rem',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
                            >
                                {label}
                            </a>
                        );
                    })}
                </div>

                {/* Col 3: Social Channels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>
                        CHANNELS
                    </span>
                    {[
                        { name: 'GitHub', href: 'https://github.com/rxxkie-git' },
                        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/srinand-nihal/' },
                        { name: 'Twitter/X', href: 'https://x.com/rookie_nihal' },
                        { name: 'LeetCode', href: 'https://leetcode.com/u/srinandleetc/' },
                        { name: 'Resume (PDF)', href: resumePdf }
                    ].map((ch) => (
                        <a
                            key={ch.name}
                            href={ch.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontSize: '0.85rem',
                                color: 'rgba(255, 255, 255, 0.7)',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                transition: 'color 0.2s'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
                        >
                            <span>{ch.name}</span>
                            <ArrowUpRight size={13} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Sub-footer Copyright & Recognition */}
            <div
                style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    fontSize: '0.75rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'rgba(255, 255, 255, 0.4)'
                }}
            >
                <span>© {new Date().getFullYear()} SRINAND NIHAL. ALL RIGHTS RESERVED.</span>
                <span>INSPIRED BY DTAMPE.COM • CRAFTED WITH REACT 19 & CANVAS 3D</span>
            </div>
        </footer>
    );
};

export default Footer;
