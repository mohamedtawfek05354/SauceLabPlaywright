# Sauce Labs Playwright Automation

This project uses [Playwright](https://playwright.dev/) for end-to-end testing of the Sauce Labs demo site, following the Page Object Model. It supports both HTML and Allure reporting.

---

## 📦 Project Structure

```
.
├── tests/
│   ├── Pages/
│   │   ├── LoginPage.js
│   │   ├── Inventory.js
│   │   ├── ProductPage.js
│   │   └── CheckoutPage.js
│   ├── NegativePathTest.spec.js
│   ├── PositivePathTest.spec.js
│   └── testData.json
├── playwright.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Run tests with HTML and Allure reports

```sh
npm run pretest
```
then

```sh
npm run test
```

- This will:
  - Clean the Allure results folder
  - Run all Playwright tests
  - Generate both HTML and Allure reports

---

## 📝 Scripts

| Script            | Description                                      |
|-------------------|--------------------------------------------------|
| `npm test`        | Run all Playwright tests                         |
| `npm run pretest` | Delete all allure result folder                  |
| `npm run runReport`  | Open the last Playwright HTML report          |
| `npm run allure` |  Run allure report                                |

---

## 📊 Reporting

- **HTML Report:** Opens automatically after the run (or use `npm run runReport`).
- **Allure Report:** Opens automatically after the run with `npm run allure`.

---

## 🧪 Test Data

All test data is managed in [`tests/testData.json`](tests/testData.json) for easy data-driven testing.

---

## 🏗️ Test Organization

- **Page Object Model:** All UI actions are encapsulated in `Pages/` classes.
- **Specs:** All test scenarios are located in the `tests/` folder, organized by feature and

## 💡 Suggestions for Improvement

- Use Playwright fixtures for advanced setup/teardown.
- Integrate with CI/CD for automated test runs and reporting.
- Add visual regression or accessibility checks if needed.

## 📚 References

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Allure Playwright](https://github.com/allure-framework/allure-js)
- [Sauce Labs Demo](https://www.saucedemo.com/)