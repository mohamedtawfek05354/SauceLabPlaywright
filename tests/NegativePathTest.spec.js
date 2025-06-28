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