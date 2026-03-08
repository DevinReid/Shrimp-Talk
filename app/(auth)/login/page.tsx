"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { wonkyColors, wonkyCardRadius } from "@/lib/wonkyTheme";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/feed");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Invalid email or password");
      } else {
        if (rememberMe) {
          localStorage.setItem("shrimp_remember", "true");
        } else {
          localStorage.setItem("shrimp_remember", "false");
          document.cookie = "shrimp_browser_session=1; path=/; SameSite=Lax";
        }
        router.push("/feed");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div
        className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-4xl select-none"
        style={{
          backgroundColor: wonkyColors.gold,
          borderRadius: "28px 34px 28px 34px",
          border: `2.5px solid ${wonkyColors.black}`,
        }}
      >
        🦐
      </div>
      <h1
        className="text-3xl font-bold mb-1"
        style={{ fontFamily: "var(--font-fredoka), sans-serif", color: wonkyColors.white }}
      >
        returning shrimp
      </h1>
      <p className="text-sm mb-8 font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
        log in to get back to your shrimps
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {error && (
          <div
            className="px-4 py-3 text-sm font-bold text-center"
            style={{
              backgroundColor: wonkyColors.pinkSoft,
              color: wonkyColors.pink,
              borderRadius: "18px 22px 18px 22px",
              border: `2.5px solid ${wonkyColors.pink}`,
            }}
          >
            {error}
          </div>
        )}

        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          required className="auth-input" placeholder="email"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} value={password}
            onChange={(e) => setPassword(e.target.value)}
            required className="auth-input pr-14" placeholder="password"
          />
          <button
            type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold select-none"
            style={{ color: "#9a7a72" }} tabIndex={-1}
          >
            {showPassword ? "hide" : "show"}
          </button>
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none px-1 mt-1">
          <button
            type="button"
            role="checkbox"
            aria-checked={rememberMe}
            onClick={() => setRememberMe(!rememberMe)}
            className="relative w-5 h-5 shrink-0 flex items-center justify-center transition-colors"
            style={{
              backgroundColor: rememberMe ? wonkyColors.gold : "rgba(255,255,255,0.15)",
              borderRadius: "6px 8px 6px 8px",
              border: `2px solid ${rememberMe ? wonkyColors.black : "rgba(255,255,255,0.4)"}`,
            }}
          >
            {rememberMe && (
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={wonkyColors.black} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
            keep me logged in
          </span>
        </label>

        <button
          type="submit" disabled={isLoading}
          className="w-full py-4 font-bold text-base transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          style={{
            backgroundColor: wonkyColors.gold,
            color: wonkyColors.black,
            borderRadius: "22px 26px 22px 26px",
            border: `2.5px solid ${wonkyColors.black}`,
          }}
        >
          {isLoading ? "logging in..." : "log in"}
        </button>
      </form>

      <p className="mt-8 text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
        new here?{" "}
        <Link href="/register" className="font-bold transition-colors hover:underline" style={{ color: wonkyColors.white }}>
          sign up
        </Link>
      </p>
    </div>
  );
}
