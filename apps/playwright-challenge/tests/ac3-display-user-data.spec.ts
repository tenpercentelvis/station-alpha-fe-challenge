import { expect, test } from "@playwright/test";

test("AC3: Verify user data is displayed", async ({ page }) => {
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

  // Verify user data is displayed
  await expect(page.locator('[data-testid="name-1"]')).toHaveText("John Doe");
  await expect(page.locator('[data-testid="username-1"]')).toHaveText(
    "johndoe"
  );
  await expect(page.locator('[data-testid="email-1"]')).toHaveText(
    "john@example.com"
  );
  await expect(page.locator('[data-testid="city-1"]')).toHaveText("New York");
  await expect(page.locator('[data-testid="phone-1"]')).toHaveText(
    "555-123-4567"
  );
  await expect(page.locator('[data-testid="website-1"]')).toHaveText(
    "johndoe.com"
  );
  await expect(page.locator('[data-testid="company-1"]')).toHaveText(
    "ABC Corp"
  );

  // Verify website link is displayed
  await expect(page.locator('[data-testid="website-1"] a')).toHaveAttribute(
    "href",
    "https://johndoe.com"
  );
});

test("AC3: Verify user data is displayed - edge case - data is missing", async ({
  page,
}) => {
  // Mock API to return users with missing data
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
          },
        ]),
      });
    }
  );

  await page.goto("http://localhost:3677");

  // Verify user data is displayed
  await expect(page.locator('[data-testid="name-1"]')).toHaveText("John Doe");
});

test("AC3: Verify user data is displayed - edge case - data is null", async ({
  page,
}) => {
  // Mock API to return users with null data
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
            username: null,
            email: null,
            address: null,
            phone: null,
            website: null,
            company: null,
          },
        ]),
      });
    }
  );

  await page.goto("http://localhost:3677");

  // Verify user data is displayed
  await expect(page.locator('[data-testid="name-1"]')).toHaveText("John Doe");
});

// Edge cases: special characters in data, invalid email addresses and website url
