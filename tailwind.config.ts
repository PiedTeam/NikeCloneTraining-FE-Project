// Flow base on https://nextui.org/docs/guide/installation

import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss/types/config";

const config: Pick<Config, "content" | "plugins"> = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: { background: "red" }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: { background: "blue" }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};

export default config;
