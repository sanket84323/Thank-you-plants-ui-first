import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { LogIn, KeyRound, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, switchUserRole } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('CUSTOMER');
  const [email, setEmail] = useState('sanket@desicolab.com');
  const [password, setPassword] = useState('password123');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const presetAccounts: { role: UserRole; name: string; email: string; desc: string; dashUrl: string }[] = [
    {
      role: 'CUSTOMER',
      name: 'Sanket Deshmukh',
      email: 'sanket@desicolab.com',
      desc: 'Corporate purchaser gifting plants to team',
      dashUrl: '/customer/dashboard'
    },
    {
      role: 'REVIEWER',
      name: 'Priya Mehta',
      email: 'priya.mehta@gmail.com',
      desc: 'Recipient viewing received gift & giving feedback',
      dashUrl: '/reviewer/dashboard'
    },
    {
      role: 'PARTNER',
      name: 'Ramesh Patel (GreenLeaf)',
      email: 'partner@greenleaf.com',
      desc: 'Plant nursery managing stock & processing orders',
      dashUrl: '/partner/dashboard'
    },
    {
      role: 'ADMIN',
      name: 'Aarav Sharma',
      email: 'admin@thankyouplants.com',
      desc: 'Platform admin managing users, partners & analytics',
      dashUrl: '/admin/dashboard'
    }
  ];

  const handleSelectRole = (role: UserRole, defaultEmail: string) => {
    setSelectedRole(role);
    setEmail(defaultEmail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchUserRole(selectedRole);
    login(email, selectedRole);

    const match = presetAccounts.find(a => a.role === selectedRole);
    navigate(match ? match.dashUrl : '/customer/dashboard');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-[#132E20] text-emerald-300 flex items-center justify-center font-bold text-2xl mx-auto mb-2 shadow-md">
            🌱
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#132E20]">
            Welcome Back
          </h1>
          <p className="text-xs text-stone-500">Sign in to your Thank You Plants portal</p>
        </div>

        {/* Quick Role Picker */}
        <div>
          <label className="text-xs font-bold text-stone-700 block mb-2">Select Portal Role for Prototype</label>
          <div className="grid grid-cols-2 gap-2">
            {presetAccounts.map(acc => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleSelectRole(acc.role, acc.email)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedRole === acc.role
                    ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-200'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#132E20]">{acc.role}</span>
                  {selectedRole === acc.role && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <p className="text-[10px] text-stone-500 truncate mt-0.5">{acc.name.split(' ')[0]}</p>
              </button>
            ))}
          </div>
        </div>

        {showForgot ? (
          /* Forgot Password UI */
          <div className="space-y-4 pt-2">
            <h3 className="font-heading font-bold text-sm text-[#132E20]">Reset Password</h3>
            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs space-y-2">
                <p className="font-bold">Password reset link sent!</p>
                <p>Check your email inbox ({email}) for instructions.</p>
                <button
                  onClick={() => setShowForgot(false)}
                  className="text-emerald-900 font-bold underline block mt-2"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Enter your account email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold shadow-md hover:bg-[#1B4332]"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgot(false)}
                  className="w-full text-center text-xs text-stone-500 font-semibold py-1 hover:underline"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Main Login Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-stone-700">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-[11px] font-bold text-emerald-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#132E20] hover:bg-[#2D6A4F] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <LogIn className="w-4 h-4 text-emerald-300" />
              <span>Sign In to {selectedRole} Portal</span>
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
          <span>Don't have an account yet? </span>
          <Link to="/register" className="font-bold text-emerald-700 hover:underline">
            Register Here
          </Link>
        </div>

      </div>
    </div>
  );
};
