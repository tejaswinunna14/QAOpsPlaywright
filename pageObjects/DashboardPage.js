class DashboardPage{
constructor(page){
    this.products = page.locator(".card-body");
    this.productText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.getByRole('button', { name: 'ORDERS' });}


async searchProductAddCart(productName) {
    const count = await this.products.count();
    let productFound = false;

    for (let i = 0; i < count; i++) {
        const product = this.products.nth(i);
        const title = (await product.locator("b").textContent()).trim();

        if (title.toLowerCase() === productName.toLowerCase()) {
            await product.locator("text=Add To Cart").click();
            productFound = true;
            console.log(`Added "${title}" to cart`);
            break;
        }
    }

    if (!productFound) {
        throw new Error(`Product "${productName}" was not found on the dashboard`);
    }
}


async navigateToCart() {
    await this.cart.waitFor({ state: 'visible' });
    await this.cart.click();

    await this.cart.page().waitForURL('**/dashboard/cart');
    console.log('Navigated to cart:', this.cart.page().url());
}

async navigateToOrders() {
    await this.orders.click();
}

}

module.exports = {DashboardPage};