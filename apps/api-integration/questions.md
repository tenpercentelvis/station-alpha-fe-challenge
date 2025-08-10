# API Integration Challenge - Questions

Please answer the following questions about your weather application implementation:

1. **API Implementation**: Describe your approach to integrating the weather API:
   - Which API did you choose and why?

      I started with WeatherAPI because it gave me the weather data I needed right away.

      Later, I discovered WeatherAPI doesn’t provide weather map tiles, so I added OpenWeatherMap for that feature. In hindsight, I probably should have started with OpenWeatherMap. That might have avoided having to integrate two APIs and deal with the extra step of remapping latitude and longitude for the map to work.

      For this exercise, I didn’t spend time comparing API features up front, I just needed weather data quickly and went with the first recommendation.

   - How did you structure your API service layer?

      I used the existing weatherApi file as the service layer. It already contained all the required function stubs, so I just implemented them and wired them up to the actual API calls. This kept all API logic in one place, making it easy to maintain and swap out providers if needed.

      I only used getWeatherForecast with alerts on. Tested `Beijing` which showed some weather alerts.

   - How did you handle error cases and rate limiting?

     Show error message instead of results

     There was already a debounce in fetchSuggestions that prevented  api calls while typing. after a delay the API is hit to get suggestions.

2. **User Experience**: Explain your key UX decisions:
   - How did you present the weather data effectively?

      For errors, I display an error message instead of showing results so the user knows something went wrong.

      Used all of the existing presentation components for current, forecast and alerts.

   - How did you handle loading states and errors?

      While an API request is in progress, I display a “Searching locations”

      If a request fails, the catch block sets an error message so the user sees clear feedback instead of blank results. I updated this to show a friendly `Could not load weather data, please try again` instead of a system message.

   - UX improvements

      There were a few UX fixes added to show the history on initial focus, then hide it when typing a search term then showing it again if the user deletes the search.

      Also, when selecting from suggestions, the data would load and the suggestions box would stay open so I cleared the search term.

      When selecting from the auto suggest, the history would flash visible again. added some logic to prevent that. I leaned on and used AI effectively to improve the UX by working out all the new state variables to show and hide the history and suggestions.

   - What accessibility features did you implement?

      in the App.tsx & SearchBar I added basic ARIA roles/attributes.

      No additional accessibility features were implemented beyond what was already present in the other provided components.

3. **Technical Decisions**: What were your main technical considerations?
   - How did you optimize API calls and performance?

      I used debounced search requests to avoid sending an API call on every keystroke, reducing unnecessary requests and improving performance.

   - How did you handle state management?

      Used local React state (useState) to manage search queries, weather data, loading states, errors, and search history.

   - How did you ensure the application works well across different devices?

      Tested using browser developer tools and simulated mobile devices. Functionality worked, but styling was not fully responsive.

4. **Challenges**: What was the most challenging aspect of this project and how did you overcome it?

      The main challenge was getting familiar with the existing architecture and how components, state, and services were wired together. Once I understood the data flow, it was straightforward, plugging in the API data into the pre-existing structure worked without major refactoring.

5. **Improvements**: If you had more time, what would be the top 2-3 improvements you would make to the application? 

      I’d focus on this first:

      1. Move the api requests to the server to hide the API keys from the browser
      2.	State Management: Move to a Zustand store to persist data across refreshes.
      multiple weather-related queries.
      3.	Visual & Responsive Styling: Improve UI design and ensure it’s fully responsive across devices.

      Nice to have

      1. Add locales files and replace hard coded english text
      2.	Data Caching: Could consider React Query for background updates and automatic refetching. Not essential for this small app, but useful if the project grows or requires 