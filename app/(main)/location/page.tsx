"use client";

import { useState, useEffect } from "react";
import MobileTopBar from "@/components/app/MobileTopBar";
import BottomNav from "@/components/app/BottomNav";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";
import dynamic from "next/dynamic";

import type { Friend as BaseFriend } from "@/components/app/LocationMap";

const LocationMap = dynamic(() => import("@/components/app/LocationMap"), { ssr: false });

interface Friend extends BaseFriend {
  location: string;
  updatedAgo: string;
  distance: string;
}

const FRIENDS: Friend[] = [
  { id: "1", name: "Alice", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunshine", initials: "A", lat: 29.9511, lng: -90.0715, location: "New Orleans, LA", updatedAgo: "Now", distance: "0 mi", color: wonkyColors.pink, status: "At home" },
  { id: "2", name: "Bob", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", initials: "B", lat: 29.9630, lng: -90.0505, location: "New Orleans, LA", updatedAgo: "5 min. ago", distance: "0.8 mi", color: wonkyColors.coral, status: "At Anna's" },
  { id: "3", name: "Charlie", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie", initials: "C", lat: 29.9275, lng: -90.0861, location: "New Orleans, LA", updatedAgo: "12 min. ago", distance: "1.5 mi", color: wonkyColors.gold, status: "Heading to the thrift store" },
  { id: "4", name: "Diana", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana", initials: "D", lat: 29.9850, lng: -90.1100, location: "Metairie, LA", updatedAgo: "1 hr. ago", distance: "3.2 mi", color: wonkyColors.pink, status: "At Our Bar" },
  { id: "5", name: "Grace", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace", initials: "G", lat: 29.9400, lng: -90.1200, location: "New Orleans, LA", updatedAgo: "30 min. ago", distance: "2.1 mi", color: wonkyColors.coral, status: "At home" },
];

const GROUPS = [
  { id: "g1", name: "The Crew", members: 8, emoji: "🦐" },
  { id: "g2", name: "Roommates", members: 3, emoji: "🏠" },
  { id: "g3", name: "Trivia Night", members: 6, emoji: "🧠" },
  { id: "g4", name: "Work Friends", members: 5, emoji: "💼" },
  { id: "g5", name: "NOLA Squad", members: 12, emoji: "⚜️" },
];

export default function LocationPage() {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const [locationTab, setLocationTab] = useState<"friends" | "me">("friends");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusPlace, setStatusPlace] = useState("");
  const [showFromTime, setShowFromTime] = useState(false);
  const [showUntilTime, setShowUntilTime] = useState(false);
  const [statusFrom, setStatusFrom] = useState("17:00");
  const [statusTo, setStatusTo] = useState("19:00");
  const [taggedFriends, setTaggedFriends] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState("");
  const [shareWith, setShareWith] = useState<"everyone" | "selected" | "groups">("everyone");
  const [selectedShareFriends, setSelectedShareFriends] = useState<string[]>([]);
  const [selectedShareGroups, setSelectedShareGroups] = useState<string[]>([]);
  const [shareSearch, setShareSearch] = useState("");
  const [myStatus, setMyStatus] = useState<{ place: string; from: string; to: string; tagged: string[] } | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleFriendClick = (friend: BaseFriend) => {
    const full = FRIENDS.find(f => f.id === friend.id) ?? null;
    setSelectedFriend(full);
    setPanelOpen(false);
  };

  const wonkyInput = {
    borderRadius: "18px",
    border: `2.5px solid rgba(255,255,255,0.3)`,
    backgroundColor: "rgba(255,255,255,0.15)",
    color: wonkyColors.white,
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        {mounted && <LocationMap friends={FRIENDS} selectedFriend={selectedFriend} onMarkerClick={handleFriendClick} />}
      </div>

      <div className="absolute top-0 left-0 right-0 z-[1000]">
        <MobileTopBar title="where y'at?" />
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-[4.5rem] left-4 z-[1060] w-10 h-10 flex items-center justify-center transition-all active:scale-90"
        style={{ backgroundColor: wonkyColors.pink, borderRadius: "14px 18px 14px 18px", border: `2.5px solid ${wonkyColors.black}` }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round">
          <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute inset-0 z-[1050]" style={{ top: '48px' }} onClick={() => setMenuOpen(false)}>
          <div className="absolute top-0 left-0 bottom-0 w-72 flex flex-col backdrop-blur-xl"
            style={{ backgroundColor: "rgba(247,109,82,0.92)", borderRight: `2.5px solid ${wonkyColors.black}` }}
            onClick={(e) => e.stopPropagation()}>
            <div className="px-4 pt-4 pb-3 pl-16" />
            <div className="flex gap-2 px-4 mb-3">
              {(["friends", "me"] as const).map((tab) => (
                <button key={tab} onClick={() => setLocationTab(tab)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all"
                  style={{
                    backgroundColor: locationTab === tab ? "rgba(255,255,255,0.3)" : "transparent",
                    borderRadius: "14px 18px 14px 18px",
                    color: "white",
                    border: locationTab === tab ? `2px solid ${wonkyColors.black}` : "2px solid transparent",
                  }}>
                  {tab === "friends" ? "🦐 Friends" : "👤 Me"}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto px-3">
              {locationTab === "friends" ? (
                FRIENDS.map((friend) => (
                  <button key={friend.id} onClick={() => { handleFriendClick(friend); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 py-3 text-left"
                    style={{ borderBottom: `2px solid rgba(255,255,255,0.15)` }}>
                    <div className="w-10 h-10 overflow-hidden shrink-0" style={{ borderRadius: "14px 18px 14px 18px", border: `2.5px solid ${wonkyColors.black}` }}>
                      <img src={friend.avatarUrl} alt={friend.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white">{friend.name}</p>
                      <p className="text-xs text-white/50">{friend.location} · {friend.updatedAgo}</p>
                      <p className="text-xs text-white/70 mt-0.5 font-medium">📍 {friend.status}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-4">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 overflow-hidden" style={{ borderRadius: "18px 22px 18px 22px", border: `2.5px solid ${wonkyColors.black}` }}>
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sunshine" alt="You" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">Alice (You)</p>
                      <p className="text-xs text-white/50">New Orleans, LA · Now</p>
                    </div>
                  </div>
                  {myStatus && (
                    <div className="px-4 py-3 mb-3" style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "18px 22px 18px 22px", border: `2px solid rgba(255,255,255,0.3)` }}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-white/50 font-bold">your status</p>
                        <button onClick={() => setMyStatus(null)} className="text-white/40 p-1">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                      </div>
                      <p className="text-sm text-white font-bold">📍 {myStatus.place}</p>
                      {(showFromTime || showUntilTime) && (
                        <p className="text-xs text-white/50 mt-0.5">{showFromTime && `from ${myStatus.from}`}{showFromTime && showUntilTime && ' '}{showUntilTime && `until ${myStatus.to}`}</p>
                      )}
                      {myStatus.tagged.length > 0 && (
                        <p className="text-xs text-white/50 mt-0.5">with {myStatus.tagged.map(id => FRIENDS.find(f => f.id === id)?.name).filter(Boolean).join(', ')}</p>
                      )}
                    </div>
                  )}
                  <button onClick={() => setStatusModalOpen(true)}
                    className="w-full py-2.5 text-sm font-bold text-white transition-all active:scale-95"
                    style={{ backgroundColor: wonkyColors.gold, color: wonkyColors.black, borderRadius: "18px 22px 18px 22px", border: `2.5px solid ${wonkyColors.black}` }}>
                    {myStatus ? 'Update Status' : 'Set Your Status'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {statusModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-end justify-center" onClick={() => setStatusModalOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative w-full max-w-lg overflow-hidden flex flex-col"
            style={{ maxHeight: '85vh', backgroundColor: wonkyColors.coral, borderRadius: `${wonkyCardRadius} ${wonkyCardRadius} 0 0`, border: `2.5px solid ${wonkyColors.black}`, borderBottom: "none" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-white/30" /></div>
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>set your status</h2>
                <button onClick={() => setStatusModalOpen(false)} className="text-white/60 p-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              <div className="mb-5">
                <p className="text-xs text-white/60 font-bold uppercase tracking-wider mb-2">1. Where are you going?</p>
                <input type="text" placeholder="Search a place..." value={statusPlace} onChange={(e) => setStatusPlace(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm placeholder-white/40 outline-none font-medium" style={wonkyInput} />
              </div>

              <div className="mb-5">
                <p className="text-xs text-white/60 font-bold uppercase tracking-wider mb-2">2. When? <span className="normal-case font-normal">(optional)</span></p>
                <div className="space-y-2">
                  {[{ label: "Starting at", show: showFromTime, setShow: setShowFromTime, value: statusFrom, setValue: setStatusFrom },
                    { label: "Until around", show: showUntilTime, setShow: setShowUntilTime, value: statusTo, setValue: setStatusTo }].map((item) => (
                    <div key={item.label} className="px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.12)", borderRadius: "18px", border: "2px solid rgba(255,255,255,0.2)" }}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-white font-medium">{item.label}</p>
                        <button onClick={() => item.setShow(!item.show)} className="w-10 h-6 rounded-full relative transition-colors"
                          style={{ backgroundColor: item.show ? wonkyColors.pink : 'rgba(255,255,255,0.2)' }}>
                          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${item.show ? 'left-[18px]' : 'left-0.5'}`} />
                        </button>
                      </div>
                      {item.show && <input type="time" value={item.value} onChange={(e) => item.setValue(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg text-sm text-white outline-none mt-2" style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', colorScheme: 'dark' }} />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs text-white/60 font-bold uppercase tracking-wider mb-2">3. Who's gonna be there? <span className="normal-case font-normal">(optional)</span></p>
                {taggedFriends.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {taggedFriends.map(id => {
                      const f = FRIENDS.find(fr => fr.id === id);
                      if (!f) return null;
                      return (
                        <span key={id} className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 text-xs text-white font-bold"
                          style={{ backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "12px 14px 12px 14px" }}>
                          <img src={f.avatarUrl} alt={f.name} className="w-5 h-5 rounded-full object-cover" />
                          {f.name}
                          <button onClick={() => setTaggedFriends(taggedFriends.filter(tid => tid !== id))} className="ml-0.5 text-white/50 hover:text-white">×</button>
                        </span>
                      );
                    })}
                  </div>
                )}
                <input type="text" placeholder="Search friends..." value={tagSearch} onChange={(e) => setTagSearch(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm placeholder-white/40 outline-none font-medium" style={wonkyInput} />
                {tagSearch.trim() && (
                  <div className="mt-2 overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "18px" }}>
                    {FRIENDS.filter(f => f.id !== "1" && f.name.toLowerCase().includes(tagSearch.toLowerCase()) && !taggedFriends.includes(f.id)).length === 0 ? (
                      <p className="text-xs text-white/40 px-3 py-3 text-center">No results</p>
                    ) : (
                      FRIENDS.filter(f => f.id !== "1" && f.name.toLowerCase().includes(tagSearch.toLowerCase()) && !taggedFriends.includes(f.id)).map((friend) => (
                        <button key={friend.id} onClick={() => { setTaggedFriends([...taggedFriends, friend.id]); setTagSearch(""); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-white/10 transition-colors">
                          <div className="w-8 h-8 overflow-hidden shrink-0" style={{ borderRadius: "12px 14px 12px 14px" }}><img src={friend.avatarUrl} alt={friend.name} className="w-full h-full object-cover" /></div>
                          <p className="text-sm text-white font-medium">{friend.name}</p>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <p className="text-xs text-white/60 font-bold uppercase tracking-wider mb-2">4. Share with</p>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {(["everyone", "selected", "groups"] as const).map((opt) => (
                    <button key={opt} onClick={() => setShareWith(opt)}
                      className="px-4 py-2 text-sm font-bold text-white transition-all active:scale-95"
                      style={{
                        backgroundColor: shareWith === opt ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                        borderRadius: "14px 18px 14px 18px",
                        border: `2px solid ${shareWith === opt ? wonkyColors.white : "rgba(255,255,255,0.2)"}`,
                      }}>
                      {opt === "everyone" ? "Everyone" : opt === "selected" ? "Select Friends" : "Groups"}
                    </button>
                  ))}
                </div>
                {shareWith === "selected" && (
                  <div className="mt-2">
                    <input type="text" placeholder="Search friends..." value={shareSearch} onChange={(e) => setShareSearch(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm placeholder-white/40 outline-none font-medium mb-2" style={wonkyInput} />
                    {selectedShareFriends.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {selectedShareFriends.map(id => {
                          const f = FRIENDS.find(fr => fr.id === id);
                          if (!f) return null;
                          return (
                            <span key={id} className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 text-xs text-white font-bold"
                              style={{ backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "12px 14px 12px 14px" }}>
                              <img src={f.avatarUrl} alt={f.name} className="w-5 h-5 rounded-full object-cover" />{f.name}
                              <button onClick={() => setSelectedShareFriends(selectedShareFriends.filter(tid => tid !== id))} className="ml-0.5 text-white/50 hover:text-white">×</button>
                            </span>
                          );
                        })}
                      </div>
                    )}
                    <div className="overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "18px" }}>
                      {FRIENDS.filter(f => f.id !== "1" && (!shareSearch.trim() || f.name.toLowerCase().includes(shareSearch.toLowerCase())) && !selectedShareFriends.includes(f.id)).map((friend) => (
                        <button key={friend.id} onClick={() => { setSelectedShareFriends([...selectedShareFriends, friend.id]); setShareSearch(""); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-white/10 transition-colors">
                          <div className="w-8 h-8 overflow-hidden shrink-0" style={{ borderRadius: "12px 14px 12px 14px" }}><img src={friend.avatarUrl} alt={friend.name} className="w-full h-full object-cover" /></div>
                          <p className="text-sm text-white font-medium">{friend.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {shareWith === "groups" && (
                  <div className="space-y-1 mt-2">
                    {GROUPS.map((group) => {
                      const isSelected = selectedShareGroups.includes(group.id);
                      return (
                        <button key={group.id} onClick={() => setSelectedShareGroups(isSelected ? selectedShareGroups.filter(id => id !== group.id) : [...selectedShareGroups, group.id])}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                          style={{ backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : "transparent", borderRadius: "14px 18px 14px 18px" }}>
                          <div className="w-8 h-8 flex items-center justify-center text-lg" style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "12px 14px 12px 14px" }}>{group.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white font-bold">{group.name}</p>
                            <p className="text-xs text-white/40">{group.members} members</p>
                          </div>
                          <div className="w-5 h-5 flex items-center justify-center"
                            style={{ borderRadius: "8px 10px 8px 10px", border: `2px solid ${isSelected ? "white" : "rgba(255,255,255,0.3)"}`, backgroundColor: isSelected ? "white" : "transparent" }}>
                            {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={wonkyColors.pink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button onClick={() => { if (statusPlace.trim()) { setMyStatus({ place: statusPlace, from: statusFrom, to: statusTo, tagged: taggedFriends }); setStatusModalOpen(false); } }}
                className="w-full py-3 text-base font-bold transition-all active:scale-95"
                style={{ backgroundColor: wonkyColors.gold, color: wonkyColors.black, borderRadius: "22px 26px 22px 26px", border: `2.5px solid ${wonkyColors.black}` }}>
                Set Status 📍
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
