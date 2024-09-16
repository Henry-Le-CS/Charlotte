
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import macrosPlugin from 'vite-plugin-babel-macros'
import eslint from 'vite-plugin-eslint'
import svgrPlugin from 'vite-plugin-svgr'
// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        react(),
        eslint(),
        svgrPlugin(),
        macrosPlugin(),
    ],
    build: {
        outDir: 'build',
        envDir: './buildConfig/environments',
        rollupOptions: {
            treeshake: 'recommended',
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/antd')) {
                        return 'antd';
                    }
                    if (id.includes('node_modules/@mui')) {
                        return 'mui';
                    }
                    if (id.includes('node_modules/recharts')) {
                        return 'recharts';
                    }
                    if (id.includes('node_modules/react-select-country-list')) {
                        return 'country-list';
                    }
                    if (id.includes('node_modules/country-state-city')) {
                        return 'city-list';
                    }
                }
            }
        }
    },
    base: import.meta.env.VITE_APP_API_ENDPOINT,
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '$': path.resolve(__dirname, './src'),
        },
    },
    define: {
        'process.env': import.meta.env
    }
})
