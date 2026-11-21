const base= require('@playwright/test');

exports.customtest = base.test.extend({
    authenticatedPage: async({page}, use )=>
    {
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator("#userEmail").fill("tejaswinunna31@gmail.com");
        await page.locator("#userPassword").fill("Tejaswi@14");
        await page.locator("#login").click();
        await page.waitForLoadState('networkidle');

        await use(page);
    }
});