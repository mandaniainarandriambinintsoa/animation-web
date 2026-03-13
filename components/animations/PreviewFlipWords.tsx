"use client";

import { useState, useEffect, useCallback } from "react";

const WORDS = ["beautiful", "modern", "amazing", "creative"];
const INTERVAL = 3000;

export default function PreviewFlipWords() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exit" | "enter">("visible");

  const cycle = useCallback(() => {
    // Start exit animation
    setPhase("exit");

    setTimeout(() => {
      // Switch word and start enter animation
      setCurrentIndex((prev) => (prev + 1) % WORDS.length);
      setPhase("enter");

      setTimeout(() => {
        setPhase("visible");
      }, 400);
    }, 400);
  }, []);

  useEffect(() => {
    const id = setInterval(cycle, INTERVAL);
    return () => clearInterval(id);
  }, [cycle]);

  const getWordStyle = (): React.CSSProperties => {
    switch (phase) {
      case "exit":
        return {
          transform: "translateY(-120%)",
          opacity: 0,
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
        };
      case "enter":
        return {
          transform: "translateY(0)",
          opacity: 1,
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease 0.1s",
        };
      case "visible":
      default:
        return {
          transform: "translateY(0)",
          opacity: 1,
          transition: "none",
        };
    }
  };

  const getInitialTransform = (): React.CSSProperties => {
    if (phase === "enter") {
      // We need to set this before the transition kicks in
      // handled by starting from translateY(80%) via a layout trick
    }
    return {};
  };

  return (
    <div
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl"
      style={{ height: 400, background: "#0d0d0d" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-sm font-medium tracking-widest uppercase" style={{ color: "#737373" }}>
          Dynamic text
        </p>
        <h2 className="flex items-baseline gap-3 text-3xl font-bold md:text-4xl" style={{ color: "#fff" }}>
          <span>Build</span>
          <span
            className="relative inline-block overflow-hidden"
            style={{ height: "1.2em", minWidth: 180 }}
          >
            <span
              key={currentIndex}
              className="absolute left-0 bottom-0 inline-block"
              style={{
                color: "#E1FF6C",
                ...getWordStyle(),
                ...(phase === "enter"
                  ? {
                      // On first render of "enter", start from below
                    }
                  : {}),
              }}
              ref={(el) => {
                if (el && phase === "enter") {
                  // Force start from below
                  el.style.transform = "translateY(80%)";
                  el.style.opacity = "0";
                  el.style.transition = "none";
                  // Trigger reflow then animate in
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      el.style.transform = "translateY(0)";
                      el.style.opacity = "1";
                      el.style.transition =
                        "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease 0.05s";
                    });
                  });
                }
              }}
            >
              {WORDS[currentIndex]}
            </span>
          </span>
          <span>websites</span>
        </h2>

        {/* Word indicators */}
        <div className="mt-4 flex gap-2">
          {WORDS.map((word, i) => (
            <div
              key={word}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentIndex ? 24 : 8,
                height: 8,
                background: i === currentIndex ? "#E1FF6C" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Cycles every 3 seconds with slide animation
        </p>
      </div>
    </div>
  );
}
