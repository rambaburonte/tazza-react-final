import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_CONFIG, API_ENDPOINTS } from '../config/apiConfig';
import { useCategories } from '../context/CategoriesContext';
import CountdownTimer from './CountdownTimer';
import MiniCart from './MiniCart';
import SearchBox from './SearchBox';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const debounceTimer = useRef(null);
  const { categories, loading: loadingCategories, error } = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector('header')?.clientHeight || 0;
      if (window.scrollY > headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle('mobile_menu_open');
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    document.body.classList.toggle('offCanvas__minicart_active');
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    document.body.classList.toggle('predictive__search--box_active');
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    setSearchError(null);
    try {
      const data = new URLSearchParams({
        param: query,
        stores: '2'
      });
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSearchResults(result.data || []);
    } catch (err) {
      console.error('Search error:', err);
      setSearchError('Search failed. Please try again.');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      performSearch(searchQuery);
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      setSearchLoading(true);
    } else {
      setSearchLoading(false);
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = (searchQuery || '').trim();
    if (!q) {
      // If empty, just go to shop without query
      navigate('/shop');
      return;
    }
    // Redirect to shop with query param so ShopPage can pick it up
    navigate(`/shop?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <header className="header__section header__transparent">
        {/* Header Topbar */}
        <div className="header__topbar bg__primary">
          <div className="container">
            <div className="header__topbar--inner d-flex align-items-center justify-content-center">
              <div className="header__shipping">
                <p className="header__shipping--text text-white">
                  <img className="header__shipping--icon" src={'/assets/img/icon/car.png'} alt="header-shipping-img" />
                  Claim your online FREE Delivery or Shipping today! Expires in
                </p>
              </div>
              <CountdownTimer targetDate="Dec 30, 2025 00:00:00" />
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`main__header header__sticky ${isSticky ? 'sticky' : ''}`}>
          <div className="container">
            <div className="main__header--inner position__relative d-flex justify-content-between align-items-center">
              <div className="offcanvas__header--menu__open">
                <button className="offcanvas__header--menu__open--btn" onClick={toggleMobileMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ionicon offcanvas__header--menu__open--svg" viewBox="0 0 512 512">
                    <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 160h352M80 256h352M80 352h352"/>
                  </svg>
                  <span className="visually-hidden">Offcanvas Menu Open</span>
                </button>
              </div>
              
              <div className="main__logo">
                <h1 className="main__logo--title">
                  <Link className="main__logo--link" to="/">
                    <img className="main__logo--img" src="/assets/img/logo/nav-log.png" alt="logo-img" />
                  </Link>
                </h1>
              </div>

              <div className="header__search--widget d-none d-lg-block header__sticky--none">
                <form className="d-flex header__search--form" onSubmit={handleSearchSubmit}>
                  <div className="header__select--categories select">
                    <select className="header__select--inner">
                      <option value="">All Categories</option>
                      {categories && categories.length > 0 && categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="header__search--box" style={{ position: 'relative' }}>
                    <label>
                      <input className="header__search--input" placeholder="Search Products" type="text" value={searchQuery} onChange={handleSearchInputChange} />
                    </label>
                    <button className="header__search--button bg__secondary text-white" type="submit">Search</button>
                    {(searchLoading || searchError || searchResults.length > 0) && (
                      <div className="header__search--results" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', maxWidth: '338px', background: 'white', border: '1px solid #ccc', zIndex: 1000, maxHeight: '300px', overflowY: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                        {searchLoading && <div style={{ padding: '8px 12px', fontSize: '14px' }}>Loading...</div>}
                        {searchError && <div style={{ padding: '8px 12px', color: 'red', fontSize: '14px' }}>{searchError}</div>}
                            {searchResults.length > 0 ? (
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {searchResults.map(product => (
                                  <li key={product.id} style={{ marginBottom: 8, cursor: 'pointer' }} onClick={() => { setSearchQuery(''); setSearchResults([]); navigate(`/product/${product.id}`); }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                      {product.cover && (
                                        <img src={API_CONFIG.IMAGE_URL + product.cover} alt={product.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                                      )}
                                      <span>{product.name}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              // Show no results when search completed and none found
                              !searchLoading && searchQuery.trim() !== '' && (
                                <div style={{ padding: '12px', color: '#666' }}>No results found</div>
                              )
                            )}
                      </div>
                    )}
                  </div>
                </form>
              </div>

              <div className="header__menu d-none d-lg-block header__sticky--block">
                <nav className="header__menu--navigation">
                  <ul className="d-flex">
                    <li className="header__menu--items">
                      <Link className="header__menu--link" to="/">Home</Link>
                    </li>
                    <li className="header__menu--items">
                      <Link className="header__menu--link" to="/season">In Season</Link>
                    </li>
                    <li className="header__menu--items">
                      <Link className="header__menu--link" to="/produce">Fresh Produce</Link>
                    </li>
                    <li className="header__menu--items">
                      <Link className="header__menu--link" to="/shipping">Shipping</Link>
                    </li>
                    <li className="header__menu--items">
                      <Link className="header__menu--link" to="/about">About Us</Link>
                    </li>
                    <li className="header__menu--items">
                      <Link className="header__menu--link" to="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="header__account header__sticky--none">
                <ul className="d-flex">
                  <li className="header__account--items d-none d-lg-block">
                    <Link className="header__account--btn" to="/login">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20.51" height="19.443" viewBox="0 0 512 512">
                        <path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                        <path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                      </svg>
                      <span className="visually-hidden">My account</span>
                    </Link>
                  </li>
                  <li className="header__account--items header__account--search__items mobile__d--block d-sm-2-none">
                    <button className="header__account--btn search__open--btn" onClick={toggleSearch}>
                      <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" width="22.51" height="20.443" viewBox="0 0 512 512">
                        <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/>
                      </svg>
                      <span className="visually-hidden">Search</span>
                    </button>
                  </li>
                  <li className="header__account--items">
                    <button className="header__account--btn minicart__open--btn" onClick={toggleCart}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.706" height="15.534" viewBox="0 0 14.706 13.534">
                        <g transform="translate(0 0)">
                          <g>
                            <path data-name="Path 16787" d="M4.738,472.271h7.814a.434.434,0,0,0,.414-.328l1.723-6.316a.466.466,0,0,0-.071-.4.424.424,0,0,0-.344-.179H3.745L3.437,463.6a.435.435,0,0,0-.421-.353H.431a.451.451,0,0,0,0,.9h2.24c.054.257,1.474,6.946,1.555,7.33a1.36,1.36,0,0,0-.779,1.242,1.326,1.326,0,0,0,1.293,1.354h7.812a.452.452,0,0,0,0-.9H4.74a.451.451,0,0,1,0-.9Zm8.966-6.317-1.477,5.414H5.085l-1.149-5.414Z" transform="translate(0 -463.248)" fill="#fefefe"/>
                            <path data-name="Path 16788" d="M5.5,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,5.5,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,6.793,478.352Z" transform="translate(-1.191 -466.622)" fill="#fefefe"/>
                            <path data-name="Path 16789" d="M13.273,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,13.273,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,14.566,478.352Z" transform="translate(-2.875 -466.622)" fill="#fefefe"/>
                          </g>
                        </g>
                      </svg>
                      <span className="items__count">3</span>
                    </button>
                  </li>
                  <li className="header__account--items d-none d-lg-block">
                    <Link className="header__account--btn" to="/wishlist">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18.541" height="15.557" viewBox="0 0 18.541 15.557">
                        <path d="M71.775,135.51a5.153,5.153,0,0,1,1.267-1.524,4.986,4.986,0,0,1,6.584.358,4.728,4.728,0,0,1,1.174,4.914,10.458,10.458,0,0,1-2.132,3.808,22.591,22.591,0,0,1-5.4,4.558c-.445.282-.9.549-1.356.812a.306.306,0,0,1-.254.013,25.491,25.491,0,0,1-6.279-4.8,11.648,11.648,0,0,1-2.52-4.009,4.957,4.957,0,0,1,.028-3.787,4.629,4.629,0,0,1,3.744-2.863,4.782,4.782,0,0,1,5.086,2.447c.013.019.025.034.057.076Z" transform="translate(-62.498 -132.915)" fill="currentColor"/>
                      </svg>
                      <span className="items__count">3</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Header Bottom (Categories) */}
        <div className="header__bottom bg__secondary">
          <div className="container">
            <div className="header__bottom--inner position__relative d-flex align-items-center">
              <div className="categories__menu">
                <div className="categories__menu--header text-white d-flex align-items-center" onClick={toggleCategories}>
                  <svg className="categories__list--icon" xmlns="http://www.w3.org/2000/svg" width="21.007" height="16.831" viewBox="0 0 21.007 16.831">
                    <path id="listine-dots" d="M20.66,99.786a1.036,1.036,0,0,0-.347-.13H4.227a2.013,2.013,0,0,1,0,3.012q7.988,0,15.976,0h.063a.7.7,0,0,0,.454-.162.9.9,0,0,0,.286-.452v-1.765A.861.861,0,0,0,20.66,99.786ZM3.323,101.162A1.662,1.662,0,1,1,1.662,99.5,1.661,1.661,0,0,1,3.323,101.162Zm16.99,3H4.227a2.013,2.013,0,0,1,0,3.012q7.988,0,15.976,0h.063a.7.7,0,0,0,.454-.164.9.9,0,0,0,.286-.452v-1.765a.861.861,0,0,0-.347-.5A1.082,1.082,0,0,0,20.314,104.161Zm-16.99,1.506a1.662,1.662,0,1,1-1.662-1.662A1.663,1.663,0,0,1,3.323,105.668Zm16.99,3H4.227a2.013,2.013,0,0,1,0,3.012q7.988,0,15.976,0h.063a.7.7,0,0,0,.454-.164.9.9,0,0,0,.286-.45v-1.767a.861.861,0,0,0-.347-.5A1.083,1.083,0,0,0,20.314,108.663Zm-16.99,1.506a1.662,1.662,0,1,1-1.662-1.662A1.663,1.663,0,0,1,3.323,110.169Zm16.99,2.993H4.227a2.013,2.013,0,0,1,0,3.012q7.988,0,15.976,0h.063a.687.687,0,0,0,.454-.162.9.9,0,0,0,.286-.452v-1.765a.861.861,0,0,0-.347-.5A1.035,1.035,0,0,0,20.314,113.163Zm-16.99,1.506a1.662,1.662,0,1,1-1.662-1.662A1.661,1.661,0,0,1,3.323,114.669Z" transform="translate(0 -99.5)" fill="currentColor"/>
                  </svg>
                  <span className="categories__menu--title">All Categories</span>
                  <svg className="categories__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394" viewBox="0 0 10.355 6.394">
                    <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"/>
                  </svg>
                </div>
                <div className={`dropdown__categories--menu ${isCategoriesOpen ? 'active' : ''}`}>
                  <ul className="d-none d-lg-block">
                    {loadingCategories ? (
                      <li className="categories__menu--items">
                        <span className="categories__menu--link">Loading categories...</span>
                      </li>
                    ) : categories.length === 0 ? (
                      <li className="categories__menu--items">
                        <span className="categories__menu--link">No categories available</span>
                      </li>
                    ) : (
                      categories.map(cat => (
                        <li key={cat.id} className="categories__menu--items">
                          <Link className="categories__menu--link" to="#">
                            <svg className="categories__menu--svgicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <ellipse cx="256" cy="256" rx="267.57" ry="173.44" transform="rotate(-45 256 256.002)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M334.04 177.96L177.96 334.04M278.3 278.3l-44.6-44.6M322.89 233.7l-44.59-44.59M456.68 211.4L300.6 55.32M211.4 456.68L55.32 300.6M233.7 322.89l-44.59-44.59"/>
                            </svg> {cat.name}
                            {cat.subCates && cat.subCates.length > 0 && (
                              <svg className="categories__menu--right__arrow--icon" xmlns="http://www.w3.org/2000/svg" width="17.007" height="16.831" viewBox="0 0 512 512">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144"/>
                              </svg>
                            )}
                          </Link>
                          {cat.subCates && cat.subCates.length > 0 && (
                            <ul
                              className="categories__submenu border-radius-10"
                              style={{
                                minWidth: '180px',
                                maxWidth: '240px',
                                background: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {cat.subCates.map(sub => (
                                <li
                                  key={sub.id}
                                  className="categories__menu--items"
                                  style={{
                                    margin: 0,
                                    padding: 0,
                                    listStyle: 'none',
                                  }}
                                >
                                  <Link
                                    className="categories__menu--link"
                                    to="#"
                                    style={{
                                      display: 'block',
                                      width: '100%',
                                      padding: '10px 18px',
                                      textAlign: 'left',
                                      background: '#fff',
                                      border: 'none',
                                      borderRadius: 0,
                                      color: '#222',
                                      fontWeight: 500,
                                      fontSize: '15px',
                                      textDecoration: 'none',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      transition: 'background 0.18s, color 0.18s',
                                    }}
                                    onMouseEnter={e => {
                                      e.currentTarget.style.background = '#f2f2f2';
                                      e.currentTarget.style.color = '#007bff';
                                    }}
                                    onMouseLeave={e => {
                                      e.currentTarget.style.background = '#fff';
                                      e.currentTarget.style.color = '#222';
                                    }}
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))
                    )}
                  </ul>
                  <nav className="category__mobile--menu">
                    <ul className="category__mobile--menu_ul">
                      {loadingCategories ? (
                        <li className="categories__menu--items">
                          <span className="categories__menu--link">Loading categories...</span>
                        </li>
                      ) : categories.length === 0 ? (
                        <li className="categories__menu--items">
                          <span className="categories__menu--link">No categories available</span>
                        </li>
                      ) : (
                        categories.map(cat => (
                          <li key={cat.id} className="categories__menu--items">
                            <Link className="categories__menu--link" to="#">
                              <svg className="categories__menu--svgicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <ellipse cx="256" cy="256" rx="267.57" ry="173.44" transform="rotate(-45 256 256.002)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M334.04 177.96L177.96 334.04M278.3 278.3l-44.6-44.6M322.89 233.7l-44.59-44.59M456.68 211.4L300.6 55.32M211.4 456.68L55.32 300.6M233.7 322.89l-44.59-44.59"/>
                              </svg> {cat.name}
                            </Link>
                            {cat.subCates && cat.subCates.length > 0 && (
                              <ul className="category__sub--menu">
                                {cat.subCates.map(sub => (
                                  <li key={sub.id} className="categories__submenu--items">
                                    <Link className="categories__submenu--items__text" to="#">{sub.name}</Link>
                                    {/* For simplicity, not adding deeper submenus */}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))
                      )}
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="header__right--area d-flex justify-content-between align-items-center">
                <div className="header__menu">
                  <nav className="header__menu--navigation">
                    <ul className="d-flex">
                      <li className="header__menu--items">
                        <Link className="header__menu--link text-white" to="/">Home</Link>
                      </li>
                      <li className="header__menu--items">
                        <Link className="header__menu--link text-white" to="/season">In Season</Link>
                      </li>
                      <li className="header__menu--items">
                        <Link className="header__menu--link text-white" to="/produce">Fresh Produce</Link>
                      </li>
                      <li className="header__menu--items">
                        <Link className="header__menu--link text-white" to="/shipping">Shipping</Link>
                      </li>
                      <li className="header__menu--items">
                        <Link className="header__menu--link text-white" to="/about">About Us</Link>
                      </li>
                      <li className="header__menu--items">
                        <Link className="header__menu--link text-white" to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="suport__contact d-flex align-items-center">
                  <svg className="suport__contact--icon text-white" xmlns="http://www.w3.org/2000/svg" width="36.725" height="36.743" viewBox="0 0 36.725 36.743">
                    <path id="headphone-alt-2" d="M28.893,18.469c-.026-2.873.1-5.754-.761-8.565-1.587-5.21-5.306-7.742-10.781-7.272-4.681.4-7.588,2.715-8.785,7.573a24.031,24.031,0,0,0,.2,13.3,11.447,11.447,0,0,0,6.254,7.253c.658.3,1.091.408,1.595-.356a3.732,3.732,0,0,1,4.38-1.334,3.931,3.931,0,1,1-4.582,5.82,2.989,2.989,0,0,0-1.782-1.466c-4.321-1.573-6.842-4.869-8.367-9.032a1.686,1.686,0,0,0-1.238-1.275,7.046,7.046,0,0,1-3.718-2.447A5.739,5.739,0,0,1,3.242,11.83,5.338,5.338,0,0,0,6.318,7.957C7.644,3.033,11.62.193,16.845.02a19.923,19.923,0,0,1,6.324.544c4.479,1.3,6.783,4.52,7.72,8.881a1.966,1.966,0,0,0,1.389,1.723,6.235,6.235,0,0,1,4.439,6.324,5.211,5.211,0,0,1-1.33,3.27,7.98,7.98,0,0,1-5.449,2.774c-.731.077-1.124-.051-1.069-.952.085-1.367.022-2.745.026-4.115Z" transform="translate(0.006 0.01)" fill="currentColor"/>
                  </svg>
                  <p className="suport__contact--text text-white">
                    <span className="suport__text--24">24/7 Suport</span>
                    <a className="suport__contact--number" href="tel:+1234567890">+1 234 567 890</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`offcanvas__header ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="offcanvas__inner">
            <div className="offcanvas__logo">
              <Link className="offcanvas__logo_link" to="/">
                <img src="/assets/img/logo/nav-log.png" alt="Grocee Logo" width="158" height="36" />
              </Link>
              <button className="offcanvas__close--btn" onClick={toggleMobileMenu}>close</button>
            </div>
            <nav className="offcanvas__menu">
              <ul className="offcanvas__menu_ul">
                <li className="offcanvas__menu_li"><Link className="offcanvas__menu_item" to="/">Home</Link></li>
                <li className="offcanvas__menu_li"><Link className="offcanvas__menu_item" to="/season">In Season</Link></li>
                <li className="offcanvas__menu_li"><Link className="offcanvas__menu_item" to="/produce">Fresh Produce</Link></li>
                <li className="offcanvas__menu_li"><Link className="offcanvas__menu_item" to="/shipping">Shipping</Link></li>
                <li className="offcanvas__menu_li"><Link className="offcanvas__menu_item" to="/about">About Us</Link></li>
                <li className="offcanvas__menu_li"><Link className="offcanvas__menu_item" to="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Mini Cart Component */}
        <MiniCart isOpen={isCartOpen} onClose={toggleCart} />

        {/* Search Box Component */}
        <SearchBox isOpen={isSearchOpen} onClose={toggleSearch} />

      </header>
    </>
  );
};

export default Header;
