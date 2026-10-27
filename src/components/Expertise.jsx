import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Layout, Sparkles, Check } from 'lucide-react';

const services = [
    {
        num: '01',
        title: 'Frontend Architecture & WebGL',
        icon: <Layout size={24} />,
        desc: 'Crafting responsive, high-performance web applications with React 19, Next.js, and Canvas 3D geometries. Focused on sub-second load times, fluid micro-interactions, and Swiss typographic clarity.',
        points: [
            'Component-driven modern React architecture',
            'Canvas 3D interactive graphics & shader animations',
            'Framer Motion physics-based transitions',
            'Flawless cross-device responsive engineering'
        ]
    },
    {
        num: '02',
        title: 'Agentic AI & RAG Engineering',
        icon: <Cpu size={24} />,
        desc: 'Designing intelligent AI workflows and retrieval-augmented generation pipelines. Leveraging vector search with FAISS and local LLM backends with Ollama to build hallucination-resistant knowledge assistants.',
        points: [
            'Context-aware RAG pipelines with vector databases',
            'Autonomous agents & prompt engineering guardrails',
            'Local LLM inference optimization (Ollama / Llama)',
            'Integration of semantic document parsers'
        ]
    },
    {
        num: '03',
        title: 'Full-Stack & Real-Time Backends',
        icon: <Database size={24} />,
        desc: 'Building high-throughput API services and real-time WebSocket communication channels using Node.js, Express, Socket.io, and Python.',
        points: [
            'Bi-directional WebSocket streaming (<50ms latency)',
            'RESTful API architecture & role-based authentication',
            'Constraint satisfaction & scheduling algorithms',
            'Clean asynchronous task management'
        ]
    },
    {
        num: '04',
        title: 'UI/UX & Creative Direction',
        icon: <Code2 size={24} />,
        desc: 'Designing intuitive, high-contrast digital products rooted in minimalist design principles. Emphasizing typography, whitespace, and accessibility to make complex systems effortless to navigate.',
        points: [
            'Design systems & reusable UI primitives',
            'Information architecture & user flow optimization',
            'Interactive prototyping & rapid concept iteration',
            'Dark mode first luxury visual aesthetic'
        ]
    }
];

const techStack = [
    { name: 'React', level: 'Advanced', category: 'Frontend' },
    { name: 'JavaScript / ES6+', level: 'Expert', category: 'Core' },
    { name: 'Python', level: 'Advanced', category: 'Backend & AI' },
    { name: 'Node.js', level: 'Advanced', category: 'Backend' },
    { name: 'Socket.io', level: 'Advanced', category: 'Real-Time' },
    { name: 'FAISS / RAG', level: 'Proficient', category: 'AI & Vector' },
    { name: 'Ollama / LLMs', level: 'Proficient', category: 'AI Systems' },
    { name: 'Tailwind CSS', level: 'Advanced', category: 'Styling' },
    { name: 'Framer Motion', level: 'Advanced', category: 'Animation' },
    { name: 'Canvas 3D / WebGL', level: 'Proficient', category: 'Graphics' },
    { name: 'Git & GitHub', level: 'Advanced', category: 'Workflow' },
    { name: 'REST & GraphQL', level: 'Advanced', category: 'API' }
];

const Expertise = () => {
    return (
        <section
            id="expertise"
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
                    marginBottom: '4rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '2rem'
                }}
            >
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
                    <span>● (02) / EXPERTISE & CAPABILITIES</span>
                    <span>•</span>
                    <span>CORE DISCIPLINES</span>
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
                    How I Bring Ideas Into Reality.
                </h2>
            </div>

            {/* 4 Services Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '5rem'
                }}
            >
                {services.map((srv, idx) => (
                    <motion.div
                        key={srv.num}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        style={{
                            background: '#090909',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '2.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'all 0.3s ease'
                        }}
                        className="interactive-card"
                    >
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '1.5rem'
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '0.85rem',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        color: '#38bdf8',
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    // {srv.num}
                                </span>
                                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{srv.icon}</div>
                            </div>

                            <h3
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '1.45rem',
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    margin: '0 0 1rem 0',
                                    letterSpacing: '-0.01em'
                                }}
                            >
                                {srv.title}
                            </h3>

                            <p
                                style={{
                                    fontSize: '0.9rem',
                                    lineHeight: 1.65,
                                    color: 'rgba(255, 255, 255, 0.65)',
                                    fontFamily: "'Inter', sans-serif",
                                    margin: '0 0 1.5rem 0'
                                }}
                            >
                                {srv.desc}
                            </p>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {srv.points.map((pt, i) => (
                                <li
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.82rem',
                                        color: 'rgba(255, 255, 255, 0.85)',
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                >
                                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4ade80' }} />
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Technical Stack Matrix */}
            <div
                style={{
                    background: '#070707',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '2.5rem'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}
                >
                    <div>
                        <span
                            style={{
                                fontSize: '0.72rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                color: 'rgba(255, 255, 255, 0.45)',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase'
                            }}
                        >
                            TECHNICAL TOOLKIT
                        </span>
                        <h4
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: '#ffffff',
                                margin: '0.3rem 0 0 0'
                            }}
                        >
                            Technologies & Tools
                        </h4>
                    </div>

                    <span
                        style={{
                            fontSize: '0.8rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            color: 'rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        PROFICIENCY MATRIX
                    </span>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                        gap: '1rem'
                    }}
                >
                    {techStack.map((tech) => (
                        <div
                            key={tech.name}
                            style={{
                                padding: '1rem',
                                borderRadius: '10px',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.35rem',
                                transition: 'all 0.2s ease'
                            }}
                            className="interactive-card"
                        >
                            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
                                {tech.name}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                                <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)', fontFamily: "'JetBrains Mono', monospace" }}>
                                    {tech.category}
                                </span>
                                <span
                                    style={{
                                        fontSize: '0.7rem',
                                        color: '#38bdf8',
                                        fontFamily: "'JetBrains Mono', monospace"
                                    }}
                                >
                                    {tech.level}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
