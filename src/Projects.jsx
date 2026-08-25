import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Cpu, Terminal, Github, ArrowUpRight, Rocket, Gamepad2, MessageSquare } from 'lucide-react';
import './Projects.css';
import timetableImg from './assets/timetable.png';
import labmanualImg from './assets/labmanual.jpeg';
import portfolioImg from './assets/portfolio.png';
import blackholeImg from './assets/blackhole.png';
import ultimateXoImg from './assets/ultimate-xo.png';
import talqImg from './assets/talq.png';

const projects = [
    {
        title: "Talq",
        desc: "A real-time chat application featuring a sleek dark mode UI, inspired by Discord. Supports direct messages, general chat rooms, and online status tracking.",
        icon: <MessageSquare size={48} />,
        tags: ['React', 'Node.js', 'Socket.io', 'Tailwind CSS'],
        link: "https://talq.onrender.com/",
        source: "https://github.com/rxxkie-git/talq.git",
        color: "#a855f7",
        gradient: "linear-gradient(135deg, #1c1c1c 0%, #4c1d95 100%)",
        image: talqImg,
        objectFit: "contain"
    },
    {
        title: "Timetable Generator",
        desc: "A comprehensive scheduling system featuring individual teacher logins, room allocation, and exclusive admin controls for managing timetables and resources.",
        icon: <Globe size={48} />,
        tags: ['CSS', 'JavaScript', 'HTML', 'Python'],
        link: "https://github.com/Likith-04/Tibl.ai",
        source: "https://github.com/Likith-04/Tibl.ai",
        color: "#a855f7",
        gradient: "linear-gradient(135deg, #1c1c1c 0%, #2d1b4e 100%)",
        image: timetableImg
    },
    {
        title: "Lab Manual Assistant",
        desc: "AI-powered lab manual assistant leveraging large language models and vector search to deliver context-aware, accurate academic guidance.",
        icon: <Cpu size={48} />,
        tags: ['Python', 'RAG', 'FAISS', 'Ollama'],
        link: "https://lab-pilot-capbl.vercel.app/",
        source: "https://github.com/rxxkie-git/labpilot",
        color: "#3b82f6",
        gradient: "linear-gradient(135deg, #1c1c1c 0%, #1e3a8a 100%)",
        image: labmanualImg
    },
    {
        title: "Portfolio",
        desc: "A unique developer portfolio website featuring my projects, technical skills, education, and contact details. Developed with a responsive layout, optimized performance, and modern UI design.",
        icon: <Terminal size={48} />,
        tags: ['JavaScript', 'HTML', 'CSS'],
        link: "https://srinand.vercel.app",
        source: "https://github.com/rxxkie-git/portfolio",
        color: "#22c55e",
        gradient: "linear-gradient(135deg, #1c1c1c 0%, #14532d 100%)",
        image: portfolioImg
    },
    {
        title: "Ultimate Tic Tac Toe",
        desc: "A strategic variation of Tic Tac Toe where your move dictates your opponent's next available board. Features independent player constraints and glassmorphism UI.",
        icon: <Gamepad2 size={48} />,
        tags: ['JavaScript', 'HTML5', 'CSS3'],
        link: "/xo-game/index2.html",
        source: "https://github.com/rxxkie-git/portfolio", // Assuming same repo
        color: "#3b82f6",
        gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        image: ultimateXoImg
    },
    {
        title: "Black Hole Game",
        desc: "An immersive interactive game set against a stunning Three.js black hole backdrop. Features multiplayer modes and dynamic gravitational visual effects.",
        icon: <Rocket size={48} />,
        tags: ['JavaScript', 'HTML5', 'CSS3'],
        link: "/blackhole/index1.html",
        source: "https://github.com/rxxkie-git/portfolio",
        color: "#9333ea",
        gradient: "linear-gradient(135deg, #000000 0%, #4c1d95 100%)",
        image: blackholeImg
    }
];

const Card = ({ i, project, progress, range, targetScale }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="card-container">
            <motion.div
                style={{ scale, top: `calc(10vh + ${i * 40}px)` }}
                className="card-wrapper"
            >
                <div
                    className="project-card-stacked"
                    style={{
                        background: project.gradient,
                        borderTop: `1px solid rgba(255,255,255,0.1)`
                    }}
                >
                    <div className="card-body">
                        <div className="card-content-left">
                            <div className="project-header">
                                <div className="project-icon-box" style={{ color: project.color }}>
                                    {project.icon}
                                </div>
                                <h3 className="project-title">{project.title}</h3>
                            </div>

                            <p className="project-description">
                                {project.desc}
                            </p>

                            <div className="project-tags">
                                {project.tags.map((tag, idx) => (
                                    <span key={idx} className="project-tag">{tag}</span>
                                ))}
                            </div>

                            <div className="project-links">
                                <a href={project.link} className="project-btn primary" style={{ '--hover-color': project.color }}>
                                    View Project <ArrowUpRight size={18} />
                                </a>
                                <a href={project.source} className="project-btn secondary">
                                    <Github size={18} /> Source
                                </a>
                            </div>
                        </div>

                        <div className="card-content-right">
                            <div className="project-image-container">
                                <motion.div
                                    className="project-image-inner"
                                    style={{ scale: imageScale }}
                                >
                                    <div className="image-overlay" />
                                    <img src={project.image} alt={project.title} className="project-actual-image" style={{ objectFit: project.objectFit || 'cover' }} />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Projects = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={container} className="projects-main" id="projects">
            <div className="projects-intro">
                <h2 className="projects-heading">Projects</h2>
                <p className="projects-subheading">A collection of digital experiences.</p>
            </div>

            {projects.map((project, i) => {
                const targetScale = 1 - ((projects.length - i) * 0.05);
                const startRange = i * (1 / projects.length);
                return (
                    <Card
                        key={i}
                        i={i}
                        project={project}
                        progress={scrollYProgress}
                        range={[startRange, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </div>
    );
};

export default Projects;
