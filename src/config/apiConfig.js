/**
 * API Configuration for Taza Tropics Application
 */

export const API_CONFIG = {
  // Taza Tropics API Configuration
  BASE_URL: 'https://api.tazatropics.com/public/api/v1/',
  IMAGE_URL: 'https://api.tazatropics.com/public/storage/images/',
};

export const API_ENDPOINTS = {
  // Categories
  CATEGORIES: {
    GET_HOME: 'category/getHome',
    GET_ALL: 'categories/getAll',
  },
  // Products
  PRODUCTS: {
    SEARCH_QUERY: 'products/searchQuery',
    GET_BY_ID: 'products/getById',
    GET_BY_STORE_ID: 'products/getByStoreId',
    GET_BY_CATEGORY: 'products/getByCategoryId',
    GET_BY_SUBCATEGORY: 'products/getBySubCategoryId',
  },
  // Home
  HOME: {
    SEARCH_WITH_CITY: 'home/searchWithCity',
    SEARCH_WITH_GEO: 'home/searchWithGeoLocation',
    SEARCH_WITH_ZIP: 'home/searchWithZipCode',
  },
  // Cities
  CITIES: {
    GET_ALL: 'cities/getAll',
  },
};

export default API_CONFIG;