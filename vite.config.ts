import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: './prisma/vitest-environment-prisma/prisma-test-environment',
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
