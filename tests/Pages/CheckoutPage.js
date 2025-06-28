class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('#checkout');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.confirmationHeader = page.locator('.complete-header');
        this.errorMessage = page.locator('h3[data-test="error"]');
    }

    async startCheckout() {
        await this.checkoutButton.click();
    }

    async fillInformation(first, last, postal) {
        await this.firstNameInput.fill(first);
        await this.lastNameInput.fill(last);
        await this.postalCodeInput.fill(postal);
        await this.continueButton.click();
    }
    async getCartItems() {
        return await this.page.locator('.cart_item').all();
    }
    async finishCheckout() {
        await this.finishButton.click();
    }

    async getConfirmationMessage() {
        return await this.confirmationHeader.textContent();
    }
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

module.exports = CheckoutPage;