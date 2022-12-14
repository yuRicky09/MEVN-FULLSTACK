import { fileURLToPath, URL } from "url";
import svgLoader from "vite-svg-loader";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env);

  return {
    plugins: [
      vue(),
      svgLoader(),
      Components({
        dts: true,
        dirs: ["src/components", "src/views"],
        resolvers: [IconsResolver()],
      }),
      AutoImport({
        dts: true,
        include: [
          /\.[tj]sx?$/,
          /\.vue$/,
          /\.vue\?vue/,
          /\.md$/, //
        ],
        imports: ["vue", "vue-router"],
        eslintrc: {
          enabled: true,
        },
      }),
      Icons({ compiler: "vue3" }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",

          assetFileNames: ({ name }) => {
            if (/\.(jpe?g|png|svg|gif|webp)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }

            if (/\.(css$)/.test(name ?? "")) {
              return "assets/css/[name]-[hash][extname]";
            }

            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
