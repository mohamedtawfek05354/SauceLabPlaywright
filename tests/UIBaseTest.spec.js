const { test, expect, chromium } = require("@playwright/test");
const LoginPage = require("./Pages/LoginPage.js");
const Inventory = require("./Pages/Inventory.js");
const ProductPage = require("./Pages/ProductPage.js");
const CheckoutPage = require("./Pages/CheckoutPage.js");
const testData = require('./testData.json');
const { Network } = require("inspector/promises");

let browser;
let context;
let page;
let checkoutPage;
let inventoryPage;
let loginPage;
let productPage;

test.describe('Sauce Labs E2E happy path', () => {
    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext({ viewport: null });
        page = await context.newPage();
        loginPage = new LoginPage(page);
        inventoryPage = new Inventory(page);
        productPage = new ProductPage(page);
        checkoutPage = new CheckoutPage(page);
        await page.goto("https://www.saucedemo.com/");
        await expect(page).toHaveTitle("Swag Labs");
    });



    test("login to sauceLabs", async () => {
        await loginPage.login(testData.login.username, testData.login.password);
        await expect(page).toHaveURL(/inventory/);
    });

    test("Check Inventory Page", async () => {
        const products = await inventoryPage.getProducts();
        expect(products.length).toBeGreaterThan(0);
    });

    test("Select multiple products and complete checkout", async () => {
        for (const productName of testData.products) {
            await inventoryPage.selectProductByName(productName);
            await productPage.addToCart();
            await productPage.goBack();
        }

        await inventoryPage.goToCart();
        const cartItems = await checkoutPage.getCartItems();
        expect(cartItems.length).toBe(testData.products.length);
        for (let i = 0; i < testData.products.length; i++) {
            const itemName = await cartItems[i].locator('.inventory_item_name').textContent();
            expect(itemName).toBe(testData.products[i]);
        }
        await checkoutPage.startCheckout();
        await checkoutPage.fillInformation(
            testData.checkout.firstName,
            testData.checkout.lastName,
            testData.checkout.postalCode
        );
        await checkoutPage.finishCheckout();
        await  page.waitForLoadState(Network.networkIdle);
        const confirmation = await checkoutPage.getConfirmationMessage();
        await expect(confirmation).toContain('Thank you');
    });

    test.afterAll(async () => {
        await browser.close();
    });
});
test.describe('Sauce Labs E2E negative path for Login', () => {
    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext({ viewport: null });
        page = await context.newPage();
        loginPage = new LoginPage(page);
        inventoryPage = new Inventory(page);
        productPage = new ProductPage(page);
        checkoutPage = new CheckoutPage(page);
        await page.goto("https://www.saucedemo.com/");
    });

    test("login with invalid credentials", async () => {
        await loginPage.login(testData.login.invalidUsername, testData.login.invalidPassword);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(testData.login.errorMessage);
        await expect(page).toHaveURL("https://www.saucedemo.com/");
    });

    test.afterAll(async () => {
        await browser.close();
    });
});
test.describe('Sauce Labs E2E filter products', () => {
    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext({ viewport: null });
        page = await context.newPage();
        loginPage = new LoginPage(page);
        inventoryPage = new Inventory(page);
        productPage = new ProductPage(page);
        checkoutPage = new CheckoutPage(page);
        await page.goto("https://www.saucedemo.com/");
        await loginPage.login(testData.login.username, testData.login.password);
    });

    test("filter products by name (A to Z)", async () => {
        await inventoryPage.filterProducts(testData.filterOptions.az);
        const products = await inventoryPage.getProducts();
        expect(products).toEqual(products.sort());
    });

    test("filter products by name (Z to A)", async () => {
        await inventoryPage.filterProducts(testData.filterOptions.za);
        const products = await inventoryPage.getProducts();
        expect(products).toEqual(products.sort().reverse());
    });

    test("filter products by price (low to high)", async () => {
        await inventoryPage.filterProducts(testData.filterOptions.lohi);
        const products = await inventoryPage.getProducts();
    });

    test("filter products by price (high to low)", async () => {
        await inventoryPage.filterProducts(testData.filterOptions.hilo);
        const products = await inventoryPage.getProducts();
    });

    test.afterAll(async () => {
        await browser.close();
    });
});
test.describe('Sauce Labs Negative Checkout', () => {
    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext({ viewport: null });
        page = await context.newPage();
        loginPage = new LoginPage(page);
        inventoryPage = new Inventory(page);
        productPage = new ProductPage(page);
        checkoutPage = new CheckoutPage(page);
        await page.goto("https://www.saucedemo.com/");
        await loginPage.login(testData.login.username, testData.login.password);
    });
    test("checkout with missing information", async () => {
        await inventoryPage.selectProductByName(testData.products[0]);
        await productPage.addToCart();
        await inventoryPage.goToCart();
        await checkoutPage.startCheckout();
        await checkoutPage.fillInformation('', '', '');
        const errorMessage = await checkoutPage.getErrorMessage();
        expect(errorMessage).toContain('Error: First Name is required');
    });

    test.afterAll(async () => {
        await browser.close();
    });
});