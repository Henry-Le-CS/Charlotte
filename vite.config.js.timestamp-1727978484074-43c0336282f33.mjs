// vite.config.js
import react from "file:///mnt/d/Source%20Code/Charlotte/Frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///mnt/d/Source%20Code/Charlotte/Frontend/node_modules/vite/dist/node/index.js";
import macrosPlugin from "file:///mnt/d/Source%20Code/Charlotte/Frontend/node_modules/vite-plugin-babel-macros/dist/plugin.js";
import eslint from "file:///mnt/d/Source%20Code/Charlotte/Frontend/node_modules/vite-plugin-eslint/dist/index.mjs";
import svgrPlugin from "file:///mnt/d/Source%20Code/Charlotte/Frontend/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_dirname = "/mnt/d/Source Code/Charlotte/Frontend";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    eslint(),
    svgrPlugin(),
    macrosPlugin()
  ],
  build: {
    outDir: "build",
    envDir: "./buildConfig/environments",
    rollupOptions: {
      treeshake: "recommended",
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/antd")) {
            return "antd";
          }
          if (id.includes("node_modules/@mui")) {
            return "mui";
          }
          if (id.includes("node_modules/recharts")) {
            return "recharts";
          }
          if (id.includes("node_modules/react-select-country-list")) {
            return "country-list";
          }
          if (id.includes("node_modules/country-state-city")) {
            return "city-list";
          }
        }
      }
    }
  },
  base: "/",
  server: {
    port: 3e3
  },
  resolve: {
    alias: {
      "$": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  define: {
    "process.env": import.meta.env
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2QvU291cmNlIENvZGUvQ2hhcmxvdHRlL0Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2QvU291cmNlIENvZGUvQ2hhcmxvdHRlL0Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvZC9Tb3VyY2UlMjBDb2RlL0NoYXJsb3R0ZS9Gcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBtYWNyb3NQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tYmFiZWwtbWFjcm9zJ1xyXG5pbXBvcnQgZXNsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCdcclxuaW1wb3J0IHN2Z3JQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgcmVhY3QoKSxcclxuICAgICAgICBlc2xpbnQoKSxcclxuICAgICAgICBzdmdyUGx1Z2luKCksXHJcbiAgICAgICAgbWFjcm9zUGx1Z2luKCksXHJcbiAgICBdLFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBvdXREaXI6ICdidWlsZCcsXHJcbiAgICAgICAgZW52RGlyOiAnLi9idWlsZENvbmZpZy9lbnZpcm9ubWVudHMnLFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgdHJlZXNoYWtlOiAncmVjb21tZW5kZWQnLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2FudGQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FudGQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9AbXVpJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdtdWknO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWNoYXJ0cycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncmVjaGFydHMnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdC1zZWxlY3QtY291bnRyeS1saXN0JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdjb3VudHJ5LWxpc3QnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9jb3VudHJ5LXN0YXRlLWNpdHknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2NpdHktbGlzdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJhc2U6ICcvJyxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICckJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgICAncHJvY2Vzcy5lbnYnOiBpbXBvcnQubWV0YS5lbnZcclxuICAgIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBTnZCLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxFQUNqQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ0osYUFBYSxJQUFJO0FBQ2IsY0FBSSxHQUFHLFNBQVMsbUJBQW1CLEdBQUc7QUFDbEMsbUJBQU87QUFBQSxVQUNYO0FBQ0EsY0FBSSxHQUFHLFNBQVMsbUJBQW1CLEdBQUc7QUFDbEMsbUJBQU87QUFBQSxVQUNYO0FBQ0EsY0FBSSxHQUFHLFNBQVMsdUJBQXVCLEdBQUc7QUFDdEMsbUJBQU87QUFBQSxVQUNYO0FBQ0EsY0FBSSxHQUFHLFNBQVMsd0NBQXdDLEdBQUc7QUFDdkQsbUJBQU87QUFBQSxVQUNYO0FBQ0EsY0FBSSxHQUFHLFNBQVMsaUNBQWlDLEdBQUc7QUFDaEQsbUJBQU87QUFBQSxVQUNYO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN4QztBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLGVBQWUsWUFBWTtBQUFBLEVBQy9CO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
