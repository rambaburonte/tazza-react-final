import React from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const MyAccountPage = () => {
  return (
    <>
      <Preloader />
      <Header />

      <main className="main__content_wrapper">
        <Breadcrumb title="My Account" items={[{ label: 'Home', href: '/' }, { label: 'My Account' }]} />

        <section className="my__account--section section--padding">
          <div className="container">
            <p className="account__welcome--text">Hello, Admin welcome to your dashboard!</p>
            <div className="my__account--section__inner border-radius-10 d-flex">
              <div className="account__left--sidebar">
                <h2 className="account__content--title h3 mb-20">My Profile</h2>
                <ul className="account__menu">
                  <li className="account__menu--list active"><a href="my-account.html">Dashboard</a></li>
                  <li className="account__menu--list"><a href="my-account-2.html">Addresses</a></li>
                  <li className="account__menu--list"><a href="wishlist.html">Wishlist</a></li>
                  <li className="account__menu--list"><a href="login.html">Log Out</a></li>
                </ul>
              </div>
              <div className="account__wrapper">
                <div className="account__content">
                  <h2 className="account__content--title h3 mb-20">Orders History</h2>
                  <div className="account__table--area">
                    <table className="account__table">
                      <thead className="account__table--header">
                        <tr className="account__table--header__child">
                          <th className="account__table--header__child--items">Order</th>
                          <th className="account__table--header__child--items">Date</th>
                          <th className="account__table--header__child--items">Payment Status</th>
                          <th className="account__table--header__child--items">Fulfillment Status</th>
                          <th className="account__table--header__child--items">Total</th>
                        </tr>
                      </thead>
                      <tbody className="account__table--body mobile__none">
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">#2014</td>
                          <td className="account__table--body__child--items">November 24, 2022</td>
                          <td className="account__table--body__child--items">Paid</td>
                          <td className="account__table--body__child--items">Unfulfilled</td>
                          <td className="account__table--body__child--items">$40.00 USD</td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">#2024</td>
                          <td className="account__table--body__child--items">November 24, 2022</td>
                          <td className="account__table--body__child--items">Paid</td>
                          <td className="account__table--body__child--items">Fulfilled</td>
                          <td className="account__table--body__child--items">$44.00 USD</td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">#2164</td>
                          <td className="account__table--body__child--items">November 24, 2022</td>
                          <td className="account__table--body__child--items">Paid</td>
                          <td className="account__table--body__child--items">Unfulfilled</td>
                          <td className="account__table--body__child--items">$36.00 USD</td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">#2345</td>
                          <td className="account__table--body__child--items">November 24, 2022</td>
                          <td className="account__table--body__child--items">Paid</td>
                          <td className="account__table--body__child--items">Unfulfilled</td>
                          <td className="account__table--body__child--items">$87.00 USD</td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">#1244</td>
                          <td className="account__table--body__child--items">November 24, 2022</td>
                          <td className="account__table--body__child--items">Paid</td>
                          <td className="account__table--body__child--items">Fulfilled</td>
                          <td className="account__table--body__child--items">$66.00 USD</td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">#3455</td>
                          <td className="account__table--body__child--items">November 24, 2022</td>
                          <td className="account__table--body__child--items">Paid</td>
                          <td className="account__table--body__child--items">Fulfilled</td>
                          <td className="account__table--body__child--items">$55.00 USD</td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">#4566</td>
                          <td className="account__table--body__child--items">November 24, 2022</td>
                          <td className="account__table--body__child--items">Paid</td>
                          <td className="account__table--body__child--items">Unfulfilled</td>
                          <td className="account__table--body__child--items">$87.00 USD</td>
                        </tr>
                      </tbody>
                      <tbody className="account__table--body mobile__block">
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">
                            <strong>Order</strong>
                            <span>#2014</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Date</strong>
                            <span>November 24, 2022</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Payment Status</strong>
                            <span>Paid</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Fulfillment Status</strong>
                            <span>Unfulfilled</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Total</strong>
                            <span>$40.00 USD</span>
                          </td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">
                            <strong>Order</strong>
                            <span>#2024</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Date</strong>
                            <span>November 24, 2022</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Payment Status</strong>
                            <span>Paid</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Fulfillment Status</strong>
                            <span>Fulfilled</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Total</strong>
                            <span>$44.00 USD</span>
                          </td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">
                            <strong>Order</strong>
                            <span>#2164</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Date</strong>
                            <span>November 24, 2022</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Payment Status</strong>
                            <span>Paid</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Fulfillment Status</strong>
                            <span>Unfulfilled</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Total</strong>
                            <span>$36.00 USD</span>
                          </td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">
                            <strong>Order</strong>
                            <span>#2345</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Date</strong>
                            <span>November 24, 2022</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Payment Status</strong>
                            <span>Paid</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Fulfillment Status</strong>
                            <span>Unfulfilled</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Total</strong>
                            <span>$87.00 USD</span>
                          </td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">
                            <strong>Order</strong>
                            <span>#1244</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Date</strong>
                            <span>November 24, 2022</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Payment Status</strong>
                            <span>Paid</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Fulfillment Status</strong>
                            <span>Fulfilled</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Total</strong>
                            <span>$66.00 USD</span>
                          </td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">
                            <strong>Order</strong>
                            <span>#3455</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Date</strong>
                            <span>November 24, 2022</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Payment Status</strong>
                            <span>Paid</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Fulfillment Status</strong>
                            <span>Fulfilled</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Total</strong>
                            <span>$55.00 USD</span>
                          </td>
                        </tr>
                        <tr className="account__table--body__child">
                          <td className="account__table--body__child--items">
                            <strong>Order</strong>
                            <span>#4566</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Date</strong>
                            <span>November 24, 2022</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Payment Status</strong>
                            <span>Paid</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Fulfillment Status</strong>
                            <span>Unfulfilled</span>
                          </td>
                          <td className="account__table--body__child--items">
                            <strong>Total</strong>
                            <span>$87.00 USD</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default MyAccountPage;
