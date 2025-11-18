import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    email: 'info42@gmail.com',
    shipTo: 'Dhaka, DHaka 1219, Bangladesh',
    method: 'Standard . $0.23',
    cardNumber: '',
    cardName: '',
    expiration: '',
    securityCode: '',
    billingSame: true,
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    country: 'India',
    postalCode: '',
    discountCode: '',
    notes: ''
  });

  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order placed:', formData);
  };

  const subtotal = 860.00;
  const shipping = 0.00;
  const total = subtotal + shipping;

  return (
    <>
      <Header />

      <main className="main__content_wrapper">
        <section className="checkout__page--area">
          <div className="container">
            <div className="checkout__page--inner d-flex">
              <div className="main checkout__mian">
                <header className="main__header checkout__mian--header mb-30">
                  <a className="logo logo__left mb-20" href="index.html">
                    <img src="/assets/img/logo/nav-log.png" alt="logo" />
                  </a>
                  <details className="order__summary--mobile__version">
                    <summary className="order__summary--toggle border-radius-5" onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}>
                      <span className="order__summary--toggle__inner">
                        <span className="order__summary--toggle__icon">
                          <svg width="20" height="19" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z" fill="currentColor"></path>
                          </svg>
                        </span>
                        <span className="order__summary--toggle__text show">
                          <span>Show order summary</span>
                          <svg width="11" height="6" xmlns="http://www.w3.org/2000/svg" className="order-summary-toggle__dropdown" fill="currentColor">
                            <path d="M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z"></path>
                          </svg>
                        </span>
                        <span className="order__summary--final__price">${total.toFixed(2)}</span>
                      </span>
                    </summary>
                    {orderSummaryOpen && (
                      <div className="order__summary--section">
                        <div className="cart__table checkout__product--table">
                          <table className="summary__table">
                            <tbody className="summary__table--body">
                              <tr className="summary__table--items">
                                <td className="summary__table--list">
                                  <div className="product__image two d-flex align-items-center">
                                    <div className="product__thumbnail border-radius-5">
                                      <Link to="/product-detail">
                                        <img className="border-radius-5" src="/assets/img/product/small-product7.png" alt="cart-product" />
                                      </Link>
                                      <span className="product__thumbnail--quantity">1</span>
                                    </div>
                                    <div className="product__description">
                                      <h3 className="product__description--name h4">
                                        <Link to="/product-detail">Fresh-whole-fish</Link>
                                      </h3>
                                      <span className="product__description--variant">COLOR: Blue</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="summary__table--list">
                                  <span className="cart__price">£65.00</span>
                                </td>
                              </tr>
                              <tr className="summary__table--items">
                                <td className="summary__table--list">
                                  <div className="cart__product d-flex align-items-center">
                                    <div className="product__thumbnail border-radius-5">
                                      <Link to="/product-detail">
                                        <img className="border-radius-5" src="/assets/img/product/small-product2.png" alt="cart-product" />
                                      </Link>
                                      <span className="product__thumbnail--quantity">1</span>
                                    </div>
                                    <div className="product__description">
                                      <h3 className="product__description--name h4">
                                        <Link to="/product-detail">Vegetable-healthy</Link>
                                      </h3>
                                      <span className="product__description--variant">COLOR: Green</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="summary__table--list">
                                  <span className="cart__price">£82.00</span>
                                </td>
                              </tr>
                              <tr className="summary__table--items">
                                <td className="summary__table--list">
                                  <div className="cart__product d-flex align-items-center">
                                    <div className="product__thumbnail border-radius-5">
                                      <Link to="/product-detail">
                                        <img className="border-radius-5" src="/assets/img/product/small-product4.png" alt="cart-product" />
                                      </Link>
                                      <span className="product__thumbnail--quantity">1</span>
                                    </div>
                                    <div className="product__description">
                                      <h3 className="product__description--name h4">
                                        <Link to="/product-detail">Raw-onions-surface</Link>
                                      </h3>
                                      <span className="product__description--variant">COLOR: White</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="summary__table--list">
                                  <span className="cart__price">£78.00</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="checkout__discount--code">
                          <form className="d-flex" action="#">
                            <label>
                              <input
                                className="checkout__discount--code__input--field border-radius-5"
                                placeholder="Gift card or discount code"
                                type="text"
                                name="discountCode"
                                value={formData.discountCode}
                                onChange={handleChange}
                              />
                            </label>
                            <button className="checkout__discount--code__btn btn border-radius-5" type="submit">Apply</button>
                          </form>
                        </div>
                        <div className="checkout__total">
                          <table className="checkout__total--table">
                            <tbody className="checkout__total--body">
                              <tr className="checkout__total--items">
                                <td className="checkout__total--title text-left">Subtotal</td>
                                <td className="checkout__total--amount text-right">${subtotal.toFixed(2)}</td>
                              </tr>
                              <tr className="checkout__total--items">
                                <td className="checkout__total--title text-left">Shipping</td>
                                <td className="checkout__total--calculated__text text-right">Calculated at next step</td>
                              </tr>
                            </tbody>
                            <tfoot className="checkout__total--footer">
                              <tr className="checkout__total--footer__items">
                                <td className="checkout__total--footer__title checkout__total--footer__list text-left">Total</td>
                                <td className="checkout__total--footer__amount checkout__total--footer__list text-right">${total.toFixed(2)}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    )}
                  </details>
                  <nav>
                    <ol className="breadcrumb checkout__breadcrumb d-flex">
                      <li className="breadcrumb__item breadcrumb__item--completed d-flex align-items-center">
                        <Link className="breadcrumb__link" to="/cart">Cart</Link>
                        <svg className="readcrumb__chevron-icon" xmlns="http://www.w3.org/2000/svg" width="17.007" height="16.831" viewBox="0 0 512 512">
                          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144"/>
                        </svg>
                      </li>
                      <li className="breadcrumb__item breadcrumb__item--current d-flex align-items-center">
                        <span className="breadcrumb__link">Information</span>
                        <svg className="readcrumb__chevron-icon" xmlns="http://www.w3.org/2000/svg" width="17.007" height="16.831" viewBox="0 0 512 512">
                          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144"/>
                        </svg>
                      </li>
                      <li className="breadcrumb__item breadcrumb__item--blank d-flex align-items-center">
                        <span className="breadcrumb__link">Shipping</span>
                        <svg className="readcrumb__chevron-icon" xmlns="http://www.w3.org/2000/svg" width="17.007" height="16.831" viewBox="0 0 512 512">
                          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M184 112l144 144-144 144"/>
                        </svg>
                      </li>
                      <li className="breadcrumb__item breadcrumb__item--blank">
                        <span className="breadcrumb__text current">Payment</span>
                      </li>
                    </ol>
                  </nav>
                </header>
                <main className="main__content_wrapper section--padding pt-0">
                  <form onSubmit={handleSubmit}>
                    <div className="checkout__content--step checkout__contact--information2 border-radius-5">
                      <div className="checkout__review d-flex justify-content-between align-items-center">
                        <div className="checkout__review--inner d-flex align-items-center">
                          <label className="checkout__review--label">Contact</label>
                          <span className="checkout__review--content">{formData.email}</span>
                        </div>
                        <div className="checkout__review--link">
                          <button className="checkout__review--link__text" type="button">Change</button>
                        </div>
                      </div>
                      <div className="checkout__review d-flex justify-content-between align-items-center">
                        <div className="checkout__review--inner d-flex align-items-center">
                          <label className="checkout__review--label">Ship to</label>
                          <span className="checkout__review--content">{formData.shipTo}</span>
                        </div>
                        <div className="checkout__review--link">
                          <button className="checkout__review--link__text" type="button">Change</button>
                        </div>
                      </div>
                      <div className="checkout__review d-flex justify-content-between align-items-center">
                        <div className="checkout__review--inner d-flex align-items-center">
                          <label className="checkout__review--label">Method</label>
                          <span className="checkout__review--content">{formData.method}</span>
                        </div>
                        <div className="checkout__review--link">
                          <button className="checkout__review--link__text" type="button">Change</button>
                        </div>
                      </div>
                    </div>
                    <div className="checkout__content--step section__shipping--address">
                      <div className="section__header mb-25">
                        <h2 className="section__header--title h3">Payment</h2>
                        <p className="section__header--desc">All transactions are secure and encrypted.</p>
                      </div>
                      <div className="checkout__content--step__inner3 border-radius-5">
                        <div className="checkout__address--content__header d-flex align-items-center justify-content-between">
                          <span className="checkout__address--content__title">Credit card</span>
                          <span className="heckout__address--content__icon">
                            <img src="/assets/img/icon/credit-card.svg" alt="card" />
                          </span>
                        </div>
                        <div className="checkout__content--input__box--wrapper">
                          <div className="row">
                            <div className="col-12 mb-12">
                              <div className="checkout__input--list position__relative">
                                <label>
                                  <input
                                    className="checkout__input--field border-radius-5"
                                    placeholder="Card number"
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                  />
                                </label>
                                <button className="checkout__input--field__button" aria-label="search button" type="button">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15.51" height="15.443" viewBox="0 0 512 512">
                                    <path d="M336 208v-95a80 80 0 00-160 0v95" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                                    <rect x="96" y="208" width="320" height="272" rx="48" ry="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="col-12 mb-12">
                              <div className="checkout__input--list">
                                <label>
                                  <input
                                    className="checkout__input--field border-radius-5"
                                    placeholder="Name on card"
                                    type="text"
                                    name="cardName"
                                    value={formData.cardName}
                                    onChange={handleChange}
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6 mb-12">
                              <div className="checkout__input--list">
                                <label>
                                  <input
                                    className="checkout__input--field border-radius-5"
                                    placeholder="Expiration date (MM / YY)"
                                    type="text"
                                    name="expiration"
                                    value={formData.expiration}
                                    onChange={handleChange}
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6 mb-12">
                              <div className="checkout__input--list position__relative">
                                <label>
                                  <input
                                    className="checkout__input--field border-radius-5"
                                    placeholder="Security code"
                                    type="text"
                                    name="securityCode"
                                    value={formData.securityCode}
                                    onChange={handleChange}
                                  />
                                </label>
                                <button className="checkout__input--field__button" type="button">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18.51" height="18.443" viewBox="0 0 512 512">
                                    <title>Help Circle</title>
                                    <path d="M256 80a176 176 0 10176 176A176 176 0 00256 80z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                                    <path d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="28"/>
                                    <circle cx="250" cy="348" r="20"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="checkout__content--step section__shipping--address pt-10">
                      <div className="section__header mb-25">
                        <h2 className="section__header--title h3">Billing address</h2>
                        <p className="section__header--desc">Select the address that matches your card or payment method.</p>
                      </div>
                      <div className="checkout__content--step__inner3 border-radius-5">
                        <div className="checkout__address--content__header">
                          <div className="shipping__contact--box__list">
                            <div className="shipping__radio--input">
                              <input
                                className="shipping__radio--input__field"
                                id="radiobox"
                                name="billingSame"
                                type="radio"
                                checked={formData.billingSame}
                                onChange={() => setFormData({ ...formData, billingSame: true })}
                              />
                            </div>
                            <label className="shipping__radio--label" htmlFor="radiobox">
                              <span className="shipping__radio--label__primary">Same as shipping address</span>
                            </label>
                          </div>
                          <div className="shipping__contact--box__list">
                            <div className="shipping__radio--input">
                              <input
                                className="shipping__radio--input__field"
                                id="radiobox2"
                                name="billingSame"
                                type="radio"
                                checked={!formData.billingSame}
                                onChange={() => setFormData({ ...formData, billingSame: false })}
                              />
                            </div>
                            <label className="shipping__radio--label" htmlFor="radiobox2">
                              <span className="shipping__radio--label__primary">Use a different billing address</span>
                            </label>
                          </div>
                        </div>
                        {!formData.billingSame && (
                          <div className="checkout__content--input__box--wrapper">
                            <div className="row">
                              <div className="col-lg-6 mb-12">
                                <div className="checkout__input--list">
                                  <label>
                                    <input
                                      className="checkout__input--field border-radius-5"
                                      placeholder="First name (optional)"
                                      type="text"
                                      name="firstName"
                                      value={formData.firstName}
                                      onChange={handleChange}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6 mb-12">
                                <div className="checkout__input--list">
                                  <label>
                                    <input
                                      className="checkout__input--field border-radius-5"
                                      placeholder="Last name"
                                      type="text"
                                      name="lastName"
                                      value={formData.lastName}
                                      onChange={handleChange}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 mb-12">
                                <div className="checkout__input--list">
                                  <label>
                                    <input
                                      className="checkout__input--field border-radius-5"
                                      placeholder="Address1"
                                      type="text"
                                      name="address1"
                                      value={formData.address1}
                                      onChange={handleChange}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 mb-12">
                                <div className="checkout__input--list">
                                  <label>
                                    <input
                                      className="checkout__input--field border-radius-5"
                                      placeholder="Apartment, suite, etc. (optional)"
                                      type="text"
                                      name="address2"
                                      value={formData.address2}
                                      onChange={handleChange}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 mb-12">
                                <div className="checkout__input--list">
                                  <label>
                                    <input
                                      className="checkout__input--field border-radius-5"
                                      placeholder="City"
                                      type="text"
                                      name="city"
                                      value={formData.city}
                                      onChange={handleChange}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6 mb-12">
                                <div className="checkout__input--list checkout__input--select select">
                                  <label className="checkout__select--label" htmlFor="country">Country/region</label>
                                  <select
                                    className="checkout__input--select__field border-radius-5"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                  >
                                    <option value="India">India</option>
                                    <option value="United States">United States</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Islands">Islands</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Antigua Barbuda">Antigua Barbuda</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-6 mb-12">
                                <div className="checkout__input--list">
                                  <label>
                                    <input
                                      className="checkout__input--field border-radius-5"
                                      placeholder="Postal code"
                                      type="text"
                                      name="postalCode"
                                      value={formData.postalCode}
                                      onChange={handleChange}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="checkout__content--step__footer d-flex align-items-center">
                      <button className="continue__shipping--btn btn border-radius-5" type="submit">Pay now</button>
                      <Link className="previous__link--content" to="/cart">Return to shipping</Link>
                    </div>
                  </form>
                </main>
                <footer className="main__footer main__footer--wrapper">
                  <p className="copyright__content">Copyright © 2022 <Link className="copyright__content--link text__primary" to="/">Grocee</Link> . All Rights Reserved.Design By Grocee</p>
                </footer>
              </div>
              <aside className="checkout__sidebar sidebar">
                <div className="cart__table checkout__product--table">
                  <table className="cart__table--inner">
                    <tbody className="cart__table--body">
                      <tr className="cart__table--body__items">
                        <td className="cart__table--body__list">
                          <div className="product__image two d-flex align-items-center">
                            <div className="product__thumbnail border-radius-5">
                              <Link to="/product-detail">
                                <img className="border-radius-5" src="/assets/img/product/small-product7.png" alt="cart-product" />
                              </Link>
                              <span className="product__thumbnail--quantity">1</span>
                            </div>
                            <div className="product__description">
                              <h3 className="product__description--name h4">
                                <Link to="/product-detail">Fresh-whole-fish</Link>
                              </h3>
                              <span className="product__description--variant">COLOR: Blue</span>
                            </div>
                          </div>
                        </td>
                        <td className="cart__table--body__list">
                          <span className="cart__price">£65.00</span>
                        </td>
                      </tr>
                      <tr className="cart__table--body__items">
                        <td className="cart__table--body__list">
                          <div className="cart__product d-flex align-items-center">
                            <div className="product__thumbnail border-radius-5">
                              <Link to="/product-detail">
                                <img className="border-radius-5" src="/assets/img/product/small-product2.png" alt="cart-product" />
                              </Link>
                              <span className="product__thumbnail--quantity">1</span>
                            </div>
                            <div className="product__description">
                              <h3 className="product__description--name h4">
                                <Link to="/product-detail">Vegetable-healthy</Link>
                              </h3>
                              <span className="product__description--variant">COLOR: Green</span>
                            </div>
                          </div>
                        </td>
                        <td className="cart__table--body__list">
                          <span className="cart__price">£82.00</span>
                        </td>
                      </tr>
                      <tr className="cart__table--body__items">
                        <td className="cart__table--body__list">
                          <div className="cart__product d-flex align-items-center">
                            <div className="product__thumbnail border-radius-5">
                              <Link to="/product-detail">
                                <img className="border-radius-5" src="/assets/img/product/small-product4.png" alt="cart-product" />
                              </Link>
                              <span className="product__thumbnail--quantity">1</span>
                            </div>
                            <div className="product__description">
                              <h3 className="product__description--name h4">
                                <Link to="/product-detail">Raw-onions-surface</Link>
                              </h3>
                              <span className="product__description--variant">COLOR: White</span>
                            </div>
                          </div>
                        </td>
                        <td className="cart__table--body__list">
                          <span className="cart__price">£78.00</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="checkout__discount--code">
                  <form className="d-flex" action="#">
                    <label>
                      <input
                        className="checkout__discount--code__input--field border-radius-5"
                        placeholder="Gift card or discount code"
                        type="text"
                        name="discountCode"
                        value={formData.discountCode}
                        onChange={handleChange}
                      />
                    </label>
                    <button className="checkout__discount--code__btn btn border-radius-5" type="submit">Apply</button>
                  </form>
                </div>
                <div className="checkout__total">
                  <table className="checkout__total--table">
                    <tbody className="checkout__total--body">
                      <tr className="checkout__total--items">
                        <td className="checkout__total--title text-left">Subtotal</td>
                        <td className="checkout__total--amount text-right">${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr className="checkout__total--items">
                        <td className="checkout__total--title text-left">Shipping</td>
                        <td className="checkout__total--calculated__text text-right">Calculated at next step</td>
                      </tr>
                    </tbody>
                    <tfoot className="checkout__total--footer">
                      <tr className="checkout__total--footer__items">
                        <td className="checkout__total--footer__title checkout__total--footer__list text-left">Total</td>
                        <td className="checkout__total--footer__amount checkout__total--footer__list text-right">${total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Start brand logo section */}
        {/* <div className="brand__logo--section section--padding pt-0">
          <div className="container-fluid">
            <div className="row row-cols-1">
              <div className="col">
                <div className="brand__logo--section__inner d-flex justify-content-between align-items-center">
                  <div className="brand__logo--items">
                    <img className="brand__logo--items__thumbnail--img display-block" src="/assets/img/logo/brand-logo1.png" alt="brand img" />
                  </div>
                  <div className="brand__logo--items">
                    <img className="brand__logo--items__thumbnail--img display-block" src="/assets/img/logo/brand-logo2.png" alt="brand img" />
                  </div>
                  <div className="brand__logo--items">
                    <img className="brand__logo--items__thumbnail--img display-block" src="/assets/img/logo/brand-logo3.png" alt="brand img" />
                  </div>
                  <div className="brand__logo--items">
                    <img className="brand__logo--items__thumbnail--img display-block" src="/assets/img/logo/brand-logo4.png" alt="brand img" />
                  </div>
                  <div className="brand__logo--items">
                    <img className="brand__logo--items__thumbnail--img display-block" src="/assets/img/logo/brand-logo5.png" alt="brand img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* End brand logo section */}

        {/* <ShippingInfo /> removed as per request */}
      </main>

      <Footer />
    </>
  );
};

export default CheckoutPage;
