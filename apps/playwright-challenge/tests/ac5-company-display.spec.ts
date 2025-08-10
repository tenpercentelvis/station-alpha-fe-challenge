import { expect, test } from "@playwright/test";

test("AC5: Verify company data is displayed", async ({ page }) => {
  // Mock API to return users with company data
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
          {
            id: 2,
            name: "Jane Doe",
            username: "janedoe",
            email: "jane@example.com",
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
            website: "janedoe.com",
            company: undefined,
          },
        ]),
      });
    }
  );

  await page.goto("http://localhost:3677");

  // Verify company data is displayed
  await expect(page.locator('[data-testid="company-1"]')).toHaveText(
    "ABC Corp"
  );

  // Verify no company icon is displayed
  await expect(
    page.locator('[data-testid="company-2"] [data-testid="no-company-icon"]')
  ).toBeVisible();
});

// Edge cases: Test null or missing company data
