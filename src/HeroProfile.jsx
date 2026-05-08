import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Instagram, FileText, Linkedin, Code } from 'lucide-react';
import resumeUrl from './assets/resume.pdf';

const DISCORD_ID = '1116627987404701706';

const SocialLink = ({ icon, href }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, color: '#f472b6', borderColor: '#f472b6' }}
        whileTap={{ scale: 0.95 }}
        style={{
            color: '#e5e5e5',
            padding: '10px',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(5px)',
            cursor: 'pointer'
        }}
    >
        {icon}
    </motion.a>
);

const HeroProfile = () => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
                const result = await response.json();
                if (result.success) {
                    const user = result.data.discord_user;
                    setAvatarUrl(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`);
                }
            } catch (error) {
                console.error("Error fetching avatar:", error);
            }
        };
        fetchAvatar();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
                marginBottom: '2rem',
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }}
        >
            <div className="hero-profile-card">
                {avatarUrl && (
                    <motion.div
                        style={{
                            position: 'relative',
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            padding: '4px',
                            background: 'linear-gradient(135deg, #ff6b6b, #fca5a5, #f87171)', // Warmer tones like reference image
                            boxShadow: '0 0 40px rgba(248, 113, 113, 0.3)',
                            marginBottom: '1rem'
                        }}
                    >
                        <img
                            src={avatarUrl}
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '4px solid #0a0a0a',
                                backgroundColor: '#0a0a0a'
                            }}
                        />
                    </motion.div>
                )}

                <h1 className="hero-profile-name">
                    SRINAND
                </h1>

                <p style={{
                    color: '#f472b6', // Pinkish/Purple text like reference
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    margin: '1rem 0 0 0',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    maxWidth: '80%'
                }}>
                    19-year-old who loves coding, learning about AI. Just figuring it all out and enjoying the process.
                </p>

                <div style={{
                    display: 'flex',
                    gap: '0.8rem',
                    marginTop: '2rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <SocialLink icon={<Github size={20} />} href="https://github.com/rxxkie-git" />
                    <SocialLink icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/srinand-nihal/" />
                    <SocialLink icon={<Twitter size={20} />} href="https://x.com/rookie_nihal" />
                    <SocialLink icon={<Mail size={20} />} href="mailto:5420380.x.srinand@gmail.com" />
                    <SocialLink icon={<Instagram size={20} />} href="https://www.instagram.com/rxxkie_ig/" />
                    <SocialLink icon={<Code size={20} />} href="https://leetcode.com/u/srinandleetc/" />
                    <SocialLink icon={<FileText size={20} />} href={resumeUrl} />
                </div>
            </div>
        </motion.div>
    );
};

export default HeroProfile;
