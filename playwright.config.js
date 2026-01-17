import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries: 0,
  timeout: 20000,
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on',
    video: 'retain-on-failure',
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    }
  },
  reporter: [['html', { outputFolder: 'reports/html-report', open: 'never' }],
  ['allure-playwright', { outputFile: 'allure-report'}]]
});
