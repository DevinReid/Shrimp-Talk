"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh bg-neutral-900">
      <div
        className="w-full max-w-[430px] h-full mx-auto overflow-y-auto overflow-x-hidden relative bg-white md:shadow-2xl scrollbar-hide"
      >
        {children}
      </div>
    </div>
  );
}
