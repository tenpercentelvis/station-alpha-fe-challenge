# Station Alpha Frontend Interview Challenges

This repository contains a collection of frontend development challenges designed to assess candidates for the Frontend Developer position at Station Alpha.

## Project Structure

This is a Turborepo-based monorepo containing the following applications:

1. **Bug Hunting** (`apps/bug-hunting`)  
   A React client-side application with intentional bugs for candidates to identify and fix.

2. **Animation Showcase** (`apps/animation-showcase`)  
   A React challenge focused on creating a reusable animated button component with multiple effects (hover, icon support, variants) and accessibility considerations.

3. **API Integration** (`apps/api-integration`)  
   A React application for testing API integration skills with a public weather API.

4. **Playwright Challenge** (`apps/playwright-challenge`)  
   A challenge focused on end-to-end testing using Playwright.

**Important:** Each application directory (`apps/*`) contains its own specific `README.md` file with detailed instructions and context for that particular challenge. Please refer to the README inside the relevant application folder for challenge specifics. Some challenges also include a `questions.md` file that candidates may need to review or answer as part of the assessment.

## Using This Repository

This repository is designed as a take-home assessment to evaluate frontend developer candidates' skills. Here's how to proceed:

1. **Clone the Repository**: Start by cloning this repository to your local machine.

2. **Create a Branch**: Create a new branch from `main` with a descriptive name (e.g., `candidate-firstname-lastname`).
   ```bash
   git checkout -b candidate-firstname-lastname
   ```

3. **Complete the Challenges**: Work through the challenges in the `apps` directory. Each challenge has its own README.md with specific instructions.

4. **Create a Pull Request**: When you're finished:
   - Push your branch to the repository
   - Create a pull request from your branch to `main`
   - Include a clear description of your changes and any notes about your implementation

**Important**: Make sure to complete all the required challenges and answer any questions in the respective `questions.md` files before submitting your PR.

## How to Run

```bash
# Install dependencies
npm install

# Run a all apps
npm run dev

# Build all apps
npm run build
```

## Assessment Guidelines

Each challenge has its own README.md with specific instructions and a questions.md file for candidates to respond to. Candidates should create a PR with their solutions.

When assessing candidates, consider:

1. **Code Quality**: Is the code well-structured, readable, and maintainable?
2. **Problem-Solving**: How effectively did they identify and fix the issues?
3. **Technical Knowledge**: Do they demonstrate understanding of the underlying technologies?
4. **Communication**: How well did they document their approach in the questions.md file?

## Tech Stack

- **Core**: React, Next.js, TypeScript, SCSS
- **Tools**: Vite, Turborepo, npm
- **Testing**: (Varies by challenge)

## Contributing

To add new challenges or improve existing ones:

1. Create a new app in the `apps` directory
2. Add appropriate documentation and questions
3. Update this README to include the new challenge
