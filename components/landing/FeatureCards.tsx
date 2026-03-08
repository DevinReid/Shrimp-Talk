const FEATURES = [
  {
    icon: "🎯",
    title: "You're in Control",
    description: "Toggle your feed on or off. See only what you want, when you want.",
  },
  {
    icon: "👥",
    title: "Friend Groups",
    description: "Create multiple groups and share with exactly who you want.",
  },
  {
    icon: "⚡",
    title: "Real-time Chat",
    description: "Instant messaging with your friends, no algorithms in the way.",
  },
] as const;

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {FEATURES.map(({ icon, title, description }) => (
        <div
          key={title}
          className="backdrop-blur-sm p-4 rounded-lg border-2 transition-shadow hover:shadow-md"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderColor: "#ffd4d4",
          }}
        >
          <div className="text-2xl mb-2">{icon}</div>
          <h3 className="font-semibold text-sm mb-1" style={{ color: "#ff5252" }}>
            {title}
          </h3>
          <p className="text-xs leading-snug" style={{ color: "#ff6b6b" }}>
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}
