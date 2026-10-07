import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { Plus, Trash2, Edit3, Store, Search, Sparkles } from 'lucide-react';

export const PartnerProductsPage: React.FC<{ isNew?: boolean }> = ({ isNew = false }) => {
  const { products, addProduct, updateProduct, deleteProduct, partnerProfiles, currentUser } = useApp();
  const myProfile = partnerProfiles.find(p => p.userId === currentUser.id || p.id === 'part-1') || partnerProfiles[0];

  const myProducts = products.filter(p => p.seller.partnerId === myProfile.id || p.seller.name.includes(myProfile.businessName));

  const [showAddForm, setShowAddForm] = useState(isNew);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(499);
  const [discountPrice, setDiscountPrice] = useState(399);
  const [category, setCategory] = useState('Indoor Plants');
  const [stock, setStock] = useState(30);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800');
  const [careLevel, setCareLevel] = useState<'Easy' | 'Very Easy' | 'Medium' | 'Advanced'>('Easy');
  const [plantSize, setPlantSize] = useState<'Small' | 'Medium' | 'Large' | 'Extra Large'>('Medium');
  const [potType, setPotType] = useState('Ceramic Self-Watering Pot');
  const [sunlight, setSunlight] = useState('Bright indirect light');
  const [watering, setWatering] = useState('Once a week');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name,
      description,
      price,
      discountPrice,
      category,
      stock,
      images: [imageUrl],
      seller: { partnerId: myProfile.id, name: myProfile.businessName, rating: myProfile.rating },
      plantSize,
      potType,
      careLevel,
      sunlight,
      watering,
      benefits: ['Air Purifying', 'Low Maintenance', 'Gift Ready Packaging'],
      occasion: ['Thank You', 'Employee Appreciation', 'Welcome Gift'],
      indoorOutdoor: 'Indoor',
      isFeatured: true
    });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
            Nursery Inventory Management
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-[#132E20]">
            Plant Catalog ({myProducts.length} Items)
          </h1>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="py-2.5 px-5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel Form' : 'Add New Plant Product'}</span>
        </button>
      </div>

      {/* Add Product Form Modal / Panel */}
      {showAddForm && (
        <form onSubmit={handleCreateProduct} className="bg-white rounded-3xl p-8 border border-emerald-300 shadow-xl space-y-6">
          <h3 className="font-heading font-bold text-xl text-[#132E20] border-b border-stone-100 pb-3">
            Create & Publish New Plant Item
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Plant Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Calathea Medallion"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:border-emerald-600"
              >
                <option value="Indoor Plants">Indoor Plants</option>
                <option value="Air Purifying">Air Purifying</option>
                <option value="Succulents & Cacti">Succulents & Cacti</option>
                <option value="Premium Gifts & Bonsai">Premium Gifts & Bonsai</option>
                <option value="Flowering Plants">Flowering Plants</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Description</label>
            <textarea
              rows={2}
              required
              placeholder="Describe foliage, leaf texture, and gift presentation..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Original Price (₹)</label>
              <input
                type="number"
                required
                value={price}
                onChange={e => setPrice(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Discount Price (₹)</label>
              <input
                type="number"
                value={discountPrice}
                onChange={e => setDiscountPrice(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Stock Quantity</label>
              <input
                type="number"
                required
                value={stock}
                onChange={e => setStock(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Product Image URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <span>Publish Plant to Marketplace</span>
          </button>
        </form>
      )}

      {/* Catalog Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-[10px] border-b border-stone-200">
              <tr>
                <th className="p-3">Plant Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock Level</th>
                <th className="p-3">Rating</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {myProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={prod.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-stone-900">{prod.name}</span>
                        <p className="text-[10px] text-stone-400">{prod.potType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-emerald-800">{prod.category}</td>
                  <td className="p-3 font-bold text-stone-900">₹{prod.discountPrice || prod.price}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={prod.stock}
                      onChange={e => updateProduct(prod.id, { stock: parseInt(e.target.value) || 0 })}
                      className="w-16 p-1 border border-stone-200 rounded-lg text-xs font-bold bg-stone-50"
                    />
                  </td>
                  <td className="p-3 font-bold text-amber-600">{prod.rating} ★</td>
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
