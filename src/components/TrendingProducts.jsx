import React, { useState } from 'react';
import ProductCard from './ProductCard';

const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Vegetable-healthy',
      price: 39.00,
      oldPrice: 59.00,
      images: ['product1.png', 'product2.png'],
      badge: 'Sale',
      category: ['all', 'fresh', 'nature']
    },
    {
      id: 2,
      name: 'Fresh-whole-fish',
      price: 42.00,
      oldPrice: 48.00,
      images: ['product3.png', 'product4.png'],
      badge: 'Sale',
      category: ['all', 'fresh', 'fruits']
    },
    {
      id: 3,
      name: 'Chili-pepper',
      price: 38.00,
      oldPrice: 44.00,
      images: ['product5.png', 'product6.png'],
      badge: 'Sale',
      category: ['all', 'nature', 'vegetable']
    },
    {
      id: 4,
      name: 'Green-surface',
      price: 38.00,
      oldPrice: 40.00,
      images: ['product7.png', 'product8.png'],
      badge: 'Sale',
      category: ['all', 'recipies', 'vegetable']
    },
    {
      id: 5,
      name: 'Red-tomato-isolated',
      price: 52.00,
      oldPrice: 62.00,
      images: ['product2.png', 'product1.png'],
      badge: 'Sale',
      category: ['all', 'fresh', 'fruits']
    },
    {
      id: 6,
      name: 'Raw-onions-surface',
      price: 58.00,
      oldPrice: 68.00,
      images: ['product4.png', 'product3.png'],
      badge: 'Sale',
      category: ['all', 'vegetable', 'nature']
    },
    {
      id: 7,
      name: 'Chili-pepper',
      price: 52.00,
      oldPrice: 62.00,
      images: ['product6.png', 'product5.png'],
      badge: 'Sale',
      category: ['all', 'recipies', 'fruits']
    },
    {
      id: 8,
      name: 'Papaya-green',
      price: 48.00,
      oldPrice: 54.00,
      images: ['product8.png', 'product7.png'],
      badge: 'Sale',
      category: ['all', 'fresh', 'nature']
    }
  ];

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
