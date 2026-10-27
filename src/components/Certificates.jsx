import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, Calendar, CheckCircle } from 'lucide-react';

const certificates = [
    {
        title: 'Agentic AI Saksham',
        issuer: 'RV Institute of Technology & Capabl',
        date: 'Sept 2025',
        category: 'AI & Engineering',
        image: '/certificates/agentic-ai.png',
        desc: 'Advanced hands-on program covering Agentic AI architectures, autonomous multi-agent task execution, and retrieval-augmented generation.'
    },
    {
        title: 'Starfleet Club Appreciation',
        issuer: 'RVITM - Antikythera Tech Club',
        date: '2025',
        category: 'Leadership & Recognition',
        image: '/certificates/starfleet-appreciation.jpg',
        desc: 'Recognized for significant technical contributions and peer mentoring in campus technical initiatives and hackathons.'
    },
    {
        title: 'Python Bootcamp',
        issuer: 'Udemy',
        date: 'Mar 2024',
        category: 'Software Engineering',
        image: '/certificates/python-bootcamp.jpg',
        desc: 'Comprehensive Python mastery encompassing object-oriented programming, data structures, algorithms, and backend scripting.'
    },
    {
        title: 'App Development Internship',
        issuer: 'Launched Global',
        date: '2024',
        category: 'Industry Experience',
        image: '/certificates/app-dev-internship.png',
        desc: 'Real-world software engineering internship delivering production feature sets, client-side optimizations, and collaborative git workflows.'
    },
    {
        title: 'Networking Basics',
        issuer: 'Cisco Networking Academy',
        date: 'Nov 2025',
        category: 'Computer Science',
        image: '/certificates/cisco-networking.png',
        desc: 'Fundamental internet architecture, OSI model, packet routing, TCP/UDP protocols, and network security foundations.'
    },
    {
        title: 'Trello for Beginners',
        issuer: 'Coursera',
        date: 'Oct 2025',
        category: 'Project Management',
        image: '/certificates/trello-cert.png',
        desc: 'Agile project coordination, kanban sprint cycles, and automated task workflows for engineering teams.'
    }
];

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section
            id="certificates"
            style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '6rem 2rem',
                position: 'relative'
            }}
        >
            {/* Section Header */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '2rem',
                    marginBottom: '4rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '2rem'
                }}
            >
                <div>
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
                            marginBottom: '0.8rem'
                        }}
                    >
                        <span>● (03) / RECOGNITION & CREDENTIALS</span>
                        <span>•</span>
                        <span>{certificates.length} VERIFIED MILESTONES</span>
                    </div>

                    <h2
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                            fontWeight: 700,
                            margin: 0,
                            letterSpacing: '-0.03em',
                            color: '#ffffff'
                        }}
                    >
                        Certifications & Milestones.
                    </h2>
                </div>

                <p
                    style={{
                        fontSize: '0.95rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: "'Inter', sans-serif",
                        maxWidth: '420px',
                        margin: 0,
                        lineHeight: 1.6
                    }}
                >
                    Continuous learning and hands-on skill validation across agentic AI, software engineering, networking, and agile team execution.
                </p>
            </div>

            {/* Certificates Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem'
                }}
            >
                {certificates.map((cert, idx) => (
                    <motion.div
                        key={cert.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        onClick={() => setSelectedCert(cert)}
                        className="interactive-card cert-card-dtampe"
                        style={{
                            background: '#090909',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Certificate Image Frame */}
                        <div
                            style={{
                                width: '100%',
                                height: '200px',
                                background: '#121212',
                                position: 'relative',
                                overflow: 'hidden',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                            }}
                        >
                            <img
                                src={cert.image}
                                alt={cert.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.85,
                                    transition: 'all 0.4s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                    e.currentTarget.style.transform = 'scale(1.04)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '0.85';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            />

                            <div
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: 'rgba(0, 0, 0, 0.75)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '4px',
                                    fontSize: '0.7rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: '#4ade80',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                <CheckCircle size={12} />
                                VERIFIED
                            </div>
                        </div>

                        {/* Card Info */}
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                    <span
                                        style={{
                                            fontSize: '0.72rem',
                                            fontFamily: "'JetBrains Mono', monospace",
                                            color: '#38bdf8'
                                        }}
                                    >
                                        {cert.category}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: '0.72rem',
                                            fontFamily: "'JetBrains Mono', monospace",
                                            color: 'rgba(255, 255, 255, 0.45)'
                                        }}
                                    >
                                        {cert.date}
                                    </span>
                                </div>

                                <h3
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: '#ffffff',
                                        margin: '0 0 0.4rem 0'
                                    }}
                                >
                                    {cert.title}
                                </h3>

                                <p
                                    style={{
                                        fontSize: '0.85rem',
                                        color: 'rgba(255, 255, 255, 0.55)',
                                        fontFamily: "'Inter', sans-serif",
                                        margin: 0
                                    }}
                                >
                                    {cert.issuer}
                                </p>
                            </div>

                            <div
                                style={{
                                    marginTop: '1.25rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '0.75rem',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.3rem'
                                    }}
                                >
                                    Click to view certificate
                                </span>
                                <Award size={16} color="rgba(255, 255, 255, 0.4)" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Certificate Preview Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            background: 'rgba(0, 0, 0, 0.9)',
                            backdropFilter: 'blur(16px)'
                        }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'relative',
                                maxWidth: '800px',
                                width: '100%',
                                background: '#0a0a0a',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '18px',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', color: '#fff' }}>
                                        {selectedCert.title}
                                    </h3>
                                    <p style={{ margin: '0.3rem 0 0 0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
                                        {selectedCert.issuer} • {selectedCert.date}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedCert(null)}
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
                                        cursor: 'pointer'
                                    }}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div style={{ width: '100%', maxHeight: '60vh', overflow: 'hidden', borderRadius: '10px', background: '#000', display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
                                />
                            </div>

                            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                                {selectedCert.desc}
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
