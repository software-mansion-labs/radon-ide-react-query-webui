import { defineConfig } from 'vite'

export default defineConfig({
    build: {
      emptyOutDir: true,
      outDir: 'artifacts',
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      }
    },
})