import { useState, useEffect, FormEvent } from 'react';
import { SearchHistoryItem } from '../App';
import { searchLocations } from '../services/weatherApi';

interface SearchBarProps {
  onSearch: (location: string) => void;
  searchHistory: SearchHistoryItem[];
  addToSearchHistory: (query: string) => void;
}

const SearchBar = ({ onSearch, searchHistory, addToSearchHistory }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        // TODO: Implement fetching location suggestions
        // const results = await searchLocations(query);
        // setSuggestions(results);
        
        // Placeholder suggestions for demonstration
        setSuggestions([
          { id: 1, name: 'London, UK' },
          { id: 2, name: 'New York, US' },
          { id: 3, name: 'Tokyo, Japan' },
          { id: 4, name: 'Sydney, Australia' },
          { id: 5, name: 'Paris, France' }
        ].filter(item => item.name.toLowerCase().includes(query.toLowerCase())));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      addToSearchHistory(query);
      setShowSuggestions(false);
      setShowHistory(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    addToSearchHistory(suggestion);
    setShowSuggestions(false);
  };

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);
    onSearch(historyItem);
    setShowHistory(false);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setShowSuggestions(true);
              setShowHistory(searchHistory.length > 0);
            }}
            placeholder="Search for a city or zip code..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.name)}
                className="suggestion-item"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}

        {/* Search history dropdown */}
        {showHistory && searchHistory.length > 0 && (
          <div className="search-history">
            <h4>Recent Searches</h4>
            <ul className="history-list">
              {searchHistory.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleHistoryClick(item.query)}
                  className="history-item"
                >
                  {item.query}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar; 