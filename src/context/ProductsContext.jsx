import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_CONFIG, API_ENDPOINTS } from '../config/apiConfig';

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [storeInfo, setStoreInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const productsPerPage = 12; // You can adjust this value

  // Always fetch all products for the store, never filter by category/subcategory in API
  const fetchProducts = async (page = 1, limit = 1000) => {
    try {
      setLoading(true);
      const endpoint = API_ENDPOINTS.PRODUCTS.GET_BY_STORE_ID;
      const data = new URLSearchParams({
        id: '2',  // Store ID is always 2
        limit: limit.toString()
      });
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        credentials: 'omit',
        mode: 'cors',
        body: data.toString(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && result.status === 200) {
        setProducts(result.data || []);
        setStoreInfo(result.storeInfo || null);
        setTotalProducts(result.data ? result.data.length : 0);
      } else {
        setProducts([]);
        setStoreInfo(null);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setProducts([]);
      setStoreInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, 1000);
  }, [currentPage]);

  const loadMoreProducts = () => {
    // For client-side pagination, just increment the page
    // The actual pagination logic is handled in the component using processedProducts
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const filterByCategory = (categoryId, subcategoryId = null) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId);
    setCurrentPage(1); // Reset to first page when filtering
    // No API call, filtering is handled in the frontend
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setCurrentPage(1);
  };

  return (
    <ProductsContext.Provider value={{
      products,
      loading,
      error,
      storeInfo,
      currentPage,
      totalProducts,
      productsPerPage,
      selectedCategory,
      selectedSubcategory,
      loadMoreProducts,
      goToPage,
      fetchProducts,
      filterByCategory,
      clearCategoryFilter
    }}>
      {children}
    </ProductsContext.Provider>
  );
};