class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.locator('button', { hasText: 'Add to cart' });
        this.cartButton = page.locator('.shopping_cart_link');
    }
    async addToCart(productName) {
        const productLocator = this.page.locator('div.inventory_item_name', { hasText: productName });
        await productLocator.locator('..').locator('button', { hasText: 'Add to cart' }).click();
    }
    async addToCart(){
        await this.addToCartButton.click();
    }
    async goBack() {
        await this.page.goBack();
    }
}

module.exports = ProductPage;