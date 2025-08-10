import { useEffect, useState } from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import WeatherAlerts from './components/WeatherAlerts';
import WeatherMap from './components/WeatherMap';
import {
  getWeatherForecast,
  SearchHistoryItem,
  WeatherData
} from './services/weatherApi';

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  const handleSearch = async (location: string) => {
    if (!location.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherForecast(location, 5);
      setWeatherData(data);
    } catch (err: any) {
      console.log('error', err);
      setError('Could not load weather data, please try again');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const addToSearchHistory = (query: string) => {
    const newSearchItem: SearchHistoryItem = { 
      query: query, 
      timestamp: Date.now() 
    };
    
    const currentHistory = searchHistory;
    const updatedHistory = [newSearchItem, ...currentHistory.slice(0, 2)];
    setSearchHistory(updatedHistory);
  };

  useEffect(() => {
    console.log(weatherData?.current);
    console.log(weatherData?.forecast);
    console.log(searchHistory);
  }, [weatherData]);

  return (
    <div className="weather-app">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <p className="app-description">
          Get real-time weather information for any location
        </p>
      </header>

      <main className="app-content">
        <section className="instructions">
          <h2>API Integration Challenge</h2>
          <p>
            Welcome to the Weather Dashboard API Integration Challenge! Your task is to implement
            a weather application that integrates with a public weather API.
          </p>
          <div className="task-list">
            <h3>Your Tasks:</h3>
            <ol>
              <li>
                <strong>Current Weather Display</strong>
                <p>Implement a search function and display current weather conditions for the searched location.</p>
              </li>
              <li>
                <strong>Search Functionality</strong>
                <p>Add autocomplete/suggestions for city search and remember recent searches.</p>
              </li>
              <li>
                <strong>Extended Forecast</strong>
                <p>Show a 5-day forecast with temperature and conditions.</p>
              </li>
              <li>
                <strong>Weather Map</strong>
                <p>Implement a visual map showing weather patterns and allow users to select locations from the map.</p>
              </li>
              <li>
                <strong>Weather Alerts</strong>
                <p>Display any weather alerts or warnings for the selected location.</p>
              </li>
            </ol>
          </div>
          <div className="api-info">
            <h3>Recommended APIs:</h3>
            <ul>
              <li><a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">WeatherAPI.com</a></li>
              <li><a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a></li>
              <li><a href="https://www.visualcrossing.com/weather-api" target="_blank" rel="noopener noreferrer">Visual Crossing Weather</a></li>
            </ul>
          </div>
        </section>

        <section className="implementation-area">
          <h2>Your Implementation</h2>
          
          <SearchBar 
            onSearch={handleSearch}
            searchHistory={searchHistory}
            addToSearchHistory={addToSearchHistory}
          />

          <div className="weather-display" role="region" aria-label="Weather information">
            {isLoading && <div className="loading" role="status" aria-live="polite">Loading weather data...</div>}
            
            {error && <div className="error-message" role="alert" aria-live="assertive">{error}</div>}
            
            {!isLoading && !error && !weatherData && (
              <div className="no-data" role="status" aria-live="polite">
                Search for a location to see weather information
              </div>
            )}
            
            {weatherData && (
              <div className="weather-content">
                <div className="current-weather">
                  <CurrentWeather weatherData={weatherData} />
                </div>

                <div className="forecast">
                  <Forecast weatherData={weatherData} />
                </div>
                
                <div className="weather-map">
                  <WeatherMap 
                    weatherData={weatherData} 
                    onLocationSelect={(lat, lon) => {
                      // Convert coordinates to a location string and search
                      const locationString = `${lat.toFixed(4)},${lon.toFixed(4)}`;
                      handleSearch(locationString);
                    }} 
                  />
                </div>
                
                <div className="weather-alerts">
                  <WeatherAlerts weatherData={weatherData} />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          API Integration Challenge | Created for Station Alpha Frontend Developer Interviews
        </p>
      </footer>
    </div>
  );
};

export default App;
