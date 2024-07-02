// Flow base on https://nextui.org/docs/guide/installation

import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
    }),
  ],
  theme: {
    extend: {
      keyframes: {
        toast: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        toast: "toast 0.5s ease-in-out",
      },
    },
  },
};

export default config;
