import React, { useEffect, useState } from 'react';
import { API_CONFIG, API_ENDPOINTS } from '../config/apiConfig';
import { useHome } from '../context/HomeContext';

const Preloader = () => {
  const [loaded, setLoaded] = useState(false);
  const { homeData, setHomeData, setLoading, setError, initialized, setInitialized } = useHome();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.HOME.SEARCH_WITH_GEO}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            lat: '42.457559',
            lng: '-83.205308',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          setHomeData({
            categories: data.data.category || [],
            topProducts: data.data.topProducts || [],
            inOffers: data.data.inOffers || [],
            homeProducts: data.data.homeProducts || [],
            cityInfo: data.data.cityInfo || null,
          });
          setInitialized(true);
        } else {
          throw new Error('Invalid response data');
        }
      } catch (err) {
        console.error('Error fetching home data in preloader:', err);
        setError(err.message);
        setHomeData({
          categories: [],
          topProducts: [],
          inOffers: [],
          homeProducts: [],
          cityInfo: null,
        });
        setInitialized(true);
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };

    // If home data already initialized and contains data, skip fetching again
    const hasData = homeData && (
      (Array.isArray(homeData.categories) && homeData.categories.length > 0) ||
      (Array.isArray(homeData.topProducts) && homeData.topProducts.length > 0) ||
      (Array.isArray(homeData.homeProducts) && homeData.homeProducts.length > 0)
    );

    if (initialized && hasData) {
      // Already initialized and data exists — nothing to do
      // eslint-disable-next-line no-console
      console.debug('Preloader: initialized and homeData present — skipping fetch');
      setLoaded(true);
      setLoading(false);
      return;
    }

    // If initialized but no data (previous fetch may have failed or been cleared), re-run fetch
    if (initialized && !hasData) {
      // eslint-disable-next-line no-console
      console.debug('Preloader: initialized=true but homeData empty — re-fetching');
      fetchHomeData();
      return;
    }

    // Not initialized — do the initial fetch
    // eslint-disable-next-line no-console
    console.debug('Preloader: not initialized — fetching home data');
    fetchHomeData();
  }, [setHomeData, setLoading, setError]);

  return (
    <div id="preloader" className={loaded ? 'loaded' : ''}>
      <div id="ctn-preloader" className="ctn-preloader">
        <div className="animation-preloader">
          <div className="spinner"></div>
          <div className="txt-loading">
            <span data-text-preloader="L" className="letters-loading">L</span>
            <span data-text-preloader="O" className="letters-loading">O</span>
            <span data-text-preloader="A" className="letters-loading">A</span>
            <span data-text-preloader="D" className="letters-loading">D</span>
            <span data-text-preloader="I" className="letters-loading">I</span>
            <span data-text-preloader="N" className="letters-loading">N</span>
            <span data-text-preloader="G" className="letters-loading">G</span>
          </div>
        </div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>
    </div>
  );
};

export default Preloader;
