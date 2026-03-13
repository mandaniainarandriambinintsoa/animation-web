"use client";

import { useEffect, useRef } from "react";

export default function PreviewGlobe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocityRef = useRef(0.008);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 280;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const markers = [
      { lat: 48.8566, lng: 2.3522 },    // Paris
      { lat: 40.7128, lng: -74.006 },   // New York
      { lat: 35.6762, lng: 139.6503 },  // Tokyo
      { lat: -33.8688, lng: 151.2093 }, // Sydney
      { lat: 51.5074, lng: -0.1278 },   // London
      { lat: -23.5505, lng: -46.6333 }, // Sao Paulo
    ];

    const toRad = (d: number) => (d * Math.PI) / 180;

    let animId: number;

    const draw = () => {
      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.38;

      ctx.clearRect(0, 0, size, size);

      // Glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.4);
      glow.addColorStop(0, "rgba(225, 255, 108, 0.06)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      // Globe body
      const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      grad.addColorStop(0, "rgba(60, 60, 60, 0.9)");
      grad.addColorStop(0.7, "rgba(30, 30, 30, 0.9)");
      grad.addColorStop(1, "rgba(15, 15, 15, 0.95)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Grid lines (meridians and parallels)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 0.5;

      // Parallels
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = cy - r * Math.sin(toRad(lat));
        const rr = r * Math.cos(toRad(lat));
        if (rr > 0) {
          ctx.beginPath();
          ctx.ellipse(cx, y, rr, rr * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Meridians
      for (let lng = 0; lng < 180; lng += 30) {
        const angle = toRad(lng) + phiRef.current;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * Math.abs(Math.cos(angle)), r, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.stroke();
      }

      // Markers
      markers.forEach((m) => {
        const latRad = toRad(m.lat);
        const lngRad = toRad(m.lng) + phiRef.current;

        const x3d = Math.cos(latRad) * Math.sin(lngRad);
        const y3d = -Math.sin(latRad);
        const z3d = Math.cos(latRad) * Math.cos(lngRad);

        if (z3d > -0.1) {
          const px = cx + x3d * r;
          const py = cy + y3d * r;
          const opacity = Math.max(0, Math.min(1, z3d + 0.3));

          // Marker glow
          const mg = ctx.createRadialGradient(px, py, 0, px, py, 8);
          mg.addColorStop(0, `rgba(225, 255, 108, ${0.6 * opacity})`);
          mg.addColorStop(1, "transparent");
          ctx.fillStyle = mg;
          ctx.fillRect(px - 8, py - 8, 16, 16);

          // Marker dot
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(225, 255, 108, ${opacity})`;
          ctx.fill();
        }
      });

      // Edge highlight
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      phiRef.current += velocityRef.current;
      animId = requestAnimationFrame(draw);
    };

    draw();

    // Drag interaction
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      velocityRef.current = 0;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      phiRef.current += dx * 0.01;
      lastX.current = e.clientX;
    };
    const onMouseUp = () => {
      isDragging.current = false;
      velocityRef.current = 0.008;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#050505] gap-4">
      <canvas
        ref={canvasRef}
        style={{ width: 280, height: 280, cursor: "grab" }}
      />
      <p className="text-xs text-white/40">Glissez pour tourner le globe</p>
    </div>
  );
}
