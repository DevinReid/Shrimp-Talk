"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fff5f5' }}>
      {/* Navigation */}
      <nav className="backdrop-blur-sm border-b-2 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd4d4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold shrimp-gradient-text flex items-center gap-2">
                🦐 Shrimp Talk
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href="/feed"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: '#ff5252' }}
                  >
                    Feed
                  </Link>
                  <Link
                    href="/messages"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: '#ff5252' }}
                  >
                    Messages
                  </Link>
                  <Link
                    href="/groups"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: '#ff5252' }}
                  >
                    Groups
                  </Link>
                  <Link
                    href="/location"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: '#ff5252' }}
                  >
                    Location
                  </Link>
                  <Link
                    href="/rooms"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: '#ff5252' }}
                  >
                    Rooms
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  >
                    <span className="text-sm font-medium" style={{ color: '#ff5252' }}>
                      {user.displayName}
                    </span>
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full border-2"
                        style={{ borderColor: '#ffb3b3' }}
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: '#ffb3b3', backgroundColor: '#ffe8e8' }}
                      >
                        🦐
                      </div>
                    )}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: '#ff5252' }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="shrimp-gradient hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    Sign Up 🦐
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="mt-auto border-t-2 backdrop-blur-sm" style={{ borderColor: '#ffd4d4', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm" style={{ color: '#ff6b6b' }}>
            Made with shrimp by Shrimp for shrimp
          </p>
        </div>
      </footer>
    </div>
  );
}

