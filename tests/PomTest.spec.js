const {test, expect} = require("@playwright/test");
const {PomLogin} = require('../PomPages/PomLogin');
const {HomePage} = require('../PomPages/HomePage');
const { CartPage } = require("../PomPages/CartPage");


let ProductName ="Iphone 6 32gb";
test('login', async ({page})=>
{
    //Login
    const login = new PomLogin(page);
    await login.gotoLoginUrl(page);
    await login.LoginPage('tejaswinunna', 'Tejaswi@14');
    await page.waitForTimeout(4000);
    //Home
    const homePage = new HomePage(page);
    await homePage.addItemToCart(ProductName);
    await page.waitForTimeout(5000);
    await homePage.gotoToCart();
    //cart
    const cart = new CartPage(page);
    await page.waitForTimeout(5000);
    const status = await cart.checkProductInCart(ProductName);
    expect(await status).toBe(true);
    

});