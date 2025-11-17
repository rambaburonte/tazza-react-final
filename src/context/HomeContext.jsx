import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_CONFIG, API_ENDPOINTS } from '../config/apiConfig';

const HomeContext = createContext();

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHome must be used within a HomeProvider');
  }
  return context;
};

export const HomeProvider = ({ children }) => {
  const [homeData, setHomeData] = useState({
    categories: [],
    topProducts: [],
    inOffers: [],
    homeProducts: [],
    cityInfo: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(() => {
    try {
      return localStorage.getItem('home_initialized') === '1';
    } catch (e) {
      return false;
    }
  });

  // Persist initialized flag to localStorage so reloads don't refetch unnecessarily
  useEffect(() => {
    try {
      localStorage.setItem('home_initialized', initialized ? '1' : '0');
    } catch (e) {
      // ignore storage errors
    }
  }, [initialized]);


  return (
    <HomeContext.Provider value={{ homeData, loading, error, setHomeData, setLoading, setError, initialized, setInitialized }}>
      {children}
    </HomeContext.Provider>
  );
};