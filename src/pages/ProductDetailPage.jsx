import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('/assets/img/product/big-product1.jpg');
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    name: 'Red-tomato-isolated',
    price: 58.00,
    oldPrice: 68.00,
    rating: 4,
    reviews: 24,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit is. Deserunt totam dolores ea numquam labore! Illum magnam totam tenetur fuga quo dolor.',
    stock: 'In Stock',
    sku: 'TOM-001',
    category: 'Vegetables',
    images: [
      '/assets/img/product/big-product1.jpg',
      '/assets/img/product/big-product2.jpg',
      '/assets/img/product/big-product3.jpg',
      '/assets/img/product/big-product4.jpg',
      '/assets/img/product/big-product5.jpg',
      '/assets/img/product/big-product6.jpg'
    ],
    thumbnails: [
      '/assets/img/product/small-product6.png',
      '/assets/img/product/small-product1.png',
      '/assets/img/product/small-product2.png',
      '/assets/img/product/small-product4.png',
      '/assets/img/product/small-product5.png',
      '/assets/img/product/small-product3.png'
    ]
  };

  return (
    <>
      <Preloader />
      <Header />

      <main className="main__content_wrapper">
        <Breadcrumb title="Product Details" items={[{ label: 'Home', href: '/' }, { label: 'Product Details' }]} />

        <section className="product__details--section section--padding">
          <div className="container">
            <div className="row row-cols-lg-2 row-cols-md-2">
              <div className="col">
                <div className="product__details--media">
                  <div className="product__media--preview swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="product__media--preview__items">
                          <a className="product__media--preview__items--link glightbox" data-gallery="product-media-preview" href="/assets/img/product/big-product1.jpg">
                            <img className="product__media--preview__items--img" src={selectedImage} alt="product-media-img" />
                          </a>
                          <div className="product__media--view__icon">
                            <a className="product__media--view__icon--link glightbox" href="/assets/img/product/big-product1.jpg" data-gallery="product-media-preview">
                              <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" width="22.51" height="22.443" viewBox="0 0 512 512">
                                <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path>
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448"></path>
                              </svg>
                              <span className="visually-hidden">product view</span>
                            </a>
                          </div>
                          <div className="product__media--view__icon media__play">
                            <a className="media__play--icon__link glightbox" data-gallery="video" href="https://vimeo.com/115041822">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" width="35.51" height="35.443" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="visually-hidden">play</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product__media--nav swiper">
                    <div className="swiper-wrapper">
                      {product.thumbnails.map((thumbnail, index) => (
                        <div key={index} className="swiper-slide">
                          <div className="product__media--nav__items">
                            <img
                              className="product__media--nav__items--img"
                              src={thumbnail}
                              alt="product-nav-img"
                              onClick={() => setSelectedImage(product.images[index])}
                              style={{ cursor: 'pointer' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="swiper__nav--btn swiper-button-next"></div>
                    <div className="swiper__nav--btn swiper-button-prev"></div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="product__details--info">
                  <form action="#">
                    <h2 className="product__details--info__title mb-15">{product.name}</h2>
                    <div className="product__details--info__price mb-12">
                      <span className="current__price">${product.price.toFixed(2)}</span>
                      <span className="old__price">${product.oldPrice.toFixed(2)}</span>
                    </div>
                    <div className="product__items--rating d-flex align-items-center mb-12">
                      <ul className="d-flex">
                        <li className="product__items--rating__list">
                          <span className="product__items--rating__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                              <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                            </svg>
                          </span>
                        </li>
                        <li className="product__items--rating__list">
                          <span className="product__items--rating__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                              <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                            </svg>
                          </span>
                        </li>
                        <li className="product__items--rating__list">
                          <span className="product__items--rating__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                              <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                            </svg>
                          </span>
                        </li>
                        <li className="product__items--rating__list">
                          <span className="product__items--rating__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                              <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                            </svg>
                          </span>
                        </li>
                        <li className="product__items--rating__list">
                          <span className="product__items--rating__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                              <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="#c7c5c2"/>
                            </svg>
                          </span>
                        </li>
                      </ul>
                      <span className="product__items--rating__count--number">({product.reviews})</span>
                    </div>
                    <p className="product__details--info__desc mb-10">{product.description}</p>
                    <div className="product__variant">
                      <div className="product__variant--list mb-10">
                        <fieldset className="variant__input--fieldset">
                          <legend className="product__variant--title mb-8">Color :</legend>
                          <div className="variant__color d-flex">
                            <div className="variant__color--list">
                              <input id="color-red1" name="color" type="radio" defaultChecked />
                              <label className="variant__color--value red" htmlFor="color-red1" title="Red">
                                <img className="variant__color--value__img" src="/assets/img/product/product1.png" alt="variant-color-img" />
                              </label>
                            </div>
                            <div className="variant__color--list">
                              <input id="color-red2" name="color" type="radio" />
                              <label className="variant__color--value red" htmlFor="color-red2" title="Black">
                                <img className="variant__color--value__img" src="/assets/img/product/product2.png" alt="variant-color-img" />
                              </label>
                            </div>
                            <div className="variant__color--list">
                              <input id="color-red3" name="color" type="radio" />
                              <label className="variant__color--value red" htmlFor="color-red3" title="Pink">
                                <img className="variant__color--value__img" src="/assets/img/product/product3.png" alt="variant-color-img" />
                              </label>
                            </div>
                            <div className="variant__color--list">
                              <input id="color-red4" name="color" type="radio" />
                              <label className="variant__color--value red" htmlFor="color-red4" title="Orange">
                                <img className="variant__color--value__img" src="/assets/img/product/product4.png" alt="variant-color-img" />
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div className="product__variant--list mb-15">
                        <fieldset className="variant__input--fieldset">
                          <legend className="product__variant--title mb-8">Weight :</legend>
                          <ul className="variant__size d-flex">
                            <li className="variant__size--list">
                              <input id="weight1" name="weight" type="radio" defaultChecked />
                              <label className="variant__size--value red" htmlFor="weight1">5 kg</label>
                            </li>
                            <li className="variant__size--list">
                              <input id="weight2" name="weight" type="radio" />
                              <label className="variant__size--value red" htmlFor="weight2">3 kg</label>
                            </li>
                            <li className="variant__size--list">
                              <input id="weight3" name="weight" type="radio" />
                              <label className="variant__size--value red" htmlFor="weight3">2 kg</label>
                            </li>
                          </ul>
                        </fieldset>
                      </div>
                      <div className="quickview__variant--list quantity d-flex align-items-center mb-10">
                        <div className="quantity__box">
                          <button
                            type="button"
                            className="quantity__value quickview__value--quantity decrease"
                            aria-label="quantity value"
                            value="Decrease Value"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            -
                          </button>
                          <label>
                            <input
                              type="number"
                              className="quantity__number quickview__value--number"
                              value={quantity}
                              data-counter
                              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                          </label>
                          <button
                            type="button"
                            className="quantity__value quickview__value--quantity increase"
                            aria-label="quantity value"
                            value="Increase Value"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button className="btn quickview__cart--btn" type="submit">Add To Cart</button>
                      </div>
                      <div className="quickview__variant--list variant__wishlist mb-10">
                        <a className="variant__wishlist--icon" href="#" title="Add to wishlist">
                          <svg className="quickview__variant--wishlist__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                          </svg>
                          Add to Wishlist
                        </a>
                      </div>
                    </div>
                    <div className="quickview__social d-flex align-items-center">
                      <label className="quickview__social--title">Social Share:</label>
                      <ul className="quickview__social--wrapper mt-0 d-flex">
                        <li className="quickview__social--list">
                          <a className="quickview__social--icon" target="_blank" href="https://www.facebook.com">
                            <svg xmlns="http://www.w3.org/2000/svg" width="7.667" height="16.524" viewBox="0 0 7.667 16.524">
                              <path data-name="Path 237" d="M967.495,353.678h-2.3v8.253h-3.437v-8.253H960.13V350.77h1.624v-1.888a4.087,4.087,0,0,1,.264-1.492,2.9,2.9,0,0,1,1.039-1.379,3.626,3.626,0,0,1,2.153-.6l2.549.019v2.833h-1.851a.732.732,0,0,0-.472.151.8.8,0,0,0-.246.642v1.719H967.8Z" transform="translate(-960.13 -345.407)" fill="currentColor"/>
                            </svg>
                            <span className="visually-hidden">Facebook</span>
                          </a>
                        </li>
                        <li className="quickview__social--list">
                          <a className="quickview__social--icon" target="_blank" href="https://twitter.com">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.489" height="13.384" viewBox="0 0 16.489 13.384">
                              <path data-name="Path 303" d="M966.025,1144.2v.433a9.783,9.783,0,0,1-.621,3.388,10.1,10.1,0,0,1-1.845,3.087,9.153,9.153,0,0,1-3.012,2.259,9.825,9.825,0,0,1-4.122.866,9.632,9.632,0,0,1-2.748-.4,9.346,9.346,0,0,1-2.447-1.11q.4.038.809.038a6.723,6.723,0,0,0,2.24-.376,7.022,7.022,0,0,0,1.958-1.054,3.379,3.379,0,0,1-1.958-.687,3.259,3.259,0,0,1-1.186-1.666,3.364,3.364,0,0,0,.621.056,3.488,3.488,0,0,0,.885-.113,3.267,3.267,0,0,1-1.374-.631,3.356,3.356,0,0,1-.969-1.186,3.524,3.524,0,0,1-.367-1.5v-.057a3.172,3.172,0,0,0,1.544.433,3.407,3.407,0,0,1-1.1-1.214,3.308,3.308,0,0,1-.4-1.609,3.362,3.362,0,0,1,.452-1.694,9.652,9.652,0,0,0,6.964,3.538,3.911,3.911,0,0,1-.075-.772,3.293,3.293,0,0,1,.452-1.694,3.409,3.409,0,0,1,1.233-1.233,3.257,3.257,0,0,1,1.685-.461,3.351,3.351,0,0,1,2.466,1.073,6.572,6.572,0,0,0,2.146-.828,3.272,3.272,0,0,1-.574,1.083,3.477,3.477,0,0,1-.913.8,6.869,6.869,0,0,0,1.958-.546A7.074,7.074,0,0,1,966.025,1144.2Z" transform="translate(-951.23 -1140.849)" fill="currentColor"/>
                            </svg>
                            <span className="visually-hidden">Twitter</span>
                          </a>
                        </li>
                        <li className="quickview__social--list">
                          <a className="quickview__social--icon" target="_blank" href="https://www.instagram.com">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.497" height="17.492" viewBox="0 0 19.497 19.492">
                              <path data-name="Icon awesome-instagram" d="M9.747,6.24a5,5,0,1,0,5,5A4.99,4.99,0,0,0,9.747,6.24Zm0,8.247A3.249,3.249,0,1,1,13,11.238a3.255,3.255,0,0,1-3.249,3.249Zm6.368-8.451A1.166,1.166,0,1,1,14.949,4.87,1.163,1.163,0,0,1,16.115,6.036Zm3.31,1.183A5.769,5.769,0,0,0,17.85,3.135,5.807,5.807,0,0,0,13.766,1.56c-1.609-.091-6.433-.091-8.042,0A5.8,5.8,0,0,0,1.64,3.13,5.788,5.788,0,0,0,.065,7.215c-.091,1.609-.091,6.433,0,8.042A5.769,5.769,0,0,0,1.64,19.341a5.814,5.814,0,0,0,4.084,1.575c1.609.091,6.433.091,8.042,0a5.769,5.769,0,0,0,4.084-1.575,5.807,5.807,0,0,0,1.575-4.084c.091-1.609.091-6.429,0-8.038Zm-2.079,9.765a3.289,3.289,0,0,1-1.853,1.853c-1.283.509-4.328.391-5.746.391S5.28,19.341,4,18.837a3.289,3.289,0,0,1-1.853-1.853c-.509-1.283-.391-4.328-.391-5.746s-.113-4.467.391-5.746A3.289,3.289,0,0,1,4,3.639c1.283-.509,4.328-.391,5.746-.391s4.467-.113,5.746.391a3.289,3.289,0,0,1,1.853,1.853c.509,1.283.391,4.328.391,5.746S17.855,15.705,17.346,16.984Z" transform="translate(0.004 -1.492)" fill="currentColor"></path>
                            </svg>
                            <span className="visually-hidden">Instagram</span>
                          </a>
                        </li>
                        <li className="quickview__social--list">
                          <a className="quickview__social--icon" target="_blank" href="https://www.youtube.com">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.49" height="11.582" viewBox="0 0 16.49 11.582">
                              <path data-name="Path 321" d="M967.759,1365.592q0,1.377-.019,1.717-.076,1.114-.151,1.622a3.981,3.981,0,0,1-.245.925,1.847,1.847,0,0,1-.453.717,2.171,2.171,0,0,1-1.151.6q-3.585.265-7.641.189-2.377-.038-3.387-.085a11.337,11.337,0,0,1-1.5-.142,2.206,2.206,0,0,1-1.113-.585,2.562,2.562,0,0,1-.528-1.037,3.523,3.523,0,0,1-.141-.585c-.032-.2-.06-.5-.085-.906a38.894,38.894,0,0,1,0-4.867l.113-.925a4.382,4.382,0,0,1,.208-.906,2.069,2.069,0,0,1,.491-.755,2.409,2.409,0,0,1,1.113-.566,19.2,19.2,0,0,1,2.292-.151q1.82-.056,3.953-.056t3.952.066q1.821.067,2.311.142a2.3,2.3,0,0,1,.726.283,1.865,1.865,0,0,1,.557.49,3.425,3.425,0,0,1,.434,1.019,5.72,5.72,0,0,1,.189,1.075q0,.095.057,1C967.752,1364.1,967.759,1364.677,967.759,1365.592Zm-7.6.925q1.49-.754,2.113-1.094l-4.434-2.339v4.66Q958.609,1367.311,960.156,1366.517Z" transform="translate(-951.269 -1359.8)" fill="currentColor"/>
                            </svg>
                            <span className="visually-hidden">Youtube</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="product__details--tab__section section--padding pt-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="product__details--tab__inner">
                  <div className="product__details--tab__btn d-flex mb-30">
                    <button
                      className={`product__details--tab__btn--items ${activeTab === 'description' ? 'active' : ''}`}
                      onClick={() => setActiveTab('description')}
                      type="button"
                    >
                      Description
                    </button>
                    <button
                      className={`product__details--tab__btn--items ${activeTab === 'reviews' ? 'active' : ''}`}
                      onClick={() => setActiveTab('reviews')}
                      type="button"
                    >
                      Reviews ({product.reviews})
                    </button>
                  </div>
                  <div className="product__details--tab__content">
                    {activeTab === 'description' && (
                      <div className="product__details--tab__content--step">
                        <h3 className="product__details--content__title mb-15">Product Description</h3>
                        <p className="product__details--content__desc mb-15">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit is. Deserunt totam dolores ea numquam labore! Illum magnam totam tenetur fuga quo dolor.
                        </p>
                        <p className="product__details--content__desc mb-15">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit is. Deserunt totam dolores ea numquam labore! Illum magnam totam tenetur fuga quo dolor.
                        </p>
                        <p className="product__details--content__desc mb-15">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit is. Deserunt totam dolores ea numquam labore! Illum magnam totam tenetur fuga quo dolor.
                        </p>
                        <ul className="product__details--info__list">
                          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit is.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit is.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit is.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit is.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit is.</li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="product__details--tab__content--step">
                        <h3 className="product__details--content__title mb-20">Customer Reviews</h3>
                        <div className="reviews__comment--list mb-30">
                          <div className="reviews__comment--items">
                            <div className="reviews__comment--thumbnail">
                              <img src="/assets/img/other/comment-thumb1.png" alt="comment-thumb" />
                            </div>
                            <div className="reviews__comment--content">
                              <div className="reviews__comment--top d-flex justify-content-between">
                                <div className="reviews__comment--top__left">
                                  <h4 className="reviews__comment--content__title">John Doe</h4>
                                  <span className="reviews__comment--content__date">March 30, 2025</span>
                                </div>
                                <div className="reviews__comment--top__right">
                                  <ul className="d-flex">
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="#c7c5c2"/>
                                        </svg>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <p className="reviews__comment--content__desc">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit is. Deserunt totam dolores ea numquam labore! Illum magnam totam tenetur fuga quo dolor.
                              </p>
                            </div>
                          </div>
                          <div className="reviews__comment--items">
                            <div className="reviews__comment--thumbnail">
                              <img src="/assets/img/other/comment-thumb2.png" alt="comment-thumb" />
                            </div>
                            <div className="reviews__comment--content">
                              <div className="reviews__comment--top d-flex justify-content-between">
                                <div className="reviews__comment--top__left">
                                  <h4 className="reviews__comment--content__title">Jane Smith</h4>
                                  <span className="reviews__comment--content__date">March 25, 2025</span>
                                </div>
                                <div className="reviews__comment--top__right">
                                  <ul className="d-flex">
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                                        </svg>
                                      </span>
                                    </li>
                                    <li className="reviews__comment--rating__list">
                                      <span className="product__items--rating__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16.105" height="14.732" viewBox="0 0 10.105 9.732">
                                          <path data-name="star - Copy" d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z" transform="translate(0 -0.018)" fill="currentColor"/>
                                        </svg>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <p className="reviews__comment--content__desc">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit is. Deserunt totam dolores ea numquam labore! Illum magnam totam tenetur fuga quo dolor.
                              </p>
                            </div>
                          </div>
                        </div>
                        <h3 className="product__details--content__title mb-15">Add a Review</h3>
                        <form className="reviews__comment--reply__form">
                          <div className="row">
                            <div className="col-12 mb-15">
                              <textarea className="reviews__comment--reply__textarea" placeholder="Your Comment"></textarea>
                            </div>
                            <div className="col-lg-6 col-md-6 mb-15">
                              <input className="reviews__comment--reply__input" placeholder="Your Name" type="text" />
                            </div>
                            <div className="col-lg-6 col-md-6 mb-15">
                              <input className="reviews__comment--reply__input" placeholder="Your Email" type="email" />
                            </div>
                          </div>
                          <button className="reviews__comment--btn btn" type="submit">Submit Review</button>
                        </form>
                      </div>
                    )}
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

export default ProductDetailPage;
