"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── Shaders ────────────────────────────────────────────────────────────────*/
const VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/*
  Domain-warped FBM fluid on cream base.
  Warm amber / terracotta / gold palette — neutral luxury.
  Two rounds of domain warping produce the organic folding shapes.
*/
const FRAG = /* glsl */`
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;   /* normalized 0-1 */

  /* ── Helpers ── */
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
      mix(hash(i),              hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)),  hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.52;
    for (int i = 0; i < 5; i++) {
      v += a * vnoise(p);
      p  = rot2(0.37) * p * 2.04 + vec2(1.72, 9.2);
      a *= 0.5;
    }
    return v;
  }

  /* ── Main ── */
  void main() {
    vec2 uv = vUv;

    /* Gentle mouse warp */
    vec2 m = uMouse - 0.5;
    uv += m * 0.035;

    /* First warp layer (q) */
    float t1 = uTime * 0.055;
    vec2 q = vec2(
      fbm(uv * 1.6 + vec2(0.0, 0.0) + t1),
      fbm(uv * 1.6 + vec2(5.2, 1.3) - t1 * 0.8)
    );

    /* Second warp layer (r) */
    float t2 = uTime * 0.03;
    vec2 r = vec2(
      fbm(uv * 1.3 + 3.8 * q + vec2(1.7, 9.2) + t2),
      fbm(uv * 1.3 + 3.8 * q + vec2(8.3, 2.8) - t2)
    );

    float f = fbm(uv * 1.1 + 3.5 * r);

    /* ── Colour palette ── */
    vec3 cream  = vec3(0.961, 0.945, 0.910);  /* #F5F1E8 */
    vec3 ivory  = vec3(0.910, 0.890, 0.855);  /* slightly deeper cream */
    vec3 amber  = vec3(0.780, 0.600, 0.300);  /* warm amber */
    vec3 terra  = vec3(0.660, 0.400, 0.260);  /* terracotta */
    vec3 gold   = vec3(0.820, 0.700, 0.440);  /* pale gold */
    vec3 umber  = vec3(0.540, 0.410, 0.280);  /* dark warm umber */

    vec3 col = cream;
    col = mix(col, ivory, smoothstep(0.30, 0.60, f)                        * 0.80);
    col = mix(col, gold,  smoothstep(0.40, 0.75, f * f + q.x * 0.25)      * 0.65);
    col = mix(col, amber, smoothstep(0.50, 0.85, f + r.x * 0.30)          * 0.55);
    col = mix(col, terra, smoothstep(0.60, 0.95, r.y + q.y * 0.40)        * 0.38);
    col = mix(col, umber, smoothstep(0.72, 1.00, f * f * f + r.x * 0.2)   * 0.22);

    /* Subtle radial bloom: keep centre lighter for text legibility */
    float bloom = 1.0 - smoothstep(0.0, 0.75, length(uv - 0.5));
    col = mix(col, cream, bloom * 0.18);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function HeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(el.offsetWidth, el.offsetHeight);
    el.appendChild(renderer.domElement);

    /* ── Fullscreen quad ── */
    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geo      = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime:  { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };
    const mat   = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    scene.add(new THREE.Mesh(geo, mat));

    /* ── Mouse ── */
    const smoothMouse = new THREE.Vector2(0.5, 0.5);
    const rawMouse    = new THREE.Vector2(0.5, 0.5);
    const onMouse = (e: MouseEvent) => {
      rawMouse.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    /* ── Loop ── */
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      uniforms.uTime.value += dt;
      smoothMouse.lerp(rawMouse, 0.05);
      uniforms.uMouse.value.copy(smoothMouse);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    /* ── Resize ── */
    const ro = new ResizeObserver(() => {
      renderer.setSize(el.offsetWidth, el.offsetHeight);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      geo.dispose(); mat.dispose(); renderer.dispose();
      renderer.domElement.parentNode?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
