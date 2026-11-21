import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests run against the EXPORTED static site served by a plain static
 * server (no SPA fallback), mirroring GitHub Pages behavior.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "node scripts/serve-static.mjs 4173",
    url: "http://127.0.0.1:4173/",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
});
