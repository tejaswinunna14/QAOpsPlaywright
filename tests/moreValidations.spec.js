const {test, expect} = require('@playwright/test')

//test.describe.configure({mode:'parallel'});
// the above line is used to run all the tests in same file runs parallel
test('Popup validations', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //page.goto("https://www.google.com/");
    //page.goBack();
    //page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    page.on('dialog', dailog => dailog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const text = await framePage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

});

test('screenshot', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'Partialss.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

// test('visual', async({page})=>
// {
//     await page.goto("https://www.google.com/");
//     expect(await page.screenshot()).toMatchSnapshot('landing.png');
    
// });