import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Star,
  ShoppingBag,
  Gift,
  Zap,
  Sun,
  Droplet,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowLeft,
  Truck,
  Heart
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useApp();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id) || products[0];
  const [selectedImg, setSelectedImg] = useState(product?.images[0] || '');
  const [quantity, setQuantity] = useState(1);

  // Gift Customization Form state
  const [personalizedMsg, setPersonalizedMsg] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImg(product.images[0]);
    }
  }, [id, product]);

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      personalizedMessage: personalizedMsg,
      deliveryDate,
      recipientName,
      recipientEmail
    });
  };

  const handleSendGiftNow = () => {
    addToCart(product, quantity, {
      personalizedMessage: personalizedMsg,
      deliveryDate,
      recipientName,
      recipientEmail
    });
    navigate('/customer/checkout', { state: { mode: 'GIFT' } });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, {
      personalizedMessage: personalizedMsg,
      deliveryDate,
      recipientName,
      recipientEmail
    });
    navigate('/customer/checkout', { state: { mode: 'BUY_NOW' } });
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-heading font-bold text-2xl text-stone-900">Product Not Found</h2>
        <Link to="/products" className="py-2.5 px-5 rounded-xl bg-[#2D6A4F] text-white font-bold text-xs">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      
      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#132E20] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT GALLERY */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-4/3 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-soft relative">
            <img
              src={selectedImg || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.discountPrice && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
                Save ₹{product.price - product.discountPrice}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImg === img ? 'border-emerald-700 ring-2 ring-emerald-300' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Plant Care Summary Box */}
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200/80 space-y-4">
            <h4 className="font-heading font-bold text-sm text-[#132E20] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Plant Care & Specifications</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-3 rounded-xl border border-emerald-100">
                <Sun className="w-4 h-4 text-amber-500 mb-1" />
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Sunlight</span>
                <span className="font-semibold text-stone-800">{product.sunlight}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-100">
                <Droplet className="w-4 h-4 text-sky-500 mb-1" />
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Watering</span>
                <span className="font-semibold text-stone-800">{product.watering}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[10px] text-stone-400 font-bold uppercase block">Difficulty</span>
                <span className="font-semibold text-stone-800">{product.careLevel}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-stone-700 block mb-1">Key Health Benefits:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT INFORMATION & GIFT CUSTOMIZATION */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                {product.category}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Supplied by <strong className="text-stone-800">{product.seller.name}</strong> ({product.seller.rating} ★)
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#132E20]">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-stone-400 font-normal">({product.reviewCount} customer reviews)</span>
              </div>
              <span className="text-stone-300">•</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                In Stock ({product.stock} units ready)
              </span>
            </div>
          </div>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-stone-100/70 border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-500 block">Unit Gift Price</span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-3xl text-[#132E20]">
                  ₹{product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <span className="text-stone-400 text-sm line-through font-medium">
                    ₹{product.price}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-bold text-stone-900">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* GIFT CUSTOMIZATION BOX */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-300/70 shadow-soft space-y-4">
            <h3 className="font-heading font-bold text-base text-[#132E20] flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-700" />
              <span>Personalize Your Plant Gift</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Personalized Message for Recipient
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Thank you for your amazing contribution to our project! You truly made a difference. 🌱"
                  value={personalizedMsg}
                  onChange={e => setPersonalizedMsg(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Recipient Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Mehta"
                    value={recipientName}
                    onChange={e => setRecipientName(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Preferred Delivery Date</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={e => setDeliveryDate(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs: Add to Cart, Send Gift, Buy Now */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="py-3.5 px-6 rounded-2xl border-2 border-emerald-700 text-emerald-800 hover:bg-emerald-50 font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleSendGiftNow}
                className="py-3.5 px-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-[#2D6A4F] border-2 border-emerald-400 font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Gift className="w-4 h-4 text-emerald-700" />
                <span>Send Gift</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-2xl bg-[#132E20] hover:bg-[#2D6A4F] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Buy Now (Instant Checkout)</span>
            </button>
          </div>

          {/* Delivery & Eco Assurance */}
          <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-4 text-xs text-stone-600 font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>Eco Express Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-700" />
              <span>Guaranteed Fresh Arrival</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
