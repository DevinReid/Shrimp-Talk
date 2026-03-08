"use client";

import { useState } from "react";
import Link from "next/link";

/*
 * DEEP REEF
 * Bioluminescent dark — living coral meets ocean teal
 * Rich dark background with vivid accents
 * Dark-first, feels underwater, glowing, alive
 *
 * The vibe: like a coral reef at night under UV light.
 * Dark surfaces, neon coral and teal highlights.
 * More colorful than Stone & Ink, still edgy.
 * Cards feel like they float above the deep.
 */

const palette = {
  dark: {
    bg: "#0d1117",
    surface: "#161b22",
    surfaceHover: "#1c2129",
    border: "#21262d",
    borderAccent: "#30363d",
    text: "#e6edf3",
    textSecondary: "#8b949e",
    textFaint: "#484f58",
    coral: "#FF7B6B",
    coralMuted: "rgba(255,123,107,0.10)",
    coralGlow: "rgba(255,123,107,0.06)",
    teal: "#4ECDC4",
    tealMuted: "rgba(78,205,196,0.10)",
    gold: "#F7B267",
    goldMuted: "rgba(247,178,103,0.08)",
  },
  light: {
    bg: "#f6f8fa",
    surface: "#ffffff",
    surfaceHover: "#f8f9fa",
    border: "#d0d7de",
    borderAccent: "#e1e7ed",
    text: "#1f2328",
    textSecondary: "#656d76",
    textFaint: "#b1bac4",
    coral: "#D95B4B",
    coralMuted: "rgba(217,91,75,0.08)",
    coralGlow: "rgba(217,91,75,0.04)",
    teal: "#2BA89E",
    tealMuted: "rgba(43,168,158,0.08)",
    gold: "#D49A4A",
    goldMuted: "rgba(212,154,74,0.06)",
  },
};

const posts = [
  {
    id: "1",
    user: "maya_k",
    displayName: "Maya K.",
    time: "2h",
    type: "text" as const,
    content: "Does anyone have a good recipe for sourdough? I've killed my last three starters and I'm starting to take it personally.",
    comments: [
      { user: "alex_ro", text: "Literally same. Mine lasted 2 days." },
      { user: "samantha.c", text: "I'll send you the one that finally worked for me" },
    ],
    group: "close friends",
  },
  {
    id: "2",
    user: "dev.julian",
    displayName: "Julian",
    time: "4h",
    type: "photo" as const,
    content: "Morning hike was absolutely worth the early alarm",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
    comments: [{ user: "samantha.c", text: "Where is this?? I need to go" }],
    group: "outdoor crew",
  },
  {
    id: "3",
    user: "samantha.c",
    displayName: "Sam C.",
    time: "6h",
    type: "text" as const,
    content: "Hosting a costume party at my place this Saturday! Theme is 80s movies. DM me for the address if you don't have it. Starts at 7, BYOB.",
    comments: [],
    group: "close friends",
  },
  {
    id: "4",
    user: "alex_ro",
    displayName: "Alex R.",
    time: "9h",
    type: "photo" as const,
    content: "New studio setup is finally coming together",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=800&fit=crop",
    comments: [],
    group: "creatives",
  },
  {
    id: "5",
    user: "maya_k",
    displayName: "Maya K.",
    time: "14h",
    type: "photo" as const,
    content: "Couldn't believe this was real life",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop",
    comments: [{ user: "alex_ro", text: "This looks like a painting" }],
    group: "outdoor crew",
  },
  {
    id: "6",
    user: "samantha.c",
    displayName: "Sam C.",
    time: "1d",
    type: "text" as const,
    content: "Lost my keys somewhere between the coffee shop on Main and the parking garage. Silver keychain with a little cactus on it. Let me know if you spot them!",
    comments: [],
    group: "close friends",
  },
];

const groupColors: Record<string, (t: typeof palette.dark) => string> = {
  "close friends": (t) => t.coral,
  "outdoor crew": (t) => t.teal,
  "creatives": (t) => t.gold,
};

export default function DeepReefMockup() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [showComments, setShowComments] = useState<string | null>(null);
  const t = palette[mode];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: t.bg }}>
      {/* Mode toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Link
          href="/dev/mockups"
          className="text-xs px-3 py-1.5 rounded-full transition-colors"
          style={{ backgroundColor: t.surface, color: t.textSecondary, border: `1px solid ${t.border}` }}
        >
          All Mockups
        </Link>
        <button
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          className="text-xs px-3 py-1.5 rounded-full transition-colors"
          style={{ backgroundColor: t.coralMuted, color: t.coral, border: `1px solid ${t.coral}33` }}
        >
          {mode === "dark" ? "Light" : "Dark"}
        </button>
      </div>

      <div className="max-w-[430px] mx-auto min-h-screen" style={{ backgroundColor: t.bg }}>
        {/* Top Bar */}
        <header
          className="sticky top-0 z-40 backdrop-blur-xl border-b px-4"
          style={{ backgroundColor: `${t.bg}dd`, borderColor: t.border }}
        >
          <div className="flex items-center justify-between h-13">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full overflow-hidden"
                style={{ border: `2px solid ${t.coral}44` }}
              >
                <div
                  className="w-full h-full flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: t.coralMuted, color: t.coral }}
                >
                  Y
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg" style={{ color: t.coral }}>
                🦐
              </span>
              <span
                className="text-sm font-semibold tracking-tight"
                style={{ color: t.text }}
              >
                shrimp talk
              </span>
            </div>
            <div className="flex gap-3" style={{ color: t.textSecondary }}>
              <SearchSvg />
              <SettingsSvg />
            </div>
          </div>
        </header>

        {/* Feed */}
        <div className="pb-16 pt-2">
          {posts.map((post) => {
            const groupColor = groupColors[post.group]?.(t) || t.textFaint;
            const isExpanded = showComments === post.id;

            return (
              <article key={post.id} className="mb-2 mx-2">
                <div
                  className="rounded-xl overflow-hidden transition-colors"
                  style={{
                    backgroundColor: t.surface,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  {/* Post header */}
                  <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                      style={{
                        background: `linear-gradient(135deg, ${groupColor}22, ${groupColor}11)`,
                        color: groupColor,
                        border: `1.5px solid ${groupColor}33`,
                      }}
                    >
                      {post.user[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold" style={{ color: t.text }}>
                          {post.displayName}
                        </span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: `${groupColor}15`, color: groupColor }}
                        >
                          {post.group}
                        </span>
                      </div>
                      <span className="text-[11px]" style={{ color: t.textFaint }}>
                        @{post.user} · {post.time}
                      </span>
                    </div>
                    <button style={{ color: t.textFaint }}>
                      <MoreSvg />
                    </button>
                  </div>

                  {/* Content */}
                  {post.type === "text" ? (
                    <div className="px-4 pb-3">
                      <p className="text-[14px] leading-[1.55]" style={{ color: t.text }}>
                        {post.content}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mx-3 mb-2 rounded-lg overflow-hidden" style={{ backgroundColor: t.surfaceHover }}>
                        <img
                          src={post.imageUrl}
                          alt={post.content}
                          className="w-full aspect-square object-cover"
                          loading="lazy"
                        />
                      </div>
                      {post.content && (
                        <div className="px-4 pb-1.5">
                          <p className="text-[13px]" style={{ color: t.textSecondary }}>
                            {post.content}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between px-4 pb-3 pt-1">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => setShowComments(isExpanded ? null : post.id)}
                        className="flex items-center gap-1.5 text-[11px] transition-colors"
                        style={{ color: isExpanded ? t.teal : t.textSecondary }}
                      >
                        <CommentSvg />
                        {post.comments.length > 0 && <span>{post.comments.length}</span>}
                      </button>
                      <button className="transition-opacity hover:opacity-70" style={{ color: t.textSecondary }}>
                        <ShareSvg />
                      </button>
                    </div>
                    <button className="transition-opacity hover:opacity-70" style={{ color: t.textSecondary }}>
                      <BookmarkSvg />
                    </button>
                  </div>

                  {/* Expanded comments */}
                  {isExpanded && post.comments.length > 0 && (
                    <div
                      className="border-t px-4 py-2.5 space-y-2"
                      style={{ borderColor: t.border, backgroundColor: t.coralGlow }}
                    >
                      {post.comments.map((c, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-medium mt-0.5 shrink-0"
                            style={{ backgroundColor: t.tealMuted, color: t.teal }}
                          >
                            {c.user[0].toUpperCase()}
                          </div>
                          <p className="text-[12px] leading-relaxed" style={{ color: t.textSecondary }}>
                            <span className="font-semibold mr-1" style={{ color: t.teal }}>
                              {c.user}
                            </span>
                            {c.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Nav */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] border-t backdrop-blur-xl z-50"
          style={{ backgroundColor: `${t.bg}dd`, borderColor: t.border }}
        >
          <div className="flex items-center justify-around h-13">
            <button style={{ color: t.coral }}>
              <HomeSvg />
            </button>
            <button style={{ color: t.textSecondary }}>
              <CalendarSvg />
            </button>
            <button>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${t.coral}, ${t.gold})`,
                  color: mode === "dark" ? "#0d1117" : "#fff",
                }}
              >
                <PlusSvg />
              </div>
            </button>
            <button style={{ color: t.textSecondary }}>
              <ChatSvg />
            </button>
            <button style={{ color: t.textSecondary }}>
              <GlobeSvg />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

function SearchSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function SettingsSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function MoreSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}
function CommentSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function ShareSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function BookmarkSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function HomeSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function CalendarSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function PlusSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function ChatSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function GlobeSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
