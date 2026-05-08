"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── Shaders ─────────────────────────────────────────────────────────────── */
const VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/*
  Domain-warped FBM — 4 octaves (down from 5), single warp pass.
  Warm amber / gold / terracotta on cream. Runs as one fixed canvas
  behind the whole page for performance.
*/
const FRAG = /* glsl */`
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;

  mat2 rot2(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),             hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.52;
    for (int i = 0; i < 4; i++) {   /* 4 octaves — good quality, fast */
      v += a * vnoise(p);
      p  = rot2(0.37) * p * 2.04 + vec2(1.72, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    /* Mouse warp */
    uv += (uMouse - 0.5) * 0.03;

    /* Single domain-warp pass */
    float t = uTime * 0.045;
    vec2 q = vec2(
      fbm(uv * 1.6 + t),
      fbm(uv * 1.6 + vec2(5.2, 1.3) - t * 0.8)
    );

    float f = fbm(uv * 1.2 + 3.2 * q);

    /* Palette */
    vec3 cream = vec3(0.961, 0.945, 0.910);
    vec3 ivory = vec3(0.905, 0.882, 0.848);
    vec3 gold  = vec3(0.820, 0.695, 0.430);
    vec3 amber = vec3(0.775, 0.590, 0.280);
    vec3 terra = vec3(0.650, 0.390, 0.245);

    vec3 col = cream;
    col = mix(col, ivory, smoothstep(0.28, 0.58, f)               * 0.85);
    col = mix(col, gold,  smoothstep(0.38, 0.72, f*f + q.x*0.25)  * 0.68);
    col = mix(col, amber, smoothstep(0.48, 0.82, f + q.y*0.28)    * 0.52);
    col = mix(col, terra, smoothstep(0.60, 0.92, q.x + q.y*0.4)   * 0.30);

    /* Centre bloom keeps text readable */
    float bloom = 1.0 - smoothstep(0.0, 0.70, length(uv - 0.5));
    col = mix(col, cream, bloom * 0.22);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ─── Component ─────────────────────────────────────────────────────────────*/
interface Props {
  /** When true: position:fixed behind the whole page (use once in layout).
   *  When false (default): position:absolute filling nearest relative parent. */
  fixed?: boolean;
}

export function HeroBackground({ fixed = false }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* Renderer — pixel ratio capped at 1 for GPU budget */
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(1);
    renderer.setSize(el.offsetWidth, el.offsetHeight);
    el.appendChild(renderer.domElement);

    /* Fullscreen quad */
    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geo      = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime:  { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    scene.add(new THREE.Mesh(geo, mat));

    /* Mouse */
    const smoothMouse = new THREE.Vector2(0.5, 0.5);
    const rawMouse    = new THREE.Vector2(0.5, 0.5);
    const onMouse = (e: MouseEvent) =>
      rawMouse.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight);
    window.addEventListener("mousemove", onMouse, { passive: true });

    /* RAF loop */
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      uniforms.uTime.value += dt;
      smoothMouse.lerp(rawMouse, 0.06);
      uniforms.uMouse.value.copy(smoothMouse);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    /* Resize */
    const ro = new ResizeObserver(() =>
      renderer.setSize(el.offsetWidth, el.offsetHeight)
    );
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      geo.dispose(); mat.dispose(); renderer.dispose();
      renderer.domElement.parentNode?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      style={
        fixed
          ? { position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }
          : { position: "absolute", inset: 0, pointerEvents: "none" }
      }
    />
  );
}
