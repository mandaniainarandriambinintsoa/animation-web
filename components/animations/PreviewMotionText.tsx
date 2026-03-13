"use client";

import { useCallback, useState, useRef, useEffect } from "react";

const SCRAMBLE_CHARS = "!@#$%^&*()_+";
const DEMO_TEXTS = [
  "animation.web",
  "Motion Design",
  "Build & Ship",
  "Pure CSS Magic",
];

export default function PreviewMotionText() {
  const [mode, setMode] = useState<"scramble" | "slide">("scramble");
  const [textIndex, setTextIndex] = useState(0);
  const text = DEMO_TEXTS[textIndex];

  const [displayText, setDisplayText] = useState(text);
  const [revealed, setRevealed] = useState<boolean[]>(new Array(text.length).fill(true));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const animateScramble = useCallback(
    (targetText: string) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const chars = targetText.split("");
      let currentRevealed = 0;

      intervalRef.current = setInterval(() => {
        if (currentRevealed >= chars.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(targetText);
          return;
        }

        setDisplayText(
          chars
            .map((char, i) => {
              if (i < currentRevealed) return char;
              if (char === " ") return " ";
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );

        currentRevealed++;
      }, 35);
    },
    []
  );

  const animateSlide = useCallback((targetText: string) => {
    setRevealed(new Array(targetText.length).fill(false));
    targetText.split("").forEach((_, i) => {
      setTimeout(() => {
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 40);
    });
  }, []);

  const handleTrigger = () => {
    const nextIndex = (textIndex + 1) % DEMO_TEXTS.length;
    setTextIndex(nextIndex);
    const nextText = DEMO_TEXTS[nextIndex];
    if (mode === "scramble") {
      animateScramble(nextText);
    } else {
      setDisplayText(nextText);
      animateSlide(nextText);
    }
  };

  const handleModeSwitch = (newMode: "scramble" | "slide") => {
    setMode(newMode);
    if (newMode === "scramble") {
      animateScramble(text);
    } else {
      setDisplayText(text);
      animateSlide(text);
    }
  };

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => animateScramble(text), 300);
    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0d0d0d] gap-8">
      {/* Text display */}
      <div className="h-14 flex items-center justify-center px-6">
        {mode === "scramble" ? (
          <p
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.2,
              margin: 0,
              fontFamily: "monospace",
              letterSpacing: "0.02em",
            }}
          >
            {displayText}
          </p>
        ) : (
          <p
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.2,
              margin: 0,
              overflow: "hidden",
            }}
          >
            {text.split("").map((char, i) => (
              <span
                key={`${textIndex}-${i}`}
                style={{
                  display: "inline-block",
                  transform: revealed[i] ? "translateY(0)" : "translateY(100%)",
                  opacity: revealed[i] ? 1 : 0,
                  transition:
                    "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        {/* Mode toggle */}
        <div className="flex gap-1 p-1 rounded-lg bg-white/5">
          {(["scramble", "slide"] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleModeSwitch(m)}
              className="px-4 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer"
              style={{
                background: mode === m ? "rgba(225,255,108,0.15)" : "transparent",
                color: mode === m ? "#E1FF6C" : "rgba(255,255,255,0.5)",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          onClick={handleTrigger}
          className="px-5 h-9 rounded-full bg-white/10 text-sm text-white/70 hover:bg-white/15 transition-colors cursor-pointer"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
}
