import { test, expect } from '@playwright/test';

test('Mercado Libre login test', async ({ page }) => {
  // Navigate to Mercado Libre
  await page.goto('https://www.mercadolibre.com/');

  // Click the 'México' link
  await page.getByRole('link', { name: 'México' }).click();

  // Click the 'Ingresa' (Login) link
  await page.getByRole('link', { name: 'Ingresa', exact: true }).click();

  // Fill in the user ID
  const userIdField = page.locator('[data-testid="user_id"]');
  await userIdField.fill('marce');

  // Click the 'Continuar' button
  const continuarButton = page.getByRole('button', { name: 'Continuar' });
  await continuarButton.click();

  // Wait for the next form to load (e.g., reCAPTCHA or password entry form)
  await page.waitForSelector('#login_user_form');

  // Assert that the login form is displayed
  await expect(page.locator('#login_user_form')).toBeVisible();

  // Assert that the user ID field has the correct value
  await expect(userIdField).toHaveValue('marce');

  // Optionally, verify the presence of a reCAPTCHA prompt (if that's part of the login process)
  const recaptchaPrompt = await page.locator('text=Completa el reCAPTCHA.');
  await expect(recaptchaPrompt).toBeVisible();

  // Take a screenshot for verification
  await page.screenshot({ path: 'screenshots/mercadolibre-login.png' });
});
