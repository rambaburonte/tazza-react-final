import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="product__items">
      <div className="product__items--thumbnail">
        <Link 
          className="product__items--link" 
          to={`/product/${product.id}`}
          onMouseEnter={() => setCurrentImage(1)}
          onMouseLeave={() => setCurrentImage(0)}
        >
          <img 
            className="product__items--img product__primary--img" 
            src={`/assets/img/product/${product.images[0]}`} 
            alt="product-img" 
            style={{ display: currentImage === 0 ? 'block' : 'none' }}
          />
          <img 
            className="product__items--img product__secondary--img" 
            src={`/assets/img/product/${product.images[1]}`} 
            alt="product-img"
            style={{ display: currentImage === 1 ? 'block' : 'none' }}
          />
        </Link>
        {product.badge && (
          <div className="product__badge">
            <span className="product__badge--items sale">{product.badge}</span>
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
          <li className="product__items--action__list">
            <button className="product__items--action__btn" aria-label="Quick View">
              <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/>
              </svg>
              <span className="visually-hidden">Quick View</span>
            </button>
          </li>
          <li className="product__items--action__list">
            <button className="product__items--action__btn" aria-label="Compare">
              <svg className="product__items--action__btn--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M400 304l48 48-48 48M400 112l48 48-48 48M64 352h85.19a80 80 0 0066.56-35.62L256 256"/>
                <path d="M64 160h85.19a80 80 0 0166.56 35.62l80.5 120.76A80 80 0 00362.81 352H416M416 160h-53.19a80 80 0 00-66.56 35.62L288 208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
              </svg>
              <span className="visually-hidden">Compare</span>
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
          <span className="current__price">${product.price.toFixed(2)}</span>
          <span className="old__price">${product.oldPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
