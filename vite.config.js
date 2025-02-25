import { defineConfig } from 'vite'

export default defineConfig({
    build: {
      emptyOutDir: true,
      outDir: 'artifacts',
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          entryFileNames: `assets/index.js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      }
    },
})