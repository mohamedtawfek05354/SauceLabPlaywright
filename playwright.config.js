import { defineConfig, devices } from '@playwright/test';
import { time } from 'console';
const config = ({
  testDir: './tests',  
  reporter: [
    ['html'], 
    ['allure-playwright']
  ],
  timeout: 30 * 1000, // 30 seconds
  expect: {
    timeout: 5000, // 5 seconds
  },
  use: {
    browserType: 'chromium',
    launchOptions: {
      args: ['--start-maximized'],
    },
    headless: false,
    fullscreen: true,
    viewport: null,
    screenshots: 'on',
    video: 'on',
    trace: 'retain-on-failure'
  },

});
module.exports = config;

