import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DealsBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('Sep 30, 2026 00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="deals__banner--section banner__bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-5 deals__baner--col">
            <div className="deals__banner--content">
              <h3 className="deals__banner--content__subtitle text__secondary">Best Deals of the week!</h3>
              <h2 className="deals__banner--content__maintitle">
                Grab The Best Offer of This Week
              </h2>
              <p className="deals__banner--content__desc">
                Shop our selection of organic fresh vegetables in a discounted price. 10% off on all vegetables.
              </p>
              <div className="deals__banner--countdown d-flex">
                <div className="countdown__item">
                  <span className="countdown__number">{timeLeft.days}</span>
                  <span className="countdown__text">Days</span>
                </div>
                <div className="countdown__item">
                  <span className="countdown__number">{timeLeft.hours}</span>
                  <span className="countdown__text">Hrs</span>
                </div>
                <div className="countdown__item">
                  <span className="countdown__number">{timeLeft.minutes}</span>
                  <span className="countdown__text">Min</span>
                </div>
                <div className="countdown__item">
                  <span className="countdown__number">{timeLeft.seconds}</span>
                  <span className="countdown__text">Sec</span>
                </div>
              </div>
              <Link className="btn deals__banner--content__btn" to="/shop">Discover Now</Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 deals__baner--col">
            <div className="banner__items text-right">
              <Link className="banner__items--thumbnail display-block" to="/shop">
                <img 
                  className="banner__items--thumbnail__img display-block" 
                  src="/assets/img/banner/banner-layer.png" 
                  alt="banner-layer-img" 
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsBanner;
