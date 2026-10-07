import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Gift, ShoppingBag, Zap, Sun, Droplet, Sparkles } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useApp();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickGift = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    navigate('/customer/checkout', { state: { mode: 'GIFT' } });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    navigate('/customer/checkout', { state: { mode: 'BUY_NOW' } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-soft shadow-hover flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Card Header / Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
            {product.isBestSeller && (
              <span className="px-2.5 py-1 rounded-full bg-[#132E20] text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Best Seller
              </span>
            )}
            {product.discountPrice && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                Save ₹{product.price - product.discountPrice}
              </span>
            )}
          </div>

          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 text-[11px] font-bold shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Product Information */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Seller: {product.seller.name}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-heading font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="text-stone-500 text-xs mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Plant Attributes */}
          <div className="flex items-center gap-3 mt-3 text-[11px] font-medium text-stone-600 border-t border-b border-stone-100 py-2">
            <div className="flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="truncate max-w-[90px]">{product.sunlight}</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-sky-500" />
              <span>{product.careLevel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Price & 3 Actions */}
      <div className="p-5 pt-0 space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="font-heading font-extrabold text-xl text-[#132E20]">
            ₹{product.discountPrice || product.price}
          </span>
          {product.discountPrice && (
            <span className="text-xs text-stone-400 line-through font-medium">
              ₹{product.price}
            </span>
          )}
        </div>

        {/* Action Buttons: Add Cart, Send Gift, Buy Now */}
        <div className="space-y-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="py-2 px-2.5 rounded-xl border border-stone-300 hover:border-emerald-700 text-stone-800 hover:text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors bg-white"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Cart</span>
            </button>
            <button
              type="button"
              onClick={handleQuickGift}
              className="py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#2D6A4F] border border-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Send Gift</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full py-2 px-3 rounded-xl bg-[#132E20] hover:bg-[#2D6A4F] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
