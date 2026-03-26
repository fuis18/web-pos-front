import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		babel({ presets: [reactCompilerPreset()] }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@/contants": path.resolve(__dirname, "./src/constants"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/react-dom")) return "vendor-react";
					if (id.includes("node_modules/react/")) return "vendor-react";
					if (id.includes("node_modules/react-router")) return "vendor-react";
					if (id.includes("node_modules/@radix-ui")) return "vendor-ui";
				},
			},
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
