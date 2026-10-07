import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Common UI
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ProductsPage } from './pages/public/ProductsPage';
import { ProductDetailsPage } from './pages/public/ProductDetailsPage';
import { OffersPage } from './pages/public/OffersPage';
import { GiftingPage } from './pages/public/GiftingPage';
import { ImpactPage } from './pages/public/ImpactPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { PartnerApplyPage } from './pages/public/PartnerApplyPage';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { CustomerOrdersPage } from './pages/customer/CustomerOrdersPage';
import { OrderDetailsPage } from './pages/customer/OrderDetailsPage';

// Reviewer Pages
import { ReviewerDashboard } from './pages/reviewer/ReviewerDashboard';
import { DigitalGiftViewPage } from './pages/reviewer/DigitalGiftViewPage';

// Partner Pages
import { PartnerDashboard } from './pages/partner/PartnerDashboard';
import { PartnerProductsPage } from './pages/partner/PartnerProductsPage';
import { PartnerOrdersPage } from './pages/partner/PartnerOrdersPage';
import { PartnerInventoryPage } from './pages/partner/PartnerInventoryPage';
import { PartnerAnalyticsPage } from './pages/partner/PartnerAnalyticsPage';
import { PartnerFeedbackPage } from './pages/partner/PartnerFeedbackPage';
import { PartnerOffersPage } from './pages/partner/PartnerOffersPage';
import { PartnerProfilePage } from './pages/partner/PartnerProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminPartnerApplicationsPage } from './pages/admin/AdminPartnerApplicationsPage';
import { AdminPartnersPage } from './pages/admin/AdminPartnersPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminFeedbackPage } from './pages/admin/AdminFeedbackPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1C2520]">
          {/* Quick Demo Role Switcher Bar */}
          <RoleSwitcherBar />

          {/* Main App Navbar */}
          <Navbar />

          {/* Page Routing */}
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/gifting" element={<GiftingPage />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/partner/apply" element={<PartnerApplyPage />} />

              {/* Customer Routes */}
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/products" element={<ProductsPage />} />
              <Route path="/customer/cart" element={<CartPage />} />
              <Route path="/customer/checkout" element={<CheckoutPage />} />
              <Route path="/customer/orders" element={<CustomerOrdersPage />} />
              <Route path="/customer/orders/:id" element={<OrderDetailsPage />} />
              <Route path="/customer/gifts" element={<CustomerOrdersPage />} />
              <Route path="/customer/profile" element={<CustomerDashboard />} />
              <Route path="/customer/feedback" element={<CustomerOrdersPage />} />

              {/* Reviewer Routes */}
              <Route path="/reviewer/dashboard" element={<ReviewerDashboard />} />
              <Route path="/reviewer/gifts" element={<ReviewerDashboard />} />
              <Route path="/reviewer/gifts/:id" element={<DigitalGiftViewPage />} />
              <Route path="/reviewer/feedback" element={<ReviewerDashboard />} />
              <Route path="/reviewer/profile" element={<ReviewerDashboard />} />

              {/* Partner Routes */}
              <Route path="/partner/dashboard" element={<PartnerDashboard />} />
              <Route path="/partner/products" element={<PartnerProductsPage />} />
              <Route path="/partner/products/new" element={<PartnerProductsPage isNew={true} />} />
              <Route path="/partner/orders" element={<PartnerOrdersPage />} />
              <Route path="/partner/orders/:id" element={<PartnerOrdersPage />} />
              <Route path="/partner/offers" element={<PartnerOffersPage />} />
              <Route path="/partner/inventory" element={<PartnerInventoryPage />} />
              <Route path="/partner/analytics" element={<PartnerAnalyticsPage />} />
              <Route path="/partner/feedback" element={<PartnerFeedbackPage />} />
              <Route path="/partner/profile" element={<PartnerProfilePage />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/partners" element={<AdminPartnersPage />} />
              <Route path="/admin/partner-applications" element={<AdminPartnerApplicationsPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/admin/offers" element={<AdminProductsPage />} />
              <Route path="/admin/categories" element={<AdminProductsPage />} />
              <Route path="/admin/feedback" element={<AdminFeedbackPage />} />
              <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />

              {/* Fallback */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>

          {/* Footer & Global Toast System */}
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
