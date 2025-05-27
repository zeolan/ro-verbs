import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
    environment: 'jsdom',
    globals: true,
    setupFiles: ["./src/setupTests.js"],
    coverage: {
      exclude: [
        'public',
        'dist',
        'src/tests',
        'src/setupTests.js',
        '*.config.*',
        'src/utils/*_data.js',
        'src/serviceWorker*.js',
        'src/main.tsx',
      ],
    },
  },
})