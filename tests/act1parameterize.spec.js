// ─ tests/act1parameterize.spec.js ─────────────────────────────────────────

const { test, expect } = require('@playwright/test');

const fakeUsers = [
  {
    username: 'notARealUser123',
    password: 'incorrectPass!',
    expectedError: 'Incorrect username or password.',
  },
  {
    username: 'anotherFakeUser',
    password: 'badPassword',
    expectedError: 'Incorrect username or password.',
  },
  {
    username: '',
    password: '',
    expectedError: '',
  },
  {
    username: 'validUserButNoPwd',
    password: '',
    expectedError: '',
  },
];

function isBlank(str) {
  return str.trim().length === 0;
}

// Helper to read the browser’s HTML5 validation message (whatever it is):
async function getValidationMessage(page, selector) {
  return page.locator(selector).evaluate((el) => {
    const input = el;
    return input.validationMessage;
  });
}

fakeUsers.forEach(({ username, password, expectedError }, index) => {
  test(`GitHub login attempt #${index} (username="${username}")`, async ({ page }) => {
    await page.goto('https://github.com/login');
    await page.fill('input[name="login"]', username);
    await page.fill('input[name="password"]', password);

    await page.click('input[name="commit"]');

    if (isBlank(username) || isBlank(password)) {
      const loginMissing = await page.locator('input[name="login"]').evaluate((el) => {
        const input = el;
        return input.validity.valueMissing;
      });
      const pwdMissing = await page.locator('input[name="password"]').evaluate((el) => {
        const input = el;
        return input.validity.valueMissing;
      });

      if (loginMissing) {
        const msg = await getValidationMessage(page, 'input[name="login"]');
        await expect(msg).not.toBe('');
      } else if (pwdMissing) {
        const msg = await getValidationMessage(page, 'input[name="password"]');
        await expect(msg).not.toBe('');
      } else {
        const msg = await getValidationMessage(page, 'input[name="login"]');
        await expect(msg).not.toBe('');
      }

    } else {
      const errorLocator = page.locator('div.flash.flash-full.flash-error');
      await expect(errorLocator).toBeVisible({ timeout: 5000 });
      await expect(errorLocator).toContainText(expectedError);
    }
  });
});
