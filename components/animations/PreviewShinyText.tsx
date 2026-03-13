"use client";

export default function PreviewShinyText() {
  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0d0d0d] overflow-hidden">
      <style>{`
        @keyframes shiny-sweep {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .shiny-text {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          line-height: 1.2;
          text-align: center;
          background-image: linear-gradient(
            90deg,
            #888 0%,
            #888 35%,
            #ffffff 45%,
            #E1FF6C 50%,
            #ffffff 55%,
            #888 65%,
            #888 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shiny-sweep 3s ease-in-out infinite;
        }
        .shiny-sub {
          font-size: 1rem;
          margin-top: 1rem;
          background-image: linear-gradient(
            90deg,
            #555 0%,
            #555 35%,
            #ccc 48%,
            #E1FF6C 50%,
            #ccc 52%,
            #555 65%,
            #555 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shiny-sweep 3s ease-in-out infinite;
          animation-delay: 0.3s;
        }
      `}</style>

      <h2 className="shiny-text">
        Shiny Premium
        <br />
        Text
      </h2>
      <p className="shiny-sub">Continuous shimmer sweep effect</p>
    </div>
  );
}
