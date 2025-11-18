/**
 * Cart Context - Complete Port from Pure Meat cart.service.ts
 * Handles all cart operations, calculations, and persistence
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_CONFIG, API_ENDPOINTS } from '../config/apiConfig';

// ============================================
// CART CONTEXT
// ============================================

const CartContext = createContext(undefined);

// ============================================
// CART PROVIDER
// ============================================

export function CartProvider({ children }) {
  // Cart state
  const [cart, setCart] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [stores, setStores] = useState([]);

  // Pricing state
  const [totalPrice, setTotalPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [orderTax, setOrderTax] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [walletDiscount, setWalletDiscount] = useState(0);

  // Settings state
  const [shipping, setShipping] = useState('km');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [minOrderPrice, setMinOrderPrice] = useState(0);
  const [freeShipping, setFreeShipping] = useState(0);

  // Delivery state
  const [deliveryAt, setDeliveryAt] = useState('home');
  const [deliveryAddress, setDeliveryAddressState] = useState(null);
  const [datetime, setDatetime] = useState(null);

  // Coupon state
  const [coupon, setCoupon] = useState(null);

  // Store-specific data
  const [userOrderTaxByStores, setUserOrderTaxByStores] = useState([]);

  // ============================================
  // INITIALIZATION - Load cart from localStorage and app settings
  // ============================================

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const data = localStorage.getItem('cart');
      if (data && data !== 'null') {
        const userCart = JSON.parse(data);
        if (userCart && Array.isArray(userCart) && userCart.length > 0) {
          setCart(userCart);
          setItemId(Array.from(new Set(userCart.map((item) => item.id))));
          // Extract unique stores from cart
          const uniqueStores = Array.from(
            new Map(
              userCart.map((item) => [
                item.store_id,
                { id: item.store_id, name: item.store_name },
              ])
            ).values()
          );
          setStores(uniqueStores);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      localStorage.removeItem('cart');
    }
    // Load app settings as before
    const loadAppSettings = async () => {
      try {
        console.log('⚙️ Loading app settings for cart calculations...');
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.UTILITIES.GET_SETTINGS}`);
        const data = await response.json();
        if (response.ok && data) {
          const general = data.general || data;
          console.log('✅ App settings loaded:', general);
          setAppSettings({
            orderTax: parseFloat(general.tax || '5'),
            shipping: general.shipping || 'km',
            shippingPrice: parseFloat(general.shippingPrice || '10'),
            minOrderPrice: parseFloat(general.min || '100'),
            freeShipping: parseFloat(general.free || '500'),
          });
        } else {
          console.warn('⚠️ Failed to load app settings, using defaults');
          setAppSettings({
            orderTax: 5,
            shipping: 'km',
            shippingPrice: 10,
            minOrderPrice: 100,
            freeShipping: 500,
          });
        }
      } catch (error) {
        console.error('❌ Failed to load app settings:', error);
        setAppSettings({
          orderTax: 5,
          shipping: 'km',
          shippingPrice: 10,
          minOrderPrice: 100,
          freeShipping: 500,
        });
      }
    };
    loadAppSettings();
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ============================================
  // CALCULATION LOGIC (Port from Angular)
  // ============================================

  const parsePrice = (value) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    const str = String(value).trim();
    if (str === '') return 0;
    const cleaned = str.replace(/[^0-9.-]+/g, '');
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  const calculate = useCallback(async () => {
    console.log('🧮 Calculating cart totals...');

    // Reset store-specific data
    setUserOrderTaxByStores([]);

    // Calculate subtotal - EXACTLY like Pure Meat Angular cart.service.ts
    let total = 0;
    cart.forEach((element) => {
      console.log('Cart calculation for item:', {
        id: element.id,
        name: element.name,
        size: element.size,
        price: element.price,
        original_price: element.original_price,
        sell_price: element.sell_price,
        discount: element.discount,
        quantiy: element.quantiy
      });

      // EXACTLY like Pure Meat: check discount field first
      if (parseFloat(element.discount) === 0) {
        // No discount - use original_price for non-variations, variation discount/price for variations
        if (element.size === 1 && element.variations && element.variations.length > 0) {
          const variationGroup = element.variations[0];
          const selectedVariation = variationGroup?.items?.[element.variant];
          if (selectedVariation) {
            const discountVal = parsePrice(selectedVariation.discount);
            const priceVal = parsePrice(selectedVariation.price);
            const price = discountVal > 0 ? discountVal : priceVal;
            console.log('Variation calculation (no discount):', { discountVal, priceVal, price, quantiy: element.quantiy });
            total += price * (element.quantiy || 0);
          }
        } else {
          // Use original_price for non-variations when no discount
          const price = parsePrice(element.original_price);
          console.log('Regular calculation (no discount):', { price, quantiy: element.quantiy });
          total += price * (element.quantiy || 0);
        }
      } else {
        // Has discount - use sell_price for non-variations, variation discount/price for variations
        if (element.size === 1 && element.variations && element.variations.length > 0) {
          const variationGroup = element.variations[0];
          const selectedVariation = variationGroup?.items?.[element.variant];
          if (selectedVariation) {
            const discountVal = parsePrice(selectedVariation.discount);
            const priceVal = parsePrice(selectedVariation.price);
            const price = discountVal > 0 ? discountVal : priceVal;
            console.log('Variation calculation (with discount):', { discountVal, priceVal, price, quantiy: element.quantiy });
            total += price * (element.quantiy || 0);
          }
        } else {
          // Use sell_price for non-variations when discount exists
          const price = parsePrice(element.sell_price);
          console.log('Regular calculation (with discount):', { price, quantiy: element.quantiy });
          total += price * (element.quantiy || 0);
        }
      }
    });

    // Normalize subtotal to two decimals
    total = parseFloat(total.toFixed(2));
    console.log('💰 Subtotal:', total);
    setTotalPrice(total);

    // Calculate coupon discount
    let currentDiscount = 0;
    if (coupon && coupon.type) {
      const min = parseFloat(coupon.min);
      if (total >= min) {
        if (coupon.type === 'per') {
          // Percentage discount
          const percentage = (total / 100) * parseFloat(coupon.off);
          currentDiscount = parseFloat(percentage.toFixed(2));
          console.log('🎫 Coupon discount (percentage):', currentDiscount);
        } else {
          // Fixed amount discount
          currentDiscount = parseFloat(coupon.off);
          console.log('🎫 Coupon discount (fixed):', currentDiscount);
        }
        setDiscount(currentDiscount);
      } else {
        // Minimum order not met, remove coupon
        console.log('❌ Coupon minimum not met, removing coupon');
        setDiscount(0);
        setCoupon(null);
      }
    } else {
      setDiscount(0);
    }

    // Calculate delivery charges for home delivery
    if (deliveryAt === 'home') {
      console.log(`🚚 Calculating delivery charges (${shipping} mode)...`);

      let totalKM = 0;
      const taxAmount = parseFloat(((total * orderTax) / 100).toFixed(2));
      const taxEach = stores.length > 0 ? parseFloat((taxAmount / stores.length).toFixed(2)) : taxAmount;
      const taxByStores = [];

      // For KM-based shipping, calculate distance if address is available
      if (shipping === 'km' && stores.length > 0 && deliveryAddress && deliveryAddress.lat && deliveryAddress.lng) {
        for (const store of stores) {
          if (store.lat && store.lng) {
            const distance = distanceInKm(
              parseFloat(deliveryAddress.lat),
              parseFloat(deliveryAddress.lng),
              parseFloat(store.lat),
              parseFloat(store.lng)
            );

            console.log(`📍 Distance to ${store.name}:`, distance, 'km');
            totalKM += distance;

            taxByStores.push({
              store_id: store.id,
              distance: parseFloat(distance.toFixed(2)),
              tax: taxEach,
              shipping,
              shippingPrice,
            });
          }
        }
      } else if (stores.length > 0) {
        // Fixed shipping or no address yet - still populate tax by stores
        for (const store of stores) {
          taxByStores.push({
            store_id: store.id,
            distance: 0,
            tax: taxEach,
            shipping,
            shippingPrice,
          });
        }
      }

      setUserOrderTaxByStores(taxByStores);

      // Wait a bit for async distance calculations
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Calculate delivery price based on shipping mode
      let currentDeliveryPrice = 0;
      let currentGrandTotal = 0;

      if (freeShipping > total) {
        // Order doesn't qualify for free shipping - charge delivery
        if (shipping === 'km') {
          if (totalKM > 0) {
            // Distance-based charges (address provided with valid distance)
            const distanceCharge = totalKM * shippingPrice;
            currentDeliveryPrice = parseFloat(distanceCharge.toFixed(2));
            console.log(`💰 KM-based delivery: ${totalKM} km × ₹${shippingPrice} = ₹${currentDeliveryPrice}`);
          } else {
            // No address or zero distance - use base shipping price as placeholder
            currentDeliveryPrice = shippingPrice;
            console.log(`💰 KM-based delivery (no address): base fee ₹${currentDeliveryPrice}`);
          }
        } else {
          // Fixed shipping - always use fixed price
          currentDeliveryPrice = shippingPrice;
          console.log(`💰 Fixed delivery: ₹${currentDeliveryPrice}`);
        }
        currentGrandTotal = total - currentDiscount + taxAmount + currentDeliveryPrice;
      } else {
        // Free shipping qualified
        console.log(`✅ Free shipping applied (subtotal ≥ ₹${freeShipping})`);
        currentDeliveryPrice = 0;
        currentGrandTotal = total - currentDiscount + taxAmount;
      }

      setDeliveryPrice(currentDeliveryPrice);

      // Apply wallet discount
      currentGrandTotal = parseFloat(currentGrandTotal.toFixed(2));
      if (currentGrandTotal <= walletDiscount) {
        setWalletDiscount(currentGrandTotal);
        setGrandTotal(0);
      } else {
        setGrandTotal(parseFloat((currentGrandTotal - walletDiscount).toFixed(2)));
      }

      console.log(`🏁 Grand total: ₹${currentGrandTotal} (delivery: ₹${currentDeliveryPrice}, tax: ₹${taxAmount})`);
    } else {
      // Store pickup or no delivery address
      console.log('🏪 Store pickup or no address');

      setDeliveryPrice(0);

      const taxAmount = parseFloat(((total * orderTax) / 100).toFixed(2));
      const taxEach = stores.length > 0 ? parseFloat((taxAmount / stores.length).toFixed(2)) : taxAmount;
      const taxByStores = stores.map((store) => ({
        store_id: store.id,
        distance: 0,
        tax: taxEach,
        shipping,
        shippingPrice,
      }));

      setUserOrderTaxByStores(taxByStores);

      let currentGrandTotal = total - currentDiscount + taxAmount;
      currentGrandTotal = parseFloat(currentGrandTotal.toFixed(2));

      // Apply wallet discount
      if (currentGrandTotal <= walletDiscount) {
        setWalletDiscount(currentGrandTotal);
        setGrandTotal(0);
      } else {
        setGrandTotal(parseFloat((currentGrandTotal - walletDiscount).toFixed(2)));
      }

      console.log('🏁 Grand total (pickup):', currentGrandTotal);
    }

    // ...existing code...
  }, [cart, coupon, deliveryAddress, deliveryAt, orderTax, shipping, shippingPrice, freeShipping, stores, walletDiscount]);

  // Recalculate when cart or dependencies change
  useEffect(() => {
    if (cart.length > 0) {
      calculate();
    } else {
      // Even with empty cart, ensure totals are reset
      setTotalPrice(0);
      setGrandTotal(0);
      setDiscount(0);
      setDeliveryPrice(0);
      setWalletDiscount(0);
    }
  }, [cart, deliveryAddress, deliveryAt, coupon, walletDiscount, orderTax, shipping, shippingPrice, freeShipping, calculate]);

  // ============================================
  // CART ACTIONS
  // ============================================

  const addItem = async (item) => {
    console.log('➕ Adding item to cart:', item.name);

    // Check if cart has items from different store
    if (cart.length > 0 && cart[0].store_id !== item.store_id) {
      const shouldClear = await clearCartWithConfirm();
      if (!shouldClear) {
        return false;
      }
    }

    // Check if item already exists
    const existingIndex = cart.findIndex((x) => x.id === item.id);
    if (existingIndex !== -1) {
      // Item exists, increase quantity
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantiy += item.quantiy;
      setCart(updatedCart);
    } else {
      // New item
      setCart([...cart, item]);
      setItemId([...itemId, item.id]);

      // Add store if not already in stores list
      if (!stores.find((s) => s.id === item.store_id)) {
        setStores([...stores, { id: item.store_id, name: item.store_name }]);
      }
    }

    // Show success message (you can implement toast notifications)
    console.log('✅ Item added to cart');
    return true;
  };

  const removeItem = (productId) => {
    console.log('➖ Removing item from cart:', productId);

    const updatedCart = cart.filter((x) => x.id !== productId);
    const updatedItemId = itemId.filter((x) => x !== productId);

    setCart(updatedCart);
    setItemId(updatedItemId);

    if (updatedCart.length === 0) {
      clearCart();
    } else {
      // Update stores list
      const cartStoreIds = Array.from(new Set(updatedCart.map((item) => item.store_id)));
      const updatedStores = stores.filter((store) => cartStoreIds.includes(store.id));
      setStores(updatedStores);
    }

    console.log('✅ Item removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    console.log('✏️ Updating quantity:', productId, quantity);

    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantiy: quantity } : item
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    console.log('🗑️ Clearing cart');

    setCart([]);
    setItemId([]);
    setTotalPrice(0);
    setGrandTotal(0);
    setCoupon(null);
    setDiscount(0);
    setDatetime(null);
    setStores([]);
    setDeliveryAddressState(null);
    setShippingPrice(0);
    setWalletDiscount(0);
    setDeliveryPrice(0);
    setUserOrderTaxByStores([]);

    localStorage.removeItem('cart');
  };

  const clearCartWithConfirm = async () => {
    const result = window.confirm("You already have items in cart from a different store. Would you like to clear your current cart?");

    if (result) {
      clearCart();
      return true;
    }

    return false;
  };

  // ============================================
  // COUPON ACTIONS
  // ============================================

  const applyCoupon = (newCoupon) => {
    console.log('🎫 Applying coupon:', newCoupon.code);
    setCoupon(newCoupon);
  };

  const removeCoupon = () => {
    console.log('🎫 Removing coupon');
    setCoupon(null);
    setDiscount(0);
  };

  // ============================================
  // DELIVERY ACTIONS
  // ============================================

  const setDeliveryAddress = (address) => {
    console.log('📍 Setting delivery address:', address?.address);
    setDeliveryAddressState(address);
  };

  const setDeliveryOption = (option) => {
    console.log('🚚 Setting delivery option:', option);
    setDeliveryAt(option);
  };

  const setDeliveryTime = (time) => {
    console.log('⏰ Setting delivery time:', time);
    setDatetime(time);
  };

  // ============================================
  // WALLET ACTIONS
  // ============================================

  const applyWalletDiscount = (amount) => {
    console.log('💳 Applying wallet discount:', amount);
    setWalletDiscount(amount);
  };

  // ============================================
  // APP SETTINGS
  // ============================================

  const setAppSettings = (settings) => {
    console.log('⚙️ Setting app settings:', settings);
    setOrderTax(settings.orderTax);
    setShipping(settings.shipping);
    setShippingPrice(settings.shippingPrice);
    setMinOrderPrice(settings.minOrderPrice);
    setFreeShipping(settings.freeShipping);
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  const checkProductInCart = (productId) => {
    return itemId.includes(productId);
  };

  const isInCart = (productId) => {
    return checkProductInCart(productId);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantiy, 0);
  };

  const getStoreIds = () => {
    return stores.map((store) => store.id);
  };

  // Simplified addToCart for ProductCard component - EXACTLY like Pure Meat
  const addToCart = async (product) => {
    // Handle BOTH Pure Meat API and our mock data structure
    // Pure Meat API: { original_price: 346, sell_price: 287.18, discount: 17 }
    // Mock data: { price: "4.99", originalPrice: "6.99", discount: 29 }

    // Determine original price (before discount)
    const originalPriceValue = product.original_price || product.originalPrice || product.price;

    // Determine selling/current price (after discount if any)
    // Pure Meat uses sell_price, mock uses price when originalPrice exists
    const sellingPriceValue = product.sell_price || product.selling || product.price;

    // Check if product has discount - Pure Meat always has discount field
    const discountValue = product.discount || 0;
    const hasDiscount = discountValue > 0 || (originalPriceValue && sellingPriceValue && originalPriceValue !== sellingPriceValue);

    // Map to Pure Meat CartItem structure
    const cartItem = {
      id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
      name: product.name,
      cover: (() => {
        // Handle image field properly - prioritize cover, then images, then image
        if (product.cover && typeof product.cover === 'string' && product.cover.trim()) {
          return product.cover;
        }
        if (product.image && typeof product.image === 'string' && product.image.trim()) {
          return product.image;
        }
        if (product.images) {
          // If images is an array, take the first image
          if (Array.isArray(product.images) && product.images.length > 0) {
            const firstImg = product.images[0];
            return typeof firstImg === 'string' && firstImg.trim() ? firstImg : '';
          }
          // If images is a JSON string, parse it
          if (typeof product.images === 'string') {
            try {
              const parsed = JSON.parse(product.images);
              if (Array.isArray(parsed) && parsed.length > 0) {
                const firstImg = parsed[0];
                return typeof firstImg === 'string' && firstImg.trim() ? firstImg : '';
              }
            } catch (e) {
              // If parsing fails, return empty string
            }
          }
        }
        return '';
      })(),
      price: sellingPriceValue?.toString() || '0',
      original_price: originalPriceValue?.toString() || '0',
      sell_price: sellingPriceValue?.toString() || '0',
      discount: discountValue?.toString() || '0',
      size: product.size || 0,
      variations: product.variations || [],
      variant: 0,
      quantiy: 1,
      store_id: product.store_id || 1,
      store_name: product.store_name || product.store?.name || 'Default Store',
      cid: product.cid || product.cate_id || product.category_id || 0,
      sub_cid: product.sub_cid || product.sub_cate_id || 0,
      kind: product.kind || 0,
      in_offer: product.in_offer || product.featured ? 1 : 0,
    };

    console.log('🛒 Adding to cart with Pure Meat pricing:', {
      name: cartItem.name,
      rawProduct: {
        original_price: product.original_price,
        sell_price: product.sell_price,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount
      },
      mappedCartItem: {
        original_price: cartItem.original_price,
        sell_price: cartItem.sell_price,
        price: cartItem.price,
        discount: cartItem.discount
      },
      hasDiscount
    });

    await addItem(cartItem);
  };

  // ============================================
  // DISTANCE CALCULATION UTILITY
  // ============================================

  const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
  };

  const distanceInKm = (lat1, lon1, lat2, lon2) => {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  // ============================================
  // CONTEXT VALUE
  // ============================================

  const value = {
    // Cart data
    cart,
    itemId,
    stores,

    // Pricing
    totalPrice,
    grandTotal,
    discount,
    orderTax,
    deliveryPrice,
    walletDiscount,

    // Settings
    shipping,
    shippingPrice,
    minOrderPrice,
    freeShipping,

    // Delivery
    deliveryAt,
    deliveryAddress,
    datetime,

    // Coupon
    coupon,

    // Store-specific data
    userOrderTaxByStores,

    // Actions
    addItem,
    addToCart,
    removeItem,
    updateQuantity,
    clearCart,
    clearCartWithConfirm,

    // Coupon actions
    applyCoupon,
    removeCoupon,

    // Delivery actions
    setDeliveryAddress,
    setDeliveryOption,
    setDeliveryTime,

    // Wallet actions
    applyWalletDiscount,

    // App settings
    setAppSettings,

    // Utility
    checkProductInCart,
    isInCart,
    getTotalItems,
    getStoreIds,
    calculate,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============================================
// HOOK
// ============================================

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}