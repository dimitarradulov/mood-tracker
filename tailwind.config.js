/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      spacing: {
        0: "0px",
        "025": "2px",
        "050": "4px",
        "075": "6px",
        100: "8px",
        125: "10px",
        150: "12px",
        200: "16px",
        250: "20px",
        300: "24px",
        400: "32px",
        500: "40px",
        600: "48px",
        800: "64px",
        1000: "80px",
      },
      colors: {
        // Neutral colors
        neutral: {
          0: "#FFFFFF",
          200: "#CBCDDD",
          300: "#9393B7",
          600: "#57577B",
          900: "#21214D",
        },
        // Blue colors
        blue: {
          100: "#E0E6FA",
          200: "#C7D3F7",
          300: "#89CAFF",
          600: "#4865DB",
          700: "#2A4CD5",
        },
        // Red colors
        red: {
          300: "#FF9B99",
          700: "#E60013",
        },
        // Other colors
        indigo: {
          200: "#8B81FF",
        },
        green: {
          300: "#89F78D",
        },
        amber: {
          300: "#FFC97C",
        },
      },
      fontFamily: {
        sans: ["RedditSans", "sans-serif"],
      },
      fontSize: {
        // Default text presets
        "preset-1": [
          "52px",
          { lineHeight: "140%", letterSpacing: "-2px", fontWeight: "700" },
        ],
        "preset-1-mobile": [
          "46px",
          { lineHeight: "120%", letterSpacing: "-2px", fontWeight: "700" },
        ],
        "preset-2": [
          "40px",
          { lineHeight: "120%", letterSpacing: "-3px", fontWeight: "700" },
        ],
        "preset-2-mobile": [
          "32px",
          { lineHeight: "120%", letterSpacing: "-3px", fontWeight: "700" },
        ],
        "preset-3": [
          "32px",
          { lineHeight: "140%", letterSpacing: "-3px", fontWeight: "700" },
        ],
        "preset-3-mobile": [
          "28px",
          { lineHeight: "130%", letterSpacing: "-3px", fontWeight: "700" },
        ],
        "preset-4": [
          "24px",
          { lineHeight: "140%", letterSpacing: "0px", fontWeight: "600" },
        ],
        "preset-4-regular": [
          "24px",
          { lineHeight: "140%", letterSpacing: "0px", fontWeight: "400" },
        ],
        "preset-5": [
          "20px",
          { lineHeight: "140%", letterSpacing: "0px", fontWeight: "600" },
        ],
        "preset-6": [
          "18px",
          { lineHeight: "120%", letterSpacing: "0px", fontWeight: "500" },
        ],
        "preset-6-italic": [
          "18px",
          {
            lineHeight: "130%",
            letterSpacing: "0px",
            fontWeight: "500",
            fontStyle: "italic",
          },
        ],
        "preset-6-regular": [
          "18px",
          { lineHeight: "140%", letterSpacing: "-3px", fontWeight: "400" },
        ],
        "preset-7": [
          "15px",
          { lineHeight: "120%", letterSpacing: "-3px", fontWeight: "400" },
        ],
        "preset-8": [
          "13px",
          { lineHeight: "120%", letterSpacing: "0px", fontWeight: "600" },
        ],
        "preset-9": [
          "12px",
          { lineHeight: "110%", letterSpacing: "0px", fontWeight: "400" },
        ],
      },
      letterSpacing: {
        tighter: "-3px",
        tight: "-2px",
      },
      lineHeight: {
        110: "110%",
        120: "120%",
        130: "130%",
        140: "140%",
      },
    },
  },
  plugins: [
    // Custom gradient utility
    ({ addUtilities }) => {
      const newUtilities = {
        ".bg-gradient-light": {
          background: "linear-gradient(180deg, #5F5FF7 99%, #E0E0FF 100%)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
