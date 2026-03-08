export const wonkyColors = {
  pink: "#F75289",
  coral: "#F76D52",
  gold: "#F7C052",
  black: "#1a1a1a",
  white: "#ffffff",
  cream: "#FFF8F0",
  pinkSoft: "#FFDCE8",
  coralSoft: "#FFDDD4",
  goldSoft: "#FFF0CC",
};

export const wonkyAccents = [
  { accent: "#F75289", accentSoft: "#FFDCE8" },
  { accent: "#F7C052", accentSoft: "#FFF0CC" },
  { accent: "#F76D52", accentSoft: "#FFDDD4" },
];

export function getAccent(seed: string) {
  const idx = seed.charCodeAt(0) % wonkyAccents.length;
  return wonkyAccents[idx];
}

export const wonkyCardRadius = "28px";
export const wonkyBorderWidth = "2.5px";

export const wonkyHeaderBg = "#ffffff";
export const wonkyNavBg = "rgba(247,82,137,0.92)";
