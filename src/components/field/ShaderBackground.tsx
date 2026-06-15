"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Self-hosted three.js shader background (replaces the external Unicorn embed,
// which also clears its console errors). Navy field with flowing electric-blue
// warp lines. Fixed -z-10, DPR-clamped, paused when the tab is hidden, and
// frozen (single frame) under reduced-motion.
const VERT = `void main(){ gl_Position = vec4(position, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 resolution;
uniform float time;

void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  float t = time * 0.05;
  float lineWidth = 0.002;

  float v = 0.0;
  for (int i = 0; i < 5; i++) {
    v += lineWidth * float(i * i) /
      abs(fract(t + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
  }

  vec3 navy = vec3(0.035, 0.045, 0.14);
  vec3 blue = vec3(0.0, 0.24, 1.0);
  vec3 bright = vec3(0.17, 0.36, 1.0);
  vec3 col = navy + blue * clamp(v, 0.0, 1.2) + bright * clamp(v - 0.7, 0.0, 0.6);
  gl_FragColor = vec4(col, 1.0);
}
`;

export function ShaderBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG });
    scene.add(new THREE.Mesh(geometry, material));

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      return; // no WebGL: the CSS fallback under this layer shows
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };
    onResize();
    window.addEventListener("resize", onResize);

    let raf = 0;
    let running = true;
    const animate = () => {
      if (!running) return;
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    if (reduced) {
      renderer.render(scene, camera); // one static frame
    } else {
      animate();
    }

    const onVis = () => {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
      } else if (!reduced && !running) {
        running = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "radial-gradient(120% 100% at 50% 0%, #0e1038 0%, #0a0b26 60%, #07081d 100%)" }}
    >
      <div ref={ref} className="h-full w-full" />
    </div>
  );
}
