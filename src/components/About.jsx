import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Instagram, Code, FileText, Disc, Gamepad2, Headphones, Code2, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import resumeUrl from '../assets/resume.pdf';

const DISCORD_ID = '1116627987404701706';

const About = () => {
    const [discordData, setDiscordData] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLanyard = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const result = await response.json();
                if (result.success) {
                    setDiscordData(result.data);
                    const user = result.data.discord_user;
                    if (user && user.avatar) {
                        setAvatarUrl(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`);
                    }
                }
            } catch (err) {
                console.error('Error fetching Discord data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLanyard();
        const interval = setInterval(fetchLanyard, 30000);
        return () => clearInterval(interval);
    }, []);

    const statusColors = {
        online: '#22c55e',
        idle: '#eab308',
        dnd: '#ef4444',
        offline: '#737373'
    };

    const userStatus = discordData?.discord_status || 'online';
    const statusColor = statusColors[userStatus] || '#22c55e';
    const activities = discordData?.activities || [];
    const customStatus = activities.find(a => a.type === 4);
    const primaryActivity = customStatus || activities[0];

    const socials = [
        { name: 'GitHub', icon: <Github size={18} />, href: 'https://github.com/rxxkie-git' },
        { name: 'LinkedIn', icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/srinand-nihal/' },
        { name: 'Twitter/X', icon: <Twitter size={18} />, href: 'https://x.com/rookie_nihal' },
        { name: 'Email', icon: <Mail size={18} />, href: 'mailto:5420380.x.srinand@gmail.com' },
        { name: 'LeetCode', icon: <Code size={18} />, href: 'https://leetcode.com/u/srinandleetc/' },
        { name: 'Instagram', icon: <Instagram size={18} />, href: 'https://www.instagram.com/rxxkie_ig/' },
        { name: 'Resume', icon: <FileText size={18} />, href: resumeUrl }
    ];

    return (
        <section
            id="about"
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
                    <span>● (04) / ABOUT & PERSPECTIVE</span>
                    <span>•</span>
                    <span>THE DEVELOPER</span>
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
                    Engineering with Precision & Taste.
                </h2>
            </div>

            {/* Split Layout: Profile Card + Narrative */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3.5rem',
                    alignItems: 'start'
                }}
            >
                {/* Left: Discord Interactive Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: '#090909',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
                    }}
                    className="interactive-card"
                >
                    {/* Live Discord Avatar Frame */}
                    <div
                        style={{
                            position: 'relative',
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            padding: '4px',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            boxShadow: `0 0 30px ${statusColor}33`,
                            marginBottom: '1.5rem'
                        }}
                    >
                        <img
                            src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                            alt="Srinand Nihal"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                backgroundColor: '#111'
                            }}
                        />

                        {/* Live Presence Indicator Dot */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '6px',
                                right: '6px',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: statusColor,
                                border: '3px solid #090909',
                                boxShadow: `0 0 10px ${statusColor}`
                            }}
                            title={`Discord Status: ${userStatus.toUpperCase()}`}
                        />
                    </div>

                    <h3
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: '#ffffff',
                            margin: '0 0 0.3rem 0',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Srinand Nihal
                    </h3>

                    <p
                        style={{
                            fontSize: '0.85rem',
                            color: '#38bdf8',
                            fontFamily: "'JetBrains Mono', monospace",
                            margin: '0 0 1.25rem 0'
                        }}
                    >
                        Developer & AI Systems Engineer
                    </p>

                    {/* Discord Activity Pill */}
                    <div
                        style={{
                            width: '100%',
                            padding: '0.85rem 1rem',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            marginBottom: '2rem'
                        }}
                    >
                        <span
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: statusColor
                            }}
                        />
                        <span
                            style={{
                                fontSize: '0.78rem',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            {primaryActivity
                                ? `${primaryActivity.name}: ${primaryActivity.state || primaryActivity.details || 'Active'}`
                                : `Discord: ${userStatus.toUpperCase()}`}
                        </span>
                    </div>

                    {/* Metadata Items */}
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.85rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                            paddingTop: '1.5rem',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
                            <MapPin size={16} color="#38bdf8" />
                            <span>Bengaluru, Karnataka, India</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
                            <GraduationCap size={16} color="#4ade80" />
                            <span>RV Institute of Technology & Management</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Narrative & Experience */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                    <div>
                        <h4
                            style={{
                                fontSize: '0.8rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                color: 'rgba(255, 255, 255, 0.45)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                marginBottom: '1rem'
                            }}
                        >
                            THE PHILOSOPHY
                        </h4>
                        <p
                            style={{
                                fontSize: '1.25rem',
                                lineHeight: 1.6,
                                color: '#ffffff',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 500,
                                margin: '0 0 1rem 0'
                            }}
                        >
                            "Software should not merely function; it should feel deliberate, effortless, and visually timeless."
                        </p>
                        <p
                            style={{
                                fontSize: '0.98rem',
                                lineHeight: 1.75,
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontFamily: "'Inter', sans-serif",
                                margin: 0
                            }}
                        >
                            I’m a 19-year-old developer obsessed with the convergence of cutting-edge artificial intelligence and high-craft frontend design. Rather than viewing engineering and aesthetics as separate domains, I treat user interface performance and backend architecture as a single continuous product discipline.
                        </p>
                    </div>

                    <div>
                        <h4
                            style={{
                                fontSize: '0.8rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                color: 'rgba(255, 255, 255, 0.45)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                marginBottom: '1rem'
                            }}
                        >
                            ACADEMIC & COMMUNITY BACKGROUND
                        </h4>
                        <p
                            style={{
                                fontSize: '0.98rem',
                                lineHeight: 1.75,
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontFamily: "'Inter', sans-serif",
                                margin: 0
                            }}
                        >
                            Currently studying Computer Science and Engineering at <strong>RVITM</strong> in Bengaluru. I actively lead technical discussions, build open-source tools, and contribute to campus hackathons through the Antikythera tech club. When I’m not building software, I’m exploring AI research papers, vector search benchmarks, and modern design systems.
                        </p>
                    </div>

                    {/* Social Channels Bar */}
                    <div>
                        <h4
                            style={{
                                fontSize: '0.8rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                color: 'rgba(255, 255, 255, 0.45)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                marginBottom: '1rem'
                            }}
                        >
                            CONNECT & FOLLOW
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {socials.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-pill-dtampe"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.55rem 1rem',
                                        borderRadius: '100px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        color: 'rgba(255, 255, 255, 0.85)',
                                        fontSize: '0.82rem',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 500,
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {s.icon}
                                    <span>{s.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
