"use client";

import { useState } from "react";

const tabs = [
  { id: "agents", label: "Agents" },
  { id: "workflows", label: "Workflows" },
  { id: "rag", label: "RAG" },
];

const codeByTab: Record<string, string[]> = {
  agents: [
    'import { Agent } from "@mastra/core/agent";',
    "",
    "const agent = new Agent({",
    '  id: "chef-agent",',
    '  name: "Chef Michel",',
    "  instructions:",
    '    "You are Michel, a practical chef."',
    "});",
  ],
  workflows: [
    'import { createWorkflow } from "@mastra/core";',
    "",
    "const onboarding = createWorkflow({",
    '  id: "onboarding-workflow",',
    "  steps: [validate, create],",
    "})",
    "  .then(sendEmail)",
    "  .commit();",
  ],
  rag: [
    'import { createVectorQueryTool } from "@mastra/rag";',
    "",
    "const ragTool = createVectorQueryTool({",
    '  indexName: "knowledge-base",',
    '  vectorStoreName: "pgVector",',
    "  topK: 5,",
    "});",
    "",
  ],
};

export default function PreviewAntiGridTabs() {
  const [activeTab, setActiveTab] = useState("agents");
  const activeIdx = tabs.findIndex((t) => t.id === activeTab);

  const contentRadius = {
    borderTopLeftRadius: activeIdx === 0 ? 0 : 32,
    borderTopRightRadius: activeIdx === 2 ? 0 : 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#080808]">
      <div className="w-[420px]">
        {/* Tabs */}
        <div className="grid grid-cols-3 gap-3 relative" style={{ zIndex: 10 }}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <div key={tab.id} className="relative">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full h-[56px] flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "rounded-t-[32px] rounded-b-none bg-[#0d0d0d] text-white"
                      : "rounded-[32px] bg-[#0d0d0d] text-[#666] hover:bg-[#141414] hover:text-[#999]"
                  }`}
                  style={{
                    cursor: isActive ? "default" : "pointer",
                    borderTop: "1.6px solid #1a1a1a",
                    borderLeft: "1.6px solid #1a1a1a",
                    borderRight: "1.6px solid #1a1a1a",
                    borderBottom: isActive ? "1.6px solid #0d0d0d" : "1.6px solid #1a1a1a",
                  }}
                >
                  {tab.label}
                </button>

                {/* Bridge with concave corners */}
                {isActive && (
                  <div
                    className="absolute pointer-events-none"
                    style={{ top: 56, left: 0, width: "100%", height: 12, zIndex: 20 }}
                  >
                    <div className="w-full h-full bg-[#0d0d0d]" />

                    {/* Left concave */}
                    {idx !== 0 && (
                      <div
                        className="absolute overflow-hidden"
                        style={{ left: "1.6px", bottom: 0, transform: "translateX(-100%)", width: 32, height: 32 }}
                      >
                        <div style={{ width: "100%", height: "100%", borderRadius: "0 0 32px 0", boxShadow: "0 0 0 32px #0d0d0d" }} />
                      </div>
                    )}

                    {/* Right concave */}
                    {idx !== 2 && (
                      <div
                        className="absolute overflow-hidden"
                        style={{ right: "1.6px", bottom: 0, transform: "translateX(100%)", width: 32, height: 32 }}
                      >
                        <div style={{ width: "100%", height: "100%", borderRadius: "0 0 0 32px", boxShadow: "0 0 0 32px #0d0d0d" }} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Content card */}
        <div
          className="border-[1.6px] border-[#1a1a1a] border-t-0 bg-[#0d0d0d] overflow-hidden"
          style={{ ...contentRadius, marginTop: 12, zIndex: 5, position: "relative" }}
        >
          <div key={activeTab} className="p-5">
            <pre className="text-[13px] leading-[24px] font-mono text-white/70">
              {codeByTab[activeTab].map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-[#333] select-none shrink-0">&#9679;</span>
                  <span>{line || "\u00A0"}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
