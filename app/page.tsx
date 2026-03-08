import Link from "next/link";
import RainbowShrimp from "@/components/landing/RainbowShrimp";
import { wonkyColors } from "@/lib/wonkyTheme";

export default function Home() {
  return (
    <div
      className="relative flex flex-col min-h-screen px-6"
      style={{
        backgroundColor: wonkyColors.coral,
        fontFamily: "var(--font-fredoka), Fredoka, sans-serif",
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${wonkyColors.pink}, transparent 70%)`,
            borderRadius: "40% 60% 40% 60%",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 opacity-25 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${wonkyColors.gold}, transparent 70%)`,
            borderRadius: "60% 40% 60% 40%",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <h1
          className="text-4xl font-bold mb-1"
          style={{ color: wonkyColors.white }}
        >
          Shrimp Talk
        </h1>
        <p
          className="text-sm font-medium mb-2"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          just you and your shrimps
        </p>

        <RainbowShrimp />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto pb-8 space-y-3">
        <Link
          href="/register"
          className="block w-full py-4 font-bold text-base text-center transition-all active:scale-[0.98]"
          style={{
            backgroundColor: wonkyColors.gold,
            color: wonkyColors.black,
            borderRadius: "22px 26px 22px 26px",
            border: `2.5px solid ${wonkyColors.black}`,
          }}
        >
          new shrimp
        </Link>
        <Link
          href="/login"
          className="block w-full py-4 font-bold text-base text-center transition-all active:scale-[0.98]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            color: wonkyColors.black,
            borderRadius: "22px 26px 22px 26px",
            border: `2.5px solid ${wonkyColors.black}`,
          }}
        >
          returning shrimp
        </Link>
      </div>
    </div>
  );
}
