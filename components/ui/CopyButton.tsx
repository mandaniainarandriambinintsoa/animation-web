"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white/60 hover:bg-white/15 hover:text-white/80 transition-all"
    >
      {copied ? "Copie !" : "Copier"}
    </button>
  );
}
