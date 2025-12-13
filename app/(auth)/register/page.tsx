"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    // Mock registration - in real app, this would call API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Auto-login after registration
      await login(email, password);
      router.push("/feed");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 shrimp-gradient-text">
            Join Shrimp Talk 🦐
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
              <label htmlFor="displayName" className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: '#ffd4d4',
                  backgroundColor: 'white',
                  color: '#2d1b1b'
                }}
                placeholder="Your name"
              />
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: '#ff5252' }}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? "Creating account..." : "Sign Up 🦐"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#ff6b6b' }}>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold hover:underline" style={{ color: '#ff5252' }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

