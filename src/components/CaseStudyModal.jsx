import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowUpRight, CheckCircle2, Layers, Cpu, Terminal } from 'lucide-react';

const CaseStudyModal = ({ project, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '920px',
                        maxHeight: '88vh',
                        overflowY: 'auto',
                        background: '#0a0a0a',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '20px',
                        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9)',
                        color: '#ffffff',
                        padding: '2.5rem'
                    }}
                >
                    {/* Top Bar with Close Button */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '2rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            paddingBottom: '1.25rem'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span
                                style={{
                                    fontSize: '0.75rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    letterSpacing: '0.08em'
                                }}
                            >
                                CASE STUDY // {project.index || '01'}
                            </span>
                            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
                            <span
                                style={{
                                    fontSize: '0.75rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: '#4ade80'
                                }}
                            >
                                {project.category}
                            </span>
                        </div>

                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Project Header */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2
                            style={{
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 700,
                                margin: '0 0 1rem 0',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            {project.title}
                        </h2>
                        <p
                            style={{
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                                color: 'rgba(255, 255, 255, 0.75)',
                                fontFamily: "'Inter', sans-serif",
                                maxWidth: '750px',
                                margin: 0
                            }}
                        >
                            {project.desc}
                        </p>
                    </div>

                    {/* Image Preview Container */}
                    <div
                        style={{
                            width: '100%',
                            height: '360px',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            marginBottom: '2.5rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            background: '#111',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: project.objectFit || 'cover'
                            }}
                        />
                    </div>

                    {/* Two Column Narrative: Vision & Technical Architecture */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2.5rem',
                            marginBottom: '2.5rem'
                        }}
                    >
                        <div>
                            <h3
                                style={{
                                    fontSize: '0.85rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: '1rem'
                                }}
                            >
                                01 / The Vision & Problem
                            </h3>
                            <p
                                style={{
                                    fontSize: '0.95rem',
                                    lineHeight: 1.7,
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontFamily: "'Inter', sans-serif",
                                    margin: 0
                                }}
                            >
                                {project.vision || "Designed to solve practical friction through an uncompromising standard for user experience, performance, and clear system architecture."}
                            </p>
                        </div>

                        <div>
                            <h3
                                style={{
                                    fontSize: '0.85rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    marginBottom: '1rem'
                                }}
                            >
                                02 / Key Technical Innovations
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {(project.highlights || [
                                    'Engineered for low latency and instant user responsiveness',
                                    'Custom component design system and responsive dark mode aesthetic',
                                    'Structured code base with robust modular patterns'
                                ]).map((item, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.6rem',
                                            fontSize: '0.9rem',
                                            lineHeight: 1.5,
                                            color: 'rgba(255, 255, 255, 0.85)',
                                            fontFamily: "'Inter', sans-serif"
                                        }}
                                    >
                                        <CheckCircle2 size={16} color="#4ade80" style={{ flexShrink: 0, marginTop: '3px' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Tech Stack Pills & Action Bar */}
                    <div
                        style={{
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            paddingTop: '2rem',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1.5rem'
                        }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                            <span
                                style={{
                                    fontSize: '0.75rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    marginRight: '0.5rem'
                                }}
                            >
                                STACK:
                            </span>
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        fontSize: '0.75rem',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        padding: '0.3rem 0.7rem',
                                        borderRadius: '4px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: '#ffffff'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '0.85rem' }}>
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.4rem',
                                        borderRadius: '100px',
                                        background: '#ffffff',
                                        color: '#000000',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        fontFamily: "'Inter', sans-serif",
                                        textDecoration: 'none'
                                    }}
                                >
                                    <span>Live Preview</span>
                                    <ArrowUpRight size={16} />
                                </a>
                            )}

                            {project.source && (
                                <a
                                    href={project.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.4rem',
                                        borderRadius: '100px',
                                        background: 'transparent',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        color: '#ffffff',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        fontFamily: "'Inter', sans-serif",
                                        textDecoration: 'none'
                                    }}
                                >
                                    <Github size={16} />
                                    <span>Source Code</span>
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CaseStudyModal;
