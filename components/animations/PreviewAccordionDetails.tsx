"use client";

import { useState, useCallback } from "react";

const items = [
  {
    title: "Comment fonctionne l'animation ?",
    content:
      "L'accordion utilise grid-template-rows: 0fr → 1fr pour animer la hauteur de maniere fluide, sans hack max-height ni JavaScript.",
  },
  {
    title: "Quels navigateurs sont supportes ?",
    content:
      "Chrome 107+, Firefox 106+, Safari 16.4+ supportent la transition sur grid-template-rows. Fallback gracieux sur les anciens navigateurs.",
  },
  {
    title: "Peut-on ouvrir plusieurs items ?",
    content:
      "Oui, via la prop allowMultiple. Par defaut, un seul item est ouvert a la fois — cliquer sur un autre ferme le precedent.",
  },
  {
    title: "Le contenu peut-il etre du JSX ?",
    content:
      "Absolument. La prop content accepte string ou ReactNode. Vous pouvez y mettre des images, des composants, ou du markup complexe.",
  },
];

export default function PreviewAccordionDetails() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  const toggle = useCallback((index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.clear();
        next.add(index);
      }
      return next;
    });
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#0d0d0d] p-6">
      <div className="w-full max-w-md flex flex-col gap-0">
        {items.map((item, i) => {
          const isOpen = openIndices.has(i);
          return (
            <div
              key={i}
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.75rem",
                overflow: "hidden",
                marginTop: i > 0 ? "0.5rem" : 0,
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full cursor-pointer items-center justify-between px-5 py-3.5 text-left"
                style={{
                  background: "transparent",
                  border: "none",
                  color: isOpen ? "#ffffff" : "rgba(255,255,255,0.6)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "color 300ms ease",
                }}
              >
                <span>{item.title}</span>
                <span
                  style={{
                    color: isOpen ? "#E1FF6C" : "rgba(255,255,255,0.4)",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    transition: "transform 300ms ease, color 300ms ease",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 300ms ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div
                    className="px-5 pb-3.5"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "0.8rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
