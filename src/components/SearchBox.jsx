import React, { useState, useEffect, useRef } from 'react';
import { API_CONFIG, API_ENDPOINTS } from '../config/apiConfig';

const SearchBox = ({ isOpen, onClose, stores }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimer = useRef(null);

  const performSearch = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = new URLSearchParams({
        param: query,
        stores: '2'
      });
      console.log('Sending request:', data.toString());
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.PRODUCTS.SEARCH_QUERY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        credentials: 'omit',
        mode: 'cors',
        body: data.toString(),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const text = await response.text();
        console.log('Response text:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response:', result);
      console.log('Search results:', result.data);
      setResults(result.data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      console.log('Calling performSearch with:', searchQuery);
      performSearch(searchQuery);
    }, 500); // 500ms delay

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log('Input changed:', value);
    setSearchQuery(value);
    setLoading(true); // Show loading immediately on typing
  };

  return (
    <div className={`predictive__search--box ${isOpen ? 'active' : ''}`}>
      <div className="predictive__search--box__inner">
        <h2 className="predictive__search--title">Search Products</h2>
        <form className="predictive__search--form">
          <label>
            <input 
              className="predictive__search--input" 
              placeholder="Search Here" 
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </label>
          <button className="predictive__search--button" type="submit" aria-label="search button">
            <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" width="30.51" height="25.443" viewBox="0 0 512 512">
              <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/>
            </svg>
          </button>
        </form>
        <div style={{ marginTop: 16 }}>
          {loading && <div>Loading...</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {results.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {results.map(product => (
                <li key={product.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {product.cover && (
                      <img src={API_CONFIG.IMAGE_URL + product.cover} alt={product.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                    )}
                    <span>{product.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button className="predictive__search--close__btn" aria-label="search close" onClick={onClose}>
        <svg className="predictive__search--close__icon" xmlns="http://www.w3.org/2000/svg" width="40.51" height="30.443" viewBox="0 0 512 512">
          <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368"/>
        </svg>
      </button>
    </div>
  );
};

export default SearchBox;
