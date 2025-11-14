import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      subtitle: 'Eat clean and green',
      title: 'Natural is always Healthy',
      description: 'The more you love your health, more you eat organic. No medicine can heal you better than organic food does',
      image: '/assets/img/slider/home1-slider1-layer.png',
      imageClass: 'slider__layer--img'
    },
    {
      id: 2,
      subtitle: 'Eat clean and green',
      title: 'Natural is always Healthy',
      description: 'The more you love your health, more you eat organic. No medicine can heal you better than organic food does',
      image: '/assets/img/slider/home1-slider2-layer.png',
      imageClass: 'slider__layer--img home1__slider--layer2__img'
    },
    {
      id: 3,
      subtitle: 'Eat clean and green',
      title: 'Natural is always Healthy',
      description: 'The more you love your health, more you eat organic. No medicine can heal you better than organic food does',
      image: '/assets/img/slider/home1-slider3-layer.png',
      imageClass: 'slider__layer--img'
    }
  ];

  return (
    <section className="hero__slider--section">
      <div className="hero__slider--inner hero__slider--activation">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          speed={500}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: '.slider__pagination',
            clickable: true,
          }}
          className="hero__slider--wrapper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="hero__slider--items bg__gray--color">
                <div className="container slider__items--container">
                  <div className="hero__slider--items__inner">
                    <div className="row row-cols-lg-2 row-cols-md-2 row-cols-1 align-items-center">
                      <div className="col">
                        <div className="slider__content slider__content--padding__left">
                          <span className="slider__content--subtitle text__secondary">
                            {slide.subtitle}
                          </span>
                          <h2 className="slider__content--maintitle h1">
                            Natural is <span className="text__secondary">always</span> <br />
                            Healthy
                          </h2>
                          <p className="slider__content--desc">{slide.description}</p>
                          <Link className="btn slider__btn" to="/shop">Shop Now</Link>
                        </div>
                      </div>
                      <div className="col">
                        <div className={`hero__slider--layer ${slide.id === 2 ? 'home1__slider--layer2' : ''}`}>
                          <img 
                            className={slide.imageClass} 
                            src={slide.image} 
                            alt="slider-img" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="slider__pagination swiper-pagination"></div>
      </div>
    </section>
  );
};

export default HeroSlider;
