import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ChaosSphere: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        // 1. Scene Setup
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color(0x050505); // Match site bg, or transparent

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 2. Particle System
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.15,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const positions = new Float32Array(particleCount * 3);
        const chaosPositions = new Float32Array(particleCount * 3);
        const spherePositions = new Float32Array(particleCount * 3);

        const radius = 10;

        for (let i = 0; i < particleCount; i++) {
            // Chaos Positions (Random Spread)
            chaosPositions[i * 3] = (Math.random() - 0.5) * 80;     // x
            chaosPositions[i * 3 + 1] = (Math.random() - 0.5) * 80; // y
            chaosPositions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z

            // Sphere Positions (Structured)
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;

            spherePositions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
            spherePositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            spherePositions[i * 3 + 2] = radius * Math.cos(phi);

            // Start positions = Chaos
            positions[i * 3] = chaosPositions[i * 3];
            positions[i * 3 + 1] = chaosPositions[i * 3 + 1];
            positions[i * 3 + 2] = chaosPositions[i * 3 + 2];
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Add custom attributes for interpolation
        geometry.setAttribute('targetChaos', new THREE.BufferAttribute(chaosPositions, 3));
        geometry.setAttribute('targetSphere', new THREE.BufferAttribute(spherePositions, 3));

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // 3. Animation Logic
        // Object to tween
        const progress = { value: 0 };

        const updateParticles = () => {
            const positions = particles.geometry.attributes.position.array as Float32Array;
            const chaos = particles.geometry.attributes.targetChaos.array as Float32Array;
            const sphere = particles.geometry.attributes.targetSphere.array as Float32Array;

            for (let i = 0; i < particleCount * 3; i++) {
                // Lerp between chaos and sphere based on progress.value
                positions[i] = chaos[i] + (sphere[i] - chaos[i]) * progress.value;
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // Rotate the whole system slowly
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;
        };

        // ScrollTrigger
        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: canvasRef.current, // Pin the canvas
            onUpdate: (self) => {
                progress.value = self.progress;
            }
        });

        // Loop
        let frameId: number;
        const animate = () => {
            updateParticles();
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        // Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            trigger.kill();
            // geometry.dispose();
            // material.dispose();
            // renderer.dispose();
        };

    }, []);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[#050505]">
            <canvas ref={canvasRef} className="block w-full h-screen" />

            {/* Overlay Text for Scrollytelling context */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="h-screen flex items-center justify-center sticky top-0">
                    <h2 className="text-4xl md:text-6xl font-bold text-white/10 mix-blend-overlay">CHAOS</h2>
                </div>
                <div className="h-screen flex items-center justify-center sticky top-0">
                    {/* Placeholder for center scroll */}
                </div>
                <div className="h-screen flex items-center justify-center sticky top-0">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mix-blend-overlay animate-pulse">STRUCTURE</h2>
                </div>
            </div>
        </section>
    );
};

export default ChaosSphere;
