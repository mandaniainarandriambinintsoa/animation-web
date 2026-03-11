"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Feature cards data (generic) ─── */
const featureCards = [
  { icon: "⚡", text: "Real-time sync across all connected devices with zero latency" },
  { icon: "🔒", text: "End-to-end encryption with zero-knowledge architecture" },
  { icon: "📊", text: "Advanced analytics dashboard with custom reporting" },
  { icon: "🔄", text: "Automated workflows triggered by any event in your pipeline" },
];

/* ─── Concave corner component (clipPath + circle overlay technique) ─── */
function AntiGridCurve({ position }: { position: "top-right" | "top-left" | "bottom-right" }) {
  const rotateMap = { "top-right": "0deg", "top-left": "90deg", "bottom-right": "270deg" };
  const posMap = {
    "top-right": { top: -32.5, right: 0, translate: "100%" },
    "top-left": { top: -32.5, left: 0, translate: "-100%" },
    "bottom-right": { bottom: -32, right: 0, translate: "100%" },
  };

  return (
    <div
      className="absolute"
      style={{
        ...posMap[position],
        rotate: rotateMap[position],
        width: 64,
        height: 64,
        clipPath: "polygon(0 100%, 100% 0, 0 0)",
      }}
    >
      <div className="relative z-0" style={{ width: 66, height: 66, backgroundColor: "#0d0d0d" }} />
      <div
        className="absolute inset-0 z-10 rounded-full"
        style={{ width: 134.5, height: 134.5, backgroundColor: "#020202", border: "1.6px solid #161616" }}
      />
    </div>
  );
}

/* ─── Mini bar chart (generic illustration) ─── */
function MiniBarChart() {
  const bars = [
    { h: 40, color: "#7aff78" },
    { h: 65, color: "#7aff78" },
    { h: 50, color: "#7aff78" },
    { h: 85, color: "#7aff78" },
    { h: 70, color: "#7aff78" },
    { h: 95, color: "#7aff78" },
    { h: 60, color: "#fdac53" },
    { h: 80, color: "#fdac53" },
    { h: 45, color: "#fdac53" },
    { h: 90, color: "#fdac53" },
    { h: 75, color: "#fdac53" },
    { h: 100, color: "#fdac53" },
  ];

  return (
    <div className="flex items-end gap-[6px] h-[140px] px-4">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-[4px] transition-all duration-500"
          style={{
            height: `${bar.h}%`,
            backgroundColor: bar.color,
            opacity: 0.7,
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Timeline mockup (generic) ─── */
function TimelineMockup() {
  const steps = [
    { label: "Data ingestion", duration: "2.4s", width: "100%" },
    { label: "Transform", duration: "1.1s", width: "46%" },
    { label: "Validate", duration: "0.3s", width: "12%" },
    { label: "Deploy", duration: "0.8s", width: "33%" },
  ];

  return (
    <div className="flex flex-col gap-[14px]">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col gap-[4px]">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-white">{step.label}</span>
            <span className="text-[12px] text-[#4b4b4b]">{step.duration}</span>
          </div>
          <div className="h-[6px] rounded-full bg-[#1a1a1a]">
            <div
              className="h-full rounded-full bg-[#18fb6f]"
              style={{ width: step.width, transition: "width 1s ease-out" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="rounded-[42px] border-[1.6px] border-[#161616] bg-[#0d0d0d] p-[24px] flex flex-col justify-between hover:bg-[#111] transition-colors cursor-pointer h-full">
      <span className="text-[28px] mb-[16px]">{icon}</span>
      <p className="text-[14px] font-medium leading-[20px] text-[#939393]">{text}</p>
    </div>
  );
}

/* ─── Main Section — Anti-Grid Bento ─── */
export default function PreviewAntiGridBento() {
  return (
    <div className="relative w-full min-h-[500px] flex items-center justify-center rounded-2xl bg-[#050505] overflow-hidden p-6">
      <div
        className="w-full max-w-[680px] grid gap-[28px]"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "200px 140px 140px",
        }}
      >
        {/* Row 1: Hero card — full width */}
        <div
          className="relative bg-[#0d0d0d] border-[1.6px] border-[#161616] overflow-hidden flex flex-col justify-between p-[20px]"
          style={{ gridColumn: "1 / -1", borderRadius: "42px 42px 42px 0px" }}
        >
          <div className="flex">
            <div
              className="h-[32px] px-[14px] flex items-center rounded-full text-[12px] font-semibold"
              style={{ backgroundColor: "#1a1a1a", border: "1.6px solid #1a1a1a", color: "#cccccc" }}
            >
              Platform overview
            </div>
          </div>
          <div className="flex flex-col gap-[6px] mt-auto">
            <h2 className="text-[24px] font-semibold leading-[28px] text-[#f0f0f0]">
              Ship with confidence
            </h2>
            <p className="text-[13px] font-medium leading-[18px] text-[#939393]">
              Monitor, test and iterate on every deployment.
            </p>
          </div>
        </div>

        {/* Row 2-3, Col 1-3: Chart card */}
        <div
          className="bg-[#0d0d0d] border-[1.6px] border-[#161616] overflow-hidden flex flex-col"
          style={{ gridColumn: "1 / span 3", gridRow: "2 / span 2", borderRadius: "0px 0px 42px 42px" }}
        >
          <div className="flex-1 flex items-center">
            <MiniBarChart />
          </div>
          <div className="p-[16px] pt-0">
            <h3 className="text-[14px] font-medium text-[#f0f0f0]">Performance metrics</h3>
            <p className="text-[13px] text-[#939393]">Track every signal over time</p>
          </div>
        </div>

        {/* Row 2, Col 4: Feature card 1 */}
        <div style={{ gridColumn: "4", gridRow: "2" }}>
          <FeatureCard icon={featureCards[0].icon} text={featureCards[0].text} />
        </div>

        {/* Row 3, Col 4: Feature card 2 */}
        <div style={{ gridColumn: "4", gridRow: "3" }}>
          <FeatureCard icon={featureCards[1].icon} text={featureCards[1].text} />
        </div>

        {/* ═══ Anti-grid overlays — bridges + concave curves ═══ */}

        {/* Overlay 1: Hero → Chart bridge + concave top-right */}
        <div
          className="pointer-events-none relative z-10"
          style={{ gridColumn: "1 / span 3", gridRow: "2 / span 2" }}
        >
          {/* Bridge fills the 28px gap between hero and chart */}
          <div
            className="absolute bg-[#0d0d0d]"
            style={{ top: -32, left: -2, width: "calc(100% + 4px)", height: 34, borderLeft: "1.6px solid #161616" }}
          />
          {/* Concave curve at the junction */}
          <AntiGridCurve position="top-right" />
        </div>
      </div>
    </div>
  );
}
