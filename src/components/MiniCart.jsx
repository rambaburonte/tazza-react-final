import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MiniCart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'The is Garden Vegetable.',
      color: 'Beige',
      price: 125.00,
      oldPrice: 140.00,
      quantity: 1,
      image: 'product1.png'
    },
    {
      id: 2,
      name: 'Fresh Tomatoe is organic.',
      color: 'Green',
      price: 115.00,
      oldPrice: 130.00,
      quantity: 1,
      image: 'product2.png'
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className={`offCanvas__minicart ${isOpen ? 'active' : ''}`}>
      <div className="minicart__header">
        <div className="minicart__header--top d-flex justify-content-between align-items-center">
          <h3 className="minicart__title">Shopping Cart</h3>
          <button className="minicart__close--btn" aria-label="minicart close btn" onClick={onClose}>
            <svg className="minicart__close--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368"/>
            </svg>
          </button>
        </div>
        <p className="minicart__header--desc">The organic foods products are limited</p>
      </div>
      
      <div className="minicart__product">
        {cartItems.map(item => (
          <div key={item.id} className="minicart__product--items d-flex">
            <div className="minicart__thumb">
              <Link to="#">
                <img src={`/assets/img/product/${item.image}`} alt="product-img" />
              </Link>
            </div>
            <div className="minicart__text">
              <h4 className="minicart__subtitle">
                <Link to="#">{item.name}</Link>
              </h4>
              <span className="color__variant"><b>Color:</b> {item.color}</span>
              <div className="minicart__price">
                <span className="current__price">${item.price.toFixed(2)}</span>
                <span className="old__price">${item.oldPrice.toFixed(2)}</span>
              </div>
              <div className="minicart__text--footer d-flex align-items-center">
                <div className="quantity__box minicart__quantity">
                  <button 
                    type="button" 
                    className="quantity__value decrease" 
                    aria-label="quantity value"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <label>
                    <input type="number" className="quantity__number" value={item.quantity} readOnly />
                  </label>
                  <button 
                    type="button" 
                    className="quantity__value increase" 
                    aria-label="quantity value"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="minicart__product--remove" 
                  type="button"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="minicart__amount">
        <div className="minicart__amount_list d-flex justify-content-between">
          <span>Sub Total:</span>
          <span><b>${calculateTotal()}</b></span>
        </div>
        <div className="minicart__amount_list d-flex justify-content-between">
          <span>Total:</span>
          <span><b>${calculateTotal()}</b></span>
        </div>
      </div>
      
      <div className="minicart__conditions text-center">
        <input className="minicart__conditions--input" id="accept" type="checkbox" />
        <label className="minicart__conditions--label" htmlFor="accept">
          I agree with the <Link className="minicart__conditions--link" to="#">Privacy Policy</Link>
        </label>
      </div>
      
      <div className="minicart__button d-flex justify-content-center">
        <Link className="btn minicart__button--link" to="/cart">View cart</Link>
        <Link className="btn minicart__button--link" to="/checkout">Checkout</Link>
      </div>
    </div>
  );
};

export default MiniCart;
