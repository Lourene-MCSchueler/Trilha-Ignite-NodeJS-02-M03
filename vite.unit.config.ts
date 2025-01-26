import { defineConfig, mergeConfig } from 'vitest/config'
import vitestConfig from './vite.config'

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ['src/use-cases/*.spec.ts'],
    },
  }),
)
