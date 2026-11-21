// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  //workers: 1,    //how many fails execute parallely(at the same time)

  timeout: 40 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  fullyParallel: false,

  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,

    browserName: 'chromium',  //we can use webkit 
    headless: false,
    video: 'retain-on-failure',   // record the video on failed test
    ignoreHTTPSErrors: true,  // to ignore the private http page errors
    permissions: ['geolocation'],  // to allow popup location appears on screen 

    screenshot: 'on',
    trace: 'retain-on-failure',
    //...devices['iPhone 11']      // toc check the application is working in iphone 11 device



    // viewport: {width: 720,height: 720}   // to check the application in particular screen size mode
  },
});