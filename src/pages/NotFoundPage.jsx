import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <>
      <Header />
      
      <main className="main__content_wrapper">
        <Breadcrumb title="Error 404" items={[{ label: 'Error 404' }]} />
        
        <section className="error__section section--padding">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="error__content text-center">
                  <img 
                    className="error__content--img display-block mb-50" 
                    src="/assets/img/other/404-thumb.png" 
                    alt="error-img" 
                  />
                  <h2 className="error__content--title">Opps ! We,ar Not Found This Page</h2>
                  <p className="error__content--desc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi animi aliquid minima assumenda.
                  </p>
                  <Link className="error__content--btn btn" to="/">Back To Home</Link>
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

export default NotFoundPage;
