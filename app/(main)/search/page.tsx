"use client";

import { useState, useMemo } from "react";
import MobileTopBar from "@/components/app/MobileTopBar";
import BottomNav from "@/components/app/BottomNav";
import { wonkyColors, wonkyCardRadius, getAccent } from "@/lib/wonkyTheme";
import { mockUsers, mockFriendGroups } from "@/lib/mockData";

type Category = "all" | "people" | "groups" | "events" | "locations";

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "✨" },
  { id: "people", label: "People", icon: "👤" },
  { id: "groups", label: "Groups", icon: "👥" },
  { id: "events", label: "Events", icon: "📅" },
  { id: "locations", label: "Places", icon: "📍" },
];

const mockEvents = [
  { id: "evt1", title: "Beach Bonfire", date: "Mar 15", location: "Sunset Beach", attendees: 8, emoji: "🔥" },
  { id: "evt2", title: "Coffee Crawl", date: "Mar 18", location: "Downtown", attendees: 5, emoji: "☕" },
  { id: "evt3", title: "Movie Night", date: "Mar 20", location: "Bob's Place", attendees: 4, emoji: "🎬" },
  { id: "evt4", title: "Hiking Trip", date: "Mar 22", location: "Mountain Trail", attendees: 6, emoji: "🥾" },
  { id: "evt5", title: "Game Night", date: "Mar 25", location: "Alice's House", attendees: 7, emoji: "🎮" },
  { id: "evt6", title: "Brunch Club", date: "Mar 28", location: "The Rooftop", attendees: 10, emoji: "🥞" },
];

const mockLocations = [
  { id: "loc1", name: "Sunset Beach", type: "Beach", distance: "2.3 mi", emoji: "🏖️" },
  { id: "loc2", name: "Mountain Trail", type: "Hiking", distance: "8.1 mi", emoji: "⛰️" },
  { id: "loc3", name: "The Rooftop", type: "Restaurant", distance: "0.4 mi", emoji: "🍽️" },
  { id: "loc4", name: "Central Park", type: "Park", distance: "1.1 mi", emoji: "🌳" },
  { id: "loc5", name: "Coral Reef Café", type: "Coffee Shop", distance: "0.8 mi", emoji: "🦐" },
  { id: "loc6", name: "Downtown Arcade", type: "Entertainment", distance: "3.2 mi", emoji: "🕹️" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const q = query.toLowerCase().trim();

  const filteredPeople = useMemo(
    () => mockUsers.filter((u) => u.displayName.toLowerCase().includes(q) || u.bio?.toLowerCase().includes(q)),
    [q],
  );

  const filteredGroups = useMemo(
    () => mockFriendGroups.filter((g) => g.name.toLowerCase().includes(q) || g.members.some((m) => m.displayName.toLowerCase().includes(q))),
    [q],
  );

  const filteredEvents = useMemo(
    () => mockEvents.filter((e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)),
    [q],
  );

  const filteredLocations = useMemo(
    () => mockLocations.filter((l) => l.name.toLowerCase().includes(q) || l.type.toLowerCase().includes(q)),
    [q],
  );

  const showPeople = activeCategory === "all" || activeCategory === "people";
  const showGroups = activeCategory === "all" || activeCategory === "groups";
  const showEvents = activeCategory === "all" || activeCategory === "events";
  const showLocations = activeCategory === "all" || activeCategory === "locations";

  const totalResults = (showPeople ? filteredPeople.length : 0) + (showGroups ? filteredGroups.length : 0) + (showEvents ? filteredEvents.length : 0) + (showLocations ? filteredLocations.length : 0);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: wonkyColors.coral }}>
      <MobileTopBar />

      <div className="px-4 pt-3 pb-24">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}
        >
          search
        </h1>
        <p className="text-sm font-medium mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
          find people, groups, events & places
        </p>

        {/* Search input */}
        <div className="relative mb-4">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: wonkyColors.coral }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search shrimp talk..."
            autoFocus
            className="w-full pl-11 pr-4 py-3.5 text-sm font-semibold outline-none placeholder:font-medium"
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              color: wonkyColors.black,
              borderRadius: wonkyCardRadius,
              border: `2.5px solid ${wonkyColors.black}`,
              fontFamily: "var(--font-nunito), sans-serif",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center active:scale-90 transition-transform"
              style={{ backgroundColor: wonkyColors.coralSoft, borderRadius: "50%", color: wonkyColors.coral }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
              </svg>
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold whitespace-nowrap shrink-0 transition-all active:scale-95"
                style={{
                  backgroundColor: active ? wonkyColors.black : "rgba(255,255,255,0.85)",
                  color: active ? wonkyColors.white : wonkyColors.black,
                  borderRadius: "18px 22px 18px 22px",
                  border: `2.5px solid ${wonkyColors.black}`,
                }}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        {q && (
          <p className="text-xs font-bold mb-3 px-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            {totalResults} result{totalResults !== 1 ? "s" : ""} {activeCategory !== "all" ? `in ${CATEGORIES.find((c) => c.id === activeCategory)?.label}` : ""}
          </p>
        )}

        {/* People results */}
        {showPeople && filteredPeople.length > 0 && (
          <ResultSection title="people" icon="👤">
            {filteredPeople.map((user) => {
              const accent = getAccent(user.displayName);
              return (
                <div
                  key={user.id}
                  className="flex items-center gap-3 px-4 py-3 transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    borderRadius: wonkyCardRadius,
                    border: `2.5px solid ${wonkyColors.black}`,
                  }}
                >
                  <div
                    className="w-11 h-11 shrink-0 flex items-center justify-center text-lg"
                    style={{
                      backgroundColor: accent.accentSoft,
                      borderRadius: "16px 20px 16px 20px",
                      border: `2px solid ${accent.accent}`,
                    }}
                  >
                    {user.displayName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: wonkyColors.black }}>{user.displayName}</p>
                    {user.bio && <p className="text-xs font-medium truncate" style={{ color: "#9a7a72" }}>{user.bio}</p>}
                  </div>
                  <div
                    className="px-3 py-1 text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: wonkyColors.pinkSoft,
                      color: wonkyColors.pink,
                      borderRadius: "12px 14px 12px 14px",
                      border: `2px solid ${wonkyColors.pink}`,
                    }}
                  >
                    view
                  </div>
                </div>
              );
            })}
          </ResultSection>
        )}

        {/* Groups results */}
        {showGroups && filteredGroups.length > 0 && (
          <ResultSection title="groups" icon="👥">
            {filteredGroups.map((group) => {
              const accent = getAccent(group.name);
              return (
                <div
                  key={group.id}
                  className="flex items-center gap-3 px-4 py-3 transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    borderRadius: wonkyCardRadius,
                    border: `2.5px solid ${wonkyColors.black}`,
                  }}
                >
                  <div
                    className="w-11 h-11 shrink-0 flex items-center justify-center text-lg"
                    style={{
                      backgroundColor: accent.accentSoft,
                      borderRadius: "20px 16px 20px 16px",
                      border: `2px solid ${accent.accent}`,
                    }}
                  >
                    👥
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: wonkyColors.black }}>{group.name}</p>
                    <p className="text-xs font-medium truncate" style={{ color: "#9a7a72" }}>
                      {group.members.length} member{group.members.length !== 1 ? "s" : ""} · {group.members.map((m) => m.displayName).join(", ")}
                    </p>
                  </div>
                </div>
              );
            })}
          </ResultSection>
        )}

        {/* Events results */}
        {showEvents && filteredEvents.length > 0 && (
          <ResultSection title="events" icon="📅">
            {filteredEvents.map((evt) => {
              const accent = getAccent(evt.title);
              return (
                <div
                  key={evt.id}
                  className="flex items-center gap-3 px-4 py-3 transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    borderRadius: wonkyCardRadius,
                    border: `2.5px solid ${wonkyColors.black}`,
                  }}
                >
                  <div
                    className="w-11 h-11 shrink-0 flex items-center justify-center text-lg"
                    style={{
                      backgroundColor: accent.accentSoft,
                      borderRadius: "16px 20px 16px 20px",
                      border: `2px solid ${accent.accent}`,
                    }}
                  >
                    {evt.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: wonkyColors.black }}>{evt.title}</p>
                    <p className="text-xs font-medium truncate" style={{ color: "#9a7a72" }}>
                      {evt.date} · {evt.location} · {evt.attendees} going
                    </p>
                  </div>
                </div>
              );
            })}
          </ResultSection>
        )}

        {/* Locations results */}
        {showLocations && filteredLocations.length > 0 && (
          <ResultSection title="places" icon="📍">
            {filteredLocations.map((loc) => {
              const accent = getAccent(loc.name);
              return (
                <div
                  key={loc.id}
                  className="flex items-center gap-3 px-4 py-3 transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    borderRadius: wonkyCardRadius,
                    border: `2.5px solid ${wonkyColors.black}`,
                  }}
                >
                  <div
                    className="w-11 h-11 shrink-0 flex items-center justify-center text-lg"
                    style={{
                      backgroundColor: accent.accentSoft,
                      borderRadius: "20px 16px 20px 16px",
                      border: `2px solid ${accent.accent}`,
                    }}
                  >
                    {loc.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: wonkyColors.black }}>{loc.name}</p>
                    <p className="text-xs font-medium truncate" style={{ color: "#9a7a72" }}>
                      {loc.type} · {loc.distance}
                    </p>
                  </div>
                </div>
              );
            })}
          </ResultSection>
        )}

        {/* Empty state */}
        {q && totalResults === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-5xl mb-4">🦐</span>
            <p className="text-base font-bold" style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}>
              no shrimp found
            </p>
            <p className="text-sm font-medium mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
              try a different search term
            </p>
          </div>
        )}

        {/* Default state when no query */}
        {!q && (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-base font-bold" style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}>
              what are you looking for?
            </p>
            <p className="text-sm font-medium mt-1 text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
              search for friends, groups, events, or places
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function ResultSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2 px-1">
        <span className="text-sm">{icon}</span>
        <h3
          className="text-sm font-bold"
          style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}
        >
          {title}
        </h3>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}
