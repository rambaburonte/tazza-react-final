import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_CONFIG } from '../config/apiConfig';

const ProductCard = ({ product }) => {
  // Handle API product structure and normalize prices
  const price = parseFloat(product.sell_price ?? product.price ?? 0) || 0;
  // Determine an old/original price to show as strike-through (prefer explicit original_price / oldPrice)
  const candidateOriginal = parseFloat(product.original_price ?? product.oldPrice ?? product.old_price ?? 0) || 0;
  const oldPrice = candidateOriginal > price ? candidateOriginal : (parseFloat(product.price || 0) > price ? parseFloat(product.price) : undefined);
  // compute discount percent if not provided by API
  const discountPercent = (typeof product.discount !== 'undefined' && product.discount !== null && product.discount !== '' && !isNaN(Number(product.discount)))
    ? Math.round(Number(product.discount))
    : (oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0);
  
  // Parse images array from API response (it's a JSON string or array)
  let parsedImages = [];
  try {
    if (product.images && typeof product.images === 'string') {
      parsedImages = JSON.parse(product.images).filter(img => img && img.trim() !== '');
    } else if (Array.isArray(product.images)) {
      parsedImages = product.images.filter(img => img && img.trim() !== '');
    }
  } catch (e) {
    console.warn('Failed to parse product images:', e);
  }
  
  // Process images - if they already have full URLs, use as is, otherwise add API_CONFIG.IMAGE_URL
  const processedImages = parsedImages.map(img => {
    return img.startsWith('http') ? img : `${API_CONFIG.IMAGE_URL}${img}`;
  });
  
  // If no valid images, try to use cover image
  const images = processedImages.length > 0 
    ? processedImages
    : [product.cover ? (product.cover.startsWith('http') ? product.cover : `${API_CONFIG.IMAGE_URL}${product.cover}`) : '/assets/img/product/default.png'];
  
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  const startImageCarousel = () => {
    if (images.length <= 1) return;
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % images.length;
      setCurrentImage(idx);
    }, 700); // Change image every 700ms
  };

  const stopImageCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImage(0);
  };

  return (
    <div className="product__items">
      <style>
        {`
          .product__items--action {
            display: none;
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 10;
          }
          .product__items:hover .product__items--action {
            display: block;
          }
        `}
      </style>
      <div className="product__items--thumbnail">
        <Link 
          className="product__items--link" 
          to={`/product/${product.id}`}
          onMouseEnter={startImageCarousel}
          onMouseLeave={stopImageCarousel}
        >
          <img 
            className="product__items--img product__primary--img" 
            src={images[currentImage]} 
            alt="product-img" 
            style={{ display: 'block' }}
            onError={(e) => {
              e.target.src = '/assets/img/product/default.png';
            }}
          />
        </Link>
        {(discountPercent > 0) && (
          <div className="product__badge">
            <span className="product__badge--items sale">{discountPercent}% OFF</span>
          </div>
        )}
        <ul className="product__items--action">
          <li className="product__items--action__list">
            <button className="product__items--action__btn" aria-label="Wishlist">
              <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
              </svg>
              <span className="visually-hidden">Wishlist</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="product__items--content text-center">
        <button className="add__to--cart__btn">+ Add to cart</button>
        <h3 className="product__items--content__title h4">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product__items--price">
          <span className="current__price">${price.toFixed(2)}</span>
          {(typeof oldPrice === 'number' && oldPrice > price) && (
            <span className="old__price">${oldPrice.toFixed(2)}</span>
          )}
          {/* keep showing explicit original_price if present for clarity */}
          {product.original_price && (!oldPrice || Number(product.original_price) !== oldPrice) && (
            <span className="original__price" style={{ display: 'block', color: '#888', fontSize: '13px', textDecoration: 'line-through' }}>
              ${parseFloat(product.original_price).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
