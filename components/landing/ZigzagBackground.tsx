"use client";

const WAVE_COLORS = [
  "rgba(255, 235, 140, 0.18)",  // yellow
  "rgba(255, 210, 120, 0.16)",  // golden
  "rgba(255, 185, 110, 0.16)",  // light orange
  "rgba(255, 160, 100, 0.16)",  // peach
  "rgba(255, 140, 92, 0.18)",   // orange
  "rgba(255, 135, 120, 0.16)",  // salmon
  "rgba(255, 120, 130, 0.16)",  // coral-pink
  "rgba(255, 107, 107, 0.18)",  // pink
];

function zigzagPath(
  width: number,
  yOffset: number,
  amplitude: number,
  segments: number,
): string {
  const segWidth = width / segments;
  let d = `M 0 ${yOffset}`;
  for (let i = 0; i < segments; i++) {
    const peakY = i % 2 === 0 ? yOffset - amplitude : yOffset + amplitude;
    const x = segWidth * (i + 1);
    d += ` L ${x} ${peakY}`;
  }
  d += ` L ${width} 1000 L 0 1000 Z`;
  return d;
}

export default function ZigzagBackground() {
  const w = 1200;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox={`0 0 ${w} 1000`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {WAVE_COLORS.map((color, i) => {
          const yStart = 80 + i * 110;
          const amp = 28 + (i % 3) * 8;
          const segs = 10 + (i % 2) * 2;
          return (
            <path
              key={i}
              d={zigzagPath(w, yStart, amp, segs)}
              fill={color}
            />
          );
        })}
      </svg>
    </div>
  );
}
