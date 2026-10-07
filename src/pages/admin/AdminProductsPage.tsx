import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, Sparkles, Star } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, deleteProduct, updateProduct } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Catalog Moderation</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Platform Product Moderation ({products.length})</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Nursery Partner</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map(prod => (
                <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3 font-bold text-[#132E20]">{prod.name}</td>
                  <td className="p-3 font-semibold text-emerald-800">{prod.category}</td>
                  <td className="p-3 text-stone-600">{prod.seller.name}</td>
                  <td className="p-3 font-bold">₹{prod.discountPrice || prod.price}</td>
                  <td className="p-3">{prod.stock} units</td>
                  <td className="p-3">
                    <button
                      onClick={() => updateProduct(prod.id, { isFeatured: !prod.isFeatured })}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        prod.isFeatured ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {prod.isFeatured ? '★ Featured' : 'Normal'}
                    </button>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
