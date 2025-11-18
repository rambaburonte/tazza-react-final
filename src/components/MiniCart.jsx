import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { API_CONFIG } from '../config/apiConfig';

const MiniCart = ({ isOpen, onClose }) => {
  const cart = useCart();

  const updateQuantity = (id, change) => {
    const item = cart.cart.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantiy + change);
      cart.updateQuantity(id, newQuantity);
    }
  };

  const removeItem = (id) => {
    cart.removeItem(id);
  };

  const calculateTotal = () => {
    return cart.totalPrice.toFixed(2);
  };

  const getItemImage = (item) => {
    if (item.cover && typeof item.cover === 'string' && item.cover.trim()) {
      return item.cover.startsWith('http') ? item.cover : `${API_CONFIG.IMAGE_URL}${item.cover}`;
    }
    return '/assets/img/product/default.png';
  };

  const getItemPrice = (item) => {
    // Use the same pricing logic as cart context
    const discount = parseFloat(item.discount) || 0;
    if (discount > 0) {
      return parseFloat(item.sell_price || item.price || '0');
    } else {
      return parseFloat(item.original_price || item.price || '0');
    }
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
        {cart.cart.length === 0 ? (
          <div className="text-center py-4">
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.cart.map(item => (
            <div key={item.id} className="minicart__product--items d-flex">
              <div className="minicart__thumb">
                <Link to={`/product/${item.id}`}>
                  <img src={getItemImage(item)} alt={item.name} />
                </Link>
              </div>
              <div className="minicart__text">
                <h4 className="minicart__subtitle">
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h4>
                <span className="color__variant"><b>Store:</b> {item.store_name}</span>
                <div className="minicart__price">
                  <span className="current__price">${getItemPrice(item).toFixed(2)}</span>
                  {parseFloat(item.discount) > 0 && (
                    <span className="old__price">${parseFloat(item.original_price || item.price || '0').toFixed(2)}</span>
                  )}
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
                      <input type="number" className="quantity__number" value={item.quantiy} readOnly />
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
          ))
        )}
      </div>

      {cart.cart.length > 0 && (
        <>
          <div className="minicart__amount">
            <div className="minicart__amount_list d-flex justify-content-between">
              <span>Sub Total:</span>
              <span><b>${cart.totalPrice.toFixed(2)}</b></span>
            </div>
            {cart.discount > 0 && (
              <div className="minicart__amount_list d-flex justify-content-between">
                <span>Discount:</span>
                <span><b>-${cart.discount.toFixed(2)}</b></span>
              </div>
            )}
            {cart.deliveryPrice > 0 && (
              <div className="minicart__amount_list d-flex justify-content-between">
                <span>Delivery:</span>
                <span><b>${cart.deliveryPrice.toFixed(2)}</b></span>
              </div>
            )}
            <div className="minicart__amount_list d-flex justify-content-between">
              <span>Total:</span>
              <span><b>${cart.grandTotal.toFixed(2)}</b></span>
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
        </>
      )}
    </div>
  );
};

export default MiniCart;
