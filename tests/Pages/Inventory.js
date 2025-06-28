class Inventory {
    constructor(page) {
        this.page = page;
        this.productList = page.locator('.inventory_list');
        this.productNames = page.locator('.inventory_item_name');
        this.filterButton = page.locator('.product_sort_container');
    }
    async filterProducts(option) {
        await this.filterButton.selectOption(option);
    }
    async getProducts() {
        return await this.productList.allTextContents();
    }

    async selectProductByName(name) {
        await this.page.locator('.inventory_item_name', { hasText: name }).click();
    }
    async selectProductByIndex(index) {
        await this.productNames.nth(index).click();
    }
    async goToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
}
module.exports = Inventory;