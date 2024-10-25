// @ts-check 
const { defineConfig, devices } = require("@playwright/test");


module.exports = defineConfig({
  testDir: "./e2e",
  workers: 1,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [{
    name: "chromium",
    use: {
      ...devices["Desktop Chrome"],
      headless: false
    },
  },],



});

