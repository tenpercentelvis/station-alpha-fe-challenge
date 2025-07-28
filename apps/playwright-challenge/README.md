# Playwright Testing Challenge

## Overview

This challenge assesses your ability to write effective end-to-end tests using Playwright for a React application. You will be testing a user directory that displays users fetched from an API.

## The Application

The application consists of:
- A dashboard that displays a table of users
- Each user has details like name, email, city, and company
- A cross SVG icon is displayed for users without a company
- An error modal appears when the API fails

## Your Challenge

Your task is to implement Playwright tests that verify the application's functionality according to the acceptance criteria. You'll need to:

1. Write clean, maintainable tests
2. Mock API responses using Playwright's route interception
3. Verify visual elements and data presentation
4. Test error handling

## Acceptance Criteria

Please implement a test for each of these acceptance criteria:

### AC1: Table Headers Verification
- Verify the user table displays the correct headers: ID, Name, Username, Email, City, Phone, Website, and Company
- **Note:** A partial implementation is provided in `tests/ac1-table-headers.spec.ts` but it contains errors you need to fix

### AC2: Loading State
- Verify the application shows a loading state while fetching data
- Verify the loading state is replaced by the user table once data is loaded

### AC3: Display User Data
- Mock the API to return a list of users
- Verify the table correctly displays user data in each column
- Verify links in the website column point to the correct URL

### AC4: Empty State
- Mock the API to return an empty array
- Verify the application displays a "No users found" message

### AC5: Company Display
- Verify users with a company display the company name
- Verify users without a company display the cross SVG icon
- Validate the presence of the cross SVG icon by checking the data-testid="no-company-icon" attribute

### AC6: Error Handling
- Mock the API to return an error response
- Verify the error modal appears with the correct error message
- Verify the user can dismiss the modal

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
    *(This will install React, Vite, and Playwright)*

2.  **Run tests:**
    ```bash
    # Run tests in the terminal
    npm test

    # Run tests with the Playwright UI mode
    npm run test:ui
    ```
    *(Playwright is configured to automatically start the development server needed for the tests)*

## Important Notes

- The application is configured to always show an error modal if the API request is not properly mocked. This is by design to ensure your tests are correctly intercepting and mocking API requests.
- AC1 has a partial implementation that contains errors. You need to identify and fix these errors.
- For all other acceptance criteria, you need to write the tests from scratch.

## Test Requirements

- Use Playwright's page.route() to mock API responses
- Implement separate tests for each acceptance criterion
- Use appropriate selectors and assertions
- Add comments to explain your testing approach
- Consider edge cases

## Mocking the API

The application fetches data from `https://jsonplaceholder.typicode.com/users`. You'll need to intercept requests to this endpoint and provide mock responses. Example:

```typescript
await page.route('https://jsonplaceholder.typicode.com/users', async (route) => {
  // Return mock data
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
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
            lng: "-74.0060"
          }
        },
        phone: "555-123-4567",
        website: "johndoe.com",
        company: {
          name: "ABC Corp",
          catchPhrase: "Making things happen",
          bs: "innovative solutions"
        }
      },
      // Add more users or set company to null to test the cross icon
    ])
  });
});
```

## Evaluation Criteria

- **Functionality**: Do the tests correctly verify the application's behavior?
- **Structure**: Are the tests well-organized and maintainable?
- **Efficiency**: Are the tests optimized and running efficiently?
- **Edge Cases**: Do the tests handle different scenarios and edge cases?
- **Documentation**: Are the tests well-documented with clear comments?

## Playwright Resources

If you are new to Playwright, these resources might be helpful:

-   **Playwright Documentation:** [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)
-   **API Testing / Mocking:** [https://playwright.dev/docs/network#mocking](https://playwright.dev/docs/network#mocking)
-   **Locators:** [https://playwright.dev/docs/locators](https://playwright.dev/docs/locators)
-   **Assertions:** [https://playwright.dev/docs/test-assertions](https://playwright.dev/docs/test-assertions)
-   **UI Mode:** [https://playwright.dev/docs/test-ui-mode](https://playwright.dev/docs/test-ui-mode)

Good luck! 