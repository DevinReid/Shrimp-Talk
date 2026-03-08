import { wonkyColors } from "@/lib/wonkyTheme";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto"
      style={{ backgroundColor: wonkyColors.coral }}
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

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}
