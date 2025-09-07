import { defineConfig, loadEnv } from "vite";
import process from "process";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react()],
        server: {
            allowedHosts: [env.VITE_HOSTNAME],
            port: env.VITE_PORT,
        },
    };
});

