import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [transparent, setTransparent] = useState(true);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setTransparent(false);
        } else {
            setTransparent(true);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -100, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                top: '20px',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                zIndex: 100,
                pointerEvents: 'none'
            }}
        >
            <div className="navbar-pill">
                {/* Left: Logo/Name */}
                <div className="navbar-logo">
                    SRINAND
                </div>

                {/* Center: Links */}
                <div className="navbar-links">
                    {['About', 'Skills', 'Certifications', 'Projects'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="navbar-link"
                        >
                            {item}
                        </a>
                    ))}
                </div>

            </div>
        </motion.nav>
    );
};

export default Navbar;
