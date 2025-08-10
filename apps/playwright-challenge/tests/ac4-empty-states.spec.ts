import { expect, test } from "@playwright/test";

test("AC4: Verify empty states are displayed", async ({ page }) => {
  // Mock API to return empty array
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    }
  );

  await page.goto("http://localhost:3677");

  // Verify empty state is displayed
  await expect(page.locator('[data-testid="no-users"]')).toHaveText(
    "No users found."
  );
});

test("AC4: Verify empty states are displayed - edge case - data is null", async ({
  page,
}) => {
  // Mock API to return null data
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(null),
      });
    }
  );

  await page.goto("http://localhost:3677");

  // Verify empty state is displayed
  await expect(page.locator('[data-testid="no-users"]')).toHaveText(
    "No users found."
  );
});

// edge cases: Test the API taking a long time to respond
