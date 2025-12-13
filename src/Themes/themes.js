// ==========================================
// THEME SYSTEM WITH TINYCOLOR + GRADIENTS
// ==========================================
import tinycolor from "tinycolor2";

// Helper function to generate color variants
const createColorVariants = (color) => ({
  base: color,
  light: tinycolor(color).lighten(10).toString(),
  dark: tinycolor(color).darken(10).toString(),
  veryLight: tinycolor(color).lighten(20).toString(),
  veryDark: tinycolor(color).darken(20).toString(),
});

// ----------------------------------------------------
// RED THEME (Light + Dark) — AUTO-GENERATED SHADES
// ----------------------------------------------------
const redPrimary = createColorVariants("#DC143C");

const redTheme = {
  light: {
    primary: redPrimary.base,
    primaryLight: redPrimary.light,
    primaryDark: redPrimary.dark,

    background: tinycolor("#FFF5F5").lighten(5).toString(),
    card: "#FFFFFF",
    
    white:'white',
    textPrimary: "#111111",
    textSecondary: "#444444",
    border: "#E0E0E0",

    gradients: {
      fire: [redPrimary.veryLight, redPrimary.light,redPrimary.light],
      crimson: [redPrimary.dark, redPrimary.base],
      hotPulse: ["#FF6F91", redPrimary.base],
      redGlow: ["#FFE1E8", redPrimary.light],
      black:[ "#414345","#232526"]
    },
  },

  dark: {
    primary: redPrimary.base,
    primaryDark: redPrimary.dark,
    primaryLight: redPrimary.light,

    background: "#1A0F0F",
    card: "#2C2C2C",

    textPrimary: "#FFFFFF",
    textSecondary: "#BBBBBB",
    border: redPrimary.base,

    gradients: {
      fire: [redPrimary.dark, redPrimary.base],
      crimson: [redPrimary.base, redPrimary.light],
      hotPulse: ["#802030", redPrimary.dark],
      redGlow: ["#2A1212", "#3d1d1d"],
       black:[ "#414345","#232526"]
    },
  },
};


// ----------------------------------------------------
// EXPORT ALL THEMES
// ----------------------------------------------------
export const themes = {
  // freshMint,
  redTheme,
};
