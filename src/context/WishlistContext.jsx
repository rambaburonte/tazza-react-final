import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const data = localStorage.getItem('wishlist');
    if (data && data !== 'null') {
      try {
        setWishlist(JSON.parse(data));
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      // Ensure the product has a proper cover field for image display
      const wishlistItem = {
        ...product,
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
        })()
      };
      setWishlist([...wishlist, wishlistItem]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const getTotalWishlistItems = () => wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getTotalWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
