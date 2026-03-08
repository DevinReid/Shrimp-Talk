"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { wonkyColors } from "@/lib/wonkyTheme";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) { setError("Username must be 3-20 characters (letters, numbers, underscores)"); return; }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, displayName, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Registration failed"); return; }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) { setError("Account created but login failed. Please try logging in."); }
      else { router.push("/feed"); router.refresh(); }
    } catch { setError("Something went wrong. Please try again."); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="text-center">
      <div
        className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-4xl select-none"
        style={{
          backgroundColor: wonkyColors.pink,
          borderRadius: "34px 28px 34px 28px",
          border: `2.5px solid ${wonkyColors.black}`,
        }}
      >
        🦐
      </div>
      <h1
        className="text-3xl font-bold mb-1"
        style={{ fontFamily: "var(--font-fredoka), sans-serif", color: wonkyColors.white }}
      >
        new shrimp
      </h1>
      <p className="text-sm mb-8 font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
        sign up and start doing your shrimps
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

        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required className="auth-input" placeholder="name" />

        <div>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
            required maxLength={20} className="auth-input" placeholder="username" />
          {username && <p className="text-xs mt-1.5 ml-1 font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>@{username.toLowerCase()}</p>}
        </div>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input" placeholder="email" />

        <div className="relative">
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
            required className="auth-input pr-14" placeholder="password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold select-none" style={{ color: "#9a7a72" }} tabIndex={-1}>
            {showPassword ? "hide" : "show"}
          </button>
        </div>

        <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          required className="auth-input" placeholder="confirm password" />

        <button type="submit" disabled={isLoading}
          className="w-full py-4 font-bold text-base transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          style={{
            backgroundColor: wonkyColors.gold,
            color: wonkyColors.black,
            borderRadius: "22px 26px 22px 26px",
            border: `2.5px solid ${wonkyColors.black}`,
          }}>
          {isLoading ? "creating account..." : "sign up"}
        </button>
      </form>

      <p className="mt-8 text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
        already a shrimp?{" "}
        <Link href="/login" className="font-bold transition-colors hover:underline" style={{ color: wonkyColors.white }}>
          log in
        </Link>
      </p>
    </div>
  );
}
