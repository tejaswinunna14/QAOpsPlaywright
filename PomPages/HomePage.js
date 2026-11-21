exports.HomePage = class HomePage{
    constructor(page){
        this.page = page;
        this.productList = "#tbodyid .hrefch";
        this.productAddToCartBtn = 'a:has-text("Add to cart")';
        this.cart = "#cartur";
    }

    async addItemToCart(productName){
        
        const productList = await this.page.locator(this.productList);
        const count = await productList.count();
        for (let i = 0; i < count; i++) {
            const product = productList.nth(i);
            if (productName === (await product.innerText()).trim()) {
                await product.click();
                break;
            }
        }
        await this.page.on('dialog', async dialog => {
        await dialog.accept();
        })
        await this.page.locator(this.productAddToCartBtn).click();
    }

    async gotoToCart(){
        await this.page.locator(this.cart).click();
    }


}