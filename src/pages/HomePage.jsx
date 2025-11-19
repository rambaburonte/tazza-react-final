import React from 'react';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import ProductCategories from '../components/ProductCategories';
import TrendingProducts from '../components/TrendingProducts';
import DealsBanner from '../components/DealsBanner';
import BannerSection from '../components/BannerSection';
import BlogSection from '../components/BlogSection';
import TestimonialSection from '../components/TestimonialSection';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      
      <main className="main__content_wrapper">
        <HeroSlider />
        <ProductCategories />
        <TrendingProducts />
        
        <BannerSection />
        <DealsBanner />
        {/* <BlogSection />
        <TestimonialSection /> */}
        <ShippingInfo />
      </main>
      
      <Footer />
    </>
  );
};

export default HomePage;
