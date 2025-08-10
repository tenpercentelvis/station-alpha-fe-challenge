import { expect, test } from "@playwright/test";

test("AC6: Verify error handling", async ({ page }) => {
  // Mock API to return error
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Internal Server Error",
          message: "Something went wrong",
        }),
      });
    }
  );

  await page.goto("http://localhost:3677");

  // Verify error modal is displayed
  await expect(page.locator('[data-testid="error-modal"]')).toBeVisible();

  // Verify error message is displayed in modal
  await expect(page.locator('[data-testid="error-message"]')).toHaveText(
    "Failed to load users. Please try again later."
  );

  // Verify close button is displayed
  await expect(
    page.locator('[data-testid="error-close-button"]')
  ).toBeVisible();

  await page.locator('[data-testid="error-close-button"]').click();

  // Verify error modal is hidden
  await expect(page.locator('[data-testid="error-modal"]')).toBeHidden();
});

// Edge cases: Test other error status codes - e.g. 403
