// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000, // Increased timeout for tests
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  retries: 1,
  workers: 2,
  reporter: [['dot'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'https://github.com',
    video: 'on', // Record video for every test
    trace: 'on', // Optionally enable tracing (for debugging)
  },
});
