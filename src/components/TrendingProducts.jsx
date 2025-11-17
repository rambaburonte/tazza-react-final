import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useHome } from '../context/HomeContext';
import { API_CONFIG } from '../config/apiConfig';

const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { homeData, loading, error } = useHome();

  const products = homeData?.topProducts?.map(product => {
    let imagesArr = [];
    if (Array.isArray(product.images)) {
      imagesArr = product.images;
    } else if (typeof product.images === 'string') {
      try {
        imagesArr = JSON.parse(product.images);
        if (!Array.isArray(imagesArr)) imagesArr = [];
      } catch {
        imagesArr = [];
      }
    }
    
    // Filter out empty/null images and add API_CONFIG.IMAGE_URL prefix
    let validImages = imagesArr.filter(img => img && img.trim() !== '').map(img => {
      return img.startsWith('http') ? img : API_CONFIG.IMAGE_URL + img;
    });
    
    // Add cover image as the first image if it exists and valid images array is empty
    if (product.cover && product.cover.trim() !== '' && validImages.length === 0) {
      const coverUrl = product.cover.startsWith('http') ? product.cover : API_CONFIG.IMAGE_URL + product.cover;
      validImages.unshift(coverUrl);
    }
    
    // If still no images, use default
    if (validImages.length === 0) {
      validImages = ['/assets/img/product/default.png'];
    }
    
    return {
      id: product.id,
      name: product.name,
      price: typeof product.sell_price === 'number' ? product.sell_price : (typeof product.price === 'number' ? product.price : 0),
      oldPrice: typeof product.original_price === 'number' ? product.original_price : (typeof product.old_price === 'number' ? product.old_price : undefined),
      images: validImages,
      badge: (typeof product.original_price === 'number' && typeof product.sell_price === 'number' && product.original_price > product.sell_price) ? 'Sale' : null,
      category: product.category ? (Array.isArray(product.category) ? product.category : [product.category]) : ['all']
    };
  }) || [];

  const filteredProducts = products.filter(product => 
    activeTab === 'all' || product.category.includes(activeTab)
  );

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'fresh', label: 'Fresh' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'nature', label: 'Nature' },
    { id: 'recipies', label: 'Recipies' },
    { id: 'vegetable', label: 'Vegetable' }
  ];

  return (
    <section className="product__section section--padding pt-0">
      <div className="container">
        <div className="section__heading text-center mb-25">
          <span className="section__heading--subtitle">Recently added our store</span>
          <h2 className="section__heading--maintitle">Trending Products</h2>
        </div>
        
        <ul className="product__tab--one product__tab--btn d-flex justify-content-center mb-35">
          {tabs.map((tab) => (
            <li 
              key={tab.id}
              className={`product__tab--btn__list ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>

        <div className="tab_content">
          <div className={`tab_pane ${activeTab ? 'active show' : ''}`}>
            <div className="product__section--inner">
              <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n28">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="col mb-28">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
