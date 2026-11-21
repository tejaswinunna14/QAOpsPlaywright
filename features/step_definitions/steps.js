
const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60000);

const { chromium, expect } = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');

Given(
    'login to the Ecommerce application with {string} and {string}',
    async function (username, password) {

        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        this.poManager = new POManager(this.page);

        const loginPage = this.poManager.getLoginPage();

        await loginPage.goTo();
        await loginPage.validLogin(username, password);
    }
);

When('add {string} to cart', async function (productName) {

    this.dashboardPage = this.poManager.getDashboardPage();

    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the cart', async function (productName) {

    const cartPage = this.poManager.getCartPage();

    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('enter valid details and Place the order', async function () {

    const ordersReviewPage = this.poManager.getOrdersReviewPage();

    await ordersReviewPage.searchCountryAndSelect('ind', 'India');

    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();

    console.log('Order ID:', this.orderId);
});

Then('verify th order is displayed in the order history', async function () {

    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.navigateToOrders();

    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();

    await ordersHistoryPage.searchOrderAndSelect(this.orderId);

    const historyOrderId = await ordersHistoryPage.getOrderId();

    expect(this.orderId.includes(historyOrderId)).toBeTruthy();
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});



Given(
    'login to the Ecommerce2 application with {string} and {string}',
    async function (username, password) {

        // Initialize browser and page for this scenario
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        // Navigate to the login page
        await this.page.goto(
            'https://rahulshettyacademy.com/loginpagePractise/'
        );

        console.log('Page title:', await this.page.title());

        // Enter credentials and sign in
        await this.page.locator('#username').fill(username);
        await this.page.locator("[type='password']").fill(password);
        await this.page.locator('#signInBtn').click();
    }
);


Then('error message is displayed', async function () {
        console.log(await this.page.locator("[style*='block']").textContent());
        await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});