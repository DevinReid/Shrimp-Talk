import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/shared/Layout";
import SessionProvider from "@/components/shared/SessionProvider";
import { fredoka, nunito } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "🦐 Shrimp Talk",
  description: "A social media app focused on user control and intentional engagement. No algorithms, just you and your friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className={nunito.className}>
        <SessionProvider>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
