import { useState } from 'react';
import { getBaseMapUrl, getWeatherMapUrl, WeatherData } from '../services/weatherApi';

interface WeatherMapProps {
  weatherData: WeatherData;
  onLocationSelect: (lat: number, lon: number) => void;
}

const WeatherMap = ({ weatherData, onLocationSelect }: WeatherMapProps) => {
  const [mapType, setMapType] = useState<string>('precipitation');
  const [zoom, setZoom] = useState<number>(2);
  
  // Get coordinates from weatherData
  const lat = weatherData.location.lat;
  const lon = weatherData.location.lon;
  
  // Generate map URLs
  const mapUrl = getWeatherMapUrl(lat, lon, zoom, mapType);
  const baseMapUrl = getBaseMapUrl(lat, lon, zoom);
  
  const handleMapClick = () => {
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
          <button onClick={() => setZoom(Math.max(zoom - 1, 3))}>-</button>
          <button onClick={() => setZoom(Math.min(zoom + 1, 18))}>+</button>
        </div>
      </div>
      
      <div className="map-container" onClick={handleMapClick}>
        {/* Base map tile */}
        <div className="map-base" style={{
          backgroundImage: `url(${baseMapUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          width: '100%',
          height: '300px'
        }}>
          {/* Weather overlay on top of base map */}
          <img 
            src={mapUrl} 
            alt={`${mapType} overlay for ${weatherData.location.name}`} 
            className="weather-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.7,
              pointerEvents: 'none'
            }}
            onError={(e) => {
              // Hide overlay if it fails to load or is empty
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="map-overlay-info">
            <p className="map-instructions">Click on the map to get weather for a specific location</p>
            <p className="map-location">{weatherData.location.name}, {weatherData.location.country}</p>
          </div>
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