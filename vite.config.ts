import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Figma Make exports reference images as `figma:asset/<hash>.png`. Those
// bytes never left Figma, so map each hash to a file under src/assets/figma.
// Drop the original PNG next to the SVG and point the map at it to restore
// the exact artwork.
const figmaAssets: Record<string, string> = {
  '75f4a380686ced8781dad611a9814fa31c254317.png': 'work-helper-logo.svg',
  '91c3dd93a2106205496ec9f6c5247d263cb80c55.png': 'vts-logo.svg',
}

function figmaAssetPlugin(): Plugin {
  const dir = path.resolve(__dirname, 'src/assets/figma')
  return {
    name: 'figma-asset',
    enforce: 'pre',
    resolveId(id) {
      if (!id.startsWith('figma:asset/')) return null
      const name = id.slice('figma:asset/'.length)
      const file = path.join(dir, figmaAssets[name] ?? name)
      if (!fs.existsSync(file)) {
        this.error(`figma:asset "${name}" is not mapped — add it to figmaAssets in vite.config.ts`)
      }
      return file
    },
  }
}

export default defineConfig({
  // GitHub Pages serves the project from /Solidcore/; local dev stays at /.
  base: process.env.GITHUB_PAGES ? '/Solidcore/' : '/',
  plugins: [
    figmaAssetPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
