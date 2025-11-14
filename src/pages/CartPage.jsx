import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Fresh Organic Tomatoes', price: 35.00, quantity: 1, image: 'product1.png' },
    { id: 2, name: 'Fresh Green Cabbage', price: 42.00, quantity: 2, image: 'product2.png' },
    { id: 3, name: 'Organic Beetroot', price: 28.00, quantity: 1, image: 'product3.png' },
    { id: 4, name: 'Fresh Red Cabbage', price: 25.00, quantity: 1, image: 'product4.png' }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [note, setNote] = useState('');

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10.00;
  const total = subtotal + shipping;

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
      <Preloader />
      <Header />

      <main className="main__content_wrapper">
        <Breadcrumb title="Shopping Cart" items={[{ label: 'Shopping Cart' }]} />

        <section className="cart__section section--padding">
          <div className="container">
            <div className="cart__section--inner">
              <form>
                <h2 className="cart__title mb-40">Shopping Cart</h2>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="cart__table">
                      <table className="cart__table--inner">
                        <thead className="cart__table--header">
                          <tr>
                            <th className="cart__table--header__items">Product</th>
                            <th className="cart__table--header__items">Price</th>
                            <th className="cart__table--header__items">Quantity</th>
                            <th className="cart__table--header__items">Total</th>
                          </tr>
                        </thead>
                        <tbody className="cart__table--body">
                          {cartItems.map((item) => (
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
                                    <img className="border-radius-5" src={`/assets/img/product/${item.image}`} alt={item.name} />
                                  </div>
                                  <div className="cart__content">
                                    <h4 className="cart__content--title">
                                      <Link to="/product-detail">{item.name}</Link>
                                    </h4>
                                  </div>
                                </div>
                              </td>
                              <td className="cart__table--body__list">
                                <span className="cart__price">${item.price.toFixed(2)}</span>
                              </td>
                              <td className="cart__table--body__list">
                                <div className="quantity__box">
                                  <button
                                    type="button"
                                    className="quantity__value decrease"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <label>
                                    <input
                                      type="number"
                                      className="quantity__number"
                                      value={item.quantity}
                                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                    />
                                  </label>
                                  <button
                                    type="button"
                                    className="quantity__value increase"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="cart__table--body__list">
                                <span className="cart__price">${(item.price * item.quantity).toFixed(2)}</span>
                              </td>
                            </tr>
                          ))}
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
                      <div className="cart__summary--inner">
                        <div className="coupon__code mb-30">
                          <h3 className="coupon__code--title">Coupon Code</h3>
                          <form className="coupon__code--form">
                            <label>
                              <input
                                className="coupon__code--input"
                                placeholder="Enter code here"
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                              />
                            </label>
                            <button className="coupon__code--button" type="submit">Apply Code</button>
                          </form>
                        </div>
                        <div className="cart__note mb-20">
                          <h3 className="cart__note--title">Note</h3>
                          <div className="cart__note--area">
                            <label>
                              <textarea
                                className="cart__note--textarea"
                                placeholder="Write a note here..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                              ></textarea>
                            </label>
                          </div>
                        </div>
                        <h3 className="cart__summary--title mb-20">Cart Totals</h3>
                        <ul className="cart__summary--list">
                          <li className="cart__summary--list__items d-flex justify-content-between">
                            <span className="cart__summary--list__title">SUBTOTAL</span>
                            <span className="cart__summary--list__price">${subtotal.toFixed(2)}</span>
                          </li>
                          <li className="cart__summary--list__items d-flex justify-content-between">
                            <span className="cart__summary--list__title">SHIPPING</span>
                            <span className="cart__summary--list__price">${shipping.toFixed(2)}</span>
                          </li>
                          <li className="cart__summary--list__items d-flex justify-content-between">
                            <span className="cart__summary--list__title">TOTAL</span>
                            <span className="cart__summary--list__price">${total.toFixed(2)}</span>
                          </li>
                        </ul>
                        <div className="cart__summary--button d-flex justify-content-between">
                          <button className="cart__summary--button__update btn" type="button">Update Cart</button>
                          <Link className="cart__summary--button__checkout btn" to="/checkout">
                            Proceed To Checkout
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="new__product--section section--padding">
          <div className="container">
            <div className="section__heading text-center mb-50">
              <h2 className="section__heading--maintitle">New Products</h2>
            </div>
            <div className="new__product--inner">
              <div className="swiper newProductSwiper">
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
                        <div className="new__product--items">
                          <div className="product__card--container">
                            <div className="product__card--thumbnail">
                              <Link className="product__card--thumbnail__link display-block" to="/product-detail">
                                <img className="product__card--thumbnail__img product__primary--img" src={`/assets/img/product/${product.image}`} alt={product.name} />
                              </Link>
                              <span className="product__badge--items">
                                <span className="product__badge--item__text">New</span>
                              </span>
                            </div>
                            <div className="product__card--content">
                              <h3 className="product__card--content__title">
                                <Link to="/product-detail">{product.name}</Link>
                              </h3>
                              <div className="product__card--price">
                                <span className="current__price">${product.price.toFixed(2)}</span>
                                <span className="price__divider">|</span>
                                <span className="old__price">${product.originalPrice.toFixed(2)}</span>
                              </div>
                              <div className="product__card--rating">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`rating__icon ${i < product.rating ? 'rating__icon--solid' : ''}`}>
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5.5 0L7.05 3.55L11 4.1L8.1 6.9L8.8 10.8L5.5 9.05L2.2 10.8L2.9 6.9L0 4.1L3.95 3.55L5.5 0Z" fill="currentColor"/>
                                    </svg>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
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

export default CartPage;
