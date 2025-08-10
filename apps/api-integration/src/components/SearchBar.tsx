import { FormEvent, useEffect, useState } from 'react';
import { LocationSuggestion, SearchHistoryItem, searchLocations } from '../services/weatherApi';

interface SearchBarProps {
  onSearch: (location: string) => void;
  searchHistory: SearchHistoryItem[];
  addToSearchHistory: (query: string) => void;
}

const SearchBar = ({ onSearch, searchHistory, addToSearchHistory }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [shouldShowHistory, setShouldShowHistory] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3 || isSelecting) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const results = await searchLocations(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, isSelecting]);

  // Show/hide history based on query length
  useEffect(() => {
    if (query.length === 0 && searchHistory.length > 0 && isFocused && !isSelecting && shouldShowHistory) {
      setShowHistory(true);
    } else if (query.length > 0) {
      setShowHistory(false);
    }
  }, [query, searchHistory.length, isFocused, isSelecting, shouldShowHistory]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      addToSearchHistory(query);
      setShowSuggestions(false);
      setShowHistory(false);
      setSuggestions([]);
      setQuery('');
    }
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    const locationQuery = `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`;
    setIsSelecting(true);
    setShouldShowHistory(false);
    setQuery(locationQuery);
    onSearch(locationQuery);
    addToSearchHistory(locationQuery);
    setShowSuggestions(false);
    setShowHistory(false);
    setSuggestions([]);
    // Clear input and reset the selecting flag after a longer delay
    setTimeout(() => {
      setQuery('');
      setIsSelecting(false);
    }, 500);
  };

  const handleHistoryClick = (historyItem: string) => {
    setIsSelecting(true);
    setShouldShowHistory(false);
    setQuery(historyItem);
    onSearch(historyItem);
    setShowHistory(false);
    setShowSuggestions(false);
    setSuggestions([]);
    // Clear input and reset the selecting flag after a longer delay
    setTimeout(() => {
      setQuery('');
      setIsSelecting(false);
    }, 500);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (query.length >= 3) {
      setShowSuggestions(true);
    }
    if (query.length === 0 && searchHistory.length > 0 && !isSelecting) {
      setShouldShowHistory(true);
      setShowHistory(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding to allow for clicks on suggestions/history
    setTimeout(() => {
      setShowSuggestions(false);
      setShowHistory(false);
      setIsFocused(false);
    }, 200);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search for a city or zip code..."
            className="search-input"
            role="combobox"
            aria-expanded={showSuggestions || showHistory}
            aria-haspopup="listbox"
            aria-autocomplete="list"
          />
          <button type="submit" className="search-button" aria-label="Search for weather information">
            Search
          </button>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && (
          <ul className="suggestions-list" role="listbox" aria-label="Location suggestions">
            {loadingSuggestions && (
              <li className="suggestion-item loading" role="option" aria-selected="false">Searching locations...</li>
            )}
            
            {!loadingSuggestions && suggestions.length === 0 && query.length >= 3 && (
              <li className="suggestion-item no-results" role="option" aria-selected="false">No locations found</li>
            )}
            
            {!loadingSuggestions && suggestions.length > 0 && (
              suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                  role="option"
                  aria-selected="false"
                >
                  <div className="suggestion-name">{suggestion.name}</div>
                  <div className="suggestion-details">
                    {suggestion.region}, {suggestion.country}
                  </div>
                </li>
              ))
            )}
          </ul>
        )}

        {/* Search history dropdown */}
        {showHistory && searchHistory.length > 0 && (
          <div className="search-history" role="region" aria-label="Recent searches">
            <h4>Recent Searches</h4>
              <ul className="history-list" role="list" aria-label="Recent search history">
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleHistoryClick(item.query)}
                    className="history-item"
                    role="listitem"
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