import { expect, test } from "@playwright/test";

test("AC2: Verify loading state is displayed", async ({ page }) => {
  // Mock API to return users
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            name: "John Doe",
            username: "johndoe",
            email: "john@example.com",
            address: {
              street: "Main St",
              suite: "Apt 123",
              city: "New York",
              zipcode: "10001",
              geo: {
                lat: "40.7128",
                lng: "-74.0060",
              },
            },
            phone: "555-123-4567",
            website: "johndoe.com",
            company: {
              name: "ABC Corp",
              catchPhrase: "Making things happen",
              bs: "innovative solutions",
            },
          },
        ]),
      });
    }
  );

  await page.goto("http://localhost:3677");

  // Verify loading state is displayed & hidden
  await expect(page.locator('[data-testid="loading-spinner"]')).toBeVisible();
  await expect(page.locator('[data-testid="loading-spinner"]')).toBeHidden();

  // Verify user data is displayed
  await expect(page.locator("table")).toBeVisible();
  await expect(page.locator('[data-testid="name-1"]')).toBeVisible();
});

// Edge cases: Test the API taking a long time to respond
