const { test, expect } = require('@playwright/test');

test.describe('Weather App Tests', () => {
  test('should display weather information for Paris', async ({ page }) => {
    // Mock the API response for a successful request
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

    // Navigate to the weather page with timeout
    await page.goto('http://127.0.0.1:5500/static/weather.html', { timeout: 30000 });
    await page.waitForTimeout(1000); // Wait for 1 second to allow the page to load properly

    // Fill in the city input with a delay
    await page.getByPlaceholder('Enter city').fill('Paris');
    await page.waitForTimeout(1000); // Wait for 1 second

    // Click the "Get Weather" button
    await page.getByRole('button', { name: 'Get Weather' }).click();
    await page.waitForTimeout(1000); // Wait for 1 second

    // Assert that the result is displayed correctly using waitForSelector to ensure it's visible
    await page.waitForSelector('text=Paris: 20°C, Sunny', { timeout: 10000 });
    await expect(page.locator('text=Paris: 20°C, Sunny')).toBeVisible();
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'screenshots/weather-success.png' });
  });

  test('should handle 500 Internal Server Error', async ({ page }) => {
    // Mock the API response with a 500 error
    await page.route('**/api.weather.com/forecast*', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Internal Server Error'
        })
      });
    });

    // Navigate to the weather page with timeout
    await page.goto('http://127.0.0.1:5500/static/weather.html', { timeout: 30000 });
    await page.waitForTimeout(1000); // Wait for 1 second

    // Fill in the city input
    await page.getByPlaceholder('Enter city').fill('Paris');
    await page.waitForTimeout(1000); // Wait for 1 second

    // Click the "Get Weather" button
    await page.getByRole('button', { name: 'Get Weather' }).click();
    await page.waitForTimeout(1000); // Wait for 1 second

    // Assert that the error message is displayed
    await expect(page.getByText('Error: Error 500: Internal Server Error')).toBeVisible();
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'screenshots/weather-error.png' });
  });
});
