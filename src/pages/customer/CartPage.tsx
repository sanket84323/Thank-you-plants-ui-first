import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Trash2, ShoppingBag, ArrowRight, Gift, Sparkles } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0);
  const deliveryFee = subtotal > 1000 || cart.length === 0 ? 0 : 49;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
          Gift Preparation
        </span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">
          Your Gift Cart ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-soft max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-3xl mx-auto">
            🪴
          </div>
          <h3 className="font-heading font-bold text-xl text-[#132E20]">Your cart is empty</h3>
          <p className="text-xs text-stone-500">
            Browse our catalog to pick an air-purifying plant or curated appreciation package.
          </p>
          <Link
            to="/products"
            className="inline-flex py-3 px-6 rounded-2xl bg-[#2D6A4F] text-white font-bold text-xs hover:bg-[#1B4332] shadow-md transition-colors"
          >
            Explore Plants
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-heading font-bold text-base text-[#132E20]">Selected Plant Gifts</h3>
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Clear All Items
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {cart.map((item, idx) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-2xl object-cover shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-stone-900">{item.product.name}</h4>
                        <p className="text-xs text-emerald-700 font-semibold">{item.product.category}</p>
                        {item.giftCustomization?.personalizedMessage && (
                          <p className="text-[11px] text-stone-500 italic mt-1 line-clamp-1">
                            Note: "{item.giftCustomization.personalizedMessage}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50 text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-bold text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-heading font-extrabold text-base text-[#132E20]">
                          ₹{itemPrice * item.quantity}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft space-y-6">
            <h3 className="font-heading font-bold text-base text-[#132E20]">Order Summary</h3>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Eco Courier Delivery</span>
                <span className="font-bold text-emerald-700">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Zero-Plastic Gift Packaging</span>
                <span className="font-bold text-emerald-700">INCLUDED</span>
              </div>
              <div className="border-t border-stone-100 pt-3 flex justify-between items-baseline">
                <span className="font-heading font-bold text-sm text-[#132E20]">Total Amount</span>
                <span className="font-heading font-extrabold text-2xl text-[#132E20]">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/customer/checkout')}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Proceed to Recipient Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
