const {test, expect} = require('@playwright/test');
let webContext;
let email = "tejaswinunna31@gmail.com";

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Tejaswi@14");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});

})

test('@Web Client app login ', async()=>
    {
        const productName = 'ZARA COAT 3';
        const page = await webContext.newPage();
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();
        const products = await page.locator(".card-body");
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);
        const count = await products.count();
        
        for(let i = 0; i<count; ++i)
            {
                if(await products.nth(i).locator("b").textContent() === productName)
                    {
                        await products.nth(i).locator("text= Add To Cart").click();
                        break;
                    }
            }
            await page.locator("[routerlink*='cart']").click();
            await page.locator("div li").first().waitFor();
            const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
            expect(bool).toBeTruthy();
            await page.locator("text=Checkout").click();
            await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
            const dropdown = await page.locator(".ta-results");
            await dropdown.waitFor();
            const optionCount = await dropdown.locator("button").count();
            for(let i=0; i<optionCount; ++i)
                {
                    const text = await dropdown.locator("button").nth(i).textContent();
                    if(text === ' India')
                    {
                        await dropdown.locator("button").nth(i).click();
                        break;
                    }

                }
                await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
                await page.locator(".btnn").click();

                await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
                const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
                console.log(orderId);

                await page.locator("button[routerlink*='myorders']").click();
                await page.locator("tbody").waitFor();
                const rows = await page.locator("tbody tr");
                for(let i=0; i<await rows.count(); ++i)
                {
                    const rowOrderId = await rows.nth(i).locator("th").textContent();
                    if(orderId.includes(rowOrderId))
                    {
                        await rows.nth(i).locator("button").first().click();
                        break;
                    }

                }
                const orderIdDetails = await page.locator(".col-text").textContent();
                await expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

test("@Web test case2", async()=>
{
        const productName = 'ZARA COAT 3';
        const page = await webContext.newPage();
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();
        const products = await page.locator(".card-body");
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);    
}
);