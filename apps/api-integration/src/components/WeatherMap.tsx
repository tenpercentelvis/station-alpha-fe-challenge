import { useState } from 'react';
import { WeatherData } from '../App';
import { getWeatherMapUrl } from '../services/weatherApi';

interface WeatherMapProps {
  weatherData: WeatherData;
  onLocationSelect: (lat: number, lon: number) => void;
}

const WeatherMap = ({ weatherData, onLocationSelect }: WeatherMapProps) => {
  const [mapType, setMapType] = useState<string>('precipitation');
  const [zoom, setZoom] = useState<number>(10);
  
  // Get coordinates from weatherData
  const lat = weatherData.location.lat;
  const lon = weatherData.location.lon;
  
  // Generate map URL
  const mapUrl = getWeatherMapUrl(lat, lon, zoom, mapType);
  
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // This is a placeholder for map click handling
    // In a real implementation, you would calculate the lat/lon based on the click position
    // For this example, we'll just simulate a click near the center with slight offset
    
    const randomOffset = Math.random() * 0.1 - 0.05; // Random offset between -0.05 and 0.05
    const newLat = lat + randomOffset;
    const newLon = lon + randomOffset;
    
    onLocationSelect(newLat, newLon);
  };
  
  return (
    <div className="weather-map-container">
      <h3>Weather Map</h3>
      
      <div className="map-controls">
        <div className="map-type-selector">
          <button 
            className={mapType === 'precipitation' ? 'active' : ''} 
            onClick={() => setMapType('precipitation')}
          >
            Precipitation
          </button>
          <button 
            className={mapType === 'temp' ? 'active' : ''} 
            onClick={() => setMapType('temp')}
          >
            Temperature
          </button>
          <button 
            className={mapType === 'wind' ? 'active' : ''} 
            onClick={() => setMapType('wind')}
          >
            Wind
          </button>
        </div>
        
        <div className="zoom-controls">
          <button onClick={() => setZoom(Math.min(zoom + 1, 18))}>+</button>
          <button onClick={() => setZoom(Math.max(zoom - 1, 3))}>-</button>
        </div>
      </div>
      
      <div className="map-container" onClick={handleMapClick}>
        {/* This is a placeholder for an actual map implementation */}
        {/* In a real implementation, you would use a mapping library like Leaflet or Google Maps */}
        <img 
          src={mapUrl} 
          alt={`${mapType} map for ${weatherData.location.name}`} 
          className="map-image" 
        />
        <div className="map-overlay">
          <p className="map-instructions">Click on the map to get weather for a specific location</p>
        </div>
      </div>
      
      <div className="map-footer">
        <p>Map showing {mapType} for {weatherData.location.name}, {weatherData.location.country}</p>
        <p className="map-coordinates">Lat: {lat.toFixed(4)}, Lon: {lon.toFixed(4)}</p>
      </div>
    </div>
  );
};

export default WeatherMap; 