"use client";

import { useState } from "react";
import Link from "next/link";

/*
 * WONKY — Playful, organic, color-blocked feed
 *
 * Palette: #F75289 (hot pink), #F76D52 (coral), #F7C052 (gold), black, white
 * No shadows. Super rounded + asymmetric "wonky" border-radius.
 * Solid coral/pink/gold backgrounds. Squiggly textures.
 * Cards are soft blobs, not rigid rectangles.
 */

const colors = {
  pink: "#F75289",
  coral: "#F76D52",
  gold: "#F7C052",
  black: "#1a1a1a",
  white: "#ffffff",
  cream: "#FFF8F0",
  pinkSoft: "#FFDCE8",
  coralSoft: "#FFDDD4",
  goldSoft: "#FFF0CC",
};

const wonkyRadii = [
  "32px 48px 32px 48px",
  "48px 32px 48px 32px",
  "40px 52px 36px 44px",
  "36px 44px 40px 52px",
  "44px 36px 52px 40px",
];

const palette = {
  light: {
    bg: colors.coral,
    surface: "rgba(255,255,255,0.92)",
    text: colors.black,
    textSecondary: "#4a3530",
    textMuted: "#9a7a72",
    textOnColor: "#fff",
  },
  dark: {
    bg: "#1e1028",
    surface: "rgba(45,30,55,0.9)",
    text: "#f5ede8",
    textSecondary: "#c4b0c8",
    textMuted: "#7a6580",
    textOnColor: "#fff",
  },
};

const posts = [
  {
    id: "1",
    displayName: "Maya",
    time: "2h",
    type: "text" as const,
    content: "Does anyone have a good recipe for sourdough? I've killed my last three starters and I'm starting to take it personally.",
    comments: [
      { displayName: "Alex", text: "Literally same. Mine lasted 2 days." },
      { displayName: "Sam", text: "I'll send you the one that finally worked for me" },
    ],
    accent: colors.pink,
    accentDark: "#A83560",
    accentSoft: colors.pinkSoft,
    darkAccentSoft: "#3d1a28",
  },
  {
    id: "2",
    displayName: "Julian",
    time: "4h",
    type: "photo" as const,
    content: "Morning hike was absolutely worth the early alarm",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
    comments: [{ displayName: "Sam", text: "Where is this?? I need to go" }],
    accent: colors.gold,
    accentDark: "#B8903A",
    accentSoft: colors.goldSoft,
    darkAccentSoft: "#2e2510",
  },
  {
    id: "3",
    displayName: "Sam",
    time: "6h",
    type: "text" as const,
    content: "Hosting a costume party at my place this Saturday! Theme is 80s movies. DM me for the address. Starts at 7, BYOB.",
    comments: [],
    accent: colors.gold,
    accentDark: "#B8903A",
    accentSoft: colors.goldSoft,
    darkAccentSoft: "#2e2510",
  },
  {
    id: "4",
    displayName: "Alex",
    time: "9h",
    type: "photo" as const,
    content: "New studio setup is finally coming together",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=800&fit=crop",
    comments: [],
    accent: colors.pink,
    accentDark: "#A83560",
    accentSoft: colors.pinkSoft,
    darkAccentSoft: "#3d1a28",
  },
  {
    id: "5",
    displayName: "Maya",
    time: "14h",
    type: "photo" as const,
    content: "Couldn't believe this was real life",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop",
    comments: [{ displayName: "Alex", text: "This looks like a painting" }],
    accent: colors.coral,
    accentDark: "#B8503C",
    accentSoft: colors.coralSoft,
    darkAccentSoft: "#2e1810",
  },
];

export default function WonkyMockup() {
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

  return (
    <div
      className="min-h-screen transition-colors duration-200 relative"
      style={{ backgroundColor: t.bg, color: t.text, fontFamily: "'Nunito', system-ui, sans-serif" }}
    >
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Mode toggle */}
      <div className="fixed top-4 right-4 z-[60] flex items-center gap-2">
        <Link
          href="/dev/mockups"
          className="text-xs font-bold px-3 py-1.5 rounded-full transition-colors backdrop-blur-md"
          style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }}
        >
          All Mockups
        </Link>
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className="text-xs font-bold px-3 py-1.5 rounded-full transition-colors active:opacity-70 backdrop-blur-md"
          style={{ backgroundColor: colors.pink, color: "#fff" }}
        >
          {mode === "light" ? "Dark" : "Light"}
        </button>
      </div>

      <div className="max-w-[430px] mx-auto min-h-screen relative z-10">

        {/* Top Bar */}
        <header
          className="sticky top-0 z-50 px-4 backdrop-blur-xl"
          style={{ backgroundColor: mode === "dark" ? "rgba(30,16,40,0.9)" : "rgba(247,109,82,0.85)" }}
        >
          <div className="flex items-center justify-between h-14">
            {/* Avatar */}
            <div
              className="w-10 h-10 flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: colors.gold,
                borderRadius: "16px 20px 16px 20px",
                border: `2.5px solid ${mode === "dark" ? colors.white : colors.black}`,
              }}
            >
              <span className="text-lg">🦐</span>
            </div>

            {/* Logo */}
            <h1
              className="text-xl"
              style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: "#fff" }}
            >
              shrimp talk
            </h1>

            {/* Search */}
            <button
              className="w-10 h-10 flex items-center justify-center transition-all active:opacity-70"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: "20px 16px 20px 16px",
                color: "#fff",
                border: `2.5px solid ${mode === "dark" ? colors.white : colors.black}`,
              }}
            >
              <SearchSvg />
            </button>
          </div>
        </header>

        {/* Wavy divider under header */}
        <svg width="100%" height="20" viewBox="0 0 430 20" preserveAspectRatio="none" className="relative z-40 -mt-[1px]">
          <path
            d="M0 0 L0 10 C30 20, 60 0, 90 10 C120 20, 150 0, 180 10 C210 20, 240 0, 270 10 C300 20, 330 0, 360 10 C390 20, 420 0, 430 10 L430 0 Z"
            fill={mode === "dark" ? "rgba(30,16,40,0.9)" : "rgba(247,109,82,0.85)"}
          />
          <path
            d="M0 10 C30 20, 60 0, 90 10 C120 20, 150 0, 180 10 C210 20, 240 0, 270 10 C300 20, 330 0, 360 10 C390 20, 420 0, 430 10"
            fill="none"
            stroke={mode === "dark" ? colors.white : colors.black}
            strokeWidth="2.5"
          />
        </svg>

        {/* Feed */}
        <div className="pb-24 pt-2 px-3 space-y-4">
          {posts.map((post, i) => {
            const isExpanded = expandedComments.has(post.id);
            const radius = "28px";

            return (
              <article key={post.id}>
                {post.type === "text" ? (
                  /* TEXT POST: full color-blocked blob */
                  <div
                    className="overflow-hidden p-5 transition-colors"
                    style={{
                      backgroundColor: mode === "dark" ? post.accentDark : post.accent,
                      borderRadius: radius,
                      border: `2.5px solid ${mode === "dark" ? colors.white : colors.black}`,
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          backgroundColor: mode === "dark" ? colors.black : colors.white,
                          borderRadius: "14px 18px 14px 18px",
                          color: mode === "dark" ? colors.white : colors.black,
                          border: `2px solid ${mode === "dark" ? colors.white : colors.black}`,
                        }}
                      >
                        {post.displayName[0]}
                      </div>
                      <div className="flex-1">
                        <span className="text-[14px] font-bold" style={{ color: colors.white }}>
                          {post.displayName}
                        </span>
                        <span className="text-[11px] ml-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {post.time}
                        </span>
                      </div>
                      <button style={{ color: "rgba(255,255,255,0.5)" }}>
                        <MoreSvg />
                      </button>
                    </div>

                    {/* Text content bubble */}
                    <div
                      className="px-4 py-3.5"
                      style={{
                        backgroundColor: mode === "dark" ? colors.black : colors.white,
                        borderRadius: "18px",
                      }}
                    >
                      <p
                        className="text-[15px] leading-[1.65] font-medium"
                        style={{ color: mode === "dark" ? colors.white : colors.black }}
                      >
                        {post.content}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-full transition-all active:scale-95"
                        style={{
                          backgroundColor: isExpanded
                            ? (mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.35)")
                            : (mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)"),
                          color: mode === "dark" ? t.text : "#fff",
                        }}
                      >
                        <CommentSvg />
                        {post.comments.length > 0 && <span>{post.comments.length}</span>}
                      </button>
                      <button
                        className="flex items-center px-3 py-2 rounded-full transition-all active:scale-95"
                        style={{
                          backgroundColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)",
                          color: mode === "dark" ? t.text : "#fff",
                        }}
                      >
                        <ShareSvg />
                      </button>
                      <div className="flex-1" />
                      <button
                        className="flex items-center px-3 py-2 rounded-full transition-all active:scale-95"
                        style={{
                          backgroundColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)",
                          color: mode === "dark" ? t.text : "#fff",
                        }}
                      >
                        <BookmarkSvg />
                      </button>
                    </div>

                    {/* Comments */}
                    {isExpanded && post.comments.length > 0 && (
                      <div
                        className="mt-3 pt-3 space-y-2.5"
                        style={{ borderTop: `2px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.25)"}` }}
                      >
                        {post.comments.map((c, ci) => (
                          <div key={ci} className="flex items-start gap-2.5">
                            <div
                              className="w-6 h-6 flex items-center justify-center text-[9px] font-bold mt-0.5 shrink-0"
                              style={{
                                backgroundColor: "rgba(255,255,255,0.25)",
                                borderRadius: "10px 12px 10px 12px",
                                color: mode === "dark" ? t.text : "#fff",
                              }}
                            >
                              {c.displayName[0]}
                            </div>
                            <p className="text-[13px] leading-relaxed" style={{ color: mode === "dark" ? t.textSecondary : "rgba(255,255,255,0.85)" }}>
                              <span className="font-bold mr-1" style={{ color: mode === "dark" ? t.text : "#fff" }}>
                                {c.displayName}
                              </span>
                              {c.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* PHOTO POST: frosted card blob */
                  <div
                    className="overflow-hidden transition-colors"
                    style={{
                      backgroundColor: t.surface,
                      borderRadius: radius,
                      backdropFilter: "blur(20px)",
                      border: `2.5px solid ${mode === "dark" ? colors.white : colors.black}`,
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 pt-4 pb-2">
                      <div
                        className="w-9 h-9 flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          backgroundColor: post.accent,
                          borderRadius: "14px 18px 14px 18px",
                          color: "#fff",
                          border: `2px solid ${mode === "dark" ? colors.white : colors.black}`,
                        }}
                      >
                        {post.displayName[0]}
                      </div>
                      <div className="flex-1">
                        <span className="text-[14px] font-bold" style={{ color: t.text }}>
                          {post.displayName}
                        </span>
                        <span className="text-[11px] ml-2" style={{ color: t.textMuted }}>
                          {post.time}
                        </span>
                      </div>
                      <button style={{ color: t.textMuted }}>
                        <MoreSvg />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="mx-4 mb-3">
                      <div
                        className="overflow-hidden"
                        style={{ borderRadius: "20px", border: `2.5px solid ${mode === "dark" ? colors.white : colors.black}` }}
                      >
                        <img
                          src={post.imageUrl}
                          alt={post.content}
                          className="w-full aspect-[4/5] object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Caption */}
                    {post.content && (
                      <div className="px-5 pb-1">
                        <p className="text-[13px] font-medium" style={{ color: t.textSecondary }}>
                          {post.content}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 px-5 pb-4 pt-2">
                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-full transition-all active:scale-95"
                        style={{
                          backgroundColor: isExpanded ? post.accent : (mode === "dark" ? "rgba(255,255,255,0.08)" : post.accentSoft),
                          color: isExpanded ? "#fff" : t.text,
                        }}
                      >
                        <CommentSvg />
                        {post.comments.length > 0 && <span>{post.comments.length}</span>}
                      </button>
                      <button
                        className="flex items-center px-3 py-2 rounded-full transition-all active:scale-95"
                        style={{
                          backgroundColor: mode === "dark" ? "rgba(255,255,255,0.08)" : post.accentSoft,
                          color: t.text,
                        }}
                      >
                        <ShareSvg />
                      </button>
                      <div className="flex-1" />
                      <button
                        className="flex items-center px-3 py-2 rounded-full transition-all active:scale-95"
                        style={{
                          backgroundColor: mode === "dark" ? "rgba(255,255,255,0.08)" : post.accentSoft,
                          color: t.text,
                        }}
                      >
                        <BookmarkSvg />
                      </button>
                    </div>

                    {/* Comments */}
                    {isExpanded && post.comments.length > 0 && (
                      <div
                        className="mx-5 mb-4 p-3 space-y-2.5"
                        style={{
                          backgroundColor: mode === "dark" ? post.darkAccentSoft : post.accentSoft,
                          borderRadius: "16px 20px 16px 20px",
                        }}
                      >
                        {post.comments.map((c, ci) => (
                          <div key={ci} className="flex items-start gap-2.5">
                            <div
                              className="w-6 h-6 flex items-center justify-center text-[9px] font-bold mt-0.5 shrink-0"
                              style={{
                                backgroundColor: post.accent,
                                borderRadius: "10px 12px 10px 12px",
                                color: "#fff",
                              }}
                            >
                              {c.displayName[0]}
                            </div>
                            <p className="text-[13px] leading-relaxed" style={{ color: t.textSecondary }}>
                              <span className="font-bold mr-1" style={{ color: t.text }}>{c.displayName}</span>
                              {c.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom Nav — pill-shaped floating bar */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-50 px-4">
          <nav
            className="flex items-center justify-around h-14 px-2 backdrop-blur-xl"
            style={{
              backgroundColor: mode === "dark" ? "rgba(26,26,26,0.9)" : "rgba(247,82,137,0.92)",
              borderRadius: "28px 32px 28px 32px",
              border: `2.5px solid ${mode === "dark" ? colors.white : colors.black}`,
            }}
          >
            <button
              className="w-10 h-10 flex items-center justify-center transition-all active:scale-90"
              style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "14px 16px 14px 16px",
                color: "#fff",
              }}
            >
              <HomeSvg />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center transition-all active:scale-90"
              style={{
                borderRadius: "16px 14px 16px 14px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <CalendarSvg />
            </button>
            <button className="transition-all active:scale-90">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  backgroundColor: colors.gold,
                  borderRadius: "18px 22px 18px 22px",
                  color: colors.black,
                }}
              >
                <PlusSvg />
              </div>
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center transition-all active:scale-90"
              style={{
                borderRadius: "14px 16px 14px 16px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <ChatSvg />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center transition-all active:scale-90"
              style={{
                borderRadius: "16px 14px 16px 14px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <GlobeSvg />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

function SearchSvg() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function CalendarSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function GlobeSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
