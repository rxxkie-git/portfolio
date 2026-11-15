import React, { useRef, useEffect, useCallback } from 'react';

/**
 * PixelTypography
 * Interactive pixelated typography with a foggy particle effect and cursor-proximity defogging.
 * Seamlessly integrates into the footer without any surrounding window or box borders.
 * Light is emitted strictly from the digital particles themselves without canvas-edge clipping.
 * Displays "SRINAND" in warm amber/orange digital square pixels.
 */
const PixelTypography = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);

    // Mouse & Touch state
    const mouseRef = useRef({
        x: -9999,
        y: -9999,
        active: false,
        lastActiveTime: 0
    });

    // Ripple shockwaves on click/tap
    const ripplesRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let particles = [];
        let ambientParticles = [];
        let width = 0;
        let height = 0;
        let dpr = 1;

        const TEXT = 'SRINAND';
        const BASE_FONT_FAMILY = "'Space Grotesk', 'Inter', -apple-system, sans-serif";

        /**
         * Initialize particles from rasterized text
         */
        const initParticles = () => {
            const rect = container.getBoundingClientRect();
            width = Math.floor(rect.width);
            // Height proportional to width with ample vertical breathing room
            height = width < 640 ? 160 : width < 1024 ? 200 : 240;

            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            // Step size for sampling grid
            let gridStep = 5;
            let pixelBaseSize = 3.6;
            if (width < 640) {
                gridStep = 3.8;
                pixelBaseSize = 2.8;
            } else if (width < 1024) {
                gridStep = 4.5;
                pixelBaseSize = 3.2;
            } else if (width > 1400) {
                gridStep = 5.2;
                pixelBaseSize = 4.0;
            }

            // Create offscreen canvas to render crisp text for sampling
            const offscreen = document.createElement('canvas');
            const offCtx = offscreen.getContext('2d');
            offscreen.width = width;
            offscreen.height = height;

            // Calculate font size dynamically so it never overflows
            let fontSize = Math.floor(width * 0.17);
            fontSize = Math.max(46, Math.min(fontSize, 185));

            offCtx.font = `900 ${fontSize}px ${BASE_FONT_FAMILY}`;
            let measured = offCtx.measureText(TEXT).width;
            const maxAllowed = width * 0.88;
            if (measured > maxAllowed) {
                fontSize = Math.floor(fontSize * (maxAllowed / measured));
                offCtx.font = `900 ${fontSize}px ${BASE_FONT_FAMILY}`;
            }

            offCtx.fillStyle = '#ffffff';
            offCtx.textAlign = 'center';
            offCtx.textBaseline = 'middle';

            if ('letterSpacing' in offCtx) {
                offCtx.letterSpacing = '0.04em';
            }

            const centerY = height / 2 + (fontSize * 0.03);
            offCtx.fillText(TEXT, width / 2, centerY);

            const imgData = offCtx.getImageData(0, 0, width, height);
            const data = imgData.data;

            const newParticles = [];

            // Scan pixels on grid
            for (let y = 0; y < height; y += gridStep) {
                for (let x = 0; x < width; x += gridStep) {
                    const sampleX = Math.round(x);
                    const sampleY = Math.round(y);
                    const idx = (sampleY * width + sampleX) * 4;
                    const alpha = data[idx + 3];

                    // Foreground pixel threshold
                    if (alpha > 75) {
                        // Unique scatter offset for foggy resting state
                        const scatterDist = 6 + Math.random() * 16;
                        const scatterAngle = Math.random() * Math.PI * 2;
                        const phase = Math.random() * Math.PI * 2;
                        const speed = 0.6 + Math.random() * 0.8;

                        // Warm amber/orange palette variation
                        const colorType = Math.random();
                        let hue = 36;
                        let sat = 95;
                        let light = 50;

                        if (colorType < 0.6) {
                            // Core amber
                            hue = 34 + Math.random() * 6;
                            sat = 95 + Math.random() * 5;
                            light = 52 + Math.random() * 8;
                        } else if (colorType < 0.85) {
                            // Rich orange accent
                            hue = 26 + Math.random() * 7;
                            sat = 98;
                            light = 48 + Math.random() * 8;
                        } else {
                            // Bright golden speck
                            hue = 42 + Math.random() * 4;
                            sat = 92;
                            light = 58 + Math.random() * 10;
                        }

                        // Foggy resting alpha
                        const baseAlpha = 0.24 + Math.random() * 0.22;

                        newParticles.push({
                            originX: x,
                            originY: y,
                            x: x + Math.cos(scatterAngle) * scatterDist,
                            y: y + Math.sin(scatterAngle) * scatterDist,
                            scatterDist,
                            scatterAngle,
                            phase,
                            speed,
                            baseSize: pixelBaseSize,
                            hue,
                            sat,
                            light,
                            baseAlpha,
                            currentAlpha: baseAlpha,
                            clarity: 0
                        });
                    }
                }
            }

            particles = newParticles;

            // Generate ambient floating fog particles (drifting misty particles)
            const ambientCount = Math.floor(width < 640 ? 45 : 100);
            const newAmbient = [];
            for (let i = 0; i < ambientCount; i++) {
                newAmbient.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: 1.2 + Math.random() * 1.8,
                    alpha: 0.12 + Math.random() * 0.18,
                    hue: 32 + Math.random() * 12,
                    phase: Math.random() * Math.PI * 2
                });
            }
            ambientParticles = newAmbient;
        };

        initParticles();

        // Resize listener with debounce
        let resizeTimer = null;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                initParticles();
            }, 120);
        };
        window.addEventListener('resize', handleResize);

        // Animation Loop
        let startTime = performance.now();

        const render = (now) => {
            const time = (now - startTime) * 0.001;
            const mouse = mouseRef.current;

            ctx.clearRect(0, 0, width, height);

            // Proximity radius for defogging
            const defogRadius = Math.max(110, Math.min(190, width * 0.17));

            // Update ripple shockwaves
            const activeRipples = [];
            for (let r = 0; r < ripplesRef.current.length; r++) {
                const rip = ripplesRef.current[r];
                rip.radius += rip.speed;
                rip.intensity *= 0.95;
                if (rip.radius < rip.maxRadius && rip.intensity > 0.03) {
                    activeRipples.push(rip);
                }
            }
            ripplesRef.current = activeRipples;

            // Idle ambient scan wave if mouse hasn't been active for > 7 seconds
            const isIdle = !mouse.active && (now - mouse.lastActiveTime > 7000);
            const waveX = isIdle ? ((Math.sin(time * 0.8) * 0.6 + 0.5) * width) : -9999;
            const waveRadius = 135;

            // 1. Render ambient fog particles
            for (let i = 0; i < ambientParticles.length; i++) {
                const ap = ambientParticles[i];
                ap.x += ap.vx;
                ap.y += ap.vy;

                if (ap.x < 0) ap.x = width;
                if (ap.x > width) ap.x = 0;
                if (ap.y < 0) ap.y = height;
                if (ap.y > height) ap.y = 0;

                let alphaBoost = 0;
                if (mouse.active) {
                    const mdx = ap.x - mouse.x;
                    const mdy = ap.y - mouse.y;
                    const mDist = Math.hypot(mdx, mdy);
                    if (mDist < defogRadius && mDist > 0) {
                        const push = (1 - mDist / defogRadius) * 0.8;
                        ap.x += (mdx / mDist) * push;
                        ap.y += (mdy / mDist) * push;
                        alphaBoost = (1 - mDist / defogRadius) * 0.25;
                    }
                }

                const apAlpha = Math.min(1, ap.alpha + alphaBoost + Math.sin(time * 1.5 + ap.phase) * 0.05);
                ctx.fillStyle = `hsla(${ap.hue}, 90%, 55%, ${apAlpha})`;
                ctx.fillRect(Math.round(ap.x), Math.round(ap.y), ap.size, ap.size);
            }

            // 2. Render and update main typography particles
            const particleCount = particles.length;

            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];

                let targetClarity = 0;

                if (mouse.active) {
                    const dx = mouse.x - p.originX;
                    const dy = mouse.y - p.originY;
                    const dist = Math.hypot(dx, dy);

                    if (dist < defogRadius) {
                        const ratio = 1 - (dist / defogRadius);
                        targetClarity = ratio * ratio * (3 - 2 * ratio);
                    }
                } else if (isIdle) {
                    const dx = waveX - p.originX;
                    const dy = (height / 2) - p.originY;
                    const dist = Math.hypot(dx, dy);
                    if (dist < waveRadius) {
                        const ratio = 1 - (dist / waveRadius);
                        targetClarity = (ratio * ratio * (3 - 2 * ratio)) * 0.65;
                    }
                }

                // Apply ripple shockwave clarity boost
                for (let r = 0; r < activeRipples.length; r++) {
                    const rip = activeRipples[r];
                    const ripDist = Math.hypot(rip.x - p.originX, rip.y - p.originY);
                    const ringDist = Math.abs(ripDist - rip.radius);
                    if (ringDist < 60) {
                        const ringFactor = (1 - ringDist / 60) * rip.intensity;
                        targetClarity = Math.max(targetClarity, ringFactor);
                    }
                }

                // Smoothly ease clarity
                const easeSpeed = targetClarity > p.clarity ? 0.16 : 0.08;
                p.clarity += (targetClarity - p.clarity) * easeSpeed;

                // Foggy drifting calculations
                const fogFactor = 1 - p.clarity;
                const driftX = Math.cos(time * p.speed + p.phase) * 3.5;
                const driftY = Math.sin(time * p.speed * 0.75 + p.phase) * 3.5;

                const foggyTargetX = p.originX + (Math.cos(p.scatterAngle) * p.scatterDist + driftX);
                const foggyTargetY = p.originY + (Math.sin(p.scatterAngle) * p.scatterDist + driftY);

                const targetX = p.originX + (foggyTargetX - p.originX) * fogFactor;
                const targetY = p.originY + (foggyTargetY - p.originY) * fogFactor;

                p.x += (targetX - p.x) * 0.22;
                p.y += (targetY - p.y) * 0.22;

                const currentAlpha = p.baseAlpha + (1.0 - p.baseAlpha) * p.clarity;
                const currentLightness = p.light + p.clarity * 20;
                const currentSat = p.sat;

                const renderSize = p.baseSize + (p.clarity * 0.6);
                const drawX = p.clarity > 0.6 ? Math.round(p.x - renderSize / 2) : (p.x - renderSize / 2);
                const drawY = p.clarity > 0.6 ? Math.round(p.y - renderSize / 2) : (p.y - renderSize / 2);

                // Soft particle aura on high clarity (glow strictly attached to the particles)
                if (p.clarity > 0.5) {
                    const auraSize = renderSize * 2.2;
                    ctx.fillStyle = `hsla(${p.hue}, 100%, 55%, ${(p.clarity - 0.5) * 0.2})`;
                    ctx.fillRect(
                        Math.round(p.x - auraSize / 2),
                        Math.round(p.y - auraSize / 2),
                        auraSize,
                        auraSize
                    );
                }

                // Draw main square pixel
                ctx.fillStyle = `hsla(${p.hue}, ${currentSat}%, ${currentLightness}%, ${currentAlpha})`;
                ctx.fillRect(drawX, drawY, renderSize, renderSize);

                // Bright golden-white core highlight for pixels right under cursor
                if (p.clarity > 0.75) {
                    const coreSize = Math.max(1.2, renderSize * 0.45);
                    const coreAlpha = (p.clarity - 0.75) * 4;
                    ctx.fillStyle = `rgba(255, 253, 240, ${coreAlpha * 0.9})`;
                    ctx.fillRect(
                        Math.round(p.x - coreSize / 2),
                        Math.round(p.y - coreSize / 2),
                        coreSize,
                        coreSize
                    );
                }
            }

            animFrameRef.current = requestAnimationFrame(render);
        };

        animFrameRef.current = requestAnimationFrame(render);

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    // Mouse & Touch Interaction Handlers
    const handleMouseMove = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        mouseRef.current.active = true;
        mouseRef.current.lastActiveTime = performance.now();
    }, []);

    const handleMouseEnter = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        mouseRef.current.active = true;
        mouseRef.current.lastActiveTime = performance.now();
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current.active = false;
        mouseRef.current.lastActiveTime = performance.now();
    }, []);

    const handleClick = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        ripplesRef.current.push({
            x: clickX,
            y: clickY,
            radius: 0,
            maxRadius: Math.max(300, rect.width * 0.4),
            speed: 14,
            intensity: 1.0
        });
    }, []);

    // Touch device support
    const handleTouchMove = useCallback((e) => {
        if (!e.touches || e.touches.length === 0) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;
        mouseRef.current.lastActiveTime = performance.now();
    }, []);

    const handleTouchStart = useCallback((e) => {
        if (!e.touches || e.touches.length === 0) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;

        mouseRef.current.x = touchX;
        mouseRef.current.y = touchY;
        mouseRef.current.active = true;
        mouseRef.current.lastActiveTime = performance.now();

        // Trigger shockwave on touch
        ripplesRef.current.push({
            x: touchX,
            y: touchY,
            radius: 0,
            maxRadius: Math.max(260, rect.width * 0.35),
            speed: 12,
            intensity: 0.95
        });
    }, []);

    const handleTouchEnd = useCallback(() => {
        mouseRef.current.active = false;
        mouseRef.current.lastActiveTime = performance.now();
    }, []);

    return (
        <div
            ref={containerRef}
            className="pixel-typography-container"
            style={{
                width: '100%',
                position: 'relative',
                background: 'transparent',
                border: 'none',
                overflow: 'visible',
                margin: '2rem 0'
            }}
        >
            {/* Interactive Canvas (Seamless in footer without window borders or cut-off light) */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    cursor: 'crosshair',
                    touchAction: 'none'
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto'
                    }}
                />
            </div>
        </div>
    );
};

export default PixelTypography;
