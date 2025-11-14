import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const ShopPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Sample products data
  const products = Array(12).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Fresh Organic Product ${index + 1}`,
    price: 35.00,
    oldPrice: 42.00,
    images: ['product1.png', 'product2.png'],
    rating: 4,
    badge: index % 3 === 0 ? 'Sale' : index % 3 === 1 ? 'New' : null
  }));

  const topRatedProducts = [
    { id: 1, name: 'Green-surface', price: 42.00, oldPrice: 48.00, rating: 4, images: ['small-product2.png', 'small-product3.png'] },
    { id: 2, name: 'Fresh-whole', price: 55.00, oldPrice: 62.00, rating: 4, images: ['small-product7.png', 'small-product6.png'] },
    { id: 3, name: 'Organic Banana', price: 38.00, oldPrice: 45.00, rating: 5, images: ['small-product4.png', 'small-product5.png'] },
  ];

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  return (
    <>
      <Preloader />
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
              <button className="widget__filter--btn d-flex d-lg-none align-items-center" data-offcanvas>
                <svg className="widget__filter--btn__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28" d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"/>
                  <circle cx="336" cy="128" r="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28"/>
                  <circle cx="176" cy="256" r="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28"/>
                  <circle cx="336" cy="384" r="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28"/>
                </svg> 
                <span className="widget__filter--btn__text">Filter</span>
              </button>
              <div className="product__view--mode d-flex align-items-center">
                <div className="product__view--mode__list product__short--by align-items-center d-lg-flex d-none">
                  <label className="product__view--label">Prev Page :</label>
                  <div className="select shop__header--select">
                    <select className="product__view--select">
                      <option value="1">65</option>
                      <option value="2">40</option>
                      <option value="3">42</option>
                      <option value="4">57</option>
                      <option value="5">60</option>
                    </select>
                  </div>
                </div>
                <div className="product__view--mode__list product__short--by align-items-center d-none d-lg-flex">
                  <label className="product__view--label">Sort By :</label>
                  <div className="select shop__header--select">
                    <select className="product__view--select">
                      <option value="1">Sort by latest</option>
                      <option value="2">Sort by popularity</option>
                      <option value="3">Sort by newness</option>
                      <option value="4">Sort by rating</option>
                    </select>
                  </div>
                </div>
                <div className="product__view--mode__list">
                  <div className="product__tab--one product__grid--column__buttons d-flex justify-content-center">
                    <button className="product__grid--column__buttons--icons active" aria-label="grid btn" data-toggle="tab" data-target="#product_grid">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 9 9">
                        <g transform="translate(-1360 -479)">
                          <rect id="Rectangle_5725" data-name="Rectangle 5725" width="4" height="4" transform="translate(1360 479)" fill="currentColor"/>
                          <rect id="Rectangle_5727" data-name="Rectangle 5727" width="4" height="4" transform="translate(1360 484)" fill="currentColor"/>
                          <rect id="Rectangle_5726" data-name="Rectangle 5726" width="4" height="4" transform="translate(1365 479)" fill="currentColor"/>
                          <rect id="Rectangle_5728" data-name="Rectangle 5728" width="4" height="4" transform="translate(1365 484)" fill="currentColor"/>
                        </g>
                      </svg>
                    </button>
                    <button className="product__grid--column__buttons--icons" aria-label="list btn" data-toggle="tab" data-target="#product_list">
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
                  <form className="product__view--search__form" action="#">
                    <label>
                      <input className="product__view--search__input border-0" placeholder="Search by" type="text" />
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
              <p className="product__showing--count">Showing 1–9 of 21 results</p>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-4">
                <div className="shop__sidebar--widget widget__area d-none d-lg-block">
                  {/* Categories Widget */}
                  <div className="single__widget widget__bg">
                    <h2 className="widget__title h3">Categories</h2>
                    <ul className="widget__categories--menu">
                      <li className="widget__categories--menu__list">
                        <label className="widget__categories--menu__label d-flex align-items-center" onClick={() => toggleCategory(0)}>
                          <img className="widget__categories--menu__img" src="/assets/img/product/categories11.png" alt="categories-img" />
                          <span className="widget__categories--menu__text">Fresh Vegetables</span>
                          <svg className="widget__categories--menu__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394">
                            <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"/>
                          </svg>
                        </label>
                        {expandedCategory === 0 && (
                          <ul className="widget__categories--sub__menu">
                            <li className="widget__categories--sub__menu--list">
                              <Link className="widget__categories--sub__menu--link d-flex align-items-center" to="/shop">
                                <img className="widget__categories--sub__menu--img" src="/assets/img/product/categories12.png" alt="categories-img" />
                                <span className="widget__categories--sub__menu--text">Discount Weekly</span>
                              </Link>
                            </li>
                            <li className="widget__categories--sub__menu--list">
                              <Link className="widget__categories--sub__menu--link d-flex align-items-center" to="/shop">
                                <img className="widget__categories--sub__menu--img" src="/assets/img/product/categories15.png" alt="categories-img" />
                                <span className="widget__categories--sub__menu--text">Green dhaniya</span>
                              </Link>
                            </li>
                            <li className="widget__categories--sub__menu--list">
                              <Link className="widget__categories--sub__menu--link d-flex align-items-center" to="/shop">
                                <img className="widget__categories--sub__menu--img" src="/assets/img/product/categories14.png" alt="categories-img" />
                                <span className="widget__categories--sub__menu--text">Fresh Nuts</span>
                              </Link>
                            </li>
                            <li className="widget__categories--sub__menu--list">
                              <Link className="widget__categories--sub__menu--link d-flex align-items-center" to="/shop">
                                <img className="widget__categories--sub__menu--img" src="/assets/img/product/categories13.png" alt="categories-img" />
                                <span className="widget__categories--sub__menu--text">Milk Cream</span>
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className="widget__categories--menu__list">
                        <label className="widget__categories--menu__label d-flex align-items-center" onClick={() => toggleCategory(1)}>
                          <img className="widget__categories--menu__img" src="/assets/img/product/categories12.png" alt="categories-img" />
                          <span className="widget__categories--menu__text">Fresh mushroom</span>
                          <svg className="widget__categories--menu__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394">
                            <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"/>
                          </svg>
                        </label>
                        {expandedCategory === 1 && (
                          <ul className="widget__categories--sub__menu">
                            <li className="widget__categories--sub__menu--list">
                              <Link className="widget__categories--sub__menu--link d-flex align-items-center" to="/shop">
                                <img className="widget__categories--sub__menu--img" src="/assets/img/product/categories12.png" alt="categories-img" />
                                <span className="widget__categories--sub__menu--text">Discount Weekly</span>
                              </Link>
                            </li>
                            <li className="widget__categories--sub__menu--list">
                              <Link className="widget__categories--sub__menu--link d-flex align-items-center" to="/shop">
                                <img className="widget__categories--sub__menu--img" src="/assets/img/product/categories15.png" alt="categories-img" />
                                <span className="widget__categories--sub__menu--text">Green dhaniya</span>
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className="widget__categories--menu__list">
                        <label className="widget__categories--menu__label d-flex align-items-center" onClick={() => toggleCategory(2)}>
                          <img className="widget__categories--menu__img" src="/assets/img/product/categories13.png" alt="categories-img" />
                          <span className="widget__categories--menu__text">Grocery Items</span>
                          <svg className="widget__categories--menu__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394">
                            <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"/>
                          </svg>
                        </label>
                      </li>
                      <li className="widget__categories--menu__list">
                        <label className="widget__categories--menu__label d-flex align-items-center" onClick={() => toggleCategory(3)}>
                          <img className="widget__categories--menu__img" src="/assets/img/product/categories14.png" alt="categories-img" />
                          <span className="widget__categories--menu__text">Organic Foods</span>
                          <svg className="widget__categories--menu__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394">
                            <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"/>
                          </svg>
                        </label>
                      </li>
                      <li className="widget__categories--menu__list">
                        <label className="widget__categories--menu__label d-flex align-items-center" onClick={() => toggleCategory(4)}>
                          <img className="widget__categories--menu__img" src="/assets/img/product/categories15.png" alt="categories-img" />
                          <span className="widget__categories--menu__text">Dairy Products</span>
                          <svg className="widget__categories--menu__arrowdown--icon" xmlns="http://www.w3.org/2000/svg" width="12.355" height="8.394">
                            <path d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z" transform="translate(-6 -8.59)" fill="currentColor"/>
                          </svg>
                        </label>
                      </li>
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
                    <form className="price__filter--form" action="#"> 
                      <div className="price__filter--form__inner mb-15 d-flex align-items-center">
                        <div className="price__filter--group">
                          <label className="price__filter--label" htmlFor="Filter-Price-GTE2">From</label>
                          <div className="price__filter--input border-radius-5 d-flex align-items-center">
                            <span className="price__filter--currency">$</span>
                            <input className="price__filter--input__field border-0" name="filter.v.price.gte" id="Filter-Price-GTE2" type="number" placeholder="0" min="0" max="250.00" />
                          </div>
                        </div>
                        <div className="price__divider">
                          <span>-</span>
                        </div>
                        <div className="price__filter--group">
                          <label className="price__filter--label" htmlFor="Filter-Price-LTE2">To</label>
                          <div className="price__filter--input border-radius-5 d-flex align-items-center">
                            <span className="price__filter--currency">$</span>
                            <input className="price__filter--input__field border-0" name="filter.v.price.lte" id="Filter-Price-LTE2" type="number" min="0" placeholder="250.00" max="250.00" /> 
                          </div>	
                        </div>
                      </div>
                      <button className="btn price__filter--btn" type="submit">Filter</button>
                    </form>
                  </div>

                  {/* Top Rated Products Widget */}
                  <div className="single__widget widget__bg">
                    <h2 className="widget__title h3">Top Rated Product</h2>
                    <div className="product__grid--inner">
                      {topRatedProducts.map((product) => (
                        <div key={product.id} className="product__grid--items d-flex align-items-center">
                          <div className="product__grid--items--thumbnail">
                            <Link className="product__items--link" to={`/product/${product.id}`}>
                              <img className="product__grid--items__img product__primary--img" src={`/assets/img/product/${product.images[0]}`} alt="product-img" />
                              <img className="product__grid--items__img product__secondary--img" src={`/assets/img/product/${product.images[1]}`} alt="product-img" />
                            </Link>
                          </div>
                          <div className="product__grid--items--content">
                            <h3 className="product__grid--items--content__title h4">
                              <Link to={`/product/${product.id}`}>{product.name}</Link>
                            </h3>
                            <div className="product__items--price">
                              <span className="current__price">${product.price.toFixed(2)}</span>
                              <span className="old__price">${product.oldPrice.toFixed(2)}</span>
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
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="shop__product--wrapper">
                  <div className="tab_content">
                    <div id="product_grid" className="tab_pane active show">
                      <div className="product__section--inner product__grid--inner">
                        <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-3 row-cols-md-3 row-cols-2 mb--n30">
                          {products.map((product) => (
                            <div key={product.id} className="col mb-30">
                              <ProductCard product={product} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pagination__area">
                    <nav className="pagination__wrapper" aria-label="pagination">
                      <ul className="pagination justify-content-center">
                        <li className="pagination__list">
                          <a href="#" className="pagination__item--arrow  link ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22.51" height="20.443" viewBox="0 0 512 512">
                              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/>
                            </svg>
                            <span className="visually-hidden">pagination arrow</span>
                          </a>
                        </li>
                        <li className="pagination__list">
                          <span className="pagination__item pagination__item--current">1</span>
                        </li>
                        <li className="pagination__list">
                          <a href="#" className="pagination__item link">2</a>
                        </li>
                        <li className="pagination__list">
                          <a href="#" className="pagination__item link">3</a>
                        </li>
                        <li className="pagination__list">
                          <a href="#" className="pagination__item link">4</a>
                        </li>
                        <li className="pagination__list">
                          <a href="#" className="pagination__item--arrow  link ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22.51" height="20.443" viewBox="0 0 512 512">
                              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M268 112l144 144-144 144M392 256H100"/>
                            </svg>
                            <span className="visually-hidden">pagination arrow</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ShippingInfo />
      </main>

      <Footer />
    </>
  );
};

export default ShopPage;
