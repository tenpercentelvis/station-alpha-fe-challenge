import { test, expect } from '@playwright/test';

// Example test to show structure - this should be replaced by the candidate
test('basic test', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:3677');

  // Basic assertions
  await expect(page.locator('h1')).toHaveText('User Directory');
}); 