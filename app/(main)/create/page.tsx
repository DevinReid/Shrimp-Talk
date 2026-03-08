"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";
import type { PostType, PostDuration } from "@/types";
import { mockFriendGroups } from "@/lib/mockData";

type CreateType = PostType | "event";

const CREATE_TYPES: { id: CreateType; label: string; icon: string }[] = [
  { id: "photo", label: "Photo", icon: "📸" },
  { id: "video", label: "Video", icon: "🎬" },
  { id: "text", label: "Text", icon: "✍️" },
  { id: "checkin", label: "Check-in", icon: "📍" },
  { id: "event", label: "Event", icon: "📅" },
];

const DURATION_OPTIONS: { id: PostDuration; label: string }[] = [
  { id: "forever", label: "∞" },
  { id: "1h", label: "1h" },
  { id: "6h", label: "6h" },
  { id: "24h", label: "24h" },
  { id: "3d", label: "3d" },
  { id: "1w", label: "1w" },
];

const TEXT_BACKGROUNDS = [
  { id: "gradient1", style: `linear-gradient(135deg, ${wonkyColors.pink} 0%, ${wonkyColors.coral} 100%)` },
  { id: "gradient2", style: `linear-gradient(135deg, ${wonkyColors.coral} 0%, ${wonkyColors.gold} 100%)` },
  { id: "gradient3", style: "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)" },
  { id: "gradient4", style: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)" },
  { id: "gradient5", style: `linear-gradient(135deg, ${wonkyColors.gold} 0%, ${wonkyColors.pink} 100%)` },
  { id: "solid1", style: wonkyColors.black },
  { id: "solid2", style: wonkyColors.pink },
  { id: "solid3", style: wonkyColors.coral },
];

type Overlay = {
  id: string;
  type: "text" | "link";
  x: number;
  y: number;
  text: string;
  url?: string;
  color: string;
  bgStyle: "none" | "solid" | "highlight";
  fontSize: "sm" | "md" | "lg";
};

const OVERLAY_COLORS = [
  "#ffffff", "#000000", wonkyColors.pink, wonkyColors.coral, wonkyColors.gold,
  "#10b981", "#0ea5e9", "#8b5cf6",
];

const FONT_SIZES = {
  sm: { label: "S", px: 14 },
  md: { label: "M", px: 20 },
  lg: { label: "L", px: 28 },
};

export default function CreatePage() {
  const router = useRouter();
  const [createType, setCreateType] = useState<CreateType>("photo");
  const [duration, setDuration] = useState<PostDuration>("forever");
  const [shareWith, setShareWith] = useState<"everyone" | "groups">("everyone");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [textContent, setTextContent] = useState("");
  const [textBg, setTextBg] = useState(TEXT_BACKGROUNDS[0].id);
  const [checkinMode, setCheckinMode] = useState<"at" | "going">("at");
  const [locationName, setLocationName] = useState("");
  const [checkinNote, setCheckinNote] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [editingOverlay, setEditingOverlay] = useState<Overlay | null>(null);
  const [overlayMode, setOverlayMode] = useState<"text" | "link" | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const handleClose = () => router.back();
  const handleCreate = () => router.push("/feed");

  const toggleGroup = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const addOverlay = (type: "text" | "link") => {
    setEditingOverlay({
      id: Date.now().toString(), type, x: 50, y: 50, text: "",
      url: type === "link" ? "" : undefined,
      color: "#ffffff", bgStyle: type === "link" ? "solid" : "none", fontSize: "md",
    });
    setOverlayMode(type);
  };

  const saveOverlay = () => {
    if (!editingOverlay || !editingOverlay.text.trim()) {
      setEditingOverlay(null); setOverlayMode(null); return;
    }
    setOverlays((prev) => {
      const exists = prev.find((o) => o.id === editingOverlay.id);
      if (exists) return prev.map((o) => (o.id === editingOverlay.id ? editingOverlay : o));
      return [...prev, editingOverlay];
    });
    setEditingOverlay(null); setOverlayMode(null);
  };

  const deleteOverlay = (id: string) => setOverlays((prev) => prev.filter((o) => o.id !== id));

  const startDrag = (e: React.PointerEvent, overlay: Overlay) => {
    e.preventDefault(); e.stopPropagation();
    dragStartRef.current = { x: e.clientX, y: e.clientY, ox: overlay.x, oy: overlay.y };
    const id = overlay.id;
    const onMove = (me: PointerEvent) => {
      if (!dragStartRef.current || !previewRef.current) return;
      me.preventDefault();
      const rect = previewRef.current.getBoundingClientRect();
      const dx = me.clientX - dragStartRef.current.x;
      const dy = me.clientY - dragStartRef.current.y;
      const newX = Math.max(5, Math.min(95, dragStartRef.current.ox + (dx / rect.width) * 100));
      const newY = Math.max(5, Math.min(95, dragStartRef.current.oy + (dy / rect.height) * 100));
      setOverlays((prev) => prev.map((o) => (o.id === id ? { ...o, x: newX, y: newY } : o)));
    };
    const onUp = () => {
      dragStartRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const canSubmit = () => {
    switch (createType) {
      case "photo": case "video": return caption.trim().length > 0 || overlays.length > 0;
      case "text": return textContent.trim().length > 0;
      case "checkin": return locationName.trim().length > 0;
      case "event": return eventTitle.trim().length > 0 && eventDate.length > 0;
      default: return false;
    }
  };

  const selectedBg = TEXT_BACKGROUNDS.find((b) => b.id === textBg)!;

  const renderOverlays = () => (
    <div className="absolute inset-0 rounded-2xl overflow-hidden z-10" style={{ pointerEvents: "none" }}>
      {overlays.map((overlay) => (
        <div
          key={overlay.id}
          className="absolute cursor-grab active:cursor-grabbing select-none"
          style={{ left: `${overlay.x}%`, top: `${overlay.y}%`, transform: "translate(-50%, -50%)", touchAction: "none", pointerEvents: "auto" }}
          onPointerDown={(e) => startDrag(e, overlay)}
        >
          <div className="relative px-3 py-1.5 rounded-lg flex items-center gap-1" style={{
            fontSize: `${FONT_SIZES[overlay.fontSize].px}px`, color: overlay.color, fontWeight: 700, whiteSpace: "nowrap",
            backgroundColor: overlay.bgStyle === "solid" ? "rgba(0,0,0,0.6)" : overlay.bgStyle === "highlight" ? "rgba(255,255,255,0.85)" : "transparent",
            textShadow: overlay.bgStyle === "none" ? "0 1px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.4)" : "none",
          }}>
            {overlay.type === "link" && "🔗 "}
            {overlay.text}
            <button onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); setEditingOverlay({ ...overlay }); setOverlayMode(overlay.type); }}
              className="ml-1.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.3)" }}>
              <PencilIcon size={10} />
            </button>
            <button onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); deleteOverlay(overlay.id); }}
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <CloseIcon size={10} color="white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const wonkyInput = {
    borderRadius: "18px",
    border: `2.5px solid ${wonkyColors.black}`,
    backgroundColor: wonkyColors.white,
    color: wonkyColors.black,
  };

  return (
    <div className="min-h-screen relative flex flex-col" style={{ backgroundColor: wonkyColors.cream }}>
      <header
        className="sticky top-0 z-40 px-4 backdrop-blur-xl safe-area-top"
        style={{ backgroundColor: wonkyColors.pink, borderBottom: `2.5px solid ${wonkyColors.black}` }}
      >
        <div className="flex items-center justify-between h-14">
          <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center" style={{ color: "#fff" }}>
            <CloseIcon />
          </button>
          <h1 className="text-lg font-bold" style={{ fontFamily: "var(--font-fredoka), sans-serif", color: "#fff" }}>
            create
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 pt-3 pb-2">
        <div className="flex flex-wrap gap-2">
          {CREATE_TYPES.map((type) => {
            const isActive = createType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setCreateType(type.id)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold transition-all active:scale-95"
                style={{
                  backgroundColor: isActive ? wonkyColors.gold : wonkyColors.white,
                  color: isActive ? wonkyColors.black : "#9a7a72",
                  borderRadius: "18px 22px 18px 22px",
                  border: `2.5px solid ${wonkyColors.black}`,
                }}
              >
                <span>{type.icon}</span>
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {(createType === "photo" || createType === "video") && (
          <div className="space-y-3 pt-2">
            <div className="relative" ref={previewRef}>
              {mediaUrl ? (
                <div className="relative w-full overflow-hidden" style={{ ...wonkyInput, borderRadius: wonkyCardRadius, aspectRatio: createType === "video" ? "9/16" : "1/1", backgroundColor: wonkyColors.cream }}>
                  {createType === "video" ? <video src={mediaUrl} className="w-full h-full object-cover" controls />
                    : <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ""; }} />}
                  <button onClick={() => setMediaUrl("")} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-20" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <CloseIcon size={16} color="white" />
                  </button>
                </div>
              ) : (
                <label className="block w-full cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ ...wonkyInput, borderRadius: wonkyCardRadius, borderStyle: "dashed", aspectRatio: createType === "video" ? "9/16" : "4/3", maxHeight: createType === "video" ? "400px" : undefined, backgroundColor: wonkyColors.white }}>
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 flex items-center justify-center" style={{ backgroundColor: wonkyColors.pink, borderRadius: "20px 24px 20px 24px", border: `2.5px solid ${wonkyColors.black}` }}>
                      {createType === "video" ? <VideoIcon /> : <CameraIcon />}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold" style={{ color: wonkyColors.black }}>Add {createType === "video" ? "Video" : "Photo"}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#9a7a72" }}>Tap to add</p>
                    </div>
                  </div>
                </label>
              )}
              {renderOverlays()}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => addOverlay("text")} className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all active:scale-95"
                style={{ backgroundColor: wonkyColors.pinkSoft, color: wonkyColors.pink, borderRadius: "14px 18px 14px 18px", border: `2px solid ${wonkyColors.pink}` }}>
                <TextIcon size={16} /> Text
              </button>
              <button onClick={() => addOverlay("link")} className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all active:scale-95"
                style={{ backgroundColor: wonkyColors.goldSoft, color: "#B8903A", borderRadius: "18px 14px 18px 14px", border: `2px solid ${wonkyColors.gold}` }}>
                <LinkIcon size={16} /> Link
              </button>
              {overlays.length > 0 && <span className="text-xs font-bold ml-auto" style={{ color: "#9a7a72" }}>{overlays.length} overlay{overlays.length !== 1 ? "s" : ""}</span>}
            </div>

            {overlayMode && editingOverlay && (
              <div className="p-4 space-y-3" style={{ backgroundColor: wonkyColors.white, borderRadius: wonkyCardRadius, border: `2.5px solid ${wonkyColors.black}` }}>
                <input type="text" value={editingOverlay.text} onChange={(e) => setEditingOverlay({ ...editingOverlay, text: e.target.value })}
                  placeholder={overlayMode === "link" ? "Link label..." : "Type your text..."} className="w-full px-3 py-2.5 text-sm outline-none font-medium" style={wonkyInput} autoFocus />
                {overlayMode === "link" && <input type="url" value={editingOverlay.url || ""} onChange={(e) => setEditingOverlay({ ...editingOverlay, url: e.target.value })}
                  placeholder="https://..." className="w-full px-3 py-2.5 text-sm outline-none font-medium" style={wonkyInput} />}
                {overlayMode === "text" && (
                  <>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#9a7a72" }}>Color</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {OVERLAY_COLORS.map((c) => (
                          <button key={c} onClick={() => setEditingOverlay({ ...editingOverlay, color: c })}
                            className="w-6 h-6 rounded-full shrink-0 transition-transform" style={{
                              backgroundColor: c, transform: editingOverlay.color === c ? "scale(1.25)" : "scale(1)",
                              boxShadow: editingOverlay.color === c ? `0 0 0 2px white, 0 0 0 3.5px ${wonkyColors.pink}` : c === "#ffffff" ? "inset 0 0 0 1px rgba(0,0,0,0.15)" : "0 0 0 1px rgba(0,0,0,0.1)",
                            }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#9a7a72" }}>Size</p>
                        <div className="flex gap-1">
                          {(["sm", "md", "lg"] as const).map((s) => (
                            <button key={s} onClick={() => setEditingOverlay({ ...editingOverlay, fontSize: s })}
                              className="w-8 h-8 rounded-lg text-xs font-bold transition-all" style={{
                                backgroundColor: editingOverlay.fontSize === s ? wonkyColors.pink : wonkyColors.white,
                                color: editingOverlay.fontSize === s ? "white" : wonkyColors.black,
                                border: `2px solid ${editingOverlay.fontSize === s ? wonkyColors.pink : wonkyColors.black}`,
                              }}>
                              {FONT_SIZES[s].label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#9a7a72" }}>Style</p>
                        <div className="flex gap-1">
                          {(["none", "solid", "highlight"] as const).map((id) => (
                            <button key={id} onClick={() => setEditingOverlay({ ...editingOverlay, bgStyle: id })}
                              className="h-8 px-2.5 rounded-lg text-xs font-bold transition-all" style={{
                                backgroundColor: editingOverlay.bgStyle === id ? wonkyColors.gold : wonkyColors.white,
                                color: editingOverlay.bgStyle === id ? wonkyColors.black : "#9a7a72",
                                border: `2px solid ${editingOverlay.bgStyle === id ? wonkyColors.gold : wonkyColors.black}`,
                              }}>
                              {id === "none" ? "Plain" : id === "solid" ? "Box" : "Tag"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex gap-2 pt-1">
                  <button onClick={() => { setEditingOverlay(null); setOverlayMode(null); }}
                    className="flex-1 py-2 text-sm font-bold transition-all active:scale-95" style={{ borderRadius: "14px", border: `2.5px solid ${wonkyColors.black}`, color: wonkyColors.black }}>
                    Cancel
                  </button>
                  <button onClick={saveOverlay}
                    className="flex-1 py-2 text-sm font-bold text-white transition-all active:scale-95" style={{ borderRadius: "14px", backgroundColor: wonkyColors.pink, border: `2.5px solid ${wonkyColors.black}` }}>
                    {overlays.find((o) => o.id === editingOverlay.id) ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            )}

            <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption..."
              rows={3} className="w-full px-4 py-3 text-sm outline-none resize-none font-medium" style={wonkyInput} />
          </div>
        )}

        {createType === "text" && (
          <div className="space-y-4 pt-2">
            <div className="relative w-full overflow-hidden flex items-center justify-center p-6"
              style={{ aspectRatio: "4/5", background: selectedBg.style, borderRadius: wonkyCardRadius, border: `2.5px solid ${wonkyColors.black}` }}>
              <textarea value={textContent} onChange={(e) => setTextContent(e.target.value)} placeholder="What's on your mind?"
                className="w-full h-full bg-transparent text-white text-xl font-bold text-center resize-none outline-none placeholder-white/50" style={{ caretColor: "white" }} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#9a7a72" }}>Background</p>
              <div className="flex gap-2.5">
                {TEXT_BACKGROUNDS.map((bg) => (
                  <button key={bg.id} onClick={() => setTextBg(bg.id)} className="w-8 h-8 shrink-0 transition-transform"
                    style={{ background: bg.style, transform: textBg === bg.id ? "scale(1.2)" : "scale(1)", borderRadius: "10px 14px 10px 14px",
                      boxShadow: textBg === bg.id ? `0 0 0 2px white, 0 0 0 4px ${wonkyColors.pink}` : `0 0 0 2px ${wonkyColors.black}` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {createType === "checkin" && (
          <div className="space-y-4 pt-2">
            <div className="flex overflow-hidden" style={{ borderRadius: "18px 22px 18px 22px", border: `2.5px solid ${wonkyColors.black}` }}>
              <button onClick={() => setCheckinMode("at")} className="flex-1 py-3 text-sm font-bold transition-all"
                style={{ backgroundColor: checkinMode === "at" ? wonkyColors.pink : wonkyColors.white, color: checkinMode === "at" ? "white" : wonkyColors.black }}>
                📍 I'm at...
              </button>
              <button onClick={() => setCheckinMode("going")} className="flex-1 py-3 text-sm font-bold transition-all"
                style={{ backgroundColor: checkinMode === "going" ? wonkyColors.gold : wonkyColors.white, color: checkinMode === "going" ? wonkyColors.black : wonkyColors.black }}>
                🚀 I'm going to...
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9a7a72" }}><SearchIcon size={18} /></div>
              <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)}
                placeholder={checkinMode === "at" ? "Where are you?" : "Where are you heading?"} className="w-full pl-10 pr-4 py-3.5 text-sm outline-none font-medium" style={wonkyInput} />
            </div>
            {!locationName && (
              <div className="space-y-1.5">
                {["The Pearl Lounge", "Morning Glory Kitchen", "Sky Bar", "Common Grounds Cafe"].map((place) => (
                  <button key={place} onClick={() => setLocationName(place)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors active:scale-[0.98]"
                    style={{ backgroundColor: wonkyColors.white, borderRadius: "16px 20px 16px 20px", border: `2px solid ${wonkyColors.black}` }}>
                    <span className="text-base">📍</span>
                    <span className="text-sm font-bold" style={{ color: wonkyColors.black }}>{place}</span>
                  </button>
                ))}
              </div>
            )}
            <textarea value={checkinNote} onChange={(e) => setCheckinNote(e.target.value)} placeholder="Add a note... (optional)"
              rows={2} className="w-full px-4 py-3 text-sm outline-none resize-none font-medium" style={wonkyInput} />
          </div>
        )}

        {createType === "event" && (
          <div className="space-y-4 pt-2">
            <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Event name"
              className="w-full px-4 py-3.5 text-base font-bold outline-none" style={wonkyInput} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#9a7a72" }}>Date</label>
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full px-4 py-3 text-sm outline-none" style={wonkyInput} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#9a7a72" }}>Time</label>
                <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full px-4 py-3 text-sm outline-none" style={wonkyInput} />
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9a7a72" }}><PinIcon size={18} /></div>
              <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="Add location"
                className="w-full pl-10 pr-4 py-3.5 text-sm outline-none font-medium" style={wonkyInput} />
            </div>
            <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="What's the plan? Add details..."
              rows={3} className="w-full px-4 py-3 text-sm outline-none resize-none font-medium" style={wonkyInput} />
          </div>
        )}

        <div className="my-5 h-0.5" style={{ backgroundColor: wonkyColors.black, opacity: 0.1 }} />

        {createType !== "event" && (
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: "#9a7a72" }}>Visible for</p>
            <div className="flex gap-2">
              {DURATION_OPTIONS.map((opt) => {
                const isActive = duration === opt.id;
                return (
                  <button key={opt.id} onClick={() => setDuration(opt.id)}
                    className="flex-1 py-2.5 text-sm font-bold transition-all active:scale-95"
                    style={{
                      backgroundColor: isActive ? wonkyColors.gold : wonkyColors.white,
                      color: isActive ? wonkyColors.black : "#9a7a72",
                      borderRadius: "14px",
                      border: `2.5px solid ${wonkyColors.black}`,
                    }}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {duration !== "forever" && (
              <p className="text-xs mt-2 font-medium" style={{ color: "#9a7a72" }}>
                This post will disappear after {duration === "1h" ? "1 hour" : duration === "6h" ? "6 hours" : duration === "24h" ? "24 hours" : duration === "3d" ? "3 days" : "1 week"}.
              </p>
            )}
          </div>
        )}

        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: "#9a7a72" }}>Share with</p>
          <div className="flex gap-2 mb-3">
            <button onClick={() => { setShareWith("everyone"); setSelectedGroups([]); }}
              className="px-5 py-2 text-sm font-bold transition-all active:scale-95"
              style={{
                backgroundColor: shareWith === "everyone" ? wonkyColors.pink : wonkyColors.white,
                color: shareWith === "everyone" ? "white" : wonkyColors.black,
                borderRadius: "18px 22px 18px 22px",
                border: `2.5px solid ${wonkyColors.black}`,
              }}>
              Everyone
            </button>
            <button onClick={() => setShareWith("groups")}
              className="px-5 py-2 text-sm font-bold transition-all active:scale-95"
              style={{
                backgroundColor: shareWith === "groups" ? wonkyColors.pink : wonkyColors.white,
                color: shareWith === "groups" ? "white" : wonkyColors.black,
                borderRadius: "22px 18px 22px 18px",
                border: `2.5px solid ${wonkyColors.black}`,
              }}>
              Select Groups
            </button>
          </div>
          {shareWith === "groups" && (
            <div className="space-y-1.5">
              {mockFriendGroups.map((group) => {
                const isSelected = selectedGroups.includes(group.id);
                return (
                  <button key={group.id} onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all active:scale-[0.98]"
                    style={{
                      backgroundColor: isSelected ? wonkyColors.pinkSoft : wonkyColors.white,
                      borderRadius: "16px 20px 16px 20px",
                      border: `2.5px solid ${isSelected ? wonkyColors.pink : wonkyColors.black}`,
                    }}>
                    <div className="w-8 h-8 flex items-center justify-center text-sm" style={{
                      backgroundColor: isSelected ? wonkyColors.pink : wonkyColors.goldSoft,
                      borderRadius: "12px 14px 12px 14px",
                      border: `2px solid ${wonkyColors.black}`,
                    }}>
                      {isSelected ? <CheckIcon /> : <span>👥</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold" style={{ color: wonkyColors.black }}>{group.name}</p>
                      <p className="text-xs font-medium" style={{ color: "#9a7a72" }}>{group.members.length} {group.members.length === 1 ? "member" : "members"}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 px-4 py-3 backdrop-blur-xl safe-area-bottom" style={{ backgroundColor: "rgba(255,248,240,0.95)", borderTop: `2.5px solid ${wonkyColors.black}` }}>
        <button onClick={handleCreate} disabled={!canSubmit()}
          className="w-full py-3.5 text-base font-bold text-white transition-all active:scale-[0.98]"
          style={{
            backgroundColor: canSubmit() ? wonkyColors.gold : "#ccc",
            color: canSubmit() ? wonkyColors.black : "#999",
            borderRadius: "22px 26px 22px 26px",
            border: `2.5px solid ${wonkyColors.black}`,
            opacity: canSubmit() ? 1 : 0.7,
          }}>
          {createType === "event" ? "Create Event 📅" : createType === "checkin" ? `Share ${checkinMode === "at" ? "Check-in" : "Plans"} 📍` : "Share 🦐"}
        </button>
      </div>
    </div>
  );
}

function CloseIcon({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);
}
function CameraIcon() {
  return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>);
}
function VideoIcon() {
  return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>);
}
function SearchIcon({ size = 24 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>);
}
function PinIcon({ size = 24 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>);
}
function CheckIcon() {
  return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>);
}
function TextIcon({ size = 24 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>);
}
function LinkIcon({ size = 24 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>);
}
function PencilIcon({ size = 16 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>);
}
