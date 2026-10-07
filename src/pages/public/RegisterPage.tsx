import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { UserPlus, Sparkles } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('CUSTOMER');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, role, company);
    if (role === 'CUSTOMER') navigate('/customer/dashboard');
    else if (role === 'REVIEWER') navigate('/reviewer/dashboard');
    else if (role === 'PARTNER') navigate('/partner/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xl space-y-6">
        
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-[#132E20] text-emerald-300 flex items-center justify-center font-bold text-2xl mx-auto mb-2 shadow-md">
            🌱
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#132E20]">
            Create Account
          </h1>
          <p className="text-xs text-stone-500">Join Thank You Plants green gifting platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Sanket Deshmukh"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="sanket@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">Account Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as UserRole)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:border-emerald-600"
            >
              <option value="CUSTOMER">Customer / Purchaser (Send Gifts)</option>
              <option value="REVIEWER">Recipient / Reviewer (Receive & Rate Gifts)</option>
              <option value="PARTNER">Nursery Partner (Supply Plants)</option>
            </select>
          </div>

          {role === 'CUSTOMER' && (
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Company / Organization (Optional)</label>
              <input
                type="text"
                placeholder="e.g. DesiColab Tech"
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create {role} Account</span>
          </button>
        </form>

        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
          <span>Already have an account? </span>
          <Link to="/login" className="font-bold text-emerald-700 hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
};
