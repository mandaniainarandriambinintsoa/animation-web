"use client";

import { useState } from "react";

const phrases = [
  "const agent = new Agent();",
  "await agent.run(task);",
  "return agent.result;",
  "agent.deploy('prod');",
];

export default function PreviewCharSpin() {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % phrases.length);
    setKey((prev) => prev + 1);
  };

  const text = phrases[index];

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0a0a0a] gap-6">
      <div
        className="font-mono text-2xl text-[#E1FF6C] h-10 flex items-center"
        style={{ perspective: "500px" }}
      >
        {text.split("").map((char, i) => (
          <span
            key={`${key}-${i}`}
            className="inline-block"
            style={{
              animation: `charSpin 400ms ease-out forwards`,
              animationDelay: `${i * 20}ms`,
              opacity: 0,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <button
        onClick={handleClick}
        className="px-5 h-10 rounded-full bg-white/10 text-sm text-white/70 hover:bg-white/15 transition-colors"
      >
        Changer le texte
      </button>
    </div>
  );
}
