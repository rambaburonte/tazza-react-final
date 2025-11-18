import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { API_CONFIG, API_ENDPOINTS } from '../config/apiConfig';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import ShippingInfo from '../components/ShippingInfo';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('/assets/img/product/big-product1.jpg');
  const [activeTab, setActiveTab] = useState('description');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const productId = id;
  const cart = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID not provided');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.PRODUCTS.GET_BY_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ id: Number(productId) })
        });
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const json = await res.json();
        if (!json || !json.data) throw new Error('Invalid product data');
        const data = json.data;
        // Parse images string if present
        let images = [];
        try {
          images = data.images ? JSON.parse(data.images) : [];
        } catch (err) {
          images = [];
        }
        // Build product object
        const prod = {
          id: data.id,
          name: data.name,
          cover: data.cover,
          images: images && images.length ? images.filter(Boolean) : [],
          price: data.sell_price || data.original_price || 0,
          oldPrice: data.original_price || null,
          rating: data.rating || 0,
          reviews: data.total_rating || 0,
          description: data.descriptions || '',
          // normalize in_stock to number (API uses `in_stoke`)
          in_stock: Number(data.in_stoke ?? data.in_stock ?? 0),
          // include feature & disclaimer fields
          key_features: data.key_features || null,
          disclaimer: data.disclaimer || null,
          soldby: json.soldby || null,
          related: json.related || [],
          have_pcs: Number(data.have_pcs),
          pcs: data.pcs,
          have_kg: Number(data.have_kg),
          kg: data.kg,
          have_gram: Number(data.have_gram),
          gram: data.gram,
          have_liter: Number(data.have_liter),
          liter: data.liter,
          have_ml: Number(data.have_ml),
          ml: data.ml
        };
        setProduct(prod);
        // set selectedImage if cover present otherwise first image
        const firstImg = (prod.images && prod.images.length > 0) ? `${API_CONFIG.IMAGE_URL}${prod.images[0]}` : null;
        setSelectedImage(prod.cover ? `${API_CONFIG.IMAGE_URL}${prod.cover}` : (firstImg || '/assets/img/product/big-product1.jpg'));
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Using product state from API response

  // Debug: log product to check measurement fields
  if (product) {
    // eslint-disable-next-line
    console.log('Product for measurement:', product);
  }

  return (
    <>
      <Header />
      <main className="main__content_wrapper">
        <style>{` 
          .pd-wrap { padding: 40px 0; }
          .pd-grid { display: flex; gap: 24px; align-items: flex-start; }
          .pd-left { flex: 1 1 48%; }
          .pd-right { flex: 1 1 48%; }
          .pd-card { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(15,23,42,0.03); }
          .pd-image { width: 100%; border-radius: 8px; object-fit: cover; }
          .pd-thumbs { display:flex; gap:8px; margin-top:12px; }
          .pd-thumb { width:56px; height:56px; border-radius:8px; object-fit:cover; cursor:pointer; border:1px solid #eee; }
          .pd-title { font-size: 26px; font-weight: 600; margin:0 0 12px 0; }
          .pd-price-row { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
          .pd-price { font-size:24px; font-weight:700; color:#111; }
          .pd-old { text-decoration: line-through; color:#9AA0A6; }
          .pd-available { font-weight:600; }
          .pd-measure { display:inline-block; margin-left:6px; padding:6px 12px; border-radius:18px; border:1px solid #e6eefc; color:#0b63d6; background:#f5fbff; }
          .pd-qty { display:flex; align-items:center; gap:8px; }
          .pd-qty button { width:34px; height:34px; border-radius:6px; border:1px solid #eceff1; background:#fff; font-weight:600; }
          .pd-buy { width:100%; padding:12px 16px; border-radius:8px; border:none; background:#0b63d6; color:#fff; font-weight:700; font-size:16px; cursor:pointer; }
          .pd-section { margin-top:18px; }
          .pd-features ul { padding-left:18px; margin:6px 0; }
          @media (max-width: 992px) { .pd-grid { flex-direction:column; } .pd-left,.pd-right{flex:1 1 auto;} }
        `}</style>

        <Breadcrumb title="Product Details" items={[{ label: 'Home', href: '/' }, { label: 'Product Details' }]} />
        <section className="product__details--section pd-wrap">
          <div className="container">
            {loading ? (
              <div className="row"><div className="col-12"><div style={{ padding: 40, textAlign: 'center' }}>Loading product details...</div></div></div>
            ) : error ? (
              <div className="row"><div className="col-12"><div style={{ padding: 40, color: 'red', textAlign: 'center' }}>Error: {error}</div></div></div>
            ) : product ? (
              <div className="pd-grid">
                <div className="pd-left pd-card">
                  <img className="pd-image" src={selectedImage} alt={product.name} />
                  <div className="pd-thumbs">
                    {product.images && product.images.length > 0 && product.images.map((img, idx) => (
                      <img
                        key={idx}
                        className="pd-thumb"
                        src={img ? `${API_CONFIG.IMAGE_URL}${img}` : '/assets/img/product/small-product1.png'}
                        alt={`thumb-${idx}`}
                        onClick={() => setSelectedImage(`${API_CONFIG.IMAGE_URL}${img}`)}
                      />
                    ))}
                  </div>
                </div>

                <div className="pd-right pd-card">
                  <h1 className="pd-title">{product.name}</h1>
                  <div className="pd-price-row">
                    <div>
                      <div className="pd-price">${product.price.toFixed(2)}</div>
                      {product.oldPrice && <div className="pd-old">${product.oldPrice.toFixed(2)}</div>}
                    </div>
                  </div>

                  <div>
                    {Number(product.in_stock) === 1 ? (
                      <span className="pd-available" style={{color:'#28a745'}}>Available</span>
                    ) : (
                      <span className="pd-available" style={{color:'#dc3545'}}>Out of stock</span>
                    )}
                    {((Number(product.have_pcs) === 1) && product.pcs && product.pcs !== "0") ? (
                      <span className="pd-measure">{product.pcs} pcs</span>
                    ) : ((Number(product.have_kg) === 1) && product.kg && product.kg !== "0") ? (
                      <span className="pd-measure">{product.kg} kg</span>
                    ) : ((Number(product.have_gram) === 1) && product.gram && product.gram !== "0") ? (
                      <span className="pd-measure">{product.gram} g</span>
                    ) : ((Number(product.have_liter) === 1) && product.liter && product.liter !== "0") ? (
                      <span className="pd-measure">{product.liter} L</span>
                    ) : ((Number(product.have_ml) === 1) && product.ml && product.ml !== "0") ? (
                      <span className="pd-measure">{product.ml} ml</span>
                    ) : null}
                  </div>

                  <div className="pd-section" style={{display:'flex', gap:12, alignItems:'center'}}>
                    <div className="pd-qty">
                      <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                      <div style={{minWidth:28, textAlign:'center', fontWeight:600}}>{quantity}</div>
                      <button type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
                    </div>
                    <button 
                      className="pd-buy" 
                      onClick={async () => {
                        if (product) {
                          try {
                            // Create cart item with the selected quantity
                            const cartItem = {
                              ...product,
                              quantiy: quantity
                            };
                            await cart.addItem(cartItem);
                            console.log('Product added to cart');
                          } catch (error) {
                            console.error('Failed to add product to cart:', error);
                          }
                        }
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div className="pd-section">
                    <h4 style={{marginBottom:8}}>Description</h4>
                    <div style={{color:'#444'}}>{product.description}</div>
                  </div>

                  {product.key_features && (
                    <div className="pd-section pd-features">
                      <h4 style={{marginBottom:8}}>Key features</h4>
                      {typeof product.key_features === 'string' && product.key_features.includes(',') ? (
                        <ul>{product.key_features.split(',').map((kf,i)=>(<li key={i}>{kf.trim()}</li>))}</ul>
                      ) : (
                        <div>{product.key_features}</div>
                      )}
                    </div>
                  )}

                  {product.disclaimer && (
                    <div className="pd-section">
                      <h4 style={{marginBottom:8}}>Disclaimer</h4>
                      <div style={{color:'#666'}}>{product.disclaimer}</div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </section>
        <ShippingInfo />
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
