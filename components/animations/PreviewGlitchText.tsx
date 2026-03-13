"use client";

export default function PreviewGlitchText() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#050505] overflow-hidden">
      <style>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }

        .glitch-text {
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #ffffff;
          position: relative;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .glitch-text::before {
          color: #00ffff;
          z-index: -1;
          animation: glitch-cyan 2s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          color: #ff0040;
          z-index: -2;
          animation: glitch-red 2.5s infinite linear alternate-reverse;
        }

        @keyframes glitch-cyan {
          0% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(-2px, -1px);
          }
          5% {
            clip-path: inset(10% 0 85% 0);
            transform: translate(2px, 1px);
          }
          10% {
            clip-path: inset(80% 0 1% 0);
            transform: translate(-1px, 2px);
          }
          15% {
            clip-path: inset(25% 0 58% 0);
            transform: translate(0px, -2px);
          }
          20% {
            clip-path: inset(53% 0 29% 0);
            transform: translate(3px, 0px);
          }
          25% {
            clip-path: inset(15% 0 72% 0);
            transform: translate(-3px, 1px);
          }
          30% {
            clip-path: inset(68% 0 15% 0);
            transform: translate(1px, -1px);
          }
          35% {
            clip-path: inset(42% 0 43% 0);
            transform: translate(-2px, 2px);
          }
          40% {
            clip-path: inset(5% 0 88% 0);
            transform: translate(2px, -2px);
          }
          45% {
            clip-path: inset(75% 0 10% 0);
            transform: translate(0px, 1px);
          }
          50% {
            clip-path: inset(33% 0 55% 0);
            transform: translate(-1px, 0px);
          }
          55% {
            clip-path: inset(90% 0 2% 0);
            transform: translate(3px, 2px);
          }
          60% {
            clip-path: inset(18% 0 70% 0);
            transform: translate(-3px, -1px);
          }
          65% {
            clip-path: inset(60% 0 25% 0);
            transform: translate(1px, 1px);
          }
          70% {
            clip-path: inset(8% 0 80% 0);
            transform: translate(-2px, -2px);
          }
          75% {
            clip-path: inset(48% 0 38% 0);
            transform: translate(2px, 0px);
          }
          80% {
            clip-path: inset(72% 0 12% 0);
            transform: translate(0px, 2px);
          }
          85% {
            clip-path: inset(20% 0 65% 0);
            transform: translate(-1px, -1px);
          }
          90% {
            clip-path: inset(55% 0 30% 0);
            transform: translate(3px, 1px);
          }
          95% {
            clip-path: inset(3% 0 90% 0);
            transform: translate(-2px, 0px);
          }
          100% {
            clip-path: inset(35% 0 50% 0);
            transform: translate(1px, -2px);
          }
        }

        @keyframes glitch-red {
          0% {
            clip-path: inset(65% 0 13% 0);
            transform: translate(2px, 1px);
          }
          5% {
            clip-path: inset(22% 0 60% 0);
            transform: translate(-3px, -1px);
          }
          10% {
            clip-path: inset(45% 0 40% 0);
            transform: translate(1px, 2px);
          }
          15% {
            clip-path: inset(85% 0 5% 0);
            transform: translate(-1px, -2px);
          }
          20% {
            clip-path: inset(12% 0 75% 0);
            transform: translate(2px, 0px);
          }
          25% {
            clip-path: inset(58% 0 28% 0);
            transform: translate(-2px, 1px);
          }
          30% {
            clip-path: inset(30% 0 55% 0);
            transform: translate(3px, -1px);
          }
          35% {
            clip-path: inset(78% 0 8% 0);
            transform: translate(0px, 2px);
          }
          40% {
            clip-path: inset(50% 0 35% 0);
            transform: translate(-3px, 0px);
          }
          45% {
            clip-path: inset(8% 0 82% 0);
            transform: translate(1px, -2px);
          }
          50% {
            clip-path: inset(70% 0 18% 0);
            transform: translate(-1px, 1px);
          }
          55% {
            clip-path: inset(38% 0 48% 0);
            transform: translate(2px, -1px);
          }
          60% {
            clip-path: inset(92% 0 1% 0);
            transform: translate(-2px, 2px);
          }
          65% {
            clip-path: inset(15% 0 70% 0);
            transform: translate(0px, -1px);
          }
          70% {
            clip-path: inset(55% 0 30% 0);
            transform: translate(3px, 1px);
          }
          75% {
            clip-path: inset(25% 0 62% 0);
            transform: translate(-1px, 0px);
          }
          80% {
            clip-path: inset(82% 0 5% 0);
            transform: translate(2px, 2px);
          }
          85% {
            clip-path: inset(42% 0 45% 0);
            transform: translate(-3px, -2px);
          }
          90% {
            clip-path: inset(5% 0 88% 0);
            transform: translate(1px, 1px);
          }
          95% {
            clip-path: inset(62% 0 22% 0);
            transform: translate(-2px, -1px);
          }
          100% {
            clip-path: inset(48% 0 38% 0);
            transform: translate(2px, 0px);
          }
        }

        .glitch-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.015) 2px,
            rgba(255, 255, 255, 0.015) 4px
          );
          pointer-events: none;
        }
      `}</style>

      <div className="glitch-wrapper">
        <span className="glitch-text" data-text="GLITCH">
          GLITCH
        </span>
      </div>

      <div className="glitch-scanline" />
    </div>
  );
}
