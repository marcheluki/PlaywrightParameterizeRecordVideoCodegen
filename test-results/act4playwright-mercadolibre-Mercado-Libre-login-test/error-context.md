# Test info

- Name: Mercado Libre login test
- Location: C:\Users\marce\Documents\a_itc\6to\3Parcial\testingPepe\PlaywrightParameterizeRecordVideoCodegen\tests\act4playwright-mercadolibre.spec.js:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveValue(expected)

Locator: locator('[data-testid="user_id"]')
Expected string: "marce"
Received string: ""
Call log:
  - expect.toHaveValue with timeout 5000ms
  - waiting for locator('[data-testid="user_id"]')
    8 × locator resolved to <input rows="1" value="" type="email" id="user_id" autofocus="" name="user_id" placeholder="" maxlength="120" autocomplete="on" autocorrect="off" spellcheck="false" aria-invalid="true" data-testid="user_id" autocapitalize="none" class="andes-form-control__field" aria-describedby="user_id-message" suggestions="[object Object],[object Object],[object Object],[object Object]"/>
      - unexpected value ""

    at C:\Users\marce\Documents\a_itc\6to\3Parcial\testingPepe\PlaywrightParameterizeRecordVideoCodegen\tests\act4playwright-mercadolibre.spec.js:28:29
```

# Page snapshot

```yaml
- banner:
  - link "Mercado Libre":
    - /url: https://www.mercadolibre.com.mx
- main:
  - heading "Ingresa tu e-mail o teléfono para iniciar sesión" [level=1]
  - list:
    - listitem:
      - link "Tengo un problema de seguridad":
        - /url: https://mercadolibre.com.mx/ato-complaint/classifier?origin=LOGIN_IDENTIFICATION_WEB
  - link "Necesito ayuda":
    - /url: "#"
  - text: E-mail o teléfono
  - textbox "E-mail o teléfono"
  - alert: Completa este dato.
  - button "Continuar"
  - link "Crear cuenta":
    - /url: https://registration.mercadolibre.com.mx/registration?confirmation_url=https%3A%2F%2Fwww.mercadolibre.com.mx%2F
  - paragraph: o
  - iframe
  - status
- contentinfo:
  - link "Cómo cuidamos tu privacidad (abrirá una nueva ventana)":
    - /url: https://www.mercadolibre.com.mx/privacidad
  - text: "-Copyright © 1999-2025 DeRemate.com de México S. de R.L. de C.V. Protegido por reCAPTCHA"
  - link "-Privacidad":
    - /url: https://policies.google.com/privacy?hl=es-419
  - link "-Condiciones":
    - /url: https://policies.google.com/terms?hl=es-419
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Mercado Libre login test', async ({ page }) => {
   4 |   // Navigate to Mercado Libre
   5 |   await page.goto('https://www.mercadolibre.com/');
   6 |
   7 |   // Click the 'México' link
   8 |   await page.getByRole('link', { name: 'México' }).click();
   9 |
  10 |   // Click the 'Ingresa' (Login) link
  11 |   await page.getByRole('link', { name: 'Ingresa', exact: true }).click();
  12 |
  13 |   // Fill in the user ID
  14 |   const userIdField = page.locator('[data-testid="user_id"]');
  15 |   await userIdField.fill('marce');
  16 |
  17 |   // Click the 'Continuar' button
  18 |   const continuarButton = page.getByRole('button', { name: 'Continuar' });
  19 |   await continuarButton.click();
  20 |
  21 |   // Wait for the next form to load (e.g., reCAPTCHA or password entry form)
  22 |   await page.waitForSelector('#login_user_form');
  23 |
  24 |   // Assert that the login form is displayed
  25 |   await expect(page.locator('#login_user_form')).toBeVisible();
  26 |
  27 |   // Assert that the user ID field has the correct value
> 28 |   await expect(userIdField).toHaveValue('marce');
     |                             ^ Error: Timed out 5000ms waiting for expect(locator).toHaveValue(expected)
  29 |
  30 |   // Optionally, verify the presence of a reCAPTCHA prompt (if that's part of the login process)
  31 |   const recaptchaPrompt = await page.locator('text=Completa el reCAPTCHA.');
  32 |   await expect(recaptchaPrompt).toBeVisible();
  33 |
  34 |   // Take a screenshot for verification
  35 |   await page.screenshot({ path: 'screenshots/mercadolibre-login.png' });
  36 | });
  37 |
```