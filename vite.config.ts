import { devtools } from '@tanstack/devtools-vite'
import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { runtimeDir as nitroRuntimeDir } from 'nitro/meta'
import { resolve as resolvePath } from 'node:path'

import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    nitro({
      rollupConfig: { external: [/^@sentry\//] },
      hooks: {
        'build:before'(n) {
          n.options.handlers.push({
            route: '/api/file/**',
            method: 'DELETE',
            handler: resolvePath(nitroRuntimeDir, 'internal/vite/ssr-renderer'),
          })
          n.options.handlers.push({
            route: '/api/file/**',
            method: 'GET',
            handler: resolvePath(nitroRuntimeDir, 'internal/vite/ssr-renderer'),
          })
        },
      },
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
