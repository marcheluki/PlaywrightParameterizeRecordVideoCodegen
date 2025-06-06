import { test, expect } from '@playwright/test';

test('GitHub login attempt with incorrect credentials', async ({ page }) => {
  // Navigate to GitHub homepage
  await page.goto('https://github.com/');
  
  // Click the "Sign in" link
  await page.getByRole('link', { name: 'Sign in' }).click();

  // Fill the "Username or email address" field with invalid data
  await page.getByRole('textbox', { name: 'Username or email address' }).fill('name');

  // Fill the "Password" field with invalid data
  await page.getByRole('textbox', { name: 'Password' }).fill('pasword');

  // Click the "Sign in" button
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  // Assert that the error message is displayed for incorrect login
  const errorMessage = await page.locator('.js-flash-alert');
  await expect(errorMessage).toContainText('Incorrect username or password.');
});
