import React, { useEffect, useRef } from 'react';

/**
 * Ultra-high performance custom cursor.
 * Uses direct DOM manipulation via requestAnimationFrame (0 React re-renders).
 */
const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Disable on touch devices
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let isHovered = false;
        let isClicking = false;
        let animationFrameId;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Direct transform on small dot for zero input lag
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            dot.style.opacity = isHovered ? '0' : '0.9';

            // Check if hovering interactive target
            const target = e.target;
            if (target && target.closest) {
                const interactive = target.closest('a, button, [role="button"], input, textarea, .interactive-card, .clickable');
                isHovered = !!interactive;
                if (isHovered) {
                    ring.style.width = '48px';
                    ring.style.height = '48px';
                    ring.style.borderColor = 'rgba(255, 255, 255, 0.85)';
                    ring.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                } else {
                    ring.style.width = isClicking ? '24px' : '32px';
                    ring.style.height = isClicking ? '24px' : '32px';
                    ring.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    ring.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                }
            }
        };

        const onMouseDown = () => {
            isClicking = true;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(0.85)`;
        };

        const onMouseUp = () => {
            isClicking = false;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(1)`;
        };

        const onMouseLeave = () => {
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        };

        const onMouseEnter = () => {
            dot.style.opacity = '0.9';
            ring.style.opacity = '1';
        };

        // Smooth trailing loop for outer ring
        const render = () => {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    opacity: 0,
                    transition: 'opacity 0.2s ease, transform 0.02s linear',
                    willChange: 'transform'
                }}
            />
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '32px',
                    height: '32px',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 99998,
                    opacity: 0,
                    transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
                    willChange: 'transform'
                }}
            />
        </>
    );
};

export default CustomCursor;
