"use client";

import Link from "next/link";

const mockups = [
  {
    href: "/dev/mockups/wonky",
    title: "Wonky",
    subtitle: "Playful color-blocks — hot pink, coral, gold + black borders",
    vibe: "Playful / Bold / Wonky",
    palette: ["#F75289", "#F76D52", "#F7C052", "#1a1a1a", "#ffffff"],
    bg: "#FFF8F0",
    text: "#1a1a1a",
    accent: "#F75289",
  },
  {
    href: "/dev/mockups/neobrutal",
    title: "Reef Punk",
    subtitle: "Neo-brutalist — thick borders, hard shadows, bold color blocking",
    vibe: "Neo-Brutal / Bold / Fun",
    palette: ["#FFF3E4", "#FF6B4A", "#2EC4B6", "#FFD166", "#1a1a1a"],
    bg: "#FFF3E4",
    text: "#1a1a1a",
    accent: "#FF6B4A",
  },
  {
    href: "/dev/mockups/edgy",
    title: "Stone & Ink",
    subtitle: "Co-Star inspired — editorial, monochrome, coral accent",
    vibe: "Edgy / Minimal / Dark",
    palette: ["#0a0a0a", "#D4735E", "#6b6560", "#E8E4DF", "#1c1c1c"],
    bg: "#0a0a0a",
    text: "#E8E4DF",
    accent: "#D4735E",
  },
  {
    href: "/dev/mockups/reef",
    title: "Deep Reef",
    subtitle: "Bioluminescent dark — living coral meets ocean teal",
    vibe: "Edgy / Colorful / Dark",
    palette: ["#0f1419", "#FF7B6B", "#4ECDC4", "#F7B267", "#1a1f25"],
    bg: "#0f1419",
    text: "#E1E8ED",
    accent: "#FF7B6B",
  },
  {
    href: "/dev/mockups/playful",
    title: "Tide Pool",
    subtitle: "Warm earth tones — terracotta, sage, sand",
    vibe: "Playful / Warm / Light",
    palette: ["#FFFBF7", "#E07A5F", "#81B29A", "#F2CC8F", "#3D405B"],
    bg: "#FFFBF7",
    text: "#3D405B",
    accent: "#E07A5F",
  },
  {
    href: "/dev/mockups/bubbleaero",
    title: "Bubble Aero",
    subtitle: "Frutiger Aero — glossy glass, bubbles, aquatic gradients",
    vibe: "Glossy / Aquatic / Y2K",
    palette: ["#E0F7FA", "#00BCD4", "#FF6B6B", "#69D2A0", "#FFD93D"],
    bg: "#E0F7FA",
    text: "#1A3C50",
    accent: "#00BCD4",
  },
];

export default function MockupsHub() {
  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{ backgroundColor: "#111", color: "#ccc", fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-1" style={{ color: "#fff" }}>
          Shrimp Talk — Style Explorations
        </h1>
        <p className="mb-10 text-sm" style={{ color: "#666" }}>
          Three directions. Coral-inspired, gender-neutral, designed for dark + light.
        </p>

        <div className="space-y-6">
          {mockups.map((m) => (
            <Link key={m.href} href={m.href} className="block group">
              <div
                className="rounded-2xl p-6 border transition-all duration-200 group-hover:scale-[1.01]"
                style={{
                  backgroundColor: "#1a1a1a",
                  borderColor: "#2a2a2a",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold mb-1" style={{ color: m.accent }}>
                      {m.title}
                    </h2>
                    <p className="text-sm" style={{ color: "#888" }}>
                      {m.subtitle}
                    </p>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#252525", color: "#777" }}
                  >
                    {m.vibe}
                  </span>
                </div>

                {/* Color swatches */}
                <div className="flex gap-2">
                  {m.palette.map((color, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className="w-10 h-10 rounded-lg border"
                        style={{ backgroundColor: color, borderColor: "#333" }}
                      />
                      <span className="text-[9px]" style={{ color: "#555" }}>
                        {color}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Preview bar */}
                <div
                  className="mt-4 rounded-xl p-4 flex items-center gap-3"
                  style={{ backgroundColor: m.bg }}
                >
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: m.accent }}
                  />
                  <div className="flex-1">
                    <div
                      className="h-2.5 rounded-full w-24 mb-1.5"
                      style={{ backgroundColor: m.text, opacity: 0.6 }}
                    />
                    <div
                      className="h-2 rounded-full w-40"
                      style={{ backgroundColor: m.text, opacity: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-xs text-center" style={{ color: "#444" }}>
          Each mockup is a full feed view with both light and dark variants. Toggle inside.
        </p>
      </div>
    </div>
  );
}
