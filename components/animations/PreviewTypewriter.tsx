"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SENTENCES = [
  "Building the future of the web.",
  "Design with purpose, code with passion.",
  "Animations that tell a story.",
  "Ship fast. Ship beautiful.",
];

const TYPING_SPEED = 60; // ms per character
const DELETE_SPEED = 35; // ms per character
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 500;

export default function PreviewTypewriter() {
  const [displayed, setDisplayed] = useState("");
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const tick = useCallback(() => {
    const current = SENTENCES[sentenceIdx];

    if (!isDeleting) {
      // Typing forward
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, TYPING_SPEED);
      } else {
        // Finished typing, pause then start deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      // Deleting
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        // Finished deleting, move to next sentence
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setSentenceIdx((prev) => (prev + 1) % SENTENCES.length);
        }, PAUSE_AFTER_DELETE);
      }
    }
  }, [displayed, sentenceIdx, isDeleting]);

  useEffect(() => {
    tick();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick]);

  return (
    <div
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl"
      style={{ height: 400, background: "#0d0d0d" }}
    >
      {/* Terminal-like container */}
      <div
        className="w-full max-w-lg rounded-lg"
        style={{
          border: "1px solid #1a1a1a",
          background: "#0a0a0a",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: "1px solid #1a1a1a" }}
        >
          <div className="rounded-full" style={{ width: 12, height: 12, background: "#ff5f57" }} />
          <div className="rounded-full" style={{ width: 12, height: 12, background: "#febc2e" }} />
          <div className="rounded-full" style={{ width: 12, height: 12, background: "#28c840" }} />
          <span className="ml-3 text-xs" style={{ color: "#737373", fontFamily: "monospace" }}>
            typewriter.tsx
          </span>
        </div>

        {/* Content area */}
        <div className="px-6 py-8">
          <div className="flex items-center" style={{ minHeight: 40 }}>
            {/* Prompt symbol */}
            <span
              className="mr-3 text-lg font-bold"
              style={{ color: "#E1FF6C", fontFamily: "monospace" }}
            >
              &gt;
            </span>
            {/* Typed text */}
            <span
              className="text-xl font-medium"
              style={{ color: "#ffffff", fontFamily: "monospace" }}
            >
              {displayed}
            </span>
            {/* Cursor */}
            <span
              className="ml-0.5 inline-block"
              style={{
                width: 2,
                height: 24,
                background: cursorVisible ? "#E1FF6C" : "transparent",
                transition: "background 0.1s",
              }}
            />
          </div>

          {/* Sentence counter */}
          <div className="mt-6 flex items-center gap-4">
            {SENTENCES.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  background:
                    i === sentenceIdx
                      ? "#E1FF6C"
                      : i < sentenceIdx
                        ? "rgba(225,255,108,0.3)"
                        : "rgba(255,255,255,0.08)",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        {TYPING_SPEED}ms typing &middot; {DELETE_SPEED}ms deleting &middot;{" "}
        {SENTENCES.length} sentences
      </p>
    </div>
  );
}
