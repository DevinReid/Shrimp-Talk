"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import MobileTopBar from "@/components/app/MobileTopBar";
import BottomNav from "@/components/app/BottomNav";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";
import {
  useSettingsStore,
  FEATURE_LABELS,
  HOME_PAGE_OPTIONS,
  type FeatureKey,
  type HomePage,
  type LocationPrecision,
  type Visibility,
  type ScreenTimeReminder,
  type BreakReminder,
  type UsageLimit,
  type ThemeName,
} from "@/stores/useSettingsStore";

type SectionId = "features" | "navigation" | "privacy" | "wellness" | "appearance" | "notifications" | "account";

const SECTIONS: { id: SectionId; label: string; icon: string }[] = [
  { id: "features", label: "Features", icon: "🧩" },
  { id: "navigation", label: "Home Page", icon: "🏠" },
  { id: "privacy", label: "Privacy & Safety", icon: "🔒" },
  { id: "wellness", label: "Wellness", icon: "🌿" },
  { id: "appearance", label: "Appearance", icon: "🎨" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "account", label: "Account", icon: "👤" },
];

export default function SettingsPage() {
  const [openSection, setOpenSection] = useState<SectionId | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggle = (id: SectionId) => setOpenSection((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: wonkyColors.coral }}>
      <MobileTopBar />

      <div className="px-4 pt-3 pb-24">
        <h1 className="text-2xl font-bold mb-1" style={{ color: wonkyColors.white, fontFamily: "var(--font-fredoka), sans-serif" }}>settings</h1>
        <p className="text-sm font-medium mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>make shrimp talk yours</p>

        <div className="space-y-3">
          {SECTIONS.map((s) => (
            <div key={s.id}>
              <button onClick={() => toggle(s.id)}
                className="w-full flex items-center justify-between px-5 py-4 transition-all"
                style={{
                  backgroundColor: openSection === s.id ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.92)",
                  borderRadius: openSection === s.id ? `${wonkyCardRadius} ${wonkyCardRadius} 0 0` : wonkyCardRadius,
                  border: `2.5px solid ${wonkyColors.black}`,
                  borderBottom: openSection === s.id ? "none" : `2.5px solid ${wonkyColors.black}`,
                }}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-[15px] font-bold" style={{ color: wonkyColors.black }}>{s.label}</span>
                </div>
                <ChevronIcon open={openSection === s.id} />
              </button>

              {openSection === s.id && (
                <div className="px-5 py-3"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    borderRadius: `0 0 ${wonkyCardRadius} ${wonkyCardRadius}`,
                    border: `2.5px solid ${wonkyColors.black}`,
                    borderTop: `2px dashed ${wonkyColors.black}30`,
                  }}>
                  {s.id === "features" && <FeaturesSection />}
                  {s.id === "navigation" && <NavigationSection />}
                  {s.id === "privacy" && <PrivacySection />}
                  {s.id === "wellness" && <WellnessSection />}
                  {s.id === "appearance" && <AppearanceSection />}
                  {s.id === "notifications" && <NotificationsSection />}
                  {s.id === "account" && <AccountSection />}
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={() => setShowResetConfirm(true)}
          className="w-full mt-6 py-3 text-sm font-bold transition-all active:scale-95"
          style={{ color: "rgba(255,255,255,0.6)", borderRadius: wonkyCardRadius, border: `2.5px solid rgba(255,255,255,0.3)` }}>
          Reset All Settings
        </button>
      </div>

      {showResetConfirm && <ResetModal onClose={() => setShowResetConfirm(false)} />}
      <BottomNav />
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={wonkyColors.black} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.4 }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (val: boolean) => void; disabled?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={() => onChange(!checked)}
      className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer border-2 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      style={{
        backgroundColor: checked ? wonkyColors.pink : "#e5d5d0",
        borderColor: wonkyColors.black,
        borderRadius: "14px 16px 14px 16px",
      }}>
      <span className="pointer-events-none inline-block h-5 w-5 shadow transition-transform duration-200 mt-[1px]"
        style={{
          transform: checked ? "translateX(20px)" : "translateX(2px)",
          backgroundColor: wonkyColors.white,
          borderRadius: "8px 10px 8px 10px",
          border: `1.5px solid ${wonkyColors.black}`,
        }} />
    </button>
  );
}

function MobileSelect<T extends string>({ value, options, onChange }: { value: T; options: { value: T; label: string }[]; onChange: (val: T) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as T)}
      className="px-3 py-1.5 text-sm font-bold outline-none appearance-none pr-7 bg-no-repeat"
      style={{
        backgroundColor: wonkyColors.goldSoft,
        color: wonkyColors.black,
        border: `2px solid ${wonkyColors.black}`,
        borderRadius: "12px 14px 12px 14px",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231a1a1a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 8px center",
      }}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} style={{ color: "#333", backgroundColor: "white" }}>{opt.label}</option>
      ))}
    </select>
  );
}

function Row({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: `2px solid ${wonkyColors.black}10` }}>
      <div className="pr-3 flex-1 min-w-0">
        <p className="text-sm font-bold" style={{ color: wonkyColors.black }}>{label}</p>
        {sub && <p className="text-xs font-medium mt-0.5" style={{ color: "#9a7a72" }}>{sub}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SubHeader({ label }: { label: string }) {
  return <p className="text-[11px] font-bold uppercase tracking-widest pt-4 pb-1" style={{ color: wonkyColors.gold }}>{label}</p>;
}

function FeaturesSection() {
  const { features, toggleFeature, homePage } = useSettingsStore();
  const enabledCount = Object.values(features).filter(Boolean).length;
  return (
    <div>
      <p className="text-xs font-medium mb-2" style={{ color: "#9a7a72" }}>{enabledCount}/{Object.keys(features).length} enabled — disabled features hide from your nav</p>
      {(Object.keys(FEATURE_LABELS) as FeatureKey[]).map((key) => {
        const isHome = `/${key}` === homePage;
        return <Row key={key} label={FEATURE_LABELS[key].name} sub={FEATURE_LABELS[key].description + (isHome ? " (home)" : "")}><Toggle checked={features[key]} onChange={() => toggleFeature(key)} disabled={isHome} /></Row>;
      })}
    </div>
  );
}

function NavigationSection() {
  const { homePage, setHomePage, features } = useSettingsStore();
  const available = HOME_PAGE_OPTIONS.filter((o) => features[o.value.slice(1) as FeatureKey]);
  return (
    <div>
      <p className="text-xs font-medium mb-3" style={{ color: "#9a7a72" }}>Where you land when you open the app</p>
      <Row label="Home Page"><MobileSelect<HomePage> value={homePage} options={available} onChange={setHomePage} /></Row>
    </div>
  );
}

function PrivacySection() {
  const { privacy, updatePrivacy, features } = useSettingsStore();
  const vis: { value: Visibility; label: string }[] = [{ value: "everyone", label: "Everyone" }, { value: "friends", label: "Friends" }, { value: "nobody", label: "Nobody" }];
  const loc: { value: LocationPrecision; label: string }[] = [{ value: "exact", label: "Exact" }, { value: "approximate", label: "Nearby" }, { value: "city", label: "City" }];
  return (
    <div>
      <SubHeader label="Profile" />
      <Row label="Profile Visibility" sub="Who can see your profile"><MobileSelect<Visibility> value={privacy.profileVisibility} options={vis} onChange={(v) => updatePrivacy({ profileVisibility: v })} /></Row>
      <Row label="Online Status" sub="Who sees when you're active"><MobileSelect<Visibility> value={privacy.onlineStatusVisibility} options={vis} onChange={(v) => updatePrivacy({ onlineStatusVisibility: v })} /></Row>
      <SubHeader label="Communication" />
      <Row label="Who Can Message"><MobileSelect<Visibility> value={privacy.whoCanMessage} options={vis} onChange={(v) => updatePrivacy({ whoCanMessage: v })} /></Row>
      <Row label="Read Receipts"><Toggle checked={privacy.showReadReceipts} onChange={(v) => updatePrivacy({ showReadReceipts: v })} /></Row>
      <Row label="Typing Indicators"><Toggle checked={privacy.showTypingIndicators} onChange={(v) => updatePrivacy({ showTypingIndicators: v })} /></Row>
      {features.location && (<><SubHeader label="Location" /><Row label="Precision" sub="How accurately you share"><MobileSelect<LocationPrecision> value={privacy.locationPrecision} options={loc} onChange={(v) => updatePrivacy({ locationPrecision: v })} /></Row></>)}
      {features.stories && (<><SubHeader label="Stories" /><Row label="Who Sees Stories"><MobileSelect<Visibility> value={privacy.whoCanSeeStories} options={vis} onChange={(v) => updatePrivacy({ whoCanSeeStories: v })} /></Row></>)}
    </div>
  );
}

function WellnessSection() {
  const { wellness, updateWellness } = useSettingsStore();
  const screenTime: { value: ScreenTimeReminder; label: string }[] = [{ value: "off", label: "Off" }, { value: "30min", label: "30 min" }, { value: "1hr", label: "1 hr" }, { value: "2hr", label: "2 hr" }];
  const breaks: { value: BreakReminder; label: string }[] = [{ value: "off", label: "Off" }, { value: "15min", label: "15 min" }, { value: "30min", label: "30 min" }, { value: "1hr", label: "1 hr" }];
  const limits: { value: UsageLimit; label: string }[] = [{ value: "off", label: "No limit" }, { value: "30min", label: "30 min" }, { value: "1hr", label: "1 hr" }, { value: "2hr", label: "2 hr" }, { value: "4hr", label: "4 hr" }];
  return (
    <div>
      <div className="px-3 py-2 mb-3" style={{ backgroundColor: wonkyColors.goldSoft, borderRadius: "14px 18px 14px 18px", border: `2px solid ${wonkyColors.gold}` }}>
        <p className="text-xs font-medium" style={{ color: "#B8903A" }}>Shrimp Talk is built to be healthy. Set boundaries that work for you.</p>
      </div>
      <SubHeader label="Time" />
      <Row label="Screen Time Nudge" sub="Gentle reminder after scrolling"><MobileSelect<ScreenTimeReminder> value={wellness.screenTimeReminder} options={screenTime} onChange={(v) => updateWellness({ screenTimeReminder: v })} /></Row>
      <Row label="Break Reminders" sub="Stretch, hydrate, look away"><MobileSelect<BreakReminder> value={wellness.breakReminder} options={breaks} onChange={(v) => updateWellness({ breakReminder: v })} /></Row>
      <Row label="Daily Limit" sub="Soft cap, not a lockout"><MobileSelect<UsageLimit> value={wellness.dailyUsageLimit} options={limits} onChange={(v) => updateWellness({ dailyUsageLimit: v })} /></Row>
      <SubHeader label="Boundaries" />
      <Row label="Bedtime Mode" sub="Dim notifications at night"><Toggle checked={wellness.bedtimeMode} onChange={(v) => updateWellness({ bedtimeMode: v })} /></Row>
      {wellness.bedtimeMode && (
        <div className="flex items-center gap-3 py-2 pl-1">
          <span className="text-xs font-bold" style={{ color: "#9a7a72" }}>From</span>
          <input type="time" value={wellness.bedtimeStart} onChange={(e) => updateWellness({ bedtimeStart: e.target.value })}
            className="px-2 py-1 text-sm outline-none font-medium" style={{ backgroundColor: wonkyColors.cream, border: `2px solid ${wonkyColors.black}`, borderRadius: "10px", color: wonkyColors.black }} />
          <span className="text-xs font-bold" style={{ color: "#9a7a72" }}>To</span>
          <input type="time" value={wellness.bedtimeEnd} onChange={(e) => updateWellness({ bedtimeEnd: e.target.value })}
            className="px-2 py-1 text-sm outline-none font-medium" style={{ backgroundColor: wonkyColors.cream, border: `2px solid ${wonkyColors.black}`, borderRadius: "10px", color: wonkyColors.black }} />
        </div>
      )}
      <Row label="Scroll Speed Bumps" sub='"Still scrolling?" check-ins'><Toggle checked={wellness.scrollSpeedBumps} onChange={(v) => updateWellness({ scrollSpeedBumps: v })} /></Row>
      <SubHeader label="Support" />
      <Row label="Intervention Messages" sub="Friends can leave encouragement"><Toggle checked={wellness.interventionMessages} onChange={(v) => updateWellness({ interventionMessages: v })} /></Row>
      <Row label="Content Filter" sub="Blur sensitive content"><Toggle checked={wellness.contentSensitivityFilter} onChange={(v) => updateWellness({ contentSensitivityFilter: v })} /></Row>
    </div>
  );
}

function AppearanceSection() {
  const { appearance, updateAppearance } = useSettingsStore();
  const themes: { value: ThemeName; label: string; color: string }[] = [
    { value: "shrimp", label: "Shrimp", color: wonkyColors.pink },
    { value: "coral", label: "Coral", color: wonkyColors.coral },
    { value: "ocean", label: "Ocean", color: "#0ea5e9" },
  ];
  return (
    <div>
      <SubHeader label="Theme" />
      <div className="flex gap-3 py-3">
        {themes.map((t) => (
          <button key={t.value} onClick={() => updateAppearance({ theme: t.value })}
            className="flex flex-col items-center gap-2 px-4 py-3 transition-all"
            style={{
              backgroundColor: appearance.theme === t.value ? wonkyColors.pinkSoft : wonkyColors.cream,
              borderRadius: "18px 22px 18px 22px",
              border: `2.5px solid ${appearance.theme === t.value ? wonkyColors.pink : wonkyColors.black}`,
            }}>
            <div className="w-10 h-10" style={{ backgroundColor: t.color, borderRadius: "14px 16px 14px 16px", border: `2px solid ${wonkyColors.black}` }} />
            <span className="text-xs font-bold" style={{ color: wonkyColors.black }}>{t.label}</span>
          </button>
        ))}
      </div>
      <SubHeader label="Layout" />
      <Row label="Compact Mode" sub="Denser spacing and cards"><Toggle checked={appearance.compactMode} onChange={(v) => updateAppearance({ compactMode: v })} /></Row>
      <Row label="Reduce Animations" sub="Less motion throughout the app"><Toggle checked={appearance.reduceAnimations} onChange={(v) => updateAppearance({ reduceAnimations: v })} /></Row>
    </div>
  );
}

function NotificationsSection() {
  const { notifications, updateNotifications, features } = useSettingsStore();
  return (
    <div>
      <Row label="Push Notifications" sub="Master toggle"><Toggle checked={notifications.pushEnabled} onChange={(v) => updateNotifications({ pushEnabled: v })} /></Row>
      <Row label="Sound"><Toggle checked={notifications.soundEnabled} onChange={(v) => updateNotifications({ soundEnabled: v })} disabled={!notifications.pushEnabled} /></Row>
      <SubHeader label="By Feature" />
      {features.messages && <Row label="Messages"><Toggle checked={notifications.messageNotifications} onChange={(v) => updateNotifications({ messageNotifications: v })} disabled={!notifications.pushEnabled} /></Row>}
      {features.groups && <Row label="Groups"><Toggle checked={notifications.groupNotifications} onChange={(v) => updateNotifications({ groupNotifications: v })} disabled={!notifications.pushEnabled} /></Row>}
      {features.location && <Row label="Location"><Toggle checked={notifications.locationNotifications} onChange={(v) => updateNotifications({ locationNotifications: v })} disabled={!notifications.pushEnabled} /></Row>}
      {features.rooms && <Row label="Rooms"><Toggle checked={notifications.roomNotifications} onChange={(v) => updateNotifications({ roomNotifications: v })} disabled={!notifications.pushEnabled} /></Row>}
      {features.stories && <Row label="Stories"><Toggle checked={notifications.storyNotifications} onChange={(v) => updateNotifications({ storyNotifications: v })} disabled={!notifications.pushEnabled} /></Row>}
    </div>
  );
}

function AccountSection() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("shrimp_remember");
    document.cookie = "shrimp_browser_session=; path=/; max-age=0";
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div>
      <Row label="Edit Profile" sub="Name, bio, avatar">
        <Link href="/profile" className="px-4 py-1.5 text-sm font-bold" style={{ backgroundColor: wonkyColors.gold, color: wonkyColors.black, borderRadius: "12px 14px 12px 14px", border: `2px solid ${wonkyColors.black}` }}>Go</Link>
      </Row>
      <SubHeader label="Security" />
      <Row label="Change Password"><span className="text-xs font-bold" style={{ color: "#9a7a72" }}>Soon</span></Row>
      <Row label="Two-Factor Auth"><span className="text-xs font-bold" style={{ color: "#9a7a72" }}>Soon</span></Row>
      <SubHeader label="Data" />
      <Row label="Download My Data"><span className="text-xs font-bold" style={{ color: "#9a7a72" }}>Soon</span></Row>
      <Row label="Delete Account"><span className="text-xs font-bold" style={{ color: wonkyColors.pink }}>Soon</span></Row>
      <div className="pt-4">
        {showLogoutConfirm ? (
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 py-3 text-sm font-bold transition-all active:scale-95"
              style={{
                borderRadius: "18px 22px 18px 22px",
                border: `2.5px solid ${wonkyColors.black}20`,
                color: "#9a7a72",
              }}
            >
              cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-3 text-sm font-bold transition-all active:scale-95"
              style={{
                backgroundColor: wonkyColors.pink,
                color: wonkyColors.white,
                borderRadius: "22px 18px 22px 18px",
                border: `2.5px solid ${wonkyColors.pink}`,
              }}
            >
              yes, log out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full py-3 text-sm font-bold transition-all active:scale-95"
            style={{
              backgroundColor: wonkyColors.pinkSoft,
              color: wonkyColors.pink,
              borderRadius: "22px 18px 22px 18px",
              border: `2.5px solid ${wonkyColors.pink}`,
            }}
          >
            log out
          </button>
        )}
      </div>
    </div>
  );
}

function ResetModal({ onClose }: { onClose: () => void }) {
  const resetToDefaults = useSettingsStore((s) => s.resetToDefaults);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg px-6 pt-6 pb-8 safe-area-bottom"
        style={{ backgroundColor: wonkyColors.black, borderRadius: `${wonkyCardRadius} ${wonkyCardRadius} 0 0` }}>
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />
        <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-fredoka), sans-serif" }}>Reset all settings?</h3>
        <p className="text-sm text-white/50 mt-2 font-medium">Everything goes back to defaults. Your account and posts stay the same.</p>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-white"
            style={{ borderRadius: "18px 22px 18px 22px", border: `2.5px solid rgba(255,255,255,0.3)` }}>Cancel</button>
          <button onClick={() => { resetToDefaults(); onClose(); }} className="flex-1 py-3 text-sm font-bold"
            style={{ backgroundColor: wonkyColors.pink, color: "white", borderRadius: "22px 18px 22px 18px", border: `2.5px solid ${wonkyColors.pink}` }}>Reset</button>
        </div>
      </div>
    </div>
  );
}
