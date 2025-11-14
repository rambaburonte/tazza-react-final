import React from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const ComparePage = () => {
  const products = [
    {
      id: 1,
      name: 'Cotton Dress',
      price: 89.00,
      image: 'product1.png',
      description: 'Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.'
    },
    {
      id: 2,
      name: 'Edna Dress',
      price: 89.00,
      image: 'product2.png',
      description: 'Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.'
    },
    {
      id: 3,
      name: 'Edna Dress',
      price: 89.00,
      image: 'product3.png',
      description: 'Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.'
    },
    {
      id: 4,
      name: 'Edna Dress',
      price: 89.00,
      image: 'product4.png',
      description: 'Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.'
    },
    {
      id: 5,
      name: 'Edna Dress',
      price: 89.00,
      image: 'product5.png',
      description: 'Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.'
    }
  ];

  return (
    <>
      <Preloader />
      <Header />

      <main className="main__content_wrapper">
        <Breadcrumb title="Compare" items={[{ label: 'Home', href: '/' }, { label: 'Compare' }]} />

        <section className="compare__section section--padding">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="section__heading text-center mb-40">
                  <h2 className="section__heading--maintitle">COMPARE PRODUCT PAGE STYLE</h2>
                </div>
                <div className="compare__section--inner table-responsive">
                  <table className="compare__table">
                    <thead className="compare__table--header">
                      <tr className="compare__table--items">
                        <td className="compare__table--items__child">
                          <button type="button" aria-label="compare remove btn" className="compare__remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24.105" height="24.732" viewBox="0 0 512 512"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"></path></svg>
                          </button>
                          <h3 className="compare__product--title h4">Cotton Dress</h3>
                          <img className="compare__product--thumb display-block" src="/assets/img/product/product1.png" alt="compare-image" />
                        </td>
                        <td className="compare__table--items__child">
                          <button type="button" aria-label="compare remove btn" className="compare__remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24.105" height="24.732" viewBox="0 0 512 512"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"></path></svg>
                          </button>
                          <h3 className="compare__product--title h4">Edna Dress</h3>
                          <img className="compare__product--thumb display-block" src="/assets/img/product/product2.png" alt="compare-image" />
                        </td>
                        <td className="compare__table--items__child">
                          <button type="button" aria-label="compare remove btn" className="compare__remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24.105" height="24.732" viewBox="0 0 512 512"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"></path></svg>
                          </button>
                          <h3 className="compare__product--title h4">Edna Dress</h3>
                          <img className="compare__product--thumb display-block" src="/assets/img/product/product3.png" alt="compare-image" />
                        </td>
                        <td className="compare__table--items__child">
                          <button type="button" aria-label="compare remove btn" className="compare__remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24.105" height="24.732" viewBox="0 0 512 512"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"></path></svg>
                          </button>
                          <h3 className="compare__product--title h4">Edna Dress</h3>
                          <img className="compare__product--thumb display-block" src="/assets/img/product/product4.png" alt="compare-image" />
                        </td>
                        <td className="compare__table--items__child">
                          <button type="button" aria-label="compare remove btn" className="compare__remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24.105" height="24.732" viewBox="0 0 512 512"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"></path></svg>
                          </button>
                          <h3 className="compare__product--title h4">Edna Dress</h3>
                          <img className="compare__product--thumb display-block" src="/assets/img/product/product5.png" alt="compare-image" />
                        </td>
                      </tr>
                    </thead>
                    <tbody className="compare__table--body">
                      <tr className="compare__table--items">
                        <td className="compare__table--items__child">
                          <span className="compare__product--price">$89,00</span>
                        </td>
                        <td className="compare__table--items__child">
                          <span className="compare__product--price">$89,00</span>
                        </td>
                        <td className="compare__table--items__child">
                          <span className="compare__product--price">$89,00</span>
                        </td>
                        <td className="compare__table--items__child">
                          <span className="compare__product--price">$89,00</span>
                        </td>
                        <td className="compare__table--items__child">
                          <span className="compare__product--price">$89,00</span>
                        </td>
                      </tr>
                      <tr className="compare__table--items">
                        <th className="compare__table--items__child--header">Product Description</th>
                        <th className="compare__table--items__child--header">Product Description</th>
                        <th className="compare__table--items__child--header">Product Description</th>
                        <th className="compare__table--items__child--header">Product Description</th>
                        <th className="compare__table--items__child--header">Product Description</th>
                      </tr>
                      <tr className="compare__table--items">
                        <td className="compare__table--items__child">
                          <p className="compare__description">Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.</p>
                        </td>
                        <td className="compare__table--items__child">
                          <p className="compare__description">Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.</p>
                        </td>
                        <td className="compare__table--items__child">
                          <p className="compare__description">Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.</p>
                        </td>
                        <td className="compare__table--items__child">
                          <p className="compare__description">Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.</p>
                        </td>
                        <td className="compare__table--items__child">
                          <p className="compare__description">Lorem ipsum dolor sit, amet  elit. Iusto excepturi fugiat vitae the are commodi nihil saepe itaque! name Corporis, quaerat layout.</p>
                        </td>
                      </tr>
                      <tr className="compare__table--items">
                        <th className="compare__table--items__child--header">Availability</th>
                        <th className="compare__table--items__child--header">Availability</th>
                        <th className="compare__table--items__child--header">Availability</th>
                        <th className="compare__table--items__child--header">Availability</th>
                        <th className="compare__table--items__child--header">Availability</th>
                      </tr>
                      <tr className="compare__table--items">
                        <td className="compare__table--items__child">
                          <p className="compare__instock text__secondary">In stock</p>
                        </td>
                        <td className="compare__table--items__child">
                          <p className="compare__instock text__secondary">In stock</p>
                        </td>
                        <td className="compare__table--items__child">
                          <p className="compare__instock text__secondary">In stock</p>
                        </td>
                        <td className="compare__table--items__child">
                          <p className="compare__instock text__secondary">In stock</p>
                        </td>
                        <td className="compare__table--items__child">
                          <p className="compare__instock text__secondary">In stock</p>
                        </td>
                      </tr>
                      <tr className="compare__table--items">
                        <td className="compare__table--items__child">
                          <a className="compare__cart--btn btn" href="cart.html">Add to Cart</a>
                        </td>
                        <td className="compare__table--items__child">
                          <a className="compare__cart--btn btn" href="cart.html">Add to Cart</a>
                        </td>
                        <td className="compare__table--items__child">
                          <a className="compare__cart--btn btn" href="cart.html">Add to Cart</a>
                        </td>
                        <td className="compare__table--items__child">
                          <a className="compare__cart--btn btn" href="cart.html">Add to Cart</a>
                        </td>
                        <td className="compare__table--items__child">
                          <a className="compare__cart--btn btn" href="cart.html">Add to Cart</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default ComparePage;
