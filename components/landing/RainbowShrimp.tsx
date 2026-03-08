"use client";

export default function RainbowShrimp() {
  const r = 95;
  const cx = 120;
  const cy = 120;
  const circlePath = `M ${cx},${cy - r} A ${r},${r} 0 1,1 ${cx - 0.01},${cy - r}`;
  const repeatedText = "talk with \u00B7 ".repeat(6);

  return (
    <div className="relative flex items-center justify-center my-8" style={{ width: 240, height: 240 }}>
      <div className="shrimp-rainbow-glow text-6xl select-none absolute z-10">
        🦐
      </div>

      <svg
        className="text-ring-spin absolute inset-0"
        viewBox="0 0 240 240"
        width={240}
        height={240}
      >
        <defs>
          <path id="textCircle" d={circlePath} fill="none" />
        </defs>
        <text
          fill="#ffffff"
          fontSize="13"
          fontWeight="700"
          fontFamily="var(--font-fredoka), Fredoka, sans-serif"
          letterSpacing="2.5px"
          textAnchor="start"
        >
          <textPath href="#textCircle" startOffset="0%">
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
