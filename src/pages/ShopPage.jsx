import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_CONFIG } from '../config/apiConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCategories } from '../context/CategoriesContext';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
 
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const ShopPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isClearing, setIsClearing] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showSidebar, setShowSidebar] = useState(false); // For mobile filter toggle
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize searchTerm from router state `q` or query param `q` when landing on /shop
  // Include `location.state` in dependencies so clearing router state updates the input.
  useEffect(() => {
    // Prefer router state `q` over query string for initialization
    const qFromState = location.state && Object.prototype.hasOwnProperty.call(location.state, 'q') ? location.state.q : null;
    const params = new URLSearchParams(location.search);
    const q = qFromState ?? params.get('q') ?? '';
    if (q !== searchTerm) {
      setSearchTerm(q);
    }
  }, [location.search, location.state]);
  
  
  const { 
    categories, 
    loading: loadingCategories
    // error - not used in this component
  } = useCategories();
  const { 
    products, 
    loading: loadingProducts,
    // storeInfo - not used in this component
    currentPage,
    totalProducts,
    productsPerPage,
    selectedCategory,
    selectedSubcategory,
    loadMoreProducts,
    goToPage,
    filterByCategory,
    clearCategoryFilter
  } = useProducts();
  const { addToCart } = useCart();

  // Read `category`, optional `catName`, and optional `subcategory` from query string and apply filters when landing
  useEffect(() => {
    // Prefer location.state (navigation state) for filters; fall back to querystring for backward compatibility
    const state = location.state || {};
    const params = new URLSearchParams(location.search);
    const category = state.category ?? params.get('category');
    const catName = state.catName ?? (params.get('catName') || '');
    const subcategory = state.subcategory ?? params.get('subcategory');
    const subName = state.subName ?? (params.get('subName') || '');

    if (category) {
      const catNum = Number(category);
      const subNum = subcategory ? Number(subcategory) : null;

      // Only reapply filter if it differs from current selected values
      if (subNum != null) {
        if (Number(selectedCategory) !== catNum || Number(selectedSubcategory) !== subNum) {
          filterByCategory(catNum, subNum);
        }
      } else {
        if (!selectedCategory || Number(selectedCategory) !== catNum) {
          filterByCategory(catNum);
        }
      }

      // Only set the search input when an explicit search query (`q`) exists
      // in router state or query params. Do not populate the search box with
      // the category/subcategory name when user navigates via categories.
      const qFromState = state.q ?? params.get('q');
      if (qFromState && !searchTerm) {
        setSearchTerm(qFromState);
      }
    }
  }, [location.search, location.state, selectedCategory, selectedSubcategory, searchTerm, filterByCategory]);

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  // Prevent handling of rapid consecutive clicks (double-clicks)
  const lastCategoryClickRef = useRef(0);

  // Submit search: navigate to /shop with router state (do not use query string)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    try {
      const baseState = location.state ? { ...location.state } : {};
      if (searchTerm && searchTerm.trim()) {
        baseState.q = searchTerm.trim();
      } else {
        delete baseState.q;
      }
      navigate('/shop', { state: baseState });
    } catch (err) {
      // fallback: do nothing
    }
  };

  // Sort products based on selected criteria
  const sortProducts = (products, sortBy) => {
    const sorted = [...products];
    switch (sortBy) {
      case 'latest':
        // Sort by highest id (latest products first)
        return sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
      case 'discount':
        // Sort by highest discount percentage (as number)
        return sorted.sort((a, b) => (parseFloat(b.discount || 0)) - (parseFloat(a.discount || 0)));
      case 'newness':
        return sorted.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'price_low':
        return sorted.sort((a, b) => (parseFloat(a.sell_price || a.price || 0)) - (parseFloat(b.sell_price || b.price || 0)));
      case 'price_high':
        return sorted.sort((a, b) => (parseFloat(b.sell_price || b.price || 0)) - (parseFloat(a.sell_price || a.price || 0)));
      default:
        return sorted;
    }
  };

  // Filter products by price range
  const filterByPrice = (products, minPrice, maxPrice) => {
    if (!minPrice && !maxPrice) return products;
    
    return products.filter(product => {
      const price = parseFloat(product.sell_price || product.price || 0);
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return price >= min && price <= max;
    });
  };


  // Filter products by selected category and subcategory (client-side)
  const filterByCategoryAndSubcategory = (products, categoryId, subcategoryId) => {
    // If neither category nor subcategory provided, return original list
    if (categoryId == null && subcategoryId == null) return products;

    return products.filter(product => {
      // Coerce product fields and filter params to numbers for reliable comparison
      const prodCate = product.cate_id != null ? Number(product.cate_id) : null;
      const prodSub = product.sub_cate_id != null ? Number(product.sub_cate_id) : null;
      const catFilter = categoryId != null ? Number(categoryId) : null;
      const subFilter = subcategoryId != null ? Number(subcategoryId) : null;

      const matchesCategory = catFilter != null ? prodCate === catFilter : true;
      const matchesSubcategory = subFilter != null ? prodSub === subFilter : true;
      return matchesCategory && matchesSubcategory;
    });
  };

  // Search filter
  const filterBySearch = (products, search) => {
    if (!search.trim()) return products;
    const lower = search.trim().toLowerCase();
    return products.filter(product =>
      (product.name && product.name.toLowerCase().includes(lower)) ||
      (product.description && product.description.toLowerCase().includes(lower))
    );
  };

  // Convert selectedCategory and selectedSubcategory to numbers for comparison
  const selectedCategoryNum = selectedCategory ? Number(selectedCategory) : null;
  const selectedSubcategoryNum = selectedSubcategory ? Number(selectedSubcategory) : null;

  // Apply all filters: category, subcategory, price, search, and sorting
  let filteredProducts = filterBySearch(
    filterByPrice(
      filterByCategoryAndSubcategory(products, selectedCategoryNum, selectedSubcategoryNum),
      priceRange.min,
      priceRange.max
    ),
    searchTerm
  );
  const processedProducts = sortBy ? sortProducts(filteredProducts, sortBy) : filteredProducts;

  // Get top rated products for sidebar (top 3 by rating)
  const topRatedProducts = products
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  return (
    <>
      <style>
        {`
          .widget__categories--menu__label.expanded .widget__categories--menu__arrowdown--icon {
            transform: rotate(180deg);
            transition: transform 0.3s ease;
          }
          
          .widget__categories--menu__arrowdown--icon {
            transition: transform 0.3s ease;
            margin-left: auto;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              max-height: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              max-height: 500px;
              transform: translateY(0);
            }
          }
          
          .widget__categories--sub__menu {
            list-style: none;
            padding: 0;
            margin: 0;
            background-color: #f8f9fa;
            border-radius: 6px;
            margin-top: 5px;
            overflow: hidden;
          }
          
          .widget__categories--sub__menu--list {
            border-bottom: 1px solid #e9ecef;
          }
          
          .widget__categories--sub__menu--list:last-child {
            border-bottom: none;
          }
          
          .widget__categories--menu__label.selected {
            background-color: #f8f9fa;
            border-radius: 4px;
            font-weight: 600;
          }
          
          .widget__categories--sub__menu--link.selected {
            background-color: #e9ecef !important;
            color: #495057 !important;
            font-weight: 600;
          }
          
          .widget__categories--menu__label.selected .widget__categories--menu__text {
            color: #007bff;
          }
          
          .widget__categories--sub__menu--link.selected .widget__categories--sub__menu--text {
            color: #007bff;
          }
          
          /* Pagination arrow button styles */
          .pagination__item--arrow {
            background: none !important;
            border: none !important;
            box-shadow: none !important;
            padding: 8px 12px;
            border-radius: 0 !important;
          }
          
          .pagination__item--arrow:hover {
            background: rgba(0, 123, 255, 0.1) !important;
          }
          
          .pagination__item--arrow:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .sidebar__overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
          
          .sidebar__close--btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: #333;
            font-size: 24px;
            cursor: pointer;
            z-index: 1000;
          }
          
          /* List view image standardization */
          .shop__product--list__img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
          }
          
          /* List view item container styling */
          .shop__product--list__items {
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            background: #fff;
            transition: box-shadow 0.3s ease;
          }
          
          .shop__product--list__items:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          
          /* Thumbnail container */
          .shop__product--list__thumb {
            flex-shrink: 0;
            margin-right: 20px;
          }
          
          /* Content area */
          .shop__product--list__content {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          /* Content top section */
          .shop__product--list__content--top {
            margin-bottom: 15px;
          }
          
          /* Tag styling */
          .shop__product--list__tag {
            background: #28a745;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }
          
          /* Action buttons */
          .shop__product--list__action {
            gap: 10px;
          }
          
          .shop__product--list__action--btn {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          
          .shop__product--list__action--btn:hover {
            background: #007bff;
            border-color: #007bff;
            color: white;
          }
          
          /* Title styling */
          .shop__product--list__title {
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: 600;
          }
          
          .shop__product--list__title a {
            color: #333;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          .shop__product--list__title a:hover {
            color: #007bff;
          }
          
          /* Price styling */
          .shop__product--list__price {
            margin-bottom: 15px;
            gap: 10px;
          }
          
          .shop__product--list__price--current {
            font-size: 20px;
            font-weight: 700;
            color: #007bff;
          }
          
          .shop__product--list__price--old {
            font-size: 16px;
            color: #6c757d;
            text-decoration: line-through;
          }
          
          /* Description styling */
          .shop__product--list__desc {
            color: #6c757d;
            line-height: 1.6;
            margin-bottom: 20px;
            flex: 1;
          }
          
          /* Key features styling */
          .shop__product--list__features {
            color: #495057;
            line-height: 1.5;
            margin-bottom: 10px;
            font-size: 14px;
          }
          
          .shop__product--list__features strong {
            color: #007bff;
            font-weight: 600;
          }
          
          /* Disclaimer styling */
          .shop__product--list__disclaimer {
            color: #6c757d;
            line-height: 1.4;
            margin-bottom: 15px;
            font-size: 13px;
            font-style: italic;
            border-left: 3px solid #ffc107;
            padding-left: 10px;
            background-color: #fff3cd;
            padding: 8px 12px;
            border-radius: 4px;
          }
          
          /* Bottom section */
          .shop__product--list__bottom {
            margin-top: auto;
          }
          
          /* Cart button styling */
          .shop__product--list__cart--btn .btn {
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: 600;
            transition: background 0.3s ease;
          }
          
          .shop__product--list__cart--btn .btn:hover {
            background: #218838;
          }
          
          /* Rating styling */
          .shop__product--list__rating {
            gap: 2px;
            margin-right: 8px;
          }
          
          .shop__product--list__review--text {
            color: #6c757d;
            font-size: 14px;
          }
        `}
      </style>
      
      <Header />

      <main className="main__content_wrapper">
        <Breadcrumb 
          title="Shop Left Sidebar"
          items={[
            { label: 'Home', url: '/' },
            { label: 'Shop Left Sidebar' }
          ]}
        />

        <section className="shop__section section--padding">
          <div className="container-fluid">
            <div className="shop__header bg__gray--color d-flex align-items-center justify-content-between mb-30">
              <button className="widget__filter--btn d-flex d-lg-none align-items-center" onClick={() => setShowSidebar(!showSidebar)}>
                <svg className="widget__filter--btn__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28" d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"/>
                  <circle cx="336" cy="128" r="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28"/>
                  <circle cx="176" cy="256" r="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28"/>
                  <circle cx="336" cy="384" r="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28"/>
                </svg> 
                <span className="widget__filter--btn__text">Filter</span>
              </button>
              <div className="product__view--mode d-flex align-items-center">
                {/* Removed Prev Page label and dropdown */}
                <div className="product__view--mode__list product__short--by align-items-center d-none d-lg-flex">
                  <label className="product__view--label">Sort By :</label>
                  <div className="select shop__header--select">
                    <select 
                      className="product__view--select"
                      value={sortBy || ''}
                      onChange={(e) => setSortBy(e.target.value || null)}
                    >
                      <option value="" disabled hidden>Sort</option>
                      <option value="latest">Sort by latest</option>
                      <option value="discount">Sort by discount</option>
                      <option value="newness">Sort by newness</option>
                      <option value="rating">Sort by rating</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
                <div className="product__view--mode__list">
                  <div className="product__tab--one product__grid--column__buttons d-flex justify-content-center">
                    <button 
                      className={`product__grid--column__buttons--icons ${viewMode === 'grid' ? 'active' : ''}`} 
                      aria-label="grid btn" 
                      onClick={() => setViewMode('grid')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 9 9">
                        <g transform="translate(-1360 -479)">
                          <rect id="Rectangle_5725" data-name="Rectangle 5725" width="4" height="4" transform="translate(1360 479)" fill="currentColor"/>
                          <rect id="Rectangle_5727" data-name="Rectangle 5727" width="4" height="4" transform="translate(1360 484)" fill="currentColor"/>
                          <rect id="Rectangle_5726" data-name="Rectangle 5726" width="4" height="4" transform="translate(1365 479)" fill="currentColor"/>
                          <rect id="Rectangle_5728" data-name="Rectangle 5728" width="4" height="4" transform="translate(1365 484)" fill="currentColor"/>
                        </g>
                      </svg>
                    </button>
                    <button 
                      className={`product__grid--column__buttons--icons ${viewMode === 'list' ? 'active' : ''}`} 
                      aria-label="list btn" 
                      onClick={() => setViewMode('list')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 13 8">
                        <g id="Group_14700" data-name="Group 14700" transform="translate(-1376 -478)">
                          <g transform="translate(12 -2)">
                            <g id="Group_1326" data-name="Group 1326">
                              <rect id="Rectangle_5729" data-name="Rectangle 5729" width="3" height="2" transform="translate(1364 483)" fill="currentColor"/>
                              <rect id="Rectangle_5730" data-name="Rectangle 5730" width="9" height="2" transform="translate(1368 483)" fill="currentColor"/>
                            </g>
                            <g id="Group_1328" data-name="Group 1328" transform="translate(0 -3)">
                              <rect id="Rectangle_5729-2" data-name="Rectangle 5729" width="3" height="2" transform="translate(1364 483)" fill="currentColor"/>
                              <rect id="Rectangle_5730-2" data-name="Rectangle 5730" width="9" height="2" transform="translate(1368 483)" fill="currentColor"/>
                            </g>
                            <g id="Group_1327" data-name="Group 1327" transform="translate(0 -1)">
                              <rect id="Rectangle_5731" data-name="Rectangle 5731" width="3" height="2" transform="translate(1364 487)" fill="currentColor"/>
                              <rect id="Rectangle_5732" data-name="Rectangle 5732" width="9" height="2" transform="translate(1368 487)" fill="currentColor"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="product__view--mode__list product__view--search d-xl-block d-none">
                  <form className="product__view--search__form" onSubmit={handleSearchSubmit}>
                    <label>
                      <input
                        className="product__view--search__input border-0"
                        placeholder="Search by name or description"
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </label>
                    <button className="product__view--search__btn" aria-label="search btn" type="submit">
                      <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" width="22.51" height="20.443" viewBox="0 0 512 512">
                        <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              <p className="product__showing--count">
                Showing {processedProducts.length > 0 ? ((currentPage - 1) * productsPerPage) + 1 : 0}–{Math.min(currentPage * productsPerPage, processedProducts.length)} of {processedProducts.length} results
              </p>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-4">
                {showSidebar && <div className="sidebar__overlay" onClick={() => setShowSidebar(false)}></div>}
                <div className={`shop__sidebar--widget widget__area ${showSidebar ? 'd-block position-relative' : 'd-none d-lg-block'}`}>
                  {showSidebar && (
                    <button className="sidebar__close--btn d-lg-none" onClick={() => setShowSidebar(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368"/>
                      </svg>
                    </button>
                  )}
                  {/* Categories Widget */}
                  <div className="single__widget widget__bg">
                    <h2 className="widget__title h3">Categories</h2>
                    {(selectedCategory || selectedSubcategory || priceRange.min || priceRange.max || searchTerm) && !isClearing && (
                      <div 
                        className="btn btn-sm btn-outline-secondary mb-3"
                        style={{ fontSize: '12px', cursor: 'pointer' }}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsClearing(true); // hide immediately
                          // First, navigate to a clean /shop path
                          try {
                            navigate('/shop', { replace: true, state: {} });
                          } catch (err) {
                            // ignore navigation errors
                          }
                          // Then clear context filters and UI after a short delay
                          setTimeout(() => {
                            clearCategoryFilter();
                            setPriceRange({ min: '', max: '' });
                            setSearchTerm('');
                            setIsClearing(false);
                          }, 50);
                        }}
                        onDoubleClick={(e) => e.preventDefault()}
                      >
                        Clear Filters
                      </div>
                    )}
                    <ul className="widget__categories--menu">
                      {loadingCategories ? (
                        <li className="widget__categories--menu__list">
                          <span className="widget__categories--menu__text">Loading categories...</span>
                        </li>
                      ) : categories.length === 0 ? (
                        <li className="widget__categories--menu__list">
                          <span className="widget__categories--menu__text">No categories available</span>
                        </li>
                      ) : (
                        categories.map((cat, index) => (
                          <li key={cat.id} className="widget__categories--menu__list">
                            <label 
                              className={`widget__categories--menu__label d-flex align-items-center ${expandedCategory === index ? 'expanded' : ''} ${selectedCategory === cat.id ? 'selected' : ''}`} 
                              onClick={(e) => {
                                const now = Date.now();
                                if (now - lastCategoryClickRef.current < 400) {
                                  // Too soon after previous click - treat as double-click and ignore
                                  e.preventDefault();
                                  return;
                                }
                                lastCategoryClickRef.current = now;

                                // If category has subcategories, toggle dropdown
                                if (cat.subCates && cat.subCates.length > 0) {
                                  toggleCategory(index);
                                } else {
                                  // If no subcategories, filter directly by category and update URL
                                  filterByCategory(cat.id);
                                  setExpandedCategory(null); // Close any open dropdowns
                                  try {
                                    navigate('/shop', { state: { category: cat.id, catName: cat.name } });
                                  } catch (e) {
                                    // ignore navigation errors
                                  }
                                }
                              }}
                              onDoubleClick={(e) => { e.preventDefault(); }}
                              style={{ 
                                cursor: 'pointer',
                                userSelect: 'none'
                              }}
                            >
                              <img className="widget__categories--menu__img" src={API_CONFIG.IMAGE_URL + cat.cover} alt="categories-img" onError={(e) => { e.target.src = '/assets/img/category/default.png'; }} />
                              <span className="widget__categories--menu__text">{cat.name}</span>
                              {cat.subCates && cat.subCates.length > 0 && (
                                <svg 
                                  className={`widget__categories--menu__arrowdown--icon ${expandedCategory === index ? 'rotated' : ''}`} 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="12.355" 
                                  height="8.394"
                                >
                                  <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"/>
                                </svg>
                              )}
                            </label>
                            {expandedCategory === index && cat.subCates && cat.subCates.length > 0 && (
                              <ul 
                                className="widget__categories--sub__menu show" 
                                style={{
                                  display: 'block',
                                  paddingLeft: '20px',
                                  marginTop: '5px',
                                  animation: 'slideDown 0.3s ease-out'
                                }}
                              >
                                {cat.subCates.map(sub => (
                                  <li key={sub.id} className="widget__categories--sub__menu--list">
                                    <div 
                                      className={`widget__categories--sub__menu--link d-flex align-items-center ${selectedSubcategory === sub.id ? 'selected' : ''}`} 
                                      onClick={(e) => {
                                        const now = Date.now();
                                        if (now - lastCategoryClickRef.current < 400) {
                                          e.preventDefault();
                                          return;
                                        }
                                        lastCategoryClickRef.current = now;

                                        // Apply filter and navigate with both category and subcategory in URL
                                        filterByCategory(cat.id, sub.id); // Pass both category and subcategory IDs
                                        try {
                                          navigate('/shop', { state: { category: cat.id, catName: cat.name, subcategory: sub.id, subName: sub.name } });
                                        } catch (e) {
                                          // ignore navigation errors
                                        }
                                      }}
                                      onDoubleClick={(e) => { e.preventDefault(); }}
                                      style={{
                                        padding: '8px 12px',
                                        textDecoration: 'none',
                                        color: '#666',
                                        borderRadius: '4px',
                                        transition: 'all 0.2s ease',
                                        cursor: 'pointer'
                                      }}
                                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                      <img 
                                        className="widget__categories--sub__menu--img" 
                                        src={API_CONFIG.IMAGE_URL + sub.cover} 
                                        alt="categories-img" 
                                        onError={(e) => { e.target.src = '/assets/img/category/default.png'; }}
                                        style={{ width: '20px', height: '20px', marginRight: '8px', borderRadius: '3px' }}
                                      />
                                      <span className="widget__categories--sub__menu--text">{sub.name}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  {/* Dietary Needs Widget */}
                  <div className="single__widget widget__bg">
                    <h2 className="widget__title h3">Dietary Needs</h2>
                    <ul className="widget__form--check">
                      <li className="widget__form--check__list">
                        <label className="widget__form--check__label" htmlFor="check1">Organic Food</label>
                        <input className="widget__form--check__input" id="check1" type="checkbox" />
                        <span className="widget__form--checkmark"></span>
                      </li>
                      <li className="widget__form--check__list">
                        <label className="widget__form--check__label" htmlFor="check2">Breakfast Item</label>
                        <input className="widget__form--check__input" id="check2" type="checkbox" />
                        <span className="widget__form--checkmark"></span>
                      </li>
                      <li className="widget__form--check__list">
                        <label className="widget__form--check__label" htmlFor="check3">Green Vegetables</label>
                        <input className="widget__form--check__input" id="check3" type="checkbox" />
                        <span className="widget__form--checkmark"></span>
                      </li>
                      <li className="widget__form--check__list">
                        <label className="widget__form--check__label" htmlFor="check4">Grocery Items</label>
                        <input className="widget__form--check__input" id="check4" type="checkbox" />
                        <span className="widget__form--checkmark"></span>
                      </li>
                      <li className="widget__form--check__list">
                        <label className="widget__form--check__label" htmlFor="check5">Baking material</label>
                        <input className="widget__form--check__input" id="check5" type="checkbox" />
                        <span className="widget__form--checkmark"></span>
                      </li>
                    </ul>
                  </div>

                  {/* Price Filter Widget */}
                  <div className="single__widget price__filter widget__bg">
                    <h2 className="widget__title h3">Filter By Price</h2>
                    <form className="price__filter--form" onSubmit={(e) => {
                      e.preventDefault();
                      // Price filtering is applied automatically when state changes
                    }}> 
                      <div className="price__filter--form__inner mb-15 d-flex align-items-center">
                        <div className="price__filter--group">
                          <label className="price__filter--label" htmlFor="Filter-Price-GTE2">From</label>
                          <div className="price__filter--input border-radius-5 d-flex align-items-center">
                            <span className="price__filter--currency">$</span>
                            <input 
                              className="price__filter--input__field border-0" 
                              name="filter.v.price.gte" 
                              id="Filter-Price-GTE2" 
                              type="number" 
                              placeholder="0" 
                              min="0" 
                              max="250.00"
                              value={priceRange.min}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="price__divider">
                          <span>-</span>
                        </div>
                        <div className="price__filter--group">
                          <label className="price__filter--label" htmlFor="Filter-Price-LTE2">To</label>
                          <div className="price__filter--input border-radius-5 d-flex align-items-center">
                            <span className="price__filter--currency">$</span>
                            <input 
                              className="price__filter--input__field border-0" 
                              name="filter.v.price.lte" 
                              id="Filter-Price-LTE2" 
                              type="number" 
                              min="0" 
                              placeholder="250.00" 
                              max="250.00"
                              value={priceRange.max}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                            /> 
                          </div>	
                        </div>
                      </div>
                      <button className="btn price__filter--btn" type="submit">Apply Filter</button>
                    </form>
                  </div>

                  {/* Top Rated Products Widget */}
                  <div className="single__widget widget__bg">
                    <h2 className="widget__title h3">Top Rated Product</h2>
                    <div className="product__grid--inner">
                      {topRatedProducts.map((product) => {
                        const price = parseFloat(product.sell_price || product.price || 0);
                        const oldPrice = parseFloat(product.price || 0);
                        
                        // Parse images array from API response (it's a JSON string or array)
                        let parsedImages = [];
                        try {
                          if (product.images && typeof product.images === 'string') {
                            parsedImages = JSON.parse(product.images).filter(img => img && img.trim() !== '');
                          } else if (Array.isArray(product.images)) {
                            parsedImages = product.images.filter(img => img && img.trim() !== '');
                          }
                        } catch (e) {
                          console.warn('Failed to parse product images:', e);
                        }
                        
                        // Process images - if they already have full URLs, use as is, otherwise add API_CONFIG.IMAGE_URL
                        const processedImages = parsedImages.map(img => {
                          return img.startsWith('http') ? img : `${API_CONFIG.IMAGE_URL}${img}`;
                        });
                        
                        // If no valid images, try to use cover image
                        const images = processedImages.length > 0 
                          ? processedImages
                          : [product.cover ? (product.cover.startsWith('http') ? product.cover : `${API_CONFIG.IMAGE_URL}${product.cover}`) : '/assets/img/product/default.png'];
                        
                        return (
                          <div key={product.id} className="product__grid--items d-flex align-items-center">
                            <div className="product__grid--items--thumbnail">
                              <Link className="product__items--link" to={`/product/${product.id}`}>
                                <img className="product__grid--items__img product__primary--img" src={images[0]} alt="product-img" onError={(e) => { e.target.src = '/assets/img/product/default.png'; }} />
                                {images[1] && <img className="product__grid--items__img product__secondary--img" src={images[1]} alt="product-img" />}
                              </Link>
                            </div>
                            <div className="product__grid--items--content">
                              <h3 className="product__grid--items--content__title h4">
                                <Link to={`/product/${product.id}`}>{product.name}</Link>
                              </h3>
                              <div className="product__items--price">
                                <span className="current__price">${price.toFixed(2)}</span>
                                {oldPrice > price && (
                                  <span className="old__price">${oldPrice.toFixed(2)}</span>
                                )}
                              </div>
                              <div className="product__items--rating d-flex align-items-center">
                                <ul className="d-flex">
                                  {[...Array(5)].map((_, i) => (
                                    <li key={i} className="product__items--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10.105" height="9.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill={i < product.rating ? "currentColor" : "#c7c5c2"} />
                                        </svg>
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                                <span className="product__items--rating__count--number">(24)</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="shop__product--wrapper">
                  <div className="tab_content">
                    {viewMode === 'grid' ? (
                      <div id="product_grid" className="tab_pane active show">
                        <div className="product__section--inner product__grid--inner">
                          <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-3 row-cols-md-3 row-cols-2 mb--n30">
                            {loadingProducts ? (
                              // Loading skeleton
                              Array.from({ length: 8 }, (_, index) => (
                                <div key={index} className="col mb-30">
                                  <div className="product__items">
                                    <div className="product__items--thumbnail">
                                      <div className="skeleton" style={{ height: '200px', backgroundColor: '#f0f0f0' }}></div>
                                    </div>
                                    <div className="product__items--content text-center">
                                      <div className="skeleton" style={{ height: '20px', marginBottom: '10px', backgroundColor: '#f0f0f0' }}></div>
                                      <div className="skeleton" style={{ height: '16px', width: '60%', margin: '0 auto', backgroundColor: '#f0f0f0' }}></div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : processedProducts.length === 0 ? (
                              <div className="col-12 text-center">
                                <p>No products found matching your criteria.</p>
                              </div>
                            ) : (
                              processedProducts
                                .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                                .map((product) => (
                                  <div key={product.id} className="col mb-30">
                                    <ProductCard product={product} />
                                  </div>
                                ))
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div id="product_list" className="tab_pane active show">
                        <div className="product__section--inner product__list--inner">
                          {loadingProducts ? (
                            // Loading skeleton for list view
                            Array.from({ length: 4 }, (_, index) => (
                              <div key={index} className="product__list--items d-flex">
                                <div className="product__list--items--thumbnail">
                                  <div className="skeleton" style={{ width: '200px', height: '200px', backgroundColor: '#f0f0f0' }}></div>
                                </div>
                                <div className="product__list--items--content">
                                  <div className="skeleton" style={{ height: '24px', width: '60%', marginBottom: '10px', backgroundColor: '#f0f0f0' }}></div>
                                  <div className="skeleton" style={{ height: '16px', width: '40%', marginBottom: '15px', backgroundColor: '#f0f0f0' }}></div>
                                  <div className="skeleton" style={{ height: '16px', width: '80%', backgroundColor: '#f0f0f0' }}></div>
                                </div>
                              </div>
                            ))
                          ) : processedProducts.length === 0 ? (
                            <div className="text-center">
                              <p>No products found matching your criteria.</p>
                            </div>
                          ) : (
                            processedProducts
                              .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                              .map((product) => {
                                const price = parseFloat(product.sell_price || product.price || 0);
                                const oldPrice = parseFloat(product.price || 0);
                                
                                // Parse images array from API response (it's a JSON string or array)
                                let parsedImages = [];
                                try {
                                  if (product.images && typeof product.images === 'string') {
                                    parsedImages = JSON.parse(product.images).filter(img => img && img.trim() !== '');
                                  } else if (Array.isArray(product.images)) {
                                    parsedImages = product.images.filter(img => img && img.trim() !== '');
                                  }
                                } catch (e) {
                                  console.warn('Failed to parse product images:', e);
                                }
                                
                                // Process images - if they already have full URLs, use as is, otherwise add API_CONFIG.IMAGE_URL
                                const processedImages = parsedImages.map(img => {
                                  return img.startsWith('http') ? img : `${API_CONFIG.IMAGE_URL}${img}`;
                                });
                                
                                // If no valid images, try to use cover image
                                const images = processedImages.length > 0 
                                  ? processedImages
                                  : [product.cover ? (product.cover.startsWith('http') ? product.cover : `${API_CONFIG.IMAGE_URL}${product.cover}`) : '/assets/img/product/default.png'];
                                
                                return (
                                  <div key={product.id} className="shop__product--list__items product__list--items d-flex">
                                    <div className="shop__product--list__thumb">
                                      <Link className="shop__product--list__link" to={`/product/${product.id}`}>
                                        <img className="shop__product--list__img" src={images[0]} alt="product-img" onError={(e) => { e.target.src = '/assets/img/product/default.png'; }} />
                                      </Link>
                                    </div>
                                    <div className="shop__product--list__content">
                                      <div className="shop__product--list__content--top d-flex justify-content-between">
                                        <div className="shop__product--list__tag--area">
                                          {product.discount && (
                                            <span className="shop__product--list__tag">{product.discount}% OFF</span>
                                          )}
                                        </div>
                                        <ul className="shop__product--list__action d-flex">
                                          <li className="shop__product--list__action--list">
                                            <Link className="shop__product--list__action--btn" to="#" onClick={(e) => e.preventDefault()}>
                                              <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" width="18.51" height="17.443" viewBox="0 0 18.51 17.443">
                                                <path d="M71.775,135.51a5.153,5.153,0,0,1,1.267-1.524,4.986,4.986,0,0,1,6.584.358,4.728,4.728,0,0,1,1.174,4.914,10.458,10.458,0,0,1-2.132,3.808,22.591,22.591,0,0,1-5.4,4.558c-.445.282-.9.549-1.356.812a.306.306,0,0,1-.254.013,25.491,25.491,0,0,1-6.279-4.8,11.648,11.648,0,0,1-2.52-4.009,4.957,4.957,0,0,1,.028-3.787,4.629,4.629,0,0,1,3.744-2.863,4.782,4.782,0,0,1,5.086,2.447c.013.019.025.034.057.076Z" transform="translate(-62.498 -132.915)" fill="currentColor"/>
                                              </svg>
                                              <span className="visually-hidden">Wishlist</span>
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <h3 className="shop__product--list__title">
                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                      </h3>
                                      <div className="shop__product--list__price d-flex align-items-center">
                                        <span className="shop__product--list__price--current">${price.toFixed(2)}</span>
                                        {oldPrice > price && (
                                          <span className="shop__product--list__price--old">${oldPrice.toFixed(2)}</span>
                                        )}
                                      </div>
                                      <p className="shop__product--list__desc">{product.descriptions ? product.descriptions.substring(0, 150) + '...' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</p>
                                      {product.key_features && (
                                        <p className="shop__product--list__features">
                                          <strong>Key Features:</strong> {product.key_features}
                                        </p>
                                      )}
                                      {product.disclaimer && (
                                        <p className="shop__product--list__disclaimer">
                                          <em>Disclaimer:</em> {product.disclaimer}
                                        </p>
                                      )}
                                      <div className="shop__product--list__bottom d-flex align-items-center justify-content-between">
                                        <div className="shop__product--list__cart--btn">
                                          <button 
                                            className="btn btn__add--to--cart" 
                                            onClick={() => addToCart(product)}
                                          >
                                            Add to Cart
                                          </button>
                                        </div>
                                        <div className="shop__product--list__review d-flex align-items-center">
                                          <ul className="d-flex shop__product--list__rating">
                                            {[...Array(5)].map((_, i) => (
                                              <li key={i} className="shop__product--list__rating--list">
                                                <span className="shop__product--list__rating--icon">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="10.105" height="9.732" viewBox="0 0 10.105 9.732">
                                                    <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill={i < product.rating ? "currentColor" : "#c7c5c2"} />
                                                  </svg>
                                                </span>
                                              </li>
                                            ))}
                                          </ul>
                                          <span className="shop__product--list__review--text">({product.rating || 4.9})</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="pagination__area">
                    <nav className="pagination__wrapper" aria-label="pagination">
                      <ul className="pagination justify-content-center">
                        <li className="pagination__list">
                          <button 
                            className="pagination__item--arrow link" 
                            type="button"
                            onClick={() => goToPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22.51" height="20.443" viewBox="0 0 512 512">
                              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/>
                            </svg>
                            <span className="visually-hidden">pagination arrow</span>
                          </button>
                        </li>
                        
                        {/* Page Numbers */}
                        {Array.from({ length: Math.ceil(processedProducts.length / productsPerPage) }, (_, i) => i + 1).map(page => (
                          <li key={page} className="pagination__list">
                            {page === currentPage ? (
                              <span className="pagination__item pagination__item--current">{page}</span>
                            ) : (
                              <button 
                                className="pagination__item link" 
                                type="button"
                                onClick={() => goToPage(page)}
                              >
                                {page}
                              </button>
                            )}
                          </li>
                        ))}
                        
                        <li className="pagination__list">
                          <button 
                            className="pagination__item--arrow link" 
                            type="button"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage >= Math.ceil(processedProducts.length / productsPerPage)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22.51" height="20.443" viewBox="0 0 512 512">
                              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M268 112l144 144-144 144M392 256H100"/>
                            </svg>
                            <span className="visually-hidden">pagination arrow</span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                    
                    {/* Load More Button for additional products */}
                    {processedProducts.length > productsPerPage && (
                      <div className="load-more text-center mt-3">
                        <button 
                          className="btn btn-primary"
                          onClick={loadMoreProducts}
                          disabled={loadingProducts}
                        >
                          {loadingProducts ? 'Loading...' : 'Load More Products'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <ShippingInfo /> removed as per request */}
      </main>

      <Footer />
    </>
  );
};

export default ShopPage;
