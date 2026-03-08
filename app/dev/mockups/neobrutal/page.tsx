"use client";

import { useState } from "react";
import Link from "next/link";

/*
 * REEF PUNK — Neo-Brutalist Shrimp Talk
 *
 * Thick black borders on everything. Hard offset shadows.
 * Bright saturated coral/teal/yellow/lime color blocking.
 * Chunky bold type. Flat surfaces. Nothing subtle.
 * Feels like a zine someone screen-printed in their garage.
 *
 * Dark mode flips to white borders on dark cards.
 */

const palette = {
  light: {
    bg: "#FFF3E4",
    surface: "#FFFFFF",
    border: "#1a1a1a",
    borderWidth: "2.5px",
    text: "#1a1a1a",
    textSecondary: "#5a5a5a",
    textMuted: "#999",
    coral: "#FF6B4A",
    coralSoft: "#FFE0D6",
    teal: "#2EC4B6",
    tealSoft: "#D4F5F2",
    yellow: "#FFD166",
    yellowSoft: "#FFF3D6",
    lime: "#8AC926",
    limeSoft: "#E8F5D6",
    pink: "#FF87AB",
    pinkSoft: "#FFE0EA",
    shadow: "#1a1a1a",
    shadowOffset: "3px 3px 0px",
    shadowOffsetLg: "4px 4px 0px",
    navBg: "#1a1a1a",
    navText: "#fff",
    navActive: "#FF6B4A",
  },
  dark: {
    bg: "#1a1a1a",
    surface: "#2a2a2a",
    border: "#e0e0e0",
    borderWidth: "2px",
    text: "#f5f5f5",
    textSecondary: "#b0b0b0",
    textMuted: "#666",
    coral: "#FF7B5C",
    coralSoft: "#3d2520",
    teal: "#3DD9CA",
    tealSoft: "#1a2e2c",
    yellow: "#FFD97A",
    yellowSoft: "#2e2a1a",
    lime: "#9DD63A",
    limeSoft: "#222e1a",
    pink: "#FF97B8",
    pinkSoft: "#2e1a22",
    shadow: "#ffffff",
    shadowOffset: "3px 3px 0px",
    shadowOffsetLg: "4px 4px 0px",
    navBg: "#111111",
    navText: "#ccc",
    navActive: "#FF7B5C",
  },
};

const groupStyle: Record<string, (t: typeof palette.light) => { bg: string; color: string; dot: string }> = {
  "close friends": (t) => ({ bg: t.coralSoft, color: t.coral, dot: t.coral }),
  "outdoor crew": (t) => ({ bg: t.tealSoft, color: t.teal, dot: t.teal }),
  "creatives": (t) => ({ bg: t.yellowSoft, color: t.text, dot: t.yellow }),
  "local": (t) => ({ bg: t.limeSoft, color: t.text, dot: t.lime }),
};

const posts = [
  {
    id: "1",
    user: "maya_k",
    displayName: "Maya",
    time: "2h",
    type: "text" as const,
    content: "Does anyone have a good recipe for sourdough? I've killed my last three starters and I'm starting to take it personally.",
    comments: [
      { user: "alex_ro", displayName: "Alex", text: "Literally same. Mine lasted 2 days." },
      { user: "sam.c", displayName: "Sam", text: "I'll send you the one that finally worked for me" },
    ],
    group: "close friends",
    avatarColor: "#FF6B4A",
  },
  {
    id: "2",
    user: "dev.julian",
    displayName: "Julian",
    time: "4h",
    type: "photo" as const,
    content: "Morning hike was absolutely worth the early alarm",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
    comments: [{ user: "sam.c", displayName: "Sam", text: "Where is this?? I need to go" }],
    group: "outdoor crew",
    avatarColor: "#2EC4B6",
  },
  {
    id: "3",
    user: "sam.c",
    displayName: "Sam",
    time: "6h",
    type: "text" as const,
    content: "Hosting a costume party at my place this Saturday! Theme is 80s movies. DM me for the address if you don't have it. Starts at 7, BYOB.",
    comments: [],
    group: "close friends",
    avatarColor: "#FFD166",
  },
  {
    id: "4",
    user: "alex_ro",
    displayName: "Alex",
    time: "9h",
    type: "photo" as const,
    content: "New studio setup is finally coming together",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=800&fit=crop",
    comments: [],
    group: "creatives",
    avatarColor: "#8AC926",
  },
  {
    id: "5",
    user: "maya_k",
    displayName: "Maya",
    time: "14h",
    type: "photo" as const,
    content: "Couldn't believe this was real life",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop",
    comments: [{ user: "alex_ro", displayName: "Alex", text: "This looks like a painting" }],
    group: "outdoor crew",
    avatarColor: "#FF6B4A",
  },
  {
    id: "6",
    user: "sam.c",
    displayName: "Sam",
    time: "1d",
    type: "text" as const,
    content: "Lost my keys somewhere between the coffee shop on Main and the parking garage. Silver keychain with a little cactus on it. Let me know if you spot them!",
    comments: [],
    group: "local",
    avatarColor: "#FFD166",
  },
];

export default function NeobrutalMockup() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const t = palette[mode];

  const toggleComments = (id: string) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: t.surface,
    border: `${t.borderWidth} solid ${t.border}`,
    boxShadow: `${t.shadowOffset} ${t.shadow}`,
  };

  const btnStyle: React.CSSProperties = {
    border: `${t.borderWidth} solid ${t.border}`,
  };

  const logoFont = "'Fredoka', 'Baloo 2', 'Nunito', sans-serif";

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: t.bg, color: t.text, fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif' }}
    >
      {/* Load Fredoka for the logo */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />
      {/* Mode toggle */}
      <div className="fixed top-4 right-4 z-[60] flex items-center gap-2">
        <Link
          href="/dev/mockups"
          className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          style={{ ...btnStyle, backgroundColor: t.surface, color: t.text }}
        >
          All Mockups
        </Link>
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors active:opacity-70"
          style={{ ...btnStyle, backgroundColor: t.coral, color: "#fff" }}
        >
          {mode === "light" ? "Dark" : "Light"}
        </button>
      </div>

      <div className="max-w-[430px] mx-auto min-h-screen" style={{ backgroundColor: t.bg }}>
        {/* Top Bar */}
        <header
          className="sticky top-0 z-50 border-b-[2.5px] px-4"
          style={{ backgroundColor: t.bg, borderColor: t.border }}
        >
          <div className="flex items-center justify-between h-14">
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black overflow-hidden"
              style={{
                border: `${t.borderWidth} solid ${t.border}`,
                backgroundColor: t.coralSoft,
              }}
            >
              <span className="text-base">🦐</span>
            </div>

            {/* Title */}
            <h1
              className="text-xl"
              style={{ color: t.text, fontFamily: logoFont, fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              shrimp talk
            </h1>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:opacity-70"
                style={{ ...btnStyle, backgroundColor: t.surface, color: t.text }}
              >
                <SearchSvg />
              </button>
            </div>
          </div>
        </header>

        {/* Feed */}
        <div className="pb-20 pt-4 px-3 space-y-4">
          {posts.map((post) => {
            const gs = (groupStyle[post.group] || groupStyle["local"])(t);
            const isExpanded = expandedComments.has(post.id);

            return (
              <article
                key={post.id}
                className="rounded-2xl overflow-hidden"
                style={cardStyle}
              >
                {/* Post header */}
                <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                    style={{
                      backgroundColor: post.avatarColor,
                      color: "#fff",
                      border: `${t.borderWidth} solid ${t.border}`,
                    }}
                  >
                    {post.displayName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold" style={{ color: t.text }}>
                        {post.displayName}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide"
                        style={{
                          backgroundColor: gs.bg,
                          color: gs.color,
                          border: `1.5px solid ${gs.dot}`,
                        }}
                      >
                        {post.group}
                      </span>
                    </div>
                    <span className="text-[11px]" style={{ color: t.textMuted }}>
                      {post.time}
                    </span>
                  </div>
                  <button
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ color: t.textMuted }}
                  >
                    <MoreSvg />
                  </button>
                </div>

                {/* Content */}
                {post.type === "text" ? (
                  <div className="px-4 pb-3">
                    <div
                      className="rounded-xl px-4 py-4"
                      style={{
                        backgroundColor: gs.bg,
                        border: `${t.borderWidth} solid ${t.border}`,
                      }}
                    >
                      <p className="text-[14px] leading-[1.6] font-medium" style={{ color: t.text }}>
                        {post.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="mx-3 mb-2 rounded-xl overflow-hidden"
                      style={{ border: `${t.borderWidth} solid ${t.border}` }}
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.content}
                        className="w-full aspect-square object-cover"
                        loading="lazy"
                      />
                    </div>
                    {post.content && (
                      <div className="px-4 pb-1.5">
                        <p className="text-[13px] font-medium" style={{ color: t.textSecondary }}>
                          {post.content}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between px-4 pb-3 pt-1.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all active:opacity-70"
                      style={{
                        backgroundColor: isExpanded ? t.teal : t.surface,
                        color: isExpanded ? "#fff" : t.text,
                        border: `${t.borderWidth} solid ${t.border}`,
                      }}
                    >
                      <CommentSvg />
                      {post.comments.length > 0 ? post.comments.length : ""}
                    </button>
                    <button
                      className="flex items-center px-2.5 py-1.5 rounded-lg transition-all active:opacity-70"
                      style={{
                        backgroundColor: t.surface,
                        color: t.text,
                        border: `${t.borderWidth} solid ${t.border}`,
                      }}
                    >
                      <ShareSvg />
                    </button>
                  </div>
                  <button
                    className="flex items-center px-2.5 py-1.5 rounded-lg transition-all active:opacity-70"
                    style={{
                      backgroundColor: t.surface,
                      color: t.text,
                      border: `${t.borderWidth} solid ${t.border}`,
                    }}
                  >
                    <BookmarkSvg />
                  </button>
                </div>

                {/* Comments */}
                {isExpanded && post.comments.length > 0 && (
                  <div
                    className="border-t-[2.5px] px-4 py-3 space-y-2"
                    style={{ borderColor: t.border, backgroundColor: t.tealSoft }}
                  >
                    {post.comments.map((c, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black mt-0.5 shrink-0"
                          style={{
                            backgroundColor: t.teal,
                            color: "#fff",
                            border: `1.5px solid ${t.border}`,
                          }}
                        >
                          {c.displayName[0]}
                        </div>
                        <p className="text-[13px] leading-relaxed" style={{ color: t.textSecondary }}>
                          <span className="font-semibold mr-1" style={{ color: t.text }}>
                            {c.displayName}
                          </span>
                          {c.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom Nav — button bar */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 border-t-[2.5px]"
          style={{ backgroundColor: t.navBg, borderColor: t.border }}
        >
          <div className="flex items-center justify-around h-16 px-3">
            {/* Home - active */}
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:opacity-70"
              style={{
                backgroundColor: t.coral,
                color: "#fff",
                border: `2px solid ${mode === "dark" ? t.border : "#fff"}`,
              }}
            >
              <HomeSvg />
            </button>
            {/* Calendar */}
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:opacity-70"
              style={{
                backgroundColor: "transparent",
                color: t.navText,
                border: `2px solid ${mode === "dark" ? "#444" : "#444"}`,
                opacity: 0.7,
              }}
            >
              <CalendarSvg />
            </button>
            {/* Create */}
            <button
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:opacity-70"
              style={{
                backgroundColor: t.coral,
                color: "#fff",
                border: `${t.borderWidth} solid ${mode === "dark" ? t.border : "#fff"}`,
              }}
            >
              <PlusSvg />
            </button>
            {/* Chat */}
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:opacity-70"
              style={{
                backgroundColor: "transparent",
                color: t.navText,
                border: `2px solid ${mode === "dark" ? "#444" : "#444"}`,
                opacity: 0.7,
              }}
            >
              <ChatSvg />
            </button>
            {/* Map */}
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:opacity-70"
              style={{
                backgroundColor: "transparent",
                color: t.navText,
                border: `2px solid ${mode === "dark" ? "#444" : "#444"}`,
                opacity: 0.7,
              }}
            >
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function MoreSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
  );
}
function CommentSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function ShareSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function BookmarkSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function HomeSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function CalendarSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function PlusSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function ChatSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function GlobeSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
