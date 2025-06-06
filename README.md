# Playwright Test Automation - README

## Overview

This project demonstrates the use of **Playwright** to perform automation tests for different scenarios, including logging into a website, simulating a weather forecast app, recording tests, and interacting with a marketplace site. The activities are based on **Playwright** and **Playwright Inspector** tools, focusing on creating parameterized login tests, recording videos, generating tests with Playwright Codegen, and using Playwright Inspector for user interactions.

## Workspace Structure

```plaintext
PlaywrightParameterizeRecordVideoCodegen/
├── tests/
│   ├── act1parameterize.spec.js         # Activity 1: Parameterized login tests
│   ├── act2weather.spec.js              # Activity 2: Simulate weather app
│   ├── act3codegen-github.spec.js       # Activity 3: Generate test with Playwright Codegen
│   └── act4playwright-mercadolibre.spec.js  # Activity 4: Record actions on Mercado Libre
├── static/
│   └── weather.html                    # Static HTML for weather app simulation
├── screenshots/
│   ├── mercadolibre-login.png          # Screenshot from Mercado Libre login test
│   ├── weather-error.png               # Screenshot from weather error scenario
│   └── weather-success.png             # Screenshot from weather success scenario
├── test-results/
│   ├── .last-run.json                  # Playwright last run results
│   ├── results.json                    # Playwright test results in JSON format
│   ├── act1parameterize-GitHub-lo-0cebb-0-username-notARealUser123-/
│   ├── act4playwright-mercadolibre-Mercado-Libre-login-test/
│   └── act4playwright-mercadolibre-Mercado-Libre-login-test-retry1/
├── package.json                        # Project dependencies
├── package-lock.json                   # Lock file for dependencies
└── playwright.config.js                 # Playwright configuration file
```

## How I Achieved the Results

### **Activity 1: Parameterize Login Tests**

In this activity, I created parameterized tests to log into GitHub with different sets of credentials and check for error messages.

**Steps Taken:**

1. **Created Fake User Data**: I created an array of fake users with usernames and passwords.
2. **Automated Login**: For each user, I automated the login process on the GitHub sign-in page.
3. **Assertion**: After logging in, I asserted that the correct error message ("Incorrect username or password") appeared when invalid credentials were provided.

**Playwright Code:**

```js
import { test, expect } from '@playwright/test';

test('GitHub login attempt with incorrect credentials', async ({ page }) => {
  await page.goto('https://github.com/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Username or email address' }).fill('name');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  
  // Assert error message for incorrect login
  const errorMessage = await page.locator('.js-flash-alert');
  await expect(errorMessage).toContainText('Incorrect username or password.');
});
```

### **Activity 2: Record a Video**

In this activity, I simulated the **weather.html** app using the **Live Server extension** and recorded a video of the tests I performed.

**Steps Taken:**

1. **Set Up the Weather App**: I used a simple static HTML file (`weather.html`) and served it via **Live Server**.
2. **Automated Weather Tests**: I automated the testing of the weather app by mocking an API response and verifying the displayed weather information.
3. **Video Recording**: Using Playwright's configuration (`video: 'on'`), I recorded the test execution.

**Playwright Code for Weather Test:**

```js
const { test, expect } = require('@playwright/test');

test('should display weather information for Paris', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/static/weather.html');
  
  // Mock API response
  await page.route('**/api.weather.com/forecast*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        city: 'Paris',
        temperature: '20°C',
        condition: 'Sunny'
      })
    });
  });

  await page.fill('input#city', 'Paris');
  await page.click('button#getWeather');
  
  // Assert weather information is displayed
  await expect(page.locator('text=Paris: 20°C, Sunny')).toBeVisible();
});
```

### **Activity 3: Generate a Test with Playwright Codegen in VS Code**

For this activity, I used **Playwright Codegen** to generate a test that interacts with GitHub’s sign-in page.

**Steps Taken:**

1. **Recorded User Actions**: I launched **Playwright Codegen** and recorded actions on the GitHub page. This included navigating to the sign-in page, entering a username and password, and clicking the sign-in button.
2. **Refined the Test**: After generating the code, I refined it by adding assertions to verify the login error message.

**Playwright Code (Generated and Refined):**

```js
import { test, expect } from '@playwright/test';

test('GitHub login attempt with incorrect credentials', async ({ page }) => {
  await page.goto('https://github.com/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Username or email address' }).fill('name');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  const errorMessage = await page.locator('.js-flash-alert');
  await expect(errorMessage).toContainText('Incorrect username or password.');
});
```

### **Activity 4: Generate a Test with Playwright Inspector**

In this final activity, I used **Playwright Inspector** to record user actions on the **Mercado Libre** page, including logging in and interacting with the page.

**Steps Taken:**

1. **Started Playwright Inspector**: I ran the `npx playwright codegen https://www.mercadolibre.com/` command, which launched the Mercado Libre site and started recording interactions.
2. **Recorded Actions**: I performed various actions, such as navigating to the login page, entering the username and password, and clicking the "Continue" button.
3. **Refined the Test**: After generating the test code, I added assertions to verify the expected behavior, such as checking for the appearance of the reCAPTCHA prompt.

**Playwright Code (Generated and Refined for Mercado Libre):**

```js
import { test, expect } from '@playwright/test';

test('Mercado Libre login test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com/');
  await page.getByRole('link', { name: 'México' }).click();
  await page.getByRole('link', { name: 'Ingresa', exact: true }).click();
  await page.getByTestId('user_id').fill('marce');
  await page.getByRole('button', { name: 'Continuar' }).click();

  // Assert that the login form appears
  await expect(page.locator('#login_user_form')).toBeVisible();
  
  // Assert that the reCAPTCHA prompt is visible
  await expect(page.locator('text=Completa el reCAPTCHA.')).toBeVisible();
});
```

### **Video and Trace Results**

* I used Playwright’s video recording capability (`video: 'on'`) to record the tests.
* Videos and trace files for each test were saved in the `test-results/videos/` directory.

---

## Conclusion

In this project, I successfully completed the four activities using Playwright for test automation:

1. **Parameterizing login tests** for GitHub.
2. **Recording a video** of tests simulating a weather app.
3. **Generating tests using Playwright Codegen** for GitHub.
4. **Recording user actions** using Playwright Inspector for Mercado Libre.
