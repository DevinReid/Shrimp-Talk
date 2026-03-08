"use client";

import { useState } from "react";
import Link from "next/link";

/*
 * TIDE POOL
 * Warm, playful, creative, gender-neutral
 * Terracotta + sage green + sand/gold
 * Light-first, but dark mode is cozy/warm (not cold blue-dark)
 *
 * The vibe: a creative person's app. Rounded, friendly,
 * good spacing. Feels like a well-designed notebook app
 * that happens to be social. Earthy tones avoid the
 * "too pink / too girly" shrimp trap.
 */

const palette = {
  light: {
    bg: "#FFFBF7",
    surface: "#ffffff",
    surfaceAlt: "#FFF5EE",
    surfaceMuted: "#F5EDE5",
    border: "#EDE5DC",
    borderStrong: "#DDD4C9",
    text: "#3D405B",
    textSecondary: "#7D7F94",
    textFaint: "#B5B7C5",
    terra: "#E07A5F",
    terraMuted: "rgba(224,122,95,0.10)",
    terraSoft: "rgba(224,122,95,0.06)",
    sage: "#81B29A",
    sageMuted: "rgba(129,178,154,0.10)",
    sand: "#F2CC8F",
    sandMuted: "rgba(242,204,143,0.12)",
    navy: "#3D405B",
  },
  dark: {
    bg: "#1a1714",
    surface: "#231f1b",
    surfaceAlt: "#2a2520",
    surfaceMuted: "#1e1b17",
    border: "#332e28",
    borderStrong: "#3d3731",
    text: "#E8E0D6",
    textSecondary: "#9C9488",
    textFaint: "#5C5650",
    terra: "#E8896F",
    terraMuted: "rgba(232,137,111,0.12)",
    terraSoft: "rgba(232,137,111,0.06)",
    sage: "#8FC4A8",
    sageMuted: "rgba(143,196,168,0.12)",
    sand: "#F2CC8F",
    sandMuted: "rgba(242,204,143,0.10)",
    navy: "#E8E0D6",
  },
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
    emoji: "🍞",
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
    emoji: "🏔️",
  },
  {
    id: "3",
    user: "sam.c",
    displayName: "Sam",
    time: "6h",
    type: "text" as const,
    content: "Hosting a costume party at my place this Saturday! Theme is 80s movies. DM me for the address if you don't have it. Starts at 7, BYOB.",
    comments: [],
    emoji: "🎉",
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
    emoji: "🎵",
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
    emoji: "✨",
  },
  {
    id: "6",
    user: "sam.c",
    displayName: "Sam",
    time: "1d",
    type: "text" as const,
    content: "Lost my keys somewhere between the coffee shop on Main and the parking garage. Silver keychain with a little cactus on it. Let me know if you spot them!",
    comments: [],
    emoji: "🔑",
  },
];

const avatarColors: Record<string, [string, string]> = {
  maya_k: ["#E07A5F", "#F2CC8F"],
  "dev.julian": ["#81B29A", "#4ECDC4"],
  "sam.c": ["#F2CC8F", "#E07A5F"],
  alex_ro: ["#3D405B", "#81B29A"],
};

export default function TidePoolMockup() {
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
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className="text-xs px-3 py-1.5 rounded-full transition-colors"
          style={{ backgroundColor: t.terraMuted, color: t.terra, border: `1px solid ${t.terra}33` }}
        >
          {mode === "light" ? "Dark" : "Light"}
        </button>
      </div>

      <div className="max-w-[430px] mx-auto min-h-screen" style={{ backgroundColor: t.bg }}>
        {/* Top Bar */}
        <header
          className="sticky top-0 z-40 backdrop-blur-md border-b px-4"
          style={{ backgroundColor: `${t.bg}ee`, borderColor: t.border }}
        >
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${t.terra}, ${t.sand})`,
                }}
              >
                <span className="text-base">🦐</span>
              </div>
            </div>
            <h1
              className="text-base font-bold tracking-tight"
              style={{ color: t.text }}
            >
              shrimp talk
            </h1>
            <div className="flex gap-2" style={{ color: t.textSecondary }}>
              <button
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                style={{ backgroundColor: t.surfaceAlt }}
              >
                <SearchSvg />
              </button>
              <button
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                style={{ backgroundColor: t.surfaceAlt }}
              >
                <SettingsSvg />
              </button>
            </div>
          </div>
        </header>

        {/* Feed */}
        <div className="pb-20 pt-3 px-3 space-y-3">
          {posts.map((post) => {
            const [colorA, colorB] = avatarColors[post.user] || ["#999", "#bbb"];
            const isExpanded = expandedComments.has(post.id);

            return (
              <article
                key={post.id}
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  backgroundColor: t.surface,
                  border: `1px solid ${t.border}`,
                  boxShadow: mode === "light"
                    ? "0 1px 3px rgba(61,64,91,0.04), 0 4px 12px rgba(61,64,91,0.03)"
                    : "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                {/* Post header */}
                <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${colorA}25, ${colorB}25)`,
                      color: colorA,
                      border: `1.5px solid ${colorA}22`,
                    }}
                  >
                    {post.displayName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-semibold" style={{ color: t.text }}>
                        {post.displayName}
                      </span>
                      <span className="text-xs">{post.emoji}</span>
                    </div>
                    <span className="text-[11px]" style={{ color: t.textFaint }}>
                      {post.time}
                    </span>
                  </div>
                  <button style={{ color: t.textFaint }}>
                    <MoreSvg />
                  </button>
                </div>

                {/* Content */}
                {post.type === "text" ? (
                  <div className="px-4 pb-3">
                    <div className="rounded-xl px-4 py-4" style={{ backgroundColor: t.surfaceAlt }}>
                      <p className="text-[14px] leading-[1.6]" style={{ color: t.text }}>
                        {post.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mx-3 mb-2 rounded-xl overflow-hidden" style={{ backgroundColor: t.surfaceMuted }}>
                      <img
                        src={post.imageUrl}
                        alt={post.content}
                        className="w-full aspect-[4/5] object-cover"
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
                <div className="flex items-center justify-between px-4 pb-3 pt-1.5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full transition-colors"
                      style={{
                        backgroundColor: isExpanded ? t.sageMuted : "transparent",
                        color: isExpanded ? t.sage : t.textSecondary,
                      }}
                    >
                      <CommentSvg />
                      {post.comments.length > 0 && <span>{post.comments.length}</span>}
                    </button>
                    <button
                      className="flex items-center px-3 py-1.5 rounded-full transition-colors hover:opacity-70"
                      style={{ color: t.textSecondary }}
                    >
                      <ShareSvg />
                    </button>
                  </div>
                  <button
                    className="px-3 py-1.5 rounded-full transition-colors hover:opacity-70"
                    style={{ color: t.textSecondary }}
                  >
                    <BookmarkSvg />
                  </button>
                </div>

                {/* Comments */}
                {isExpanded && post.comments.length > 0 && (
                  <div
                    className="border-t px-4 py-3 space-y-2.5"
                    style={{ borderColor: t.border, backgroundColor: t.terraSoft }}
                  >
                    {post.comments.map((c, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold mt-0.5 shrink-0"
                          style={{
                            backgroundColor: t.sageMuted,
                            color: t.sage,
                          }}
                        >
                          {c.displayName[0]}
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold mr-1" style={{ color: t.sage }}>
                            {c.displayName}
                          </span>
                          <span className="text-[12px]" style={{ color: t.textSecondary }}>
                            {c.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom Nav */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] border-t backdrop-blur-md z-50"
          style={{ backgroundColor: `${t.bg}ee`, borderColor: t.border }}
        >
          <div className="flex items-center justify-around h-14">
            <button className="flex flex-col items-center gap-0.5" style={{ color: t.terra }}>
              <HomeSvg />
              <span className="text-[9px] font-semibold">Home</span>
            </button>
            <button className="flex flex-col items-center gap-0.5" style={{ color: t.textFaint }}>
              <CalendarSvg />
              <span className="text-[9px]">Calendar</span>
            </button>
            <button>
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${t.terra}, ${t.sand})`,
                  color: "#fff",
                  boxShadow: `0 2px 8px ${t.terra}44`,
                }}
              >
                <PlusSvg />
              </div>
            </button>
            <button className="flex flex-col items-center gap-0.5" style={{ color: t.textFaint }}>
              <ChatSvg />
              <span className="text-[9px]">Chat</span>
            </button>
            <button className="flex flex-col items-center gap-0.5" style={{ color: t.textFaint }}>
              <GlobeSvg />
              <span className="text-[9px]">Map</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

function SearchSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function SettingsSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function ShareSvg() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function BookmarkSvg() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function HomeSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function CalendarSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function PlusSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function ChatSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function GlobeSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
