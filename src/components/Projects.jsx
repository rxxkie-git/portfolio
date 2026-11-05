import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Sparkles, Layers, Eye, Maximize2, FolderGit2 } from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';
import ProjectsWindow from './ProjectsWindow';

import paymentPortalImg from '../assets/payment-portal.png';
import talqImg from '../assets/talq.png';
import labmanualImg from '../assets/labmanual.jpeg';
import timetableImg from '../assets/timetable.png';
import portfolioImg from '../assets/portfolio.png';
import ultimateXoImg from '../assets/ultimate-xo.png';
import blackholeImg from '../assets/blackhole.png';

const projectsData = [
    {
        id: 'payment-portal',
        index: '01',
        title: 'Payment Portal',
        subtitle: 'Enterprise Multi-Tenant Payment Orchestrator & Checkout Engine',
        category: 'FINTECH & ARCHITECTURE',
        year: '2025',
        desc: 'A high-throughput multi-merchant payment orchestration and checkout redirect platform built with Laravel, Inertia.js, and React. Engineered with Domain-Driven Design (DDD) to handle multi-store routing, headless checkout interceptors, and resilient multi-provider payment failovers.',
        vision: 'Modern e-commerce brands often struggle with single-point gateway failures, rigid checkout funnels, and fragmented multi-store management. Payment Portal decouples the checkout layer into an extensible, resilient architecture supporting custom Shopify/WooCommerce interceptors, merchant isolation, and autonomous reconciliations.',
        highlights: [
            'Domain-Driven Design (DDD) & SOLID modular architecture with discrete domain services',
            'Universal checkout redirect interceptors supporting Shopify and WooCommerce (PHP 7.4+)',
            'Multi-provider payment gateway routing (Mamo, Oneway) with transaction lifecycle tracking',
            'High-productivity merchant administration suite crafted with Inertia.js, React, and Shadcn UI'
        ],
        tags: ['Laravel', 'React', 'Inertia.js', 'Tailwind CSS', 'Shopify', 'WooCommerce', 'DDD'],
        link: 'https://github.com/rxxkie-git/payment-portal.git',
        source: 'https://github.com/rxxkie-git/payment-portal.git',
        image: paymentPortalImg,
        objectFit: 'cover'
    },
    {
        id: 'talq',
        index: '02',
        title: 'Talq',
        subtitle: 'Real-Time Discord-Inspired Messaging Architecture',
        category: 'FULL-STACK REAL-TIME',
        year: '2025',
        desc: 'A high-concurrency real-time chat application featuring a sleek dark mode UI inspired by Discord. Engineered with Socket.io for sub-50ms message delivery, room segregation, live status presence, and optimistic UI updates.',
        vision: 'To build a fast, zero-bloat messaging space that replicates the best aspects of modern chat systems—instant delivery, live user presence, and an immersive dark interface—without sluggish enterprise bloat.',
        highlights: [
            'Real-time bi-directional messaging with Socket.io & Node.js backend',
            'Live user presence and Discord-style status indicators',
            'Tailwind CSS custom design system with frictionless mobile experience',
            'Optimistic message rendering and graceful reconnection resilience'
        ],
        tags: ['React', 'Node.js', 'Socket.io', 'Tailwind CSS', 'Express'],
        link: 'https://talq.onrender.com/',
        source: 'https://github.com/rxxkie-git/talq.git',
        image: talqImg,
        objectFit: 'contain'
    },
    {
        id: 'labmanual',
        index: '03',
        title: 'Lab Manual Assistant',
        subtitle: 'Context-Aware Academic AI Powered by RAG & Vector Search',
        category: 'AGENTIC AI & RAG',
        year: '2025',
        desc: 'Academic assistant leveraging Retrieval-Augmented Generation (RAG) and high-dimensional vector embeddings with FAISS to provide precise, hallucination-resistant guidance on university lab manuals.',
        vision: 'Students frequently waste hours deciphering dense laboratory manuals and debugging experiment syntax. LabPilot enables conversational, context-aware querying directly against verified course literature.',
        highlights: [
            'FAISS vector database indexing for fast semantic retrieval of lab manuals',
            'Local & cloud LLM pipelines with Ollama for zero-cost inferences',
            'Prompt-engineered guardrails ensuring strict syllabus compliance',
            'Interactive chat frontend with syntax-highlighted code output'
        ],
        tags: ['Python', 'RAG Pipelines', 'FAISS Vector DB', 'Ollama', 'LangChain'],
        link: 'https://lab-pilot-capbl.vercel.app/',
        source: 'https://github.com/rxxkie-git/labpilot',
        image: labmanualImg,
        objectFit: 'cover'
    },
    {
        id: 'timetable',
        index: '04',
        title: 'Timetable Generator',
        subtitle: 'Automated Academic Scheduling & Conflict Resolution System',
        category: 'SYSTEM DESIGN & ALGORITHMS',
        year: '2025',
        desc: 'A comprehensive academic scheduling engine featuring teacher role-based access, automated room and lab allocations, timetable clash prevention, and dedicated administrative oversight.',
        vision: 'Educational institutions struggle every semester with manual timetable drafting, room conflicts, and teacher double-booking. Tibl.ai automates constraint satisfaction into a clean, instantaneous UI.',
        highlights: [
            'Intelligent constraint satisfaction algorithm preventing instructor clashes',
            'Role-based authentication: Admin management vs. faculty read views',
            'Dynamic room and laboratory capacity allocation matrix',
            'Exportable schedule formats and responsive calendar layouts'
        ],
        tags: ['Python', 'JavaScript', 'HTML5', 'CSS3', 'Constraint Algorithms'],
        link: 'https://github.com/Likith-04/Tibl.ai',
        source: 'https://github.com/Likith-04/Tibl.ai',
        image: timetableImg,
        objectFit: 'cover'
    },
    {
        id: 'portfolio',
        index: '05',
        title: 'Developer Portfolio',
        subtitle: 'Award-Winning WebGL & Swiss Typographic Architecture',
        category: 'CREATIVE DEV & 3D',
        year: '2026',
        desc: 'Personal digital flagship engineered with high-performance Canvas 3D geometries, fluid Framer Motion animations, live Lanyard Discord integration, and Swiss minimalist layout.',
        vision: 'Creating a digital experience that showcases technical rigor and uncompromising aesthetic standards inspired by the best in digital design.',
        highlights: [
            'High-framerate 3D interactive geometry with inertia rotation & tilt',
            'Live Discord Presence synchronization via Lanyard REST & WebSocket API',
            'Ultra-crisp responsive design with Swiss typographic hierarchy',
            'Optimized asset pipeline with zero third-party canvas overhead'
        ],
        tags: ['React 19', 'Framer Motion', 'Interactive 3D', 'Lanyard API', 'Vite'],
        link: 'https://srinand.vercel.app',
        source: 'https://github.com/rxxkie-git/portfolio',
        image: portfolioImg,
        objectFit: 'cover'
    },
    {
        id: 'ultimate-xo',
        index: '06',
        title: 'Ultimate Tic Tac Toe',
        subtitle: 'Recursive Board Strategy & Constraint Resolution Engine',
        category: 'ALGORITHMS & GAMES',
        year: '2025',
        desc: 'A complex strategic variation of Tic Tac Toe where every move dictates which sub-grid the opponent must contest. Engineered with strict recursive state validation and glassmorphic UI.',
        vision: 'Transforming classic combinatorial games into deep strategic puzzles through real-time constraint enforcement and crisp tactile visual feedback.',
        highlights: [
            'Recursive 9x9 board state evaluation engine with dynamic cell locking',
            'Glassmorphic dark UI with animated move transitions',
            'Independent win-state cascade algorithm across macro and micro boards',
            'Zero external dependencies lightweight vanilla implementation'
        ],
        tags: ['JavaScript', 'HTML5', 'CSS3', 'Game Theory', 'State Machines'],
        link: '/xo-game/index2.html',
        source: 'https://github.com/rxxkie-git/portfolio',
        image: ultimateXoImg,
        objectFit: 'cover'
    },
    {
        id: 'blackhole',
        index: '07',
        title: 'Black Hole Cosmos',
        subtitle: 'Interactive Three.js Gravitational WebGL Experience',
        category: 'CREATIVE DEV & 3D',
        year: '2025',
        desc: 'An atmospheric interactive gravitational simulation set against a Three.js black hole canvas with dynamic relativistic visual distortion, particle accretion, and multiplayer mechanics.',
        vision: 'Exploring the intersection of physics-inspired orbital mechanics, shader aesthetics, and real-time interactive canvas gameplay in modern web browsers.',
        highlights: [
            'Particle accretion physics simulation driven by Three.js shaders',
            'Relativistic gravitational lensing post-processing effects',
            'Adaptive frame-rate rendering loop with canvas fallback',
            'Integrated arcade mechanics with high-score tracking'
        ],
        tags: ['Three.js', 'WebGL', 'JavaScript', 'Physics Simulation', 'Canvas'],
        link: '/blackhole/index1.html',
        source: 'https://github.com/rxxkie-git/portfolio',
        image: blackholeImg,
        objectFit: 'cover'
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('ALL');
    const [isWindowOpen, setIsWindowOpen] = useState(false);

    const filteredProjects = filter === 'ALL'
        ? projectsData
        : filter === 'AI'
            ? projectsData.filter(p => p.category.includes('AI') || p.tags.includes('Python'))
            : projectsData.filter(p => p.tags.includes('React') || p.tags.includes('Node.js') || p.tags.includes('JavaScript') || p.tags.includes('Laravel'));

    // Top 3 projects shown on the main page
    const otherProjects = projectsData.slice(3);
    const displayProjects = filter === 'ALL'
        ? filteredProjects.slice(0, 3)
        : filteredProjects;

    return (
        <section
            id="work"
            style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '6rem 2rem',
                position: 'relative'
            }}
        >
            {/* Section Eyebrow & Header */}
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
                        <span>● (01) / SELECTED WORKS</span>
                        <span>•</span>
                        <span>{displayProjects.length} OF {projectsData.length} PROJECTS</span>
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
                        Featured Case Studies.
                    </h2>
                </div>

                {/* Filter Pills & Window Trigger */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div
                        style={{
                            display: 'flex',
                            gap: '0.4rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            padding: '0.35rem',
                            borderRadius: '100px',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                    >
                        {['ALL', 'AI', 'WEB'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                style={{
                                    background: filter === tab ? '#ffffff' : 'transparent',
                                    color: filter === tab ? '#000000' : 'rgba(255, 255, 255, 0.6)',
                                    border: 'none',
                                    borderRadius: '100px',
                                    padding: '0.45rem 1rem',
                                    fontSize: '0.75rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Quick Window Trigger Button */}
                    <button
                        onClick={() => setIsWindowOpen(true)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '100px',
                            padding: '0.45rem 1.1rem',
                            fontSize: '0.75rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            transition: 'all 0.25s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                            e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                        }}
                    >
                        <Layers size={13} color="#4ade80" />
                        <span>OTHER PROJECTS ({otherProjects.length})</span>
                    </button>
                </div>
            </div>

            {/* Editorial Projects Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '2.5rem'
                }}
            >
                {displayProjects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        className="interactive-card project-card-dtampe"
                        style={{
                            background: '#090909',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '18px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'border-color 0.3s ease, transform 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedProject(project)}
                    >
                        {/* Image Preview Window */}
                        <div
                            style={{
                                width: '100%',
                                height: '240px',
                                position: 'relative',
                                background: '#121212',
                                overflow: 'hidden',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                            }}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="project-card-image"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: project.objectFit || 'cover',
                                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                            />

                            {/* Hover Overlay Tag */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    background: 'rgba(0, 0, 0, 0.75)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '0.3rem 0.65rem',
                                    borderRadius: '6px',
                                    fontSize: '0.7rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: '#ffffff',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                {project.category}
                            </div>

                            <div
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: 'rgba(0, 0, 0, 0.75)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '0.3rem 0.65rem',
                                    borderRadius: '6px',
                                    fontSize: '0.7rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                {project.year}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3
                                        style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontSize: '1.6rem',
                                            fontWeight: 700,
                                            color: '#ffffff',
                                            margin: 0,
                                            letterSpacing: '-0.02em',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem'
                                        }}
                                    >
                                        <span>{project.title}</span>
                                    </h3>
                                    <ArrowUpRight size={18} color="rgba(255, 255, 255, 0.5)" />
                                </div>

                                <p
                                    style={{
                                        fontSize: '0.85rem',
                                        color: '#38bdf8',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 500,
                                        margin: '0 0 0.8rem 0'
                                    }}
                                >
                                    {project.subtitle}
                                </p>

                                <p
                                    style={{
                                        fontSize: '0.9rem',
                                        lineHeight: 1.6,
                                        color: 'rgba(255, 255, 255, 0.65)',
                                        fontFamily: "'Inter', sans-serif",
                                        margin: '0 0 1.25rem 0'
                                    }}
                                >
                                    {project.desc}
                                </p>
                            </div>

                            {/* Tags & Action Row */}
                            <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.4rem',
                                        marginBottom: '1.25rem'
                                    }}
                                >
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            style={{
                                                fontSize: '0.72rem',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                padding: '0.25rem 0.6rem',
                                                borderRadius: '4px',
                                                background: 'rgba(255, 255, 255, 0.04)',
                                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                                color: 'rgba(255, 255, 255, 0.75)'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <span
                                            style={{
                                                fontSize: '0.72rem',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                padding: '0.25rem 0.5rem',
                                                color: 'rgba(255, 255, 255, 0.4)'
                                            }}
                                        >
                                            +{project.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                                        paddingTop: '1rem'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#ffffff',
                                            fontSize: '0.82rem',
                                            fontWeight: 600,
                                            fontFamily: "'Inter', sans-serif",
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            padding: 0
                                        }}
                                    >
                                        <Eye size={14} />
                                        <span>Case Study</span>
                                    </button>

                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Visit Live Application"
                                                style={{
                                                    color: 'rgba(255, 255, 255, 0.65)',
                                                    transition: 'color 0.2s'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)')}
                                            >
                                                <ArrowUpRight size={17} />
                                            </a>
                                        )}
                                        {project.source && (
                                            <a
                                                href={project.source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="View GitHub Repository"
                                                style={{
                                                    color: 'rgba(255, 255, 255, 0.65)',
                                                    transition: 'color 0.2s'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)')}
                                            >
                                                <Github size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* More Projects Editorial Card right after the 3rd project */}
                {filter === 'ALL' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="interactive-card"
                        style={{
                            background: 'linear-gradient(145deg, rgba(22, 22, 22, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                            border: '1px dashed rgba(255, 255, 255, 0.2)',
                            borderRadius: '18px',
                            padding: '2.5rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            minHeight: '380px'
                        }}
                        onClick={() => setIsWindowOpen(true)}
                    >
                        {/* Glow accent */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-30px',
                                right: '-30px',
                                width: '180px',
                                height: '180px',
                                background: 'radial-gradient(circle, rgba(74, 222, 128, 0.16) 0%, transparent 70%)',
                                borderRadius: '50%',
                                pointerEvents: 'none'
                            }}
                        />

                        <div>
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'rgba(74, 222, 128, 0.1)',
                                    border: '1px solid rgba(74, 222, 128, 0.25)',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '100px',
                                    fontSize: '0.72rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: '#4ade80',
                                    marginBottom: '1.5rem'
                                }}
                            >
                                <Layers size={13} />
                                <span>+{otherProjects.length} OTHER PROJECTS</span>
                            </div>

                            <h3
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    margin: '0 0 1rem 0',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.2
                                }}
                            >
                                Explore Other Projects.
                            </h3>

                            <p
                                style={{
                                    fontSize: '0.9rem',
                                    lineHeight: 1.6,
                                    color: 'rgba(255, 255, 255, 0.65)',
                                    fontFamily: "'Inter', sans-serif",
                                    margin: '0 0 1.5rem 0'
                                }}
                            >
                                Open the window to view my other works including academic scheduling tools, interactive WebGL simulations, and logic games.
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {otherProjects.map((p) => (
                                    <span
                                        key={p.id}
                                        style={{
                                            fontSize: '0.72rem',
                                            fontFamily: "'JetBrains Mono', monospace",
                                            padding: '0.25rem 0.6rem',
                                            borderRadius: '4px',
                                            background: 'rgba(255, 255, 255, 0.04)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            color: 'rgba(255, 255, 255, 0.8)'
                                        }}
                                    >
                                        {p.title}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                paddingTop: '1.25rem'
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    fontFamily: "'Inter', sans-serif",
                                    color: '#4ade80',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                <span>View Other Projects</span>
                                <ArrowUpRight size={16} />
                            </span>
                            <span style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255, 255, 255, 0.4)' }}>
                                {otherProjects.length} OTHER WORKS
                            </span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Standalone Other Projects Window Modal */}
            <ProjectsWindow
                isOpen={isWindowOpen}
                onClose={() => setIsWindowOpen(false)}
                projects={otherProjects}
                onSelectProject={(project) => setSelectedProject(project)}
            />

            {/* Case Study Modal */}
            <CaseStudyModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default Projects;
