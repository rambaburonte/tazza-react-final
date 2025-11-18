import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useCart } from '../context/CartContext';
import { API_CONFIG } from '../config/apiConfig';

const CartPage = () => {
  const cart = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [note, setNote] = useState('');

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    cart.updateQuantity(id, newQuantity);
  };

  const removeItem = (id) => {
    cart.removeItem(id);
  };

  const getItemImage = (item) => {
    if (item.cover && typeof item.cover === 'string' && item.cover.trim()) {
      return item.cover.startsWith('http') ? item.cover : `${API_CONFIG.IMAGE_URL}${item.cover}`;
    }
    return '/assets/img/product/default.png';
  };

  const getItemPrice = (item) => {
    // Use the same pricing logic as cart context
    const discount = parseFloat(item.discount) || 0;
    if (discount > 0) {
      return parseFloat(item.sell_price || item.price || '0');
    } else {
      return parseFloat(item.original_price || item.price || '0');
    }
  };

  const getItemTotal = (item) => {
    return (getItemPrice(item) * item.quantiy).toFixed(2);
  };

  const newProducts = [
    { id: 1, name: 'Fresh Organic Tomatoes', price: 35.00, originalPrice: 40.00, image: 'product1.png', rating: 5 },
    { id: 2, name: 'Fresh Green Cabbage', price: 42.00, originalPrice: 45.00, image: 'product2.png', rating: 4 },
    { id: 3, name: 'Organic Beetroot', price: 28.00, originalPrice: 30.00, image: 'product3.png', rating: 5 },
    { id: 4, name: 'Fresh Red Cabbage', price: 25.00, originalPrice: 28.00, image: 'product4.png', rating: 4 },
    { id: 5, name: 'Fresh Potato', price: 15.00, originalPrice: 18.00, image: 'product5.png', rating: 5 },
    { id: 6, name: 'Organic Carrot', price: 20.00, originalPrice: 22.00, image: 'product6.png', rating: 4 }
  ];

  return (
    <>
      <Header />

      <main className="main__content_wrapper">
        <Breadcrumb title="Shopping Cart" items={[{ label: 'Shopping Cart' }]} />

        <section className="cart__section section--padding">
            <div className="container-fluid">
            <div className="cart__section--inner">
              <h2 className="cart__title mb-40">Shopping Cart</h2>
              <form action="#">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="cart__table">
                      <table className="cart__table--inner">
                        <thead className="cart__table--header">
                            <tr className="cart__table--header__items">
                                <th className="cart__table--header__list">Product</th>
                                <th className="cart__table--header__list">Price</th>
                                <th className="cart__table--header__list">Quantity</th>
                                <th className="cart__table--header__list">Total</th>
                            </tr>
                        </thead>
                        <tbody className="cart__table--body">
                          {cart.cart.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="text-center py-4">
                                Your cart is empty
                              </td>
                            </tr>
                          ) : (
                            cart.cart.map((item) => (
                              <tr key={item.id} className="cart__table--body__items">
                                <td className="cart__table--body__list">
                                  <div className="cart__product d-flex align-items-center">
                                    <button
                                      className="cart__remove--btn"
                                      type="button"
                                      onClick={() => removeItem(item.id)}
                                    >
                                      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px">
                                        <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
                                      </svg>
                                    </button>
                                    <div className="cart__thumbnail">
                                      <img className="border-radius-5" src={getItemImage(item)} alt={item.name} />
                                    </div>
                                    <div className="cart__content">
                                      <h4 className="cart__content--title">
                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                      </h4>
                                      <span className="cart__content--variant">STORE: {item.store_name}</span>
                                      {parseFloat(item.discount) > 0 && (
                                        <span className="cart__content--variant">DISCOUNT: {item.discount}% OFF</span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="cart__table--body__list">
                                  <span className="cart__price">${getItemPrice(item).toFixed(2)}</span>
                                </td>
                                <td className="cart__table--body__list">
                                  <div className="quantity__box">
                                    <button type="button" className="quantity__value quickview__value--quantity decrease" aria-label="quantity value" value="Decrease Value" onClick={() => updateQuantity(item.id, item.quantiy - 1)}>-</button>
                                    <label>
                                      <input type="number" className="quantity__number quickview__value--number" value={item.quantiy} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} data-counter />
                                    </label>
                                    <button type="button" className="quantity__value quickview__value--quantity increase" aria-label="quantity value" value="Increase Value" onClick={() => updateQuantity(item.id, item.quantiy + 1)}>+</button>
                                  </div>
                                </td>
                                <td className="cart__table--body__list">
                                  <span className="cart__price end">${getItemTotal(item)}</span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                      <div className="continue__shopping d-flex justify-content-between">
                        <Link className="continue__shopping--link" to="/shop">Continue shopping</Link>
                        <button className="continue__shopping--clear" type="button">Clear Cart</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="cart__summary border-radius-10">
                      <div className="coupon__code mb-30">
                        <h3 className="coupon__code--title">Coupon</h3>
                        <p className="coupon__code--desc">Enter your coupon code if you have one.</p>
                        <div className="coupon__code--field d-flex">
                          <label>
                            <input className="coupon__code--field__input border-radius-5" placeholder="Coupon code" type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                          </label>
                          <button className="coupon__code--field__btn btn" type="submit">Apply Coupon</button>
                        </div>
                      </div>
                      <div className="cart__note mb-20">
                        <h3 className="cart__note--title">Note</h3>
                        <p className="cart__note--desc">Add special instructions for your seller...</p>
                        <textarea className="cart__note--textarea border-radius-5" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                      </div>
                      <div className="cart__summary--total mb-20">
                        <table className="cart__summary--total__table">
                          <tbody>
                            <tr className="cart__summary--total__list">
                              <td className="cart__summary--total__title text-left">SUBTOTAL</td>
                              <td className="cart__summary--amount text-right">${cart.totalPrice.toFixed(2)}</td>
                            </tr>
                            {cart.discount > 0 && (
                              <tr className="cart__summary--total__list">
                                <td className="cart__summary--total__title text-left">DISCOUNT</td>
                                <td className="cart__summary--amount text-right">-${cart.discount.toFixed(2)}</td>
                              </tr>
                            )}
                            {cart.deliveryPrice > 0 && (
                              <tr className="cart__summary--total__list">
                                <td className="cart__summary--total__title text-left">DELIVERY</td>
                                <td className="cart__summary--amount text-right">${cart.deliveryPrice.toFixed(2)}</td>
                              </tr>
                            )}
                            <tr className="cart__summary--total__list">
                              <td className="cart__summary--total__title text-left">TAX</td>
                              <td className="cart__summary--amount text-right">${(cart.totalPrice * cart.orderTax / 100).toFixed(2)}</td>
                            </tr>
                            <tr className="cart__summary--total__list">
                              <td className="cart__summary--total__title text-left">GRAND TOTAL</td>
                              <td className="cart__summary--amount text-right">${cart.grandTotal.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="cart__summary--footer">
                        <p className="cart__summary--footer__desc">Shipping & taxes calculated at checkout</p>
                        <ul className="d-flex justify-content-between">
                          <li><button className="cart__summary--footer__btn btn cart" type="submit">Update Cart</button></li>
                          <li><Link className="cart__summary--footer__btn btn checkout" to="/checkout">Check Out</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="product__section product__section--style3 section--padding pt-0">
            <div className="container-fluid">
                <div className="section__heading3 mb-40">
                    <h2 className="section__heading3--maintitle">New Products</h2>
                </div>
                <div className="product__section--inner product3__section--inner__padding product__section--style3__inner product__column6--activation swiper">
                    <div className="swiper-wrapper">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            slidesPerView={4}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                480: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                992: { slidesPerView: 4 },
                            }}
                        >
                            {newProducts.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <div className="product__items product__items2">
                                        <div className="product__items--thumbnail">
                                            <Link className="product__items--link" to="/product-detail">
                                                <img className="product__items--img product__primary--img" src={`/assets/img/product/${product.image}`} alt="product-img" />
                                                <img className="product__items--img product__secondary--img" src={`/assets/img/product/${product.image}`} alt="product-img" />
                                            </Link>
                                            <div className="product__badge">
                                                <span className="product__badge--items sale">Sale</span>
                                            </div>
                                            <ul className="product__items--action">
                                                <li className="product__items--action__list">
                                                    <Link className="product__items--action__btn" to="/wishlist">
                                                        <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                                                        </svg>
                                                        <span className="visually-hidden">Wishlist</span>
                                                    </Link>
                                                </li>
                                                <li className="product__items--action__list">
                                                    <button className="product__items--action__btn" data-open="modal1">
                                                        <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/>
                                                        </svg>
                                                        <span className="visually-hidden">Quick View</span>
                                                    </button>
                                                </li>
                                                <li className="product__items--action__list">
                                                    <Link className="product__items--action__btn" to="/compare">
                                                        <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M400 304l48 48-48 48M400 112l48 48-48 48M64 352h85.19a80 80 0 0066.56-35.62L256 256"/>
                                                            <path d="M64 160h85.19a80 80 0 0166.56 35.62l80.5 120.76A80 80 0 00362.81 352H416M416 160h-53.19a80 80 0 00-66.56 35.62L288 208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                                                        </svg>
                                                        <span className="visually-hidden">Compare</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="product__items--content product__items2--content text-center">
                                            <Link className="add__to--cart__btn" to="/cart">+ Add to cart</Link>
                                            <h3 className="product__items--content__title h4">
                                                <Link to="/product-detail">{product.name}</Link>
                                            </h3>
                                            <div className="product__items--price">
                                                <span className="current__price">${product.price.toFixed(2)}</span>
                                                <span className="old__price">${product.originalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="product__items--rating d-flex justify-content-center align-items-center">
                                                <ul className="d-flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <li key={i} className="product__items--rating__list">
                                                            <span className="product__items--rating__icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="10.105" height="9.732" viewBox="0 0 10.105 9.732">
                                                                    <path data-name="star - Copy" d={`M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z`} transform="translate(0 -0.018)" fill={i < product.rating ? "currentColor" : "#c7c5c2"} />
                                                                </svg>
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <span className="product__items--rating__count--number">(24)</span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>

        {/* <div className="brand__logo--section section--padding pt-0">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="brand__logo--section__inner d-flex justify-content-between align-items-center">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="brand__logo--items">
                      <img
                        className="brand__logo--items__thumbnail--img display-block"
                        src={`/assets/img/logo/brand-logo${num}.png`}
                        alt="brand img"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <ShippingInfo />
      </main>

      <Footer />
    </>
  );
};

export default CartPage;
