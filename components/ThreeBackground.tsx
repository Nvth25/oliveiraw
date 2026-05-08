"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(el.offsetWidth, el.offsetHeight);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.offsetWidth / el.offsetHeight, 0.1, 100);
    camera.position.z = 8;

    // ── Particles ──────────────────────────────────────────────────────────────
    const COUNT = 320;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const c1 = new THREE.Color("#B8C28A");
    const c2 = new THREE.Color("#E8EDD8");

    for (let i = 0; i < COUNT; i++) {
      positions[i*3]   = (Math.random() - 0.5) * 20;
      positions[i*3+1] = (Math.random() - 0.5) * 14;
      positions[i*3+2] = (Math.random() - 0.5) * 8 - 2;
      const t = Math.random();
      const c = c1.clone().lerp(c2, t);
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));

    const mat = new THREE.PointsMaterial({
      size: 0.028, vertexColors: true,
      transparent: true, opacity: 0.5, sizeAttenuation: true,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ── Mouse parallax ─────────────────────────────────────────────────────────
    const mouse  = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const onMouse = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth  - 0.5) * 0.8;
      target.y = (e.clientY / window.innerHeight - 0.5) * -0.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Animate ────────────────────────────────────────────────────────────────
    let raf = 0;
    let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.0006;
      mouse.lerp(target, 0.04);
      camera.position.x += (mouse.x - camera.position.x) * 0.025;
      camera.position.y += (mouse.y - camera.position.y) * 0.025;
      particles.rotation.y = t * 0.12;
      particles.rotation.x = Math.sin(t * 0.4) * 0.04;

      const pos = geo.attributes.position;
      for (let i = 0; i < COUNT; i++) {
        const ny = pos.getY(i) + 0.0004;
        pos.setY(i, ny > 7 ? -7 : ny);
      }
      pos.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = el.offsetWidth, h = el.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      geo.dispose(); mat.dispose(); renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
}
