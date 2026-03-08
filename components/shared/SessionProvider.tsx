"use client";

import { useEffect, useRef } from "react";
import {
  SessionProvider as NextAuthSessionProvider,
  useSession,
  signOut,
} from "next-auth/react";

function SessionGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const checkedRef = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || checkedRef.current) return;
    checkedRef.current = true;

    const remember = localStorage.getItem("shrimp_remember");
    if (remember === "false") {
      const hasBrowserSession = document.cookie
        .split("; ")
        .some((c) => c.startsWith("shrimp_browser_session="));

      if (!hasBrowserSession) {
        localStorage.removeItem("shrimp_remember");
        signOut({ callbackUrl: "/login" });
      }
    }
  }, [status]);

  return <>{children}</>;
}

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
      <SessionGuard>{children}</SessionGuard>
    </NextAuthSessionProvider>
  );
}
