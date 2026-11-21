const {test, expect} = require("@playwright/test");
let productName;

test('login', async ({page})=>
{


    //Login
    await page.goto("https://www.demoblaze.com/index.html");
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("tejaswinunna");
    await page.locator("#loginpassword").fill("Tejaswi@14");
    await page.getByRole("button", {name:'Log in'}).click();
    await page.waitForTimeout(5000);

    //HomePage
    productName = "Iphone 6 32gb";
    const productList = page.locator("#tbodyid .hrefch");
    const count = await productList.count();

    for (let i = 0; i < count; i++) {
        const product = productList.nth(i);

        if (productName === (await product.innerText()).trim()) {
            await product.click();
            break;
        }
    }
    page.on('dialog', async dialog => {
    await dialog.accept();
    });

    await page.locator('a:has-text("Add to cart")').click();
    await page.locator("#cartur").click();

    //cart
    const ProdTitles = page.locator("#tbodyid tr td:nth-child(2)");
    const count1 = await ProdTitles.count();

    for (let i = 0; i < count1; i++) {
        const product = ProdTitles.nth(i);

        if (productName === (await product.textContent()).trim()) {
            console.log("Product name is"+productName);
            break;
        }
    }

    return false;


});