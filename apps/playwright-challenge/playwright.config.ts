import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: "/tmp/pw-artifacts",
  reporter: [["html", { outputFolder: "/tmp/pw-report", open: "never" }]],
  use: {
    baseURL: "http://localhost:3677",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        launchOptions: {
          executablePath: "/ms-playwright/webkit-2140/pw_run.sh",
        },
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    port: 3677,
    reuseExistingServer: !process.env.CI,
  },
});
