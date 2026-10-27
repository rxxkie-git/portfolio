import React, { useEffect, useRef } from 'react';

/**
 * InteractiveScene3D - Pure Seamless 3D Hero Sphere.
 * - Floats naturally with zero card borders or badge pills.
 * - Fluidly tracks cursor movement across the viewport with silk-smooth physics damping.
 * - Smooth continuous gyroscopic rotation and organic breathing motion.
 * - Elegant click-to-pulse harmonic wave.
 */
const InteractiveScene3D = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId;

        const getDimensions = () => {
            const w = canvas.clientWidth || (container ? container.clientWidth : 0) || 400;
            const h = canvas.clientHeight || (container ? container.clientHeight : 0) || 400;
            return { width: Math.max(280, w), height: Math.max(280, h) };
        };

        let { width, height } = getDimensions();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // Gyroscopic rotation angles
        let rotX = 0.25;
        let rotY = 0.45;

        // Smooth mouse target tracking
        let targetTiltX = 0;
        let targetTiltY = 0;
        let currentTiltX = 0;
        let currentTiltY = 0;

        // Harmonic pulse timing
        let pulseStartTime = 0;

        // Build icosahedron-subdivided geodesic sphere
        const buildGeodesic = (rad) => {
            const r = Math.max(50, rad);
            const phi = (1 + Math.sqrt(5)) / 2;
            let vertices = [
                [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
                [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
                [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
            ].map(v => {
                const len = Math.hypot(v[0], v[1], v[2]) || 1;
                return [v[0] / len * r, v[1] / len * r, v[2] / len * r];
            });

            const count = vertices.length;
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const d = Math.hypot(
                        vertices[i][0] - vertices[j][0],
                        vertices[i][1] - vertices[j][1],
                        vertices[i][2] - vertices[j][2]
                    );
                    if (d < r * 1.3) {
                        const mid = [
                            (vertices[i][0] + vertices[j][0]) * 0.5,
                            (vertices[i][1] + vertices[j][1]) * 0.5,
                            (vertices[i][2] + vertices[j][2]) * 0.5,
                        ];
                        const mLen = Math.hypot(mid[0], mid[1], mid[2]) || 1;
                        vertices.push([mid[0] / mLen * r, mid[1] / mLen * r, mid[2] / mLen * r]);
                    }
                }
            }

            const edges = [];
            const threshold = r * 0.65;
            for (let i = 0; i < vertices.length; i++) {
                for (let j = i + 1; j < vertices.length; j++) {
                    const dist = Math.hypot(
                        vertices[i][0] - vertices[j][0],
                        vertices[i][1] - vertices[j][1],
                        vertices[i][2] - vertices[j][2]
                    );
                    if (dist < threshold) {
                        edges.push([i, j]);
                    }
                }
            }

            return { vertices, edges, radius: r };
        };

        let radius = Math.min(width, height) * 0.33;
        let geom = buildGeodesic(radius);

        const particles = Array.from({ length: 30 }, () => ({
            x: (Math.random() - 0.5) * radius * 3.2,
            y: (Math.random() - 0.5) * radius * 3.2,
            z: (Math.random() - 0.5) * radius * 3.2,
            size: Math.random() * 1.3 + 0.6,
            speed: Math.random() * 0.003 + 0.0015
        }));

        let time = 0;

        const render = () => {
            time += 0.012;

            // Ultra-smooth constant rotation
            rotY += 0.0022;
            rotX += 0.0009;

            // Silky damping towards mouse cursor position across the screen
            currentTiltX += (targetTiltX - currentTiltX) * 0.038;
            currentTiltY += (targetTiltY - currentTiltY) * 0.038;

            // Smooth pulse envelope (1.6s duration)
            let pulseProgress = -1;
            let pulseEnvelope = 0;
            if (pulseStartTime > 0) {
                const elapsed = time - pulseStartTime;
                const duration = 1.6;
                if (elapsed < duration) {
                    pulseProgress = elapsed / duration;
                    pulseEnvelope = Math.sin(pulseProgress * Math.PI * 2) * Math.pow(1 - pulseProgress, 1.6);
                } else {
                    pulseStartTime = 0;
                }
            }

            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            const fov = 480;

            const rx = rotX + currentTiltY;
            const ry = rotY + currentTiltX;

            const cosX = Math.cos(rx);
            const sinX = Math.sin(rx);
            const cosY = Math.cos(ry);
            const sinY = Math.sin(ry);

            const project = (x, y, z) => {
                const x1 = x * cosY - z * sinY;
                const z1 = z * cosY + x * sinY;
                const y2 = y * cosX - z1 * sinX;
                const z2 = z1 * cosX + y * sinX;

                const denom = fov + z2 + radius * 1.25;
                const scale = denom > 1 ? fov / denom : 1;
                const px = centerX + x1 * scale;
                const py = centerY + y2 * scale;
                return { px, py, pz: z2, scale };
            };

            // Calculate projected vertices with smooth organic breathing & radial pulse ripple
            const projectedVertices = geom.vertices.map((v, idx) => {
                // Subtle organic idle breathing
                const idleWave = Math.sin(time * 1.5 + idx * 0.28) * 1.8;

                // Fluid harmonic pulse ripple
                let pulseWave = 0;
                if (pulseProgress >= 0) {
                    const vertexDelay = (idx % 8) * 0.045;
                    const vProg = Math.max(0, pulseProgress - vertexDelay);
                    const vEnv = Math.sin(vProg * Math.PI * 2) * Math.pow(Math.max(0, 1 - vProg), 1.6);
                    pulseWave = vEnv * 18;
                }

                const totalDisplacement = idleWave + pulseWave;
                const len = Math.hypot(v[0], v[1], v[2]) || 1;
                const factor = (len + totalDisplacement) / len;
                return project(v[0] * factor, v[1] * factor, v[2] * factor);
            });

            // Ambient floating dust motes
            particles.forEach((p) => {
                p.y -= p.speed * 16;
                if (p.y < -radius * 1.8) p.y = radius * 1.8;
                const proj = project(p.x, p.y, p.z);
                if (Number.isFinite(proj.px) && Number.isFinite(proj.py)) {
                    const alpha = Math.max(0.06, Math.min(0.45, (proj.pz + radius) / (radius * 2)));
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.32})`;
                    ctx.beginPath();
                    ctx.arc(proj.px, proj.py, Math.max(0.5, p.size * proj.scale), 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            const pulseGlow = Math.max(0, pulseEnvelope) * 0.35;

            // Draw geodesic edges
            geom.edges.forEach(([i, j]) => {
                const v1 = projectedVertices[i];
                const v2 = projectedVertices[j];
                if (v1 && v2 && Number.isFinite(v1.px) && Number.isFinite(v1.py) && Number.isFinite(v2.px) && Number.isFinite(v2.py)) {
                    const avgZ = (v1.pz + v2.pz) / 2;
                    const depthRatio = (avgZ + radius) / (radius * 2);
                    const alpha = Math.max(0.04, Math.min(0.85, depthRatio * 0.75 + 0.05 + pulseGlow));

                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = Math.max(0.6, (v1.scale + v2.scale) * (0.65 + pulseGlow * 0.35));
                    ctx.beginPath();
                    ctx.moveTo(v1.px, v1.py);
                    ctx.lineTo(v2.px, v2.py);
                    ctx.stroke();
                }
            });

            // Draw geodesic node vertices
            projectedVertices.forEach((v) => {
                if (v && Number.isFinite(v.px) && Number.isFinite(v.py)) {
                    const depthRatio = (v.pz + radius) / (radius * 2);
                    const alpha = Math.max(0.1, Math.min(1.0, depthRatio + pulseGlow));
                    const baseSize = Math.max(1, v.scale * (2.6 + pulseGlow * 1.3));

                    if (depthRatio > 0.55 || pulseGlow > 0.1) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.18})`;
                        ctx.beginPath();
                        ctx.arc(v.px, v.py, baseSize * 2.2, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(v.px, v.py, baseSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationId = requestAnimationFrame(render);
        };

        render();

        // Screen-wide cursor tracking with smooth normalized offset
        const handleScreenMouseMove = (e) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const globeCenterX = rect.left + rect.width / 2;
            const globeCenterY = rect.top + rect.height / 2;

            const normX = (e.clientX - globeCenterX) / (window.innerWidth * 0.5);
            const normY = (e.clientY - globeCenterY) / (window.innerHeight * 0.5);

            targetTiltX = Math.max(-1.1, Math.min(1.1, normX)) * 0.52;
            targetTiltY = -Math.max(-1.1, Math.min(1.1, normY)) * 0.52;
        };

        const handleClick = () => {
            pulseStartTime = time;
        };

        const handleMouseLeave = () => {
            targetTiltX = 0;
            targetTiltY = 0;
        };

        const handleResize = () => {
            if (!canvas) return;
            const d = getDimensions();
            width = d.width;
            height = d.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            radius = Math.min(width, height) * 0.33;
            geom = buildGeodesic(radius);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleScreenMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('click', handleClick);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleScreenMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (canvas) {
                canvas.removeEventListener('click', handleClick);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="interactive-scene-wrapper"
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: '380px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                userSelect: 'none'
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    background: 'transparent'
                }}
            />
        </div>
    );
};

export default InteractiveScene3D;
