import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SalesFunnel: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeStage, setActiveStage] = useState(0);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        // --- 1. Scene Setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 20;
        camera.position.y = 0;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // --- 2. Objects ---

        // A. Funnel Wireframe (Visual Guide)
        const funnelGeo = new THREE.CylinderGeometry(8, 2, 12, 16, 8, true);
        const funnelMat = new THREE.MeshBasicMaterial({
            color: 0x444444,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const funnelMesh = new THREE.Mesh(funnelGeo, funnelMat);
        scene.add(funnelMesh);

        // B. Checkpoint Rings
        const ringGeo = new THREE.TorusGeometry(6, 0.05, 16, 100);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.4 }); // Blue
        const ring1 = new THREE.Mesh(ringGeo, ringMat1);
        ring1.position.y = 3;
        ring1.rotation.x = Math.PI / 2;
        scene.add(ring1);

        const ringGeo2 = new THREE.TorusGeometry(3.5, 0.05, 16, 100);
        const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.4 }); // Purple
        const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
        ring2.position.y = -2;
        ring2.rotation.x = Math.PI / 2;
        scene.add(ring2);

        // C. Particles
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        // Data Arrays
        const posArray = new Float32Array(particleCount * 3);
        const colorArray = new Float32Array(particleCount * 3);

        // Target Positions for Interpolation
        const startPos = new Float32Array(particleCount * 3); // Chaos (Top)
        const midPos1 = new Float32Array(particleCount * 3); // Entering Funnel
        const midPos2 = new Float32Array(particleCount * 3); // Deep Funnel
        const endPos = new Float32Array(particleCount * 3);  // Conversion Burst

        const colorGrey = new THREE.Color(0x888888);
        const colorBlue = new THREE.Color(0x3b82f6);
        const colorPurple = new THREE.Color(0x8b5cf6);
        const colorGold = new THREE.Color(0xfacc15);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // 1. Chaos (Scattered everywhere, mostly top)
            startPos[i3] = (Math.random() - 0.5) * 40;
            startPos[i3 + 1] = 10 + (Math.random() * 20); // High up
            startPos[i3 + 2] = (Math.random() - 0.5) * 20;

            // 2. Mid 1 (Entering Ring 1)
            const r1 = Math.random() * 6;
            const theta = Math.random() * Math.PI * 2;
            const y1 = 6 - (Math.random() * 6); // 6 to 0
            midPos1[i3] = r1 * Math.cos(theta);
            midPos1[i3 + 1] = y1;
            midPos1[i3 + 2] = r1 * Math.sin(theta);

            // 3. Mid 2 (Narrowing to Ring 2)
            const r2 = Math.random() * 3 + 1; // Tighter
            const y2 = -2 - (Math.random() * 4); // -2 to -6
            midPos2[i3] = r2 * Math.cos(theta);
            midPos2[i3 + 1] = y2;
            midPos2[i3 + 2] = r2 * Math.sin(theta);

            // 4. Burst (Bottom Exit)
            midPos2[i3] = r2 * Math.cos(theta);

            endPos[i3] = (Math.random() - 0.5) * 30; // Wide burst x
            endPos[i3 + 1] = -15 - (Math.random() * 10); // Far bottom
            endPos[i3 + 2] = (Math.random() - 0.5) * 10;

            // Initial Set
            posArray[i3] = startPos[i3];
            posArray[i3 + 1] = startPos[i3 + 1];
            posArray[i3 + 2] = startPos[i3 + 2];

            // Initial Color
            colorArray[i3] = colorGrey.r;
            colorArray[i3 + 1] = colorGrey.g;
            colorArray[i3 + 2] = colorGrey.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);


        // --- 3. Animation Logic ---
        const progress = { val: 0 }; // 0 to 3

        // ScrollTrigger
        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: canvasRef.current,
            onUpdate: (self) => {
                const p = self.progress * 3; // Scale to stage count
                progress.val = p;

                // Sync Text Stage
                if (p < 0.5) setActiveStage(0);
                else if (p < 1.5) setActiveStage(1);
                else if (p < 2.5) setActiveStage(2);
                else setActiveStage(3);
            }
        });

        // Frame Loop
        let frameId: number;
        const animate = () => {
            const p = progress.val;
            const positions = particles.geometry.attributes.position.array as Float32Array;
            const colors = particles.geometry.attributes.color.array as Float32Array;

            // Interpolation Logic
            // Stage 0->1: Start -> Mid1
            // Stage 1->2: Mid1 -> Mid2
            // Stage 2->3: Mid2 -> End

            const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

            // Determine which segment we are in
            let source, target, localT, startColor, endColor;

            if (p < 1) {
                source = startPos; target = midPos1; localT = p;
                startColor = colorGrey; endColor = colorBlue;
                // Ring 1 Glow
                ringMat1.opacity = 0.2 + (p * 0.5); // Glow up
                ringMat2.opacity = 0.2;
            } else if (p < 2) {
                source = midPos1; target = midPos2; localT = p - 1;
                startColor = colorBlue; endColor = colorPurple;
                ringMat1.opacity = 0.7 - (localT * 0.5); // Fade out
                ringMat2.opacity = 0.2 + (localT * 0.6); // Glow up
            } else {
                source = midPos2; target = endPos; localT = p - 2;
                startColor = colorPurple; endColor = colorGold;
                ringMat1.opacity = 0.2;
                ringMat2.opacity = 0.8 - (localT * 0.8);
            }

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;

                // Position Interpolation
                positions[i3] = lerp(source[i3], target[i3], localT);
                positions[i3 + 1] = lerp(source[i3 + 1], target[i3 + 1], localT);
                positions[i3 + 2] = lerp(source[i3 + 2], target[i3 + 2], localT);

                // Jitter for life
                positions[i3] += (Math.random() - 0.5) * 0.05;
                positions[i3 + 1] += (Math.random() - 0.5) * 0.05;

                // Color Interpolation
                colors[i3] = lerp(startColor.r, endColor.r, localT);
                colors[i3 + 1] = lerp(startColor.g, endColor.g, localT);
                colors[i3 + 2] = lerp(startColor.b, endColor.b, localT);
            }

            particles.geometry.attributes.position.needsUpdate = true;
            particles.geometry.attributes.color.needsUpdate = true;

            // Rotate Funnel
            funnelMesh.rotation.y += 0.002;
            particles.rotation.y += 0.001;

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        // Resizing
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            trigger.kill();
            renderer.dispose();
        };
    }, []);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            <canvas ref={canvasRef} className="block w-full h-screen" />

            {/* Text Overlays - Centered & Fixed */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-500 ${activeStage === 0 ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 text-zinc-500">CHAOS</h2>
                    <p className="text-2xl md:text-3xl text-white font-heebo">מספיק לאבד תנועה באתר</p>
                </div>
                <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-500 ${activeStage === 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 text-blue-500">STRATEGY</h2>
                    <p className="text-2xl md:text-3xl text-white font-heebo">שלב 1: אפיון מדויק ומחקר מתחרים</p>
                </div>
                <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-500 ${activeStage === 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 text-purple-500">DESIGN</h2>
                    <p className="text-2xl md:text-3xl text-white font-heebo">שלב 2: עיצוב וכתיבה פסיכולוגית למכירה</p>
                </div>
                <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-500 ${activeStage === 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 text-yellow-500 animate-pulse">RESULTS</h2>
                    <p className="text-2xl md:text-3xl text-white font-heebo">התוצאה: הופכים גולשים ללידים משלמים</p>
                </div>
            </div>
        </section>
    );
};

export default SalesFunnel;
