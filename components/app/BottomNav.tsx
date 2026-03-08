"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { wonkyColors, wonkyNavBg } from "@/lib/wonkyTheme";
import { useSettingsStore, type FeatureKey } from "@/stores/useSettingsStore";

interface NavItemDef {
  href: string;
  label: string;
  icon: React.ComponentType;
  featureKey?: FeatureKey;
  isCreate?: boolean;
}

const ALL_NAV_ITEMS: NavItemDef[] = [
  { href: "/feed", label: "Home", icon: HomeSvg, featureKey: "feed" },
  { href: "/calendar", label: "Calendar", icon: CalendarSvg, featureKey: "calendar" },
  { href: "/create", label: "Create", icon: PlusSvg, isCreate: true },
  { href: "/messages", label: "Messages", icon: ChatSvg, featureKey: "messages" },
  { href: "/location", label: "Location", icon: GlobeSvg, featureKey: "location" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const features = useSettingsStore((s) => s.features);

  const NAV_ITEMS = ALL_NAV_ITEMS.filter(
    (item) => !item.featureKey || features[item.featureKey]
  );

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[1100]">
      <div
        className="px-4 pb-1.5 pt-1.5"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${wonkyColors.coral} 25%)`,
        }}
      >
      <nav
        className="flex items-center justify-around h-14 px-2"
        style={{
          backgroundColor: wonkyColors.pink,
          borderRadius: "28px 32px 28px 32px",
          border: `2.5px solid ${wonkyColors.black}`,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCreate) {
            return (
              <Link key={item.href} href={item.href} className="transition-all active:scale-90">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    backgroundColor: wonkyColors.gold,
                    borderRadius: "18px 22px 18px 22px",
                    color: wonkyColors.black,
                  }}
                >
                  <Icon />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="w-10 h-10 flex items-center justify-center transition-all active:scale-90"
              style={{
                backgroundColor: isActive ? "rgba(255,255,255,0.3)" : "transparent",
                borderRadius: isActive ? "14px 16px 14px 16px" : "16px 14px 16px 14px",
                color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            >
              <Icon />
            </Link>
          );
        })}
      </nav>
      </div>
    </div>
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
