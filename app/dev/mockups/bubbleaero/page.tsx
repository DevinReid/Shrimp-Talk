"use client";

import { useState } from "react";
import Link from "next/link";

/*
 * BUBBLE AERO — Frutiger Aero feed
 *
 * Inspired by the Y2K-era Frutiger Aero aesthetic:
 * glossy translucent surfaces, water caustics, bubbles,
 * aquatic gradients, skeuomorphic depth.
 *
 * Palette: Aqua #00BCD4, Coral #FF6B6B, Seafoam #69D2A0,
 *          Deep Ocean #1A5276, Soft White #F0F8FF, Golden Sand #FFD93D
 *
 * Fonts: Nunito (primary), Inter (secondary)
 */

const colors = {
  aqua: "#00BCD4",
  aquaLight: "#4DD0E1",
  aquaDark: "#00838F",
  coral: "#FF6B6B",
  coralLight: "#FF8A8A",
  coralDark: "#D14F4F",
  seafoam: "#69D2A0",
  seafoamLight: "#93E4BD",
  seafoamDark: "#3DA87A",
  deepOcean: "#1A5276",
  softWhite: "#F0F8FF",
  golden: "#FFD93D",
  goldenDark: "#E5BF1A",
};

const palette = {
  light: {
    bg: "linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 30%, #E0F4E8 70%, #F0F8FF 100%)",
    bgSolid: "#E0F7FA",
    surface: "rgba(255, 255, 255, 0.55)",
    surfaceHover: "rgba(255, 255, 255, 0.7)",
    headerBg: "rgba(224, 247, 250, 0.75)",
    text: "#1A3C50",
    textSecondary: "#3A6A7E",
    textMuted: "#7BA4B5",
    border: "rgba(0, 188, 212, 0.2)",
    gloss: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 50%)",
    bubbleOverlay: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 60%)",
  },
  dark: {
    bg: "linear-gradient(180deg, #0D2137 0%, #12344E 30%, #0A2A3C 70%, #081C2B 100%)",
    bgSolid: "#0D2137",
    surface: "rgba(20, 60, 90, 0.5)",
    surfaceHover: "rgba(30, 80, 110, 0.5)",
    headerBg: "rgba(13, 33, 55, 0.8)",
    text: "#E0F7FA",
    textSecondary: "#80CBC4",
    textMuted: "#4D8A94",
    border: "rgba(0, 188, 212, 0.15)",
    gloss: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%)",
    bubbleOverlay: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)",
  },
};

const posts = [
  {
    id: "1",
    displayName: "Maya",
    user: "maya_k",
    time: "2h",
    type: "text" as const,
    content:
      "Does anyone have a good recipe for sourdough? I've killed my last three starters and I'm starting to take it personally.",
    comments: [
      { displayName: "Alex", text: "Literally same. Mine lasted 2 days." },
      { displayName: "Sam", text: "I'll send you the one that finally worked for me" },
    ],
    accent: colors.coral,
    accentSoft: "rgba(255,107,107,0.15)",
  },
  {
    id: "2",
    displayName: "Julian",
    user: "dev.julian",
    time: "4h",
    type: "photo" as const,
    content: "Morning hike was absolutely worth the early alarm",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
    comments: [{ displayName: "Sam", text: "Where is this?? I need to go" }],
    accent: colors.seafoam,
    accentSoft: "rgba(105,210,160,0.15)",
  },
  {
    id: "3",
    displayName: "Sam",
    user: "samantha.c",
    time: "6h",
    type: "text" as const,
    content:
      "Hosting a costume party at my place this Saturday! Theme is 80s movies. DM me for the address. Starts at 7, BYOB.",
    comments: [],
    accent: colors.golden,
    accentSoft: "rgba(255,217,61,0.15)",
  },
  {
    id: "4",
    displayName: "Alex",
    user: "alex_ro",
    time: "9h",
    type: "photo" as const,
    content: "New studio setup is finally coming together",
    imageUrl:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=800&fit=crop",
    comments: [],
    accent: colors.aqua,
    accentSoft: "rgba(0,188,212,0.15)",
  },
  {
    id: "5",
    displayName: "Maya",
    user: "maya_k",
    time: "14h",
    type: "photo" as const,
    content: "Couldn't believe this was real life",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop",
    comments: [{ displayName: "Alex", text: "This looks like a painting" }],
    accent: colors.coral,
    accentSoft: "rgba(255,107,107,0.15)",
  },
  {
    id: "6",
    displayName: "Sam",
    user: "samantha.c",
    time: "1d",
    type: "text" as const,
    content:
      "Lost my keys somewhere between the coffee shop on Main and the parking garage. Silver keychain with a little cactus on it. Let me know if you spot them!",
    comments: [],
    accent: colors.seafoam,
    accentSoft: "rgba(105,210,160,0.15)",
  },
];

export default function BubbleAeroMockup() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );
  const t = palette[mode];

  const toggleComments = (id: string) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const glass = {
    background: t.surface,
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    border: `1px solid ${t.border}`,
    boxShadow: `0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,${mode === "light" ? "0.5" : "0.08"})`,
  };

  const glossOverlay: React.CSSProperties = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: t.gloss,
    borderRadius: "inherit",
    pointerEvents: "none" as const,
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 relative overflow-hidden"
      style={{
        background: t.bg,
        color: t.text,
        fontFamily: "'Nunito', system-ui, sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Ambient bubbles (decorative background) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { w: 180, h: 180, x: "-5%", y: "10%", o: 0.08 },
          { w: 120, h: 120, x: "75%", y: "25%", o: 0.06 },
          { w: 240, h: 240, x: "60%", y: "55%", o: 0.05 },
          { w: 90, h: 90, x: "15%", y: "70%", o: 0.07 },
          { w: 150, h: 150, x: "85%", y: "80%", o: 0.04 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.w,
              height: b.h,
              left: b.x,
              top: b.y,
              background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,${b.o + 0.1}), rgba(0,188,212,${b.o}) 60%, transparent 80%)`,
              border: `1px solid rgba(255,255,255,${b.o + 0.02})`,
            }}
          />
        ))}
      </div>

      {/* Mode toggle */}
      <div className="fixed top-4 right-4 z-[60] flex items-center gap-2">
        <Link
          href="/dev/mockups"
          className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
          style={{
            ...glass,
            color: t.text,
            fontSize: 11,
          }}
        >
          All Mockups
        </Link>
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className="text-xs font-bold px-3 py-1.5 rounded-full transition-colors active:opacity-70"
          style={{
            background: `linear-gradient(135deg, ${colors.aqua}, ${colors.seafoam})`,
            color: "#fff",
            boxShadow: `0 2px 12px rgba(0,188,212,0.3)`,
          }}
        >
          {mode === "light" ? "Dark" : "Light"}
        </button>
      </div>

      <div className="max-w-[430px] mx-auto min-h-screen relative z-10">
        {/* Top Bar — frosted glass */}
        <header
          className="sticky top-0 z-50 px-4"
          style={{
            background: t.headerBg,
            backdropFilter: "blur(30px) saturate(1.6)",
            WebkitBackdropFilter: "blur(30px) saturate(1.6)",
            borderBottom: `1px solid ${t.border}`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.05)`,
          }}
        >
          <div className="flex items-center justify-between h-14">
            {/* Avatar — glossy bubble */}
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative"
                style={{
                  background: `linear-gradient(145deg, ${colors.aquaLight}, ${colors.aquaDark})`,
                  boxShadow: `0 2px 8px rgba(0,188,212,0.3), inset 0 1px 2px rgba(255,255,255,0.4)`,
                }}
              >
                <span className="text-lg relative z-10">🦐</span>
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    left: 4,
                    width: "60%",
                    height: "40%",
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.45), transparent)",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>

            {/* Logo — glossy text */}
            <h1
              className="text-xl relative"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                color: t.text,
                textShadow:
                  mode === "light"
                    ? "0 1px 2px rgba(0,0,0,0.08)"
                    : "0 0 20px rgba(0,188,212,0.3)",
              }}
            >
              shrimp talk
            </h1>

            {/* Search — glass pill */}
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:opacity-70 relative overflow-hidden"
              style={{
                ...glass,
                borderRadius: "50%",
              }}
            >
              <SearchSvg color={t.textSecondary} />
              <div style={glossOverlay} />
            </button>
          </div>
        </header>

        {/* Water caustic divider */}
        <svg
          width="100%"
          height="24"
          viewBox="0 0 430 24"
          preserveAspectRatio="none"
          className="relative z-40 -mt-[1px]"
        >
          <defs>
            <linearGradient id="caustic-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={colors.aqua} stopOpacity="0.3" />
              <stop offset="50%" stopColor={colors.seafoam} stopOpacity="0.2" />
              <stop offset="100%" stopColor={colors.aqua} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 L0 8 Q60 20, 120 10 Q180 0, 240 12 Q300 24, 360 10 Q400 2, 430 8 L430 0 Z"
            fill={t.headerBg.replace("0.75", "1").replace("0.8", "1")}
          />
          <path
            d="M0 8 Q60 20, 120 10 Q180 0, 240 12 Q300 24, 360 10 Q400 2, 430 8"
            fill="none"
            stroke="url(#caustic-grad)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Feed */}
        <div className="pb-24 pt-2 px-3 space-y-4">
          {posts.map((post) => {
            const isExpanded = expandedComments.has(post.id);

            return (
              <article key={post.id}>
                {post.type === "text" ? (
                  /* TEXT POST — frosted glass card */
                  <div
                    className="overflow-hidden rounded-2xl p-4 relative"
                    style={{
                      ...glass,
                      borderRadius: 20,
                    }}
                  >
                    <div style={glossOverlay} />

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3 relative z-10">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(145deg, ${post.accent}, ${post.accent}99)`,
                          color: "#fff",
                          boxShadow: `0 2px 8px ${post.accent}40, inset 0 1px 2px rgba(255,255,255,0.3)`,
                        }}
                      >
                        {post.displayName[0]}
                        <div
                          style={{
                            position: "absolute",
                            top: 1,
                            left: 3,
                            width: "65%",
                            height: "40%",
                            background: "radial-gradient(ellipse, rgba(255,255,255,0.4), transparent)",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <span
                          className="text-[14px] font-bold"
                          style={{ color: t.text }}
                        >
                          {post.displayName}
                        </span>
                        <span
                          className="text-[11px] ml-2"
                          style={{ color: t.textMuted }}
                        >
                          {post.time}
                        </span>
                      </div>
                      <button style={{ color: t.textMuted }}>
                        <MoreSvg />
                      </button>
                    </div>

                    {/* Text content */}
                    <div
                      className="px-4 py-3.5 rounded-2xl relative overflow-hidden"
                      style={{
                        backgroundColor:
                          mode === "light"
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.05)",
                        border: `1px solid rgba(255,255,255,${mode === "light" ? "0.6" : "0.06"})`,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,${mode === "light" ? "0.4" : "0.04"})`,
                      }}
                    >
                      <p
                        className="text-[15px] leading-[1.65] font-medium relative z-10"
                        style={{
                          color: t.text,
                          fontFamily: "'Inter', system-ui, sans-serif",
                        }}
                      >
                        {post.content}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3 relative z-10">
                      <GlassButton
                        active={isExpanded}
                        onClick={() => toggleComments(post.id)}
                        accent={post.accent}
                        mode={mode}
                      >
                        <CommentSvg />
                        {post.comments.length > 0 && (
                          <span className="text-[11px] font-bold ml-1">
                            {post.comments.length}
                          </span>
                        )}
                      </GlassButton>
                      <GlassButton accent={post.accent} mode={mode}>
                        <ShareSvg />
                      </GlassButton>
                      <div className="flex-1" />
                      <GlassButton accent={post.accent} mode={mode}>
                        <BookmarkSvg />
                      </GlassButton>
                    </div>

                    {/* Comments */}
                    {isExpanded && post.comments.length > 0 && (
                      <div
                        className="mt-3 pt-3 space-y-2.5 relative z-10"
                        style={{
                          borderTop: `1px solid rgba(255,255,255,${mode === "light" ? "0.3" : "0.06"})`,
                        }}
                      >
                        {post.comments.map((c, ci) => (
                          <div key={ci} className="flex items-start gap-2.5">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5 shrink-0"
                              style={{
                                background: `linear-gradient(145deg, ${colors.aqua}60, ${colors.aqua}30)`,
                                color: mode === "light" ? colors.deepOcean : colors.aquaLight,
                                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2)`,
                              }}
                            >
                              {c.displayName[0]}
                            </div>
                            <p
                              className="text-[13px] leading-relaxed"
                              style={{
                                color: t.textSecondary,
                                fontFamily: "'Inter', system-ui, sans-serif",
                              }}
                            >
                              <span
                                className="font-bold mr-1"
                                style={{ color: t.text }}
                              >
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
                  /* PHOTO POST — frosted glass card with glossy image frame */
                  <div
                    className="overflow-hidden rounded-2xl relative"
                    style={{
                      ...glass,
                      borderRadius: 20,
                    }}
                  >
                    <div style={glossOverlay} />

                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 pt-4 pb-2 relative z-10">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(145deg, ${post.accent}, ${post.accent}99)`,
                          color: "#fff",
                          boxShadow: `0 2px 8px ${post.accent}40, inset 0 1px 2px rgba(255,255,255,0.3)`,
                        }}
                      >
                        {post.displayName[0]}
                        <div
                          style={{
                            position: "absolute",
                            top: 1,
                            left: 3,
                            width: "65%",
                            height: "40%",
                            background: "radial-gradient(ellipse, rgba(255,255,255,0.4), transparent)",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <span
                          className="text-[14px] font-bold"
                          style={{ color: t.text }}
                        >
                          {post.displayName}
                        </span>
                        <span
                          className="text-[11px] ml-2"
                          style={{ color: t.textMuted }}
                        >
                          {post.time}
                        </span>
                      </div>
                      <button style={{ color: t.textMuted }}>
                        <MoreSvg />
                      </button>
                    </div>

                    {/* Image with glossy frame */}
                    <div className="mx-3 mb-3 relative z-10">
                      <div
                        className="overflow-hidden rounded-xl relative"
                        style={{
                          border: `1px solid rgba(255,255,255,${mode === "light" ? "0.4" : "0.1"})`,
                          boxShadow: `0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,${mode === "light" ? "0.3" : "0.05"})`,
                        }}
                      >
                        <img
                          src={post.imageUrl}
                          alt={post.content}
                          className="w-full aspect-[4/5] object-cover"
                          loading="lazy"
                        />
                        {/* Gloss on image */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 30%)",
                          }}
                        />
                      </div>
                    </div>

                    {/* Caption */}
                    {post.content && (
                      <div className="px-4 pb-1 relative z-10">
                        <p
                          className="text-[13px] font-medium"
                          style={{
                            color: t.textSecondary,
                            fontFamily: "'Inter', system-ui, sans-serif",
                          }}
                        >
                          {post.content}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 px-4 pb-4 pt-2 relative z-10">
                      <GlassButton
                        active={isExpanded}
                        onClick={() => toggleComments(post.id)}
                        accent={post.accent}
                        mode={mode}
                      >
                        <CommentSvg />
                        {post.comments.length > 0 && (
                          <span className="text-[11px] font-bold ml-1">
                            {post.comments.length}
                          </span>
                        )}
                      </GlassButton>
                      <GlassButton accent={post.accent} mode={mode}>
                        <ShareSvg />
                      </GlassButton>
                      <div className="flex-1" />
                      <GlassButton accent={post.accent} mode={mode}>
                        <BookmarkSvg />
                      </GlassButton>
                    </div>

                    {/* Comments */}
                    {isExpanded && post.comments.length > 0 && (
                      <div
                        className="mx-4 mb-4 p-3 space-y-2.5 rounded-xl relative z-10"
                        style={{
                          backgroundColor:
                            mode === "light"
                              ? "rgba(255,255,255,0.4)"
                              : "rgba(255,255,255,0.04)",
                          border: `1px solid rgba(255,255,255,${mode === "light" ? "0.3" : "0.05"})`,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,${mode === "light" ? "0.3" : "0.03"})`,
                        }}
                      >
                        {post.comments.map((c, ci) => (
                          <div key={ci} className="flex items-start gap-2.5">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5 shrink-0"
                              style={{
                                background: `linear-gradient(145deg, ${colors.aqua}60, ${colors.aqua}30)`,
                                color: mode === "light" ? colors.deepOcean : colors.aquaLight,
                                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2)`,
                              }}
                            >
                              {c.displayName[0]}
                            </div>
                            <p
                              className="text-[13px] leading-relaxed"
                              style={{
                                color: t.textSecondary,
                                fontFamily: "'Inter', system-ui, sans-serif",
                              }}
                            >
                              <span
                                className="font-bold mr-1"
                                style={{ color: t.text }}
                              >
                                {c.displayName}
                              </span>
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

        {/* Bottom Nav — floating frosted glass pill */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[400px] z-50 px-4">
          <nav
            className="flex items-center justify-around h-14 px-2 rounded-full relative overflow-hidden"
            style={{
              background:
                mode === "light"
                  ? "rgba(255,255,255,0.6)"
                  : "rgba(13,33,55,0.75)",
              backdropFilter: "blur(30px) saturate(1.6)",
              WebkitBackdropFilter: "blur(30px) saturate(1.6)",
              border: `1px solid rgba(255,255,255,${mode === "light" ? "0.5" : "0.1"})`,
              boxShadow: `0 8px 32px rgba(0,0,0,${mode === "light" ? "0.08" : "0.3"}), inset 0 1px 0 rgba(255,255,255,${mode === "light" ? "0.4" : "0.06"})`,
            }}
          >
            {/* Gloss shine on navbar */}
            <div
              className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none"
              style={{
                background: `linear-gradient(180deg, rgba(255,255,255,${mode === "light" ? "0.4" : "0.06"}) 0%, transparent 100%)`,
                borderRadius: "inherit",
              }}
            />

            <NavButton active color={colors.aqua} mode={mode}>
              <HomeSvg />
            </NavButton>
            <NavButton color={colors.aqua} mode={mode}>
              <CalendarSvg />
            </NavButton>
            {/* Create button — glossy orb */}
            <button className="transition-all active:scale-90 relative z-10">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${colors.aquaLight}, ${colors.aquaDark})`,
                  boxShadow: `0 4px 16px rgba(0,188,212,0.4), inset 0 2px 4px rgba(255,255,255,0.3)`,
                  color: "#fff",
                }}
              >
                <PlusSvg />
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    left: 6,
                    width: "60%",
                    height: "35%",
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.5), transparent)",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </button>
            <NavButton color={colors.aqua} mode={mode}>
              <ChatSvg />
            </NavButton>
            <NavButton color={colors.aqua} mode={mode}>
              <GlobeSvg />
            </NavButton>
          </nav>
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable Glass Button ─── */
function GlassButton({
  children,
  active,
  onClick,
  accent: _accent,
  mode,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  accent: string;
  mode: "light" | "dark";
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3.5 py-2 rounded-full transition-all active:scale-95 relative overflow-hidden"
      style={{
        background: active
          ? `linear-gradient(135deg, ${_accent}${mode === "light" ? "30" : "40"}, ${_accent}${mode === "light" ? "15" : "20"})`
          : mode === "light"
            ? "rgba(255,255,255,0.5)"
            : "rgba(255,255,255,0.06)",
        border: `1px solid ${active ? `${_accent}40` : `rgba(255,255,255,${mode === "light" ? "0.4" : "0.08"})`}`,
        color: active
          ? (mode === "light" ? colors.deepOcean : colors.aquaLight)
          : (mode === "light" ? "#3A6A7E" : "#7BA4B5"),
        boxShadow: `inset 0 1px 0 rgba(255,255,255,${mode === "light" ? "0.3" : "0.04"})`,
      }}
    >
      {children}
    </button>
  );
}

/* ─── Nav Button ─── */
function NavButton({
  children,
  active,
  color,
  mode,
}: {
  children: React.ReactNode;
  active?: boolean;
  color: string;
  mode: "light" | "dark";
}) {
  return (
    <button
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 relative z-10"
      style={{
        backgroundColor: active
          ? `${color}${mode === "light" ? "20" : "25"}`
          : "transparent",
        color: active
          ? color
          : mode === "light"
            ? "rgba(26,60,80,0.4)"
            : "rgba(224,247,250,0.35)",
        boxShadow: active
          ? `inset 0 1px 0 rgba(255,255,255,${mode === "light" ? "0.4" : "0.06"})`
          : "none",
      }}
    >
      {children}
    </button>
  );
}

/* ─── SVG Icons ─── */
function SearchSvg({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function MoreSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}
function CommentSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function ShareSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function BookmarkSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function PlusSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
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
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
