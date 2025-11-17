import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { API_CONFIG } from '../config/apiConfig';
import { useHome } from '../context/HomeContext';

const ProductCategories = () => {
  const { homeData, loading, error } = useHome();
  const { categories } = homeData;

  // Map categories for display
  const mappedCategories = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    image: cat.cover,
    items: cat.subCates ? cat.subCates.length : 0
  }));

  if (loading) {
    return (
      <section className="product__section product__categories--section section--padding">
        <div className="container">
          <div className="section__heading text-center mb-40">
            <span className="section__heading--subtitle">Recently added our store</span>
            <h2 className="section__heading--maintitle">Our Hottest Categories</h2>
          </div>
          <div className="text-center">Loading categories...</div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="product__section product__categories--section section--padding">
        <div className="container">
          <div className="section__heading text-center mb-40">
            <span className="section__heading--subtitle">Recently added our store</span>
            <h2 className="section__heading--maintitle">Our Hottest Categories</h2>
          </div>
          <div className="text-center">Loading categories...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product__section product__categories--section section--padding">
        <div className="container">
          <div className="section__heading text-center mb-40">
            <span className="section__heading--subtitle">Recently added our store</span>
            <h2 className="section__heading--maintitle">Our Hottest Categories</h2>
          </div>
          <div className="text-center text-danger">Error loading categories: {error}</div>
        </div>
      </section>
    );
  }

  if (mappedCategories.length === 0) {
    return (
      <section className="product__section product__categories--section section--padding">
        <div className="container">
          <div className="section__heading text-center mb-40">
            <span className="section__heading--subtitle">Recently added our store</span>
            <h2 className="section__heading--maintitle">Our Hottest Categories</h2>
          </div>
          <div className="text-center">No categories available at the moment.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="product__section product__categories--section section--padding">
      <div className="container">
        <div className="section__heading text-center mb-40">
          <span className="section__heading--subtitle">Recently added our store</span>
          <h2 className="section__heading--maintitle">Our Hottest Categories</h2>
        </div>
        <div className="product__section--inner product__swiper--activation">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            loop={mappedCategories.length >= 5}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              280: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 4,
              },
            }}
            className="swiper-wrapper"
          >
            {mappedCategories.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="product__items product__bg">
                  <div className="product__items--thumbnail">
                    <Link className="product__items--link" to={`/shop?category=${category.id}&catName=${encodeURIComponent(category.name)}`}>
                      <img 
                        className="product__items--img" 
                        src={`${API_CONFIG.IMAGE_URL}${category.image}`} 
                        alt="categories-img" 
                      />
                      <div className="product__categories--content d-flex justify-content-between align-items-center">
                        <div className="product__categories--content__left">
                          <h3 className="product__categories--content__maintitle">{category.name}</h3>
                          <span className="product__categories--content__subtitle">{category.items} subcategories</span>
                        </div>
                        <div className="product__categories--icon">
                          <span className="product__categories--icon__link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15.995" height="10.979" viewBox="0 0 15.995 10.979">
                              <path d="M212.706,299.839a.425.425,0,0,0,0-.6l-3.458-3.458a.425.425,0,0,1,0-.6l1.008-1.008a.425.425,0,0,1,.6,0l5.065,5.065a.425.425,0,0,1,0,.6l-5.065,5.066a.425.425,0,0,1-.6,0l-1.008-1.008a.425.425,0,0,1,0-.6Zm-6.305-.3a2.215,2.215,0,1,0,2.216-2.216A2.215,2.215,0,0,0,206.4,299.541Zm-3.634,0a1.6,1.6,0,1,0,1.6-1.605A1.6,1.6,0,0,0,202.767,299.541Zm-2.717,0a1.154,1.154,0,1,0,1.154-1.154A1.155,1.155,0,0,0,200.05,299.541Z" transform="translate(-200.05 -294.05)" fill="currentColor"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper__nav--btn swiper-button-next"></div>
          <div className="swiper__nav--btn swiper-button-prev"></div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
