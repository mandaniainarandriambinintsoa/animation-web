"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface StatConfig {
  label: string;
  target: number;
  suffix: string;
  prefix: string;
  decimals: number;
  duration: number; // ms
}

const STATS: StatConfig[] = [
  { label: "Active Users", target: 12847, suffix: "+", prefix: "", decimals: 0, duration: 2000 },
  { label: "Uptime", target: 99.9, suffix: "%", prefix: "", decimals: 1, duration: 1800 },
  { label: "Avg Latency", target: 42, suffix: "ms", prefix: "", decimals: 0, duration: 1500 },
  { label: "Support", target: 24, suffix: "/7", prefix: "", decimals: 0, duration: 1200 },
];

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatNumber(value: number, decimals: number): string {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }
  const rounded = Math.round(value);
  return rounded.toLocaleString("en-US");
}

function StatBox({ stat, triggered }: { stat: StatConfig; triggered: boolean }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const animate = useCallback(() => {
    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    const progress = Math.min(elapsed / stat.duration, 1);
    const easedProgress = easeOutExpo(progress);
    const currentValue = easedProgress * stat.target;

    setValue(currentValue);

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [stat.duration, stat.target]);

  useEffect(() => {
    if (triggered) {
      startTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, animate]);

  return (
    <div
      className="flex flex-col items-center gap-2 rounded-xl p-6"
      style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        flex: "1 1 0",
        minWidth: 140,
      }}
    >
      <span
        className="text-3xl font-bold tabular-nums tracking-tight md:text-4xl"
        style={{ color: "#E1FF6C" }}
      >
        {stat.prefix}
        {formatNumber(value, stat.decimals)}
        {stat.suffix}
      </span>
      <span className="text-xs font-medium tracking-wider uppercase" style={{ color: "#737373" }}>
        {stat.label}
      </span>
    </div>
  );
}

export default function PreviewNumberTicker() {
  const [triggered, setTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleReplay = () => {
    setTriggered(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTriggered(true);
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-xl px-4"
      style={{ height: 400, background: "#050505" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold" style={{ color: "#fff" }}>
          Platform Statistics
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Numbers animate on scroll with easeOutExpo
        </p>
      </div>

      {/* Stats grid */}
      <div className="flex w-full max-w-2xl flex-wrap justify-center gap-3">
        {STATS.map((stat) => (
          <StatBox key={stat.label} stat={stat} triggered={triggered} />
        ))}
      </div>

      {/* Replay button */}
      <button
        onClick={handleReplay}
        className="rounded-full px-5 py-2 text-xs font-medium transition-colors"
        style={{
          border: "1px solid #1a1a1a",
          color: "#737373",
          background: "transparent",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(225,255,108,0.4)";
          e.currentTarget.style.color = "#E1FF6C";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#1a1a1a";
          e.currentTarget.style.color = "#737373";
        }}
      >
        Replay animation
      </button>
    </div>
  );
}
