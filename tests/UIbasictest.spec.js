const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('browser contest Playwright test', async ({browser})=>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName = page.locator('#username');
        const signIn = page.locator("#signInBtn");
        const cardTitles = page.locator('.card-body a');
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        await userName.fill("rahulsetty");
        await page.locator("[type='password']").fill("Learning@830$3mK2");
        await signIn.click();
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText("Incorrect");

        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signIn.click();

        // console.log(await cardTitles.first().textContent());
        // console.log(await cardTitles.last().textContent());
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);
});

test('UI elements', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName = page.locator('#username');
        const signIn = page.locator("#signInBtn");
        const dropdown = page.locator("select.form-control");
        const documentLink = page.locator("[href*='documents-request']");
        await dropdown.selectOption("consult");
        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();

        console.log(await page.locator(".radiotextsty").last().isChecked());
        await expect(page.locator(".radiotextsty").last()).toBeChecked();
        await page.locator("#terms").click();
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        await expect(documentLink).toHaveAttribute("class", "blinkingText");
        

        //await page.pause();   //it pasue the page

}
);


test('child window handle', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");


    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
        
    ])  //new page is opened

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').textContent());


});



// test('Client app login ', async({page})=>
//     {
//         const email = "tejaswinunna31@gmail.com";
//         const products = page.locator(".card-body");
//         const productName = 'ZARA COAT 3';
//         await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//         await page.locator("#userEmail").fill(email);
//         await page.locator("#userPassword").fill("Tejaswi@14");
//         await page.locator("#login").click();
//         await page.waitForLoadState('networkidle');
//         await page.locator(".card-body b").first().waitFor();
//         const titles = await page.locator(".card-body b").allTextContents;
//         console.log(titles);
//         const count = await products.count();
        
//         for(let i = 0; i<count; ++i)
//             {
//                 if(await products.nth(i).locator("b").textContent() === productName)
//                     {
//                         await products.nth(i).locator("text= Add To Cart").click();
//                         break;
//                     }
//             }
//             await page.locator("[routerlink*='cart']").click();
//             await page.locator("div li").first().waitFor();
//             const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
//             expect(bool).toBeTruthy();
//             await page.locator("text=Checkout").click();
//             await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
//             const dropdown = await page.locator(".ta-results");
//             await dropdown.waitFor();
//             const optionCount = await dropdown.locator("button").count();
//             for(let i=0; i<optionCount; ++i)
//                 {
//                     const text = await dropdown.locator("button").nth(i).textContent();
//                     if(text === ' India')
//                     {
//                         await dropdown.locator("button").nth(i).click();
//                         break;
//                     }

//                 }
//                 await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
//                 await page.locator(".btnn").click();

//                 await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//                 const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//                 console.log(orderId);

//                 await page.locator("button[routerlink*='myorders']").click();
//                 await page.locator("tbody").waitFor();
//                 const rows = await page.locator("tbody tr");
//                 for(let i=0; i<await rows.count(); ++i)
//                 {
//                     const rowOrderId = await rows.nth(i).locator("th").textContent();
//                     if(orderId.includes(rowOrderId))
//                     {
//                         await rows.nth(i).locator("button").first().click();
//                         break;
//                     }

//                 }
//                 const orderIdDetails = await page.locator(".col-text").textContent();
//                 await expect(orderId.includes(orderIdDetails)).toBeTruthy();
// });