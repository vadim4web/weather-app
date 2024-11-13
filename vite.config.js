import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode }) => {

  // https://stackoverflow.com/questions/76115552/vue-3-vite-not-respecting-base-url-when-routing-route-refresh-produces-404
  // https://github.com/vitejs/vite/discussions/2260
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const isProduction = mode === 'production' || command === 'build'
  const base = isProduction ? process.env.VITE_BASE_URL : '/'

  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    base,
  }
})
