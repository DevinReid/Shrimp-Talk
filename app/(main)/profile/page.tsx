"use client";

import { useState } from "react";
import BottomNav from "@/components/app/BottomNav";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";

const TAGS = ["shrimp", "photography", "hiking", "cooking", "indie music", "travel", "coffee", "board games"];
const VISIBLE_TAGS = 5;

const PROFILE_POSTS = [
  { id: "pp1", imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop", caption: "Morning hike was absolutely worth the early alarm", time: "2h ago" },
  { id: "pp2", imageUrl: null, caption: "Does anyone have a good recipe for sourdough? I've killed my last three starters and I'm starting to take it personally.", time: "7h ago" },
  { id: "pp3", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop", caption: "Sunday brunch situation", time: "1d ago" },
  { id: "pp4", imageUrl: null, caption: "Reminder: Book club is moved to Wednesday this week because of the holiday. Same time, same place.", time: "2d ago" },
  { id: "pp5", imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop", caption: "Couldn't believe this was real life", time: "3d ago" },
];

export default function ProfilePage() {
  const [showAllTags, setShowAllTags] = useState(false);
  const displayedTags = showAllTags ? TAGS : TAGS.slice(0, VISIBLE_TAGS);

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: wonkyColors.coral }}
    >
      <div className="sticky top-0 z-40">
        <div className="px-4 safe-area-top" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center justify-between h-14">
            <button className="p-1" style={{ color: wonkyColors.coral }}><BackIcon /></button>
            <h1 className="text-xl" style={{ fontFamily: "var(--font-fredoka), sans-serif", fontWeight: 700, color: wonkyColors.coral }}>
              profile
            </h1>
            <div className="flex items-center gap-2">
              <button className="p-1" style={{ color: wonkyColors.coral }}><ShareIcon /></button>
              <button className="p-1" style={{ color: wonkyColors.coral }}><MenuIcon /></button>
            </div>
          </div>
        </div>

        <svg width="100%" height="20" viewBox="0 0 430 20" preserveAspectRatio="none" className="relative z-40 -mt-[1px]">
          <path d="M0 0 L0 10 C30 20, 60 0, 90 10 C120 20, 150 0, 180 10 C210 20, 240 0, 270 10 C300 20, 330 0, 360 10 C390 20, 420 0, 430 10 L430 0 Z" fill="#ffffff" />
          <path d="M0 10 C30 20, 60 0, 90 10 C120 20, 150 0, 180 10 C210 20, 240 0, 270 10 C300 20, 330 0, 360 10 C390 20, 420 0, 430 10" fill="none" stroke={wonkyColors.coral} strokeWidth="2.5" />
        </svg>
      </div>

      <div className="px-4 pb-24">
        <div className="mb-4 pt-2">
          <div className="flex items-center gap-2">
            <h1
              className="text-2xl font-bold"
              style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}
            >
              shrimp_alice
            </h1>
            <button
              className="w-7 h-7 flex items-center justify-center"
              style={{
                backgroundColor: wonkyColors.gold,
                borderRadius: "10px 12px 10px 12px",
                border: `2px solid ${wonkyColors.black}`,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={wonkyColors.black} strokeWidth={2.5} strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0">
            <div
              className="w-20 h-20 overflow-hidden"
              style={{
                borderRadius: "24px 30px 24px 30px",
                border: `2.5px solid ${wonkyColors.black}`,
              }}
            >
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sunshine" alt="Alice" className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-white/70 mt-1.5 flex items-center gap-1 font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" fill="white" stroke="none" /></svg>
              new orleans
            </p>
            <p className="text-xs text-white/70 mt-1 flex items-center gap-1 font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Anna's
            </p>
          </div>

          <div
            className="flex-1 px-4 py-3 relative"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              borderRadius: wonkyCardRadius,
              border: `2.5px solid ${wonkyColors.black}`,
            }}
          >
            <button className="absolute top-3 right-3" style={{ color: "#9a7a72" }}><EditSmallIcon /></button>
            <p className="text-sm font-medium" style={{ color: wonkyColors.black }}><span style={{ color: "#9a7a72" }}>name</span> Alice <span style={{ color: "#9a7a72" }}>(she/her)</span></p>
            <p className="text-sm font-medium" style={{ color: wonkyColors.black }}><span style={{ color: "#9a7a72" }}>vibe</span> chaotic good</p>
            <p className="text-sm font-medium" style={{ color: wonkyColors.black }}><span style={{ color: "#9a7a72" }}>into</span> sunsets & seafood</p>
          </div>
        </div>

        <div
          className="px-4 py-4 relative"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            borderRadius: wonkyCardRadius,
            border: `2.5px solid ${wonkyColors.black}`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold" style={{ color: "#9a7a72" }}>about me</p>
            <button style={{ color: "#9a7a72" }}><EditSmallIcon /></button>
          </div>
          <p className="text-sm leading-relaxed font-medium" style={{ color: wonkyColors.black }}>
            just a shrimp trying to make it in this big ocean. i post food pics and bad jokes. no refunds.
          </p>
        </div>

        <div
          className="px-4 py-4 mt-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            borderRadius: wonkyCardRadius,
            border: `2.5px solid ${wonkyColors.black}`,
          }}
        >
          <div className="flex items-center gap-3 py-3">
            <p className="text-sm w-16 shrink-0 font-bold" style={{ color: "#9a7a72" }}>listening</p>
            <div className="w-10 h-10 overflow-hidden bg-white/10 shrink-0" style={{ borderRadius: "10px 14px 10px 14px", border: `2px solid ${wonkyColors.black}` }}>
              <img src="https://picsum.photos/80/80?random=10" alt="Album" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: wonkyColors.black }}>ocean eyes</p>
              <p className="text-xs truncate" style={{ color: "#9a7a72" }}>billie eilish</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1" style={{ backgroundColor: wonkyColors.goldSoft, color: "#B8903A", borderRadius: "10px 12px 10px 12px" }}>Spotify</span>
          </div>

          <div className="flex items-center gap-3 py-3" style={{ borderTop: `2px solid ${wonkyColors.black}20` }}>
            <p className="text-sm w-16 shrink-0 font-bold" style={{ color: "#9a7a72" }}>watching</p>
            <div className="w-10 h-10 overflow-hidden bg-white/10 shrink-0" style={{ borderRadius: "10px 14px 10px 14px", border: `2px solid ${wonkyColors.black}` }}>
              <img src="https://picsum.photos/80/80?random=11" alt="Show" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-bold" style={{ color: wonkyColors.black }}>the bear</p>
          </div>

          <div className="flex items-center gap-3 py-3" style={{ borderTop: `2px solid ${wonkyColors.black}20` }}>
            <p className="text-sm w-16 shrink-0 font-bold" style={{ color: "#9a7a72" }}>playing</p>
            <p className="text-sm font-bold" style={{ color: wonkyColors.black }}>stardew valley</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold mb-3 px-1" style={{ color: wonkyColors.goldSoft, fontFamily: "var(--font-fredoka), sans-serif" }}>pinned</p>
          <div className="grid grid-cols-3 gap-2">
            {[30, 31, 32].map((i) => (
              <div key={i} className="aspect-square overflow-hidden" style={{ borderRadius: "18px 22px 18px 22px", border: `2.5px solid ${wonkyColors.black}` }}>
                <img src={`https://picsum.photos/300/300?random=${i}`} alt={`Pinned ${i}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold mb-3 px-1" style={{ color: wonkyColors.goldSoft, fontFamily: "var(--font-fredoka), sans-serif" }}>posts</p>
          <div className="space-y-4">
            {PROFILE_POSTS.map((post) =>
              post.imageUrl ? (
                <div key={post.id} className="overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.92)", borderRadius: wonkyCardRadius, border: `2.5px solid ${wonkyColors.black}` }}>
                  <div className="w-full" style={{ aspectRatio: "1/1" }}>
                    <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="px-5 py-3">
                    <p className="text-sm font-medium leading-relaxed" style={{ color: wonkyColors.black }}>{post.caption}</p>
                    <p className="text-[10px] font-bold mt-2 uppercase tracking-wide" style={{ color: "#9a7a72" }}>{post.time}</p>
                  </div>
                </div>
              ) : (
                <div key={post.id} className="px-5 py-5"
                  style={{ backgroundColor: wonkyColors.pink, borderRadius: wonkyCardRadius, border: `2.5px solid ${wonkyColors.black}` }}>
                  <div className="px-4 py-3" style={{ backgroundColor: wonkyColors.white, borderRadius: "18px" }}>
                    <p className="text-[15px] font-medium leading-relaxed" style={{ color: wonkyColors.black }}>{post.caption}</p>
                  </div>
                  <p className="text-[10px] font-bold mt-3 uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>{post.time}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function BackIcon() {
  return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>);
}
function ShareIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>);
}
function MenuIcon() {
  return (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>);
}
function EditSmallIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>);
}
