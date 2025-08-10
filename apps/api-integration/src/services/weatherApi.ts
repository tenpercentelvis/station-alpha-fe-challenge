
export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
      };
    }>;
  };
  alerts?: {
    alert: Array<{
      headline: string;
      severity: string;
      urgency: string;
      areas: string;
      desc: string;
      effective: string;
      expires: string;
    }>;
  };
}

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export interface LocationSuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

const API_KEY = 'acc2b3873d024081bea200337250908';
const BASE_URL = 'https://api.weatherapi.com/v1';

const MAP_API_KEY = 'ad7d64bab93c7dd947831dd5547b91c5';
const MAP_BASE_URL = 'https://tile.openweathermap.org/map';

/**
 * Get current weather data for a location
 * @param location - City name, zip code, or coordinates
 * @returns Promise with weather data
 * ?INFO - This is not used in the app, but is here for future reference
 */
export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
  try {
    const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`);
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    
    const rawData = await response.json();
    const transformedData = transformWeatherData(rawData);
    return transformedData;
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
  // Create cache key from location and days
  const cacheKey = `weather_${location}_${days}`;
  
  // Check cache first
  const cachedData = getCachedWeatherData(cacheKey);
  
  if (cachedData) {
    console.log('Using cached weather data for:', location);
    return cachedData;
  }
  
  try {
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=yes`);
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    
    const rawData = await response.json();
    const transformedData = transformWeatherData(rawData);
    
    // Cache the result
    cacheWeatherData(cacheKey, transformedData);
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

/**
 * Get weather alerts for a location
 * @param location - City name, zip code, or coordinates
 * @returns Promise with weather alerts data
 * ?INFO - This is not used in the app, but is here for future reference
 */
export const getWeatherAlerts = async (location: string): Promise<WeatherData> => {
  try {
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&alerts=yes`);
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    
    const rawData = await response.json();
    const transformedData = transformWeatherData(rawData);
    return transformedData;
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
export const searchLocations = async (query: string): Promise<LocationSuggestion[]> => {
  try {
    if (!query.trim() || query.length < 2) return [];
    
    // Create cache key for search query
    const cacheKey = `search_${query.toLowerCase()}`;
    
    // Check cache
    const cachedData = getCachedWeatherData(cacheKey);

    if (cachedData) {
      console.log('Using cached search results for:', query);
      return cachedData;
    }
    
    const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Location search failed');
    
    const data = await response.json();
    const results = data || [];
    
    // Cache the results
    cacheWeatherData(cacheKey, results);
    
    return results;
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
  // Transform raw API response to ensure consistent data structure with fallback values

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
 * Convert lat/lon to tile coordinates for OpenWeatherMap
 * @param lat - Latitude
 * @param lon - Longitude
 * @param zoom - Zoom level
 * @returns Object with x and y tile coordinates
 */
const latLonToTile = (lat: number, lon: number, zoom: number) => {
  const x = Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
  const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
  return { x, y };
};

/**
 * Get map URL for a location
 * @param lat - Latitude
 * @param lon - Longitude
 * @param zoom - Zoom level (1-18)
 * @param type - Map type (e.g., 'precipitation', 'temp', 'wind')
 * @returns Map URL string
 */
export const getWeatherMapUrl = (lat: number, lon: number, zoom: number = 2, type: string = 'precipitation'): string => {
  const { x, y } = latLonToTile(lat, lon, zoom);
  return `${MAP_BASE_URL}/${type}/${zoom}/${x}/${y}.png?appid=${MAP_API_KEY}`;
};

/**
 * Get base map tile URL for OpenStreetMap
 * @param lat - Latitude
 * @param lon - Longitude
 * @param zoom - Zoom level (1-18)
 * @returns OpenStreetMap tile URL
 */
export const getBaseMapUrl = (lat: number, lon: number, zoom: number = 2): string => {
  const { x, y } = latLonToTile(lat, lon, zoom);
  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
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