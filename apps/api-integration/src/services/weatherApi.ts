import { WeatherData } from '../App';

// TODO: Replace with your actual API key
const API_KEY = 'YOUR_API_KEY';

// Base URL for Weather API (WeatherAPI.com used as an example)
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Get current weather data for a location
 * @param location - City name, zip code, or coordinates
 * @returns Promise with weather data
 */
export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
  try {
    // TODO: Implement API call to get current weather
    // Example: 
    // const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}`);
    // if (!response.ok) throw new Error('Weather data not found');
    // const data = await response.json();
    // return transformWeatherData(data);
    
    throw new Error('getCurrentWeather not implemented');
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

/**
 * Get forecast weather data for a location
 * @param location - City name, zip code, or coordinates
 * @param days - Number of days for forecast (1-10)
 * @returns Promise with weather forecast data
 */
export const getWeatherForecast = async (location: string, days: number = 5): Promise<WeatherData> => {
  try {
    // TODO: Implement API call to get weather forecast
    // Example:
    // const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}`);
    // if (!response.ok) throw new Error('Weather forecast not found');
    // const data = await response.json();
    // return transformWeatherData(data);
    
    throw new Error('getWeatherForecast not implemented');
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

/**
 * Get weather alerts for a location
 * @param location - City name, zip code, or coordinates
 * @returns Promise with weather alerts data
 */
export const getWeatherAlerts = async (location: string): Promise<WeatherData> => {
  try {
    // TODO: Implement API call to get weather alerts
    // Example:
    // const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&alerts=yes`);
    // if (!response.ok) throw new Error('Weather alerts not found');
    // const data = await response.json();
    // return transformWeatherData(data);
    
    throw new Error('getWeatherAlerts not implemented');
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    throw error;
  }
};

/**
 * Search for locations (autocomplete)
 * @param query - Partial location name
 * @returns Promise with location suggestions
 */
export const searchLocations = async (query: string): Promise<any[]> => {
  try {
    // TODO: Implement API call to search locations
    // Example:
    // const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
    // if (!response.ok) throw new Error('Location search failed');
    // return response.json();
    
    throw new Error('searchLocations not implemented');
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
};

/**
 * Transform raw API data to our application's data structure
 * @param data - Raw data from API
 * @returns Transformed WeatherData object
 */
const transformWeatherData = (data: any): WeatherData => {
  // TODO: Implement data transformation from API response to WeatherData format
  // This will depend on the specific API you choose
  
  // Example placeholder implementation:
  return {
    location: {
      name: data.location?.name || 'Unknown',
      country: data.location?.country || 'Unknown',
      lat: data.location?.lat || 0,
      lon: data.location?.lon || 0
    },
    current: {
      temp_c: data.current?.temp_c || 0,
      temp_f: data.current?.temp_f || 0,
      condition: {
        text: data.current?.condition?.text || 'Unknown',
        icon: data.current?.condition?.icon || '',
        code: data.current?.condition?.code || 0
      },
      wind_kph: data.current?.wind_kph || 0,
      wind_dir: data.current?.wind_dir || 'N',
      humidity: data.current?.humidity || 0,
      feelslike_c: data.current?.feelslike_c || 0,
      feelslike_f: data.current?.feelslike_f || 0,
      uv: data.current?.uv || 0
    },
    forecast: data.forecast ? {
      forecastday: data.forecast.forecastday.map((day: any) => ({
        date: day.date,
        day: {
          maxtemp_c: day.day.maxtemp_c,
          mintemp_c: day.day.mintemp_c,
          condition: {
            text: day.day.condition.text,
            icon: day.day.condition.icon
          },
          daily_chance_of_rain: day.day.daily_chance_of_rain
        }
      }))
    } : undefined,
    alerts: data.alerts ? {
      alert: data.alerts.alert.map((alert: any) => ({
        headline: alert.headline,
        severity: alert.severity,
        urgency: alert.urgency,
        areas: alert.areas,
        desc: alert.desc,
        effective: alert.effective,
        expires: alert.expires
      }))
    } : undefined
  };
};

/**
 * Get map URL for a location
 * @param lat - Latitude
 * @param lon - Longitude
 * @param zoom - Zoom level (1-18)
 * @param type - Map type (e.g., 'precipitation', 'temp', 'wind')
 * @returns Map URL string
 */
export const getWeatherMapUrl = (lat: number, lon: number, zoom: number = 10, type: string = 'precipitation'): string => {
  // TODO: Implement weather map URL generation
  // This will depend on the specific mapping service you choose
  
  // Example placeholder implementation using OpenWeatherMap (you'll need a separate API key):
  // return `https://tile.openweathermap.org/map/${type}/${zoom}/${lat}/${lon}.png?appid=${API_KEY}`;
  
  // For now, return a placeholder:
  return `https://placekitten.com/500/300?lat=${lat}&lon=${lon}&zoom=${zoom}&type=${type}`;
};

/**
 * Cache weather data in localStorage
 * @param key - Cache key
 * @param data - Data to cache
 * @param expirationMinutes - Cache expiration in minutes
 */
export const cacheWeatherData = (key: string, data: any, expirationMinutes: number = 30): void => {
  const now = new Date();
  const item = {
    data,
    expiry: now.getTime() + expirationMinutes * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Get cached weather data from localStorage
 * @param key - Cache key
 * @returns Cached data or null if expired/not found
 */
export const getCachedWeatherData = (key: string): any | null => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  
  const item = JSON.parse(itemStr);
  const now = new Date();
  
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  
  return item.data;
}; 