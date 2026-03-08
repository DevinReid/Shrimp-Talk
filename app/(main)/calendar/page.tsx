"use client";

import { useState } from "react";
import MobileTopBar from "@/components/app/MobileTopBar";
import BottomNav from "@/components/app/BottomNav";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";

type TabId = "all" | "foryou";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "foryou", label: "For You" },
];

const EVENTS = [
  {
    date: "FRI, MAR 7",
    items: [
      { id: "e1", title: "Shrimp Fest Block Party", subtitle: "DJ Coral, The Tides", venue: "Warehouse District", attendees: 12 },
      { id: "e2", title: "Open Mic Night", subtitle: null, venue: "The Pearl Lounge", attendees: 5 },
    ],
  },
  {
    date: "SAT, MAR 8",
    items: [
      { id: "e3", title: "Costume Party: 80s Movies", subtitle: "Hosted by Charlie", venue: "Charlie's Place", attendees: 8 },
      { id: "e4", title: "Sunset Rooftop Hangout", subtitle: null, venue: "Sky Bar", attendees: 3 },
      { id: "e5", title: "Board Game Night", subtitle: "Bring your own games", venue: "Common Grounds Cafe", attendees: null },
    ],
  },
  {
    date: "SUN, MAR 9",
    items: [
      { id: "e6", title: "Brunch & Chill", subtitle: "Alice, Bob, Diana", venue: "Morning Glory Kitchen", attendees: 4 },
    ],
  },
  {
    date: "WED, MAR 12",
    items: [
      { id: "e7", title: "Book Club: Final Chapters", subtitle: "Hosted by Diana", venue: "Diana's Place", attendees: 6 },
      { id: "e8", title: "Live Jazz & Seafood", subtitle: "The Low Tide Trio", venue: "Bayou Blue", attendees: null },
    ],
  },
];

const accentColors = [wonkyColors.pink, wonkyColors.gold, wonkyColors.coral];

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: wonkyColors.coral }}
    >
      <MobileTopBar />

      <div className="px-4 pt-3 pb-2">
        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}
        >
          things to do
        </h1>

        <div className="flex gap-2 mb-4">
          <span
            className="text-sm font-bold px-4 py-1.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "18px 22px 18px 22px",
              border: `2.5px solid ${wonkyColors.black}`,
              color: wonkyColors.white,
            }}
          >
            Sat, 8 Mar
          </span>
          <span
            className="text-sm font-bold px-4 py-1.5 flex items-center gap-1.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "22px 18px 22px 18px",
              border: `2.5px solid ${wonkyColors.black}`,
              color: wonkyColors.white,
            }}
          >
            📍 New Orleans
          </span>
        </div>

        <div className="flex items-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2 text-sm font-bold rounded-full transition-all active:scale-95"
              style={{
                backgroundColor: activeTab === tab.id ? wonkyColors.white : "transparent",
                color: activeTab === tab.id ? wonkyColors.black : "rgba(255,255,255,0.5)",
                border: activeTab === tab.id ? `2.5px solid ${wonkyColors.black}` : "2.5px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 pb-24">
        {EVENTS.map((group, gi) => (
          <div key={group.date} className="mt-5">
            <div className="mb-3 px-1">
              <h2
                className="text-base font-bold tracking-wide"
                style={{ color: wonkyColors.goldSoft, fontFamily: "var(--font-fredoka), sans-serif" }}
              >
                {group.date}
              </h2>
            </div>

            <div className="space-y-3">
              {group.items.map((event, ei) => {
                const color = accentColors[(gi + ei) % accentColors.length];
                return (
                  <div
                    key={event.id}
                    className="px-5 py-4 transition-all"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(20px)",
                      borderRadius: wonkyCardRadius,
                      border: `2.5px solid ${wonkyColors.black}`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex-1">
                        <h3
                          className="text-[15px] font-bold mb-0.5"
                          style={{ color: wonkyColors.black }}
                        >
                          {event.title}
                        </h3>
                        {event.subtitle && (
                          <p className="text-[13px] mb-1.5" style={{ color: "#9a7a72" }}>
                            {event.subtitle}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <PinIcon />
                            <p className="text-[12px] font-medium" style={{ color: "#9a7a72" }}>
                              {event.venue}
                            </p>
                          </div>
                          {event.attendees && (
                            <div
                              className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: color + "20", color }}
                            >
                              <span className="text-[11px]">🦐</span>
                              <span className="text-[11px] font-bold">{event.attendees}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#F7C052" stroke="none">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" fill="white" stroke="none" />
    </svg>
  );
}
