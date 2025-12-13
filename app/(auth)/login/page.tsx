"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock login - in real app, this would call API
    try {
      await login(email, password);
      router.push("/feed");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 shrimp-gradient-text">
            Welcome Back 🦐
          </h1>
          <p className="text-lg" style={{ color: '#ff6b6b' }}>
            Just you and your shrimp
          </p>
        </div>

        <div className="backdrop-blur-sm p-8 rounded-xl border-2 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#ffe8e8', color: '#ff5252' }}>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full shrimp-gradient hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login 🦐"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#ff6b6b' }}>
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold hover:underline" style={{ color: '#ff5252' }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

