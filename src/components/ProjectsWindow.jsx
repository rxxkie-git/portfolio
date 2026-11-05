import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowUpRight, Github, Eye, Layers, Sparkles } from 'lucide-react';

const ProjectsWindow = ({ isOpen, onClose, projects, onSelectProject }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('ALL');

    // Prevent body scroll when window is active
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

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Dynamic filtering for other projects
    const categories = ['ALL', 'SYSTEM DESIGN', 'CREATIVE & 3D', 'GAMES & LOGIC'];

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            if (!matchesSearch) return false;

            if (activeFilter === 'ALL') return true;
            if (activeFilter === 'SYSTEM DESIGN') {
                return project.category.includes('SYSTEM') || project.category.includes('ALGORITHMS') || project.tags.includes('Constraint Algorithms');
            }
            if (activeFilter === 'CREATIVE & 3D') {
                return project.category.includes('CREATIVE') || project.category.includes('3D') || project.tags.includes('Three.js') || project.tags.includes('Interactive 3D');
            }
            if (activeFilter === 'GAMES & LOGIC') {
                return project.category.includes('GAMES') || project.tags.includes('Game Theory') || project.tags.includes('Physics Simulation');
            }
            return true;
        });
    }, [projects, searchQuery, activeFilter]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9998,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.25rem',
                    background: 'rgba(0, 0, 0, 0.88)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 24 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1240px',
                        height: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#0a0a0a',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '20px',
                        boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95), 0 0 40px rgba(74, 222, 128, 0.04)',
                        overflow: 'hidden'
                    }}
                >
                    {/* Window Titlebar */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem 1.75rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            background: 'rgba(255, 255, 255, 0.02)',
                            flexShrink: 0
                        }}
                    >
                        {/* OS Dots & Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                    onClick={onClose}
                                    title="Close Window (Esc)"
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: '#ff5f56',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0
                                    }}
                                />
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                            </div>

                            <span
                                style={{
                                    fontSize: '0.78rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    letterSpacing: '0.08em',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Layers size={14} color="#4ade80" />
                                <span>OTHER_PROJECTS.window</span>
                                <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>//</span>
                                <span style={{ color: '#4ade80' }}>{projects.length} OTHER PROJECTS</span>
                            </span>
                        </div>

                        {/* Close Action */}
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
                            title="Close Window"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Controls Bar: Search & Category Chips */}
                    <div
                        style={{
                            padding: '1.25rem 1.75rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            background: 'rgba(12, 12, 12, 0.6)',
                            flexShrink: 0
                        }}
                    >
                        {/* Search Input */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '100px',
                                padding: '0.5rem 1rem',
                                minWidth: '260px',
                                maxWidth: '380px',
                                flex: 1
                            }}
                        >
                            <Search size={15} color="rgba(255, 255, 255, 0.4)" />
                            <input
                                type="text"
                                placeholder="Search other projects or tech..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: '#ffffff',
                                    fontSize: '0.82rem',
                                    fontFamily: "'Inter', sans-serif",
                                    width: '100%'
                                }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'rgba(255, 255, 255, 0.4)',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        padding: 0
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Category Filter Pills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    style={{
                                        background: activeFilter === cat ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                                        color: activeFilter === cat ? '#000000' : 'rgba(255, 255, 255, 0.65)',
                                        border: activeFilter === cat ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                                        borderRadius: '100px',
                                        padding: '0.4rem 0.85rem',
                                        fontSize: '0.72rem',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Window Body: Scrollable Grid */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}
                    >
                        {filteredProjects.length === 0 ? (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '4rem 2rem',
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    textAlign: 'center'
                                }}
                            >
                                <Sparkles size={36} color="rgba(255, 255, 255, 0.2)" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>No projects found</h3>
                                <p style={{ fontSize: '0.85rem', margin: 0 }}>
                                    No projects match "{searchQuery}". Try clearing your search.
                                </p>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                    gap: '1.5rem'
                                }}
                            >
                                {filteredProjects.map((project, idx) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: idx * 0.04 }}
                                        className="interactive-card project-card-dtampe"
                                        style={{
                                            background: '#0d0d0d',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            onClose();
                                            onSelectProject(project);
                                        }}
                                    >
                                        {/* Image Window */}
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '190px',
                                                position: 'relative',
                                                background: '#141414',
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
                                                    objectFit: project.objectFit || 'cover'
                                                }}
                                            />
                                            {/* Tag */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    left: '10px',
                                                    background: 'rgba(0, 0, 0, 0.75)',
                                                    backdropFilter: 'blur(8px)',
                                                    padding: '0.25rem 0.6rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.68rem',
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
                                                    top: '10px',
                                                    right: '10px',
                                                    background: 'rgba(0, 0, 0, 0.75)',
                                                    backdropFilter: 'blur(8px)',
                                                    padding: '0.25rem 0.55rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.68rem',
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                                }}
                                            >
                                                {project.year}
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                                    <h4
                                                        style={{
                                                            fontFamily: "'Space Grotesk', sans-serif",
                                                            fontSize: '1.3rem',
                                                            fontWeight: 700,
                                                            color: '#ffffff',
                                                            margin: 0,
                                                            letterSpacing: '-0.02em'
                                                        }}
                                                    >
                                                        {project.title}
                                                    </h4>
                                                    <span
                                                        style={{
                                                            fontSize: '0.7rem',
                                                            fontFamily: "'JetBrains Mono', monospace",
                                                            color: 'rgba(255, 255, 255, 0.4)'
                                                        }}
                                                    >
                                                        #{project.index}
                                                    </span>
                                                </div>

                                                <p
                                                    style={{
                                                        fontSize: '0.78rem',
                                                        color: '#38bdf8',
                                                        fontFamily: "'Inter', sans-serif",
                                                        fontWeight: 500,
                                                        margin: '0 0 0.6rem 0'
                                                    }}
                                                >
                                                    {project.subtitle}
                                                </p>

                                                <p
                                                    style={{
                                                        fontSize: '0.82rem',
                                                        lineHeight: 1.5,
                                                        color: 'rgba(255, 255, 255, 0.65)',
                                                        fontFamily: "'Inter', sans-serif",
                                                        margin: '0 0 1rem 0'
                                                    }}
                                                >
                                                    {project.desc}
                                                </p>
                                            </div>

                                            {/* Tags & Action Row */}
                                            <div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                                                    {project.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            style={{
                                                                fontSize: '0.68rem',
                                                                fontFamily: "'JetBrains Mono', monospace",
                                                                padding: '0.2rem 0.5rem',
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
                                                                fontSize: '0.68rem',
                                                                fontFamily: "'JetBrains Mono', monospace",
                                                                padding: '0.2rem 0.4rem',
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
                                                        paddingTop: '0.85rem'
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        onClick={() => {
                                                            onClose();
                                                            onSelectProject(project);
                                                        }}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#ffffff',
                                                            fontSize: '0.78rem',
                                                            fontWeight: 600,
                                                            fontFamily: "'Inter', sans-serif",
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.35rem',
                                                            padding: 0
                                                        }}
                                                    >
                                                        <Eye size={13} />
                                                        <span>Case Study</span>
                                                    </button>

                                                    <div style={{ display: 'flex', gap: '0.7rem' }}>
                                                        {project.link && (
                                                            <a
                                                                href={project.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title="Launch Application"
                                                                style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                                                            >
                                                                <ArrowUpRight size={15} />
                                                            </a>
                                                        )}
                                                        {project.source && (
                                                            <a
                                                                href={project.source}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title="GitHub Source"
                                                                style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                                                            >
                                                                <Github size={15} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectsWindow;
