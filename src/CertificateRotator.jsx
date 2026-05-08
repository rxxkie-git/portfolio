import React from 'react';
import { motion } from 'framer-motion';

const certificates = [
    {
        title: "Agentic AI Saksham",
        issuer: "RV Institute & Capabl",
        date: "Sept 2025",
        image: "/certificates/agentic-ai.png",
        id: "agentic-ai",
    },
    {
        title: "Starfleet Club Appreciation",
        issuer: "RVITM - Antikythera",
        date: "2025",
        image: "/certificates/starfleet-appreciation.jpg",
        id: "starfleet-appreciation",
    },
    {
        title: "Python Bootcamp",
        issuer: "Udemy",
        date: "Mar 2024",
        image: "/certificates/python-bootcamp.jpg",
        id: "python-bootcamp",
    },
    {
        title: "App Development Internship",
        issuer: "Launched Global",
        date: "Internship",
        image: "/certificates/app-dev-internship.png",
        id: "app-dev",
    },
    {
        title: "Networking Basics",
        issuer: "Cisco Networking Academy",
        date: "Nov 2025",
        image: "/certificates/cisco-networking.png",
        id: "cisco-networking",
    },
    {
        title: "Trello for Beginners",
        issuer: "Coursera",
        date: "Oct 2025",
        image: "/certificates/trello-cert.png",
        id: "trello-cert",
    }
];

const CertificateCard = ({ cert }) => (
    <div className="certificate-card">
        {/* Certificate Image Container */}
        <div style={{
            height: '220px',
            width: '100%',
            background: '#000',
            position: 'relative',
            borderBottom: '1px solid #222',
            overflow: 'hidden'
        }}>
            <img
                src={cert.image}
                alt={cert.title}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.9,
                    transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '1'}
                onMouseLeave={(e) => e.target.style.opacity = '0.9'}
            />
        </div>

        {/* Content */}
        <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <h3 style={{
                    margin: '0 0 0.5rem',
                    color: '#fff',
                    fontSize: '1.1rem',
                    fontFamily: "'Outfit', sans-serif"
                }}>
                    {cert.title}
                </h3>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>
                    {cert.issuer}
                </p>
            </div>

            <div style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
                <span style={{
                    color: '#555',
                    fontSize: '0.75rem',
                    border: '1px solid #333',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: '#111'
                }}>
                    {cert.date}
                </span>
            </div>
        </div>
    </div>
);

const CertificateRotator = () => {
    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            padding: '2rem 0',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}>
            <motion.div
                style={{ display: 'flex' }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 35 // Adjusted for more items
                }}
            >
                {/* Duplicate to ensure seamless loop */}
                {[...certificates, ...certificates, ...certificates].map((cert, index) => (
                    <CertificateCard key={`${cert.id}-${index}`} cert={cert} />
                ))}
            </motion.div>
        </div>
    );
};

export default CertificateRotator;
