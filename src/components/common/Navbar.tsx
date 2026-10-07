import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Bell,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Gift
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, cart, notifications, markNotificationRead, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const unreadNotifs = notifications.filter(n => !n.read && (n.userId === currentUser.id || n.role === currentUser.role || n.role === 'ALL'));

  const getDashboardPath = () => {
    switch (currentUser.role) {
      case 'CUSTOMER':
        return '/customer/dashboard';
      case 'REVIEWER':
        return '/reviewer/dashboard';
      case 'PARTNER':
        return '/partner/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/customer/dashboard';
    }
  };

  const navLinks = [
    { label: 'Explore Plants', path: '/products' },
    { label: 'Offers & Packages', path: '/offers' },
    { label: 'Corporate Gifting', path: '/gifting' },
    { label: 'Our Impact', path: '/impact' },
    { label: 'About Us', path: '/about' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#132E20] text-emerald-300 flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              🌱
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-[#132E20] block leading-none">
                Thank You Plants
              </span>
              <span className="text-[10px] font-semibold text-[#2D6A4F] tracking-widest uppercase block mt-0.5">
                Green Gifting Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#132E20] bg-emerald-100/60'
                      : 'text-stone-700 hover:text-[#132E20] hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Link to Digital Gift Unboxing */}
            <Link
              to="/reviewer/gifts/ord-1024"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-[#2D6A4F] text-xs font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors"
              title="Preview Received Digital Gift Box"
            >
              <Gift className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
              <span>Preview Gift View</span>
            </Link>

            {/* Cart Button */}
            <Link
              to="/customer/cart"
              className="relative p-2 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-[#132E20] transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2D6A4F] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-[#132E20] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 py-3 z-50">
                  <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#132E20]">Notifications</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {unreadNotifs.length} new
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-stone-100">
                    {unreadNotifs.length === 0 ? (
                      <div className="p-6 text-center text-sm text-stone-500">
                        No unread notifications right now. 🌱
                      </div>
                    ) : (
                      unreadNotifs.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.link) navigate(n.link);
                            setNotificationsOpen(false);
                          }}
                          className="p-3.5 hover:bg-stone-50 transition-colors cursor-pointer flex gap-3 items-start"
                        >
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-xs">
                            {n.type === 'order' ? '📦' : n.type === 'feedback' ? '⭐' : '🔔'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-stone-900">{n.title}</h4>
                            <p className="text-xs text-stone-600 mt-0.5 line-clamp-2">{n.message}</p>
                            <span className="text-[10px] text-stone-400 mt-1 block">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard / User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-stone-300 hover:border-emerald-600 transition-colors bg-white shadow-xs"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <span className="hidden sm:inline font-semibold text-xs text-stone-800 max-w-[100px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-stone-100">
                    <p className="font-bold text-xs text-[#132E20]">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                    <span className="mt-1 inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      Role: {currentUser.role}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#132E20]"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      <span>{currentUser.role} Dashboard</span>
                    </Link>

                    {currentUser.role === 'CUSTOMER' && (
                      <Link
                        to="/customer/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                      >
                        <ShoppingBag className="w-4 h-4 text-stone-500" />
                        <span>My Gift Orders</span>
                      </Link>
                    )}

                    {currentUser.role === 'PARTNER' && (
                      <Link
                        to="/partner/products"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                      >
                        <Sparkles className="w-4 h-4 text-stone-500" />
                        <span>Manage Nursery Catalog</span>
                      </Link>
                    )}

                    <Link
                      to="/partner/apply"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Partner Nursery Application</span>
                    </Link>
                  </div>

                  <div className="border-t border-stone-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF9F5] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={getDashboardPath()}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-emerald-700 bg-emerald-100/60 flex items-center justify-between"
            >
              <span>Go to {currentUser.role} Dashboard</span>
              <LayoutDashboard className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
