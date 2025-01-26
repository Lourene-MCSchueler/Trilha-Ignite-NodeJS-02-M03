import { defineConfig, mergeConfig } from 'vitest/config'
import vitestConfig from './vite.config'

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['src/http/controllers/**/*.spec.ts'],
      environment: './prisma/vitest-environment-prisma/prisma-test-environment',
      environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    },
  }),
)
