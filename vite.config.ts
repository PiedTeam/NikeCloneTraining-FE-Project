import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const viteConfig: UserConfig = {
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      "@apis": "/src/apis",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@constants": "/src/constants",
      "@contexts": "/src/contexts",
      "@hooks": "/src/hooks",
      "@layout": "/src/layout",
      "@pages": "/src/pages",
      "@styles": "/src/styles",
      "@services": "/src/services",
      "@stores": "/src/stores",
      "@utils": "/src/utils",
      "@public": "/public",
      "@common": "/src/common",
      "@provider": "/src/provider",
      "@routes": "/src/routes",
    },
  },
};

export default defineConfig(viteConfig);
