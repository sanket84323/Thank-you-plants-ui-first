import React from 'react';
import { useApp } from '../../context/AppContext';
import { Store, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const PartnerInventoryPage: React.FC = () => {
  const { products, updateProduct, partnerProfiles, currentUser } = useApp();
  const myProfile = partnerProfiles.find(p => p.userId === currentUser.id || p.id === 'part-1') || partnerProfiles[0];
  const myProducts = products.filter(p => p.seller.partnerId === myProfile.id || p.seller.name.includes(myProfile.businessName));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">Stock Control</span>
        <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">Nursery Stock & Inventory</h1>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3">Plant Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock Count</th>
                <th className="p-3">Stock Status</th>
                <th className="p-3 text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {myProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3 font-bold text-stone-900">{prod.name}</td>
                  <td className="p-3 font-semibold text-emerald-800">{prod.category}</td>
                  <td className="p-3 font-bold">₹{prod.discountPrice || prod.price}</td>
                  <td className="p-3 font-extrabold text-[#132E20]">{prod.stock} units</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      prod.stock < 20 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {prod.stock < 20 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => updateProduct(prod.id, { stock: prod.stock + 20 })}
                      className="px-3 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px]"
                    >
                      + Add 20 Units
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
