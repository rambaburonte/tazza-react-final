import React from 'react';
import { Link } from 'react-router-dom';

const BannerSection = () => {
  return (
    <section className="banner__section section--padding pt-0">
      <div className="container">
        <div className="row row-cols-lg-2 row-cols-md-2 row-cols-sm-2 row-cols-1 mb--n30">
          <div className="col mb-30">
            <div className="banner__items position__relative">
              <Link className="banner__items--thumbnail display-block" to="/shop">
                <img 
                  className="banner__items--thumbnail__img display-block" 
                  src={'/assets/img/banner/banner1.png'} 
                  alt="banner-img" 
                />
                <div className="banner__items--content">
                  <h2 className="banner__items--content__title text__secondary">Organic Juice</h2>
                  <p className="banner__items--content__desc text-white">
                    Shop our selection of organic fresh vegetables in a discounted price 10% off.
                  </p>
                  <span className="btn banner__items--content__btn">Shop Now</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="col mb-30">
            <div className="banner__items position__relative">
              <Link className="banner__items--thumbnail display-block" to="/shop">
                <img 
                  className="banner__items--thumbnail__img display-block" 
                  src={'/assets/img/banner/banner2.png'} 
                  alt="banner-img" 
                />
                <div className="banner__items--content">
                  <h2 className="banner__items--content__title text__secondary">Organic Food</h2>
                  <p className="banner__items--content__desc text-black">
                    Shop our selection of organic fresh vegetables in a discounted price 10% off.
                  </p>
                  <span className="btn banner__items--content__btn">Shop Now</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
