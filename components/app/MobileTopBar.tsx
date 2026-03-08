"use client";

import Link from "next/link";
import { wonkyColors, wonkyHeaderBg } from "@/lib/wonkyTheme";

interface MobileTopBarProps {
  title?: string;
}

export default function MobileTopBar({ title }: MobileTopBarProps) {
  return (
    <div className="sticky top-0 z-50">
      <header
        className="px-4 safe-area-top"
        style={{ backgroundColor: wonkyHeaderBg }}
      >
        <div className="flex items-center justify-between h-14">
          <Link href="/profile">
            <div
              className="w-10 h-10 flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: wonkyColors.coralSoft,
                borderRadius: "16px 20px 16px 20px",
                border: `2.5px solid ${wonkyColors.coral}`,
              }}
            >
              <span className="text-lg">🦐</span>
            </div>
          </Link>

          <h1
            className="text-xl"
            style={{ fontFamily: "var(--font-fredoka), sans-serif", fontWeight: 700, color: wonkyColors.coral }}
          >
            {title || "shrimp talk"}
          </h1>

          <div className="flex items-center gap-2">
            <Link href="/search">
              <div
                className="w-10 h-10 flex items-center justify-center transition-all active:opacity-70"
                style={{
                  backgroundColor: wonkyColors.coralSoft,
                  borderRadius: "16px 20px 16px 20px",
                  color: wonkyColors.coral,
                  border: `2.5px solid ${wonkyColors.coral}`,
                }}
              >
                <SearchSvg />
              </div>
            </Link>
            <Link href="/settings">
              <div
                className="w-10 h-10 flex items-center justify-center transition-all active:opacity-70"
                style={{
                  backgroundColor: wonkyColors.coralSoft,
                  borderRadius: "20px 16px 20px 16px",
                  color: wonkyColors.coral,
                  border: `2.5px solid ${wonkyColors.coral}`,
                }}
              >
                <SettingsSvg />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <svg width="100%" height="20" viewBox="0 0 430 20" preserveAspectRatio="none" className="relative z-40 -mt-[1px]">
        <path
          d="M0 0 L0 10 C30 20, 60 0, 90 10 C120 20, 150 0, 180 10 C210 20, 240 0, 270 10 C300 20, 330 0, 360 10 C390 20, 420 0, 430 10 L430 0 Z"
          fill={wonkyHeaderBg}
        />
        <path
          d="M0 10 C30 20, 60 0, 90 10 C120 20, 150 0, 180 10 C210 20, 240 0, 270 10 C300 20, 330 0, 360 10 C390 20, 420 0, 430 10"
          fill="none"
          stroke="#000000"
          strokeWidth="2.5"
        />
      </svg>
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

function SettingsSvg() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
