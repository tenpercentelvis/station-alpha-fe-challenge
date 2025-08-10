## Notes

- I did not install or use Prettier so as not to reformat too much automatically, which would make the git diff harder to read.

- I used "dev": "vite --host 0.0.0.0 --port 5173" to run this in an isolated dev container. This could be added to the repo along with some dev container/Dockerfile setup to give future participants the option of isolating it.

# Bug Hunting Challenge - Questions

Please answer the following questions about the bugs you identified and fixed:

1. **Bug Overview**: List the bugs you found and fixed. For each bug, briefly describe:
   - What was the issue?
   - How did you identify it?
   - How did you fix it?

### TodoForm

Issue: e undefined
Identified: Browser console on first load
Fix: Used an inline function to access the onClick event before setting state.

Issue: Input type set to number with default value 0
Identified: VS Code
Fix: Defaulted the value to an empty string and added a string type.

Issue: Form posting
Identified: Browser
Fix: Added e.preventDefault() to stop the native form post and browser refresh, which was causing loss of the local todos state.

Issue: Persistent todo text after adding
Identified: Browser
Fix: Cleared the input after adding the todo.

### TodoList

Issue: No types on component
Identified: VS Code
Fix: Added prop types (also exported the Todo type for use in App).

Issue: Incorrect key name
Identified: VS Code
Fix: Changed complete to completed based on code in App.tsx.

Issue: onDelete being called on mount
Identified: VS Code
Fix: Wrapped the onDelete call in a function so it only runs when the user clicks, passing the arguments to the handler at that time.

Issue: onToggle passing the entire todo
Identified: VS Code
Fix: Pass only the id, since that’s all we need to find the correct todo.

Issue: Duplicate keys on todos in the UI
Identified: Browser testing
Fix: Added the todo id to the key prop. This prevents React from misbehaving when it can’t uniquely identify UI elements.

### TodoFilter

Issue: No types on component
Identified: VS Code
Fix: Added prop types.

Issue: Loose comparison when applying active class to “Completed” button
Identified: VS Code
Fix: Changed to strict comparison (===).

Issue: Logic applying the active class to “All” button
Identified: VS Code
Fix: Updated to compare only with the filter value and apply the class string, preventing a boolean from being used as a class name.

Issue: Template string using an active variable that does not exist
Identified: VS Code
Fix: Removed the template string and used a string comparison like the other buttons.

Issue: onClick event executing the onClearCompleted function on render
Identified: VS Code
Fix: Passed onClearCompleted as a function reference instead of executing it on render (removed the ()).

### App

Issue: Missing onAdd prop on TodoForm
Identified: VS Code
Fix: Added the function prop.

Issue: addTodo had no types
Identified: VS Code
Fix: Added a string type to the parameter.

Issue: Default todos value set to null
Identified: VS Code
Fix: Set to an empty array and typed it as an array of Todos.

Issue: New todos need an id
Identified: VS Code
Fix: Added an id property with a unique date string (quick fix — would use a UUID otherwise).

Issue: Missing onFilter prop on TodoFilter
Identified: VS Code
Fix: Added the function prop.

Issue: setFilter declared but not used
Identified: VS Code
Fix: Fixed by adding the onFilter prop to TodoFilter.

Issue: Missing types on toggleTodo and deleteTodo
Identified: VS Code
Fix: Added a string type for both parameters.

Issue: deleteTodo had no id parameter
Identified: VS Code
Fix: Added the parameter and gave it a string type.

Issue: Mutating state in addTodo
Identified: VS Code
Fix: Avoided pushing directly to state or setting todos with a mutated array. Created a new todo object, then a new todos array by spreading the current state and adding the new todo — no mutations.

Issue: Mutating todo in toggleTodo
Identified: VS Code
Fix: In the map, the todo from todos was being mutated by changing its completed value directly. Instead, created a new todo object inside the map and returned it — no React state or child objects are mutated.

Issue: Inconsistent use of function declarations
Identified: VS Code
Fix: Not a bug, but updated for consistency with other functions.

Issue: Calling filteredTodos on every render
Identified: VS Code
Fix: Performance improvement — memoized the function so it only runs when its dependencies (e.g., selected filter) change. Also cleaned it up with a switch for readability and easier extension with more filter states.


2. **Technical Approach**: What debugging tools and techniques did you use to identify and fix the bugs?

Tools: browser console + VS Code + manual testing

The browser console logs were the first place I looked after running the app. The first bug I spotted there was the undefined e, which led me to the TodoForm. After that, I worked directly in VS Code until all the issues I found were fixed and the app rendered. Once the app was running, I manually tested the functionality, identified the broken UX related to the form submitting and the input not clearing, and then fixed the unique keys issue flagged in the browser console.


3. **Code Improvements**: Beyond fixing bugs, did you make any improvements to the code organization or structure? If so, what and why?

- Added types to all components and functions — this prevents bugs early and flags issues immediately in VS Code. Also gives better autocomplete if types are available when using a function or component.
- Added an enum to hold filter options — a single source of truth that removes magic strings.
- Updated components to use named exports instead of default — personal preference, but it makes imports more consistent as they can all be destructured: import { Component } from 'component'.
- Added some performance enhancements with useMemo and avoided executing functions on every render.

4. **Future Prevention**: How would you prevent similar bugs in future development? Consider both coding practices and testing strategies.

- Strongly type everything with TypeScript — no any types.
- Keep high, meaningful unit test coverage. Focus on testing important logic, not just hitting a number.
- Use integration and end-to-end tests to catch UX issues — an automated test would’ve flagged the form bug.
- Run regular (e.g., every 15 mins) production checks on critical user flows, especially when using third-party APIs.
- Pre-commit hooks for tests, type checks, linting, and even spelling before code hits the repo.
- Keep watcher tasks running to flag lint/type issues while you work.
- Add a test results summary to PRs to show everything passed before merging.

5. **Learning**: What was the most challenging or interesting aspect of this bug-hunting exercise? 

I found it interesting because it was realistic and challenging to identify some of the more nuanced issues. It involved browser testing and using IDE tools to fix not only the breaking issues but also to improve the reliability and performance.











