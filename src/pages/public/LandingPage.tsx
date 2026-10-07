import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/products/ProductCard';
import { OfferCard } from '../../components/offers/OfferCard';
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Gift,
  Heart,
  Sparkles,
  Award,
  Users,
  Building2,
  CheckCircle2,
  Star
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { products, offers, impactStats, feedbackList } = useApp();
  const navigate = useNavigate();

  const featuredProducts = products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 4);
  const topOffers = offers.slice(0, 3);
  const featuredReviews = feedbackList.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-emerald-50/40 to-[#FAF9F5] pt-12 pb-20 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-[#2D6A4F] text-xs font-bold tracking-wide shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Modern Green Gifting Platform</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-[#132E20] leading-[1.1] tracking-tight">
                Say Thank You. <br />
                <span className="text-[#2D6A4F] underline decoration-emerald-300 decoration-wavy decoration-2">
                  Give Something That Grows.
                </span>
              </h1>

              <p className="text-stone-600 text-base sm:text-lg max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Turn appreciation into something meaningful. Send living, air-purifying plant gifts to employees, customers, clients, teachers, and loved ones with personalized notes & zero-plastic packaging.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/products"
                  className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-[#132E20] hover:bg-[#2D6A4F] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Explore Plants</span>
                  <ArrowRight className="w-5 h-5 text-emerald-300" />
                </Link>

                <Link
                  to="/gifting"
                  className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-white hover:bg-stone-50 text-[#132E20] font-bold text-base border-2 border-stone-300 flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Gift className="w-5 h-5 text-emerald-700" />
                  <span>Send Corporate Gift</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-600 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Living Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero-Plastic Eco Boxes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Custom Digital Message Card</span>
                </div>
              </div>
            </div>

            {/* Hero Image Presentation */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-emerald-900/10">
                <img
                  src="https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=1000"
                  alt="Thank You Plant Gift Box"
                  className="w-full h-[460px] object-cover"
                />
                
                {/* Floating Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl shrink-0">
                    🌱
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-stone-900">
                      "Delighted 12,500+ recipients nationwide!"
                    </p>
                    <p className="text-[11px] text-stone-500">Corporate & Individual Green Gifts</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (Visual 4-Step Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-2">
            Seamless Appreciation
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#132E20]">
            How Thank You Plants Works
          </h2>
          <p className="text-stone-600 text-sm mt-3">
            Send a living thank you gift in under two minutes with complete tracking and recipient engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Choose a Plant',
              desc: 'Select from air-purifiers, desk succulents, flowering plants, or curated packages.',
              icon: '🌱'
            },
            {
              step: '02',
              title: 'Personalize Your Gift',
              desc: 'Add recipient details, custom note, delivery date, and custom ceramic pot style.',
              icon: '💌'
            },
            {
              step: '03',
              title: 'We Deliver It',
              desc: 'Our verified partner nurseries pack fresh plants in zero-plastic eco gift boxes.',
              icon: '📦'
            },
            {
              step: '04',
              title: 'They Grow With It',
              desc: 'Recipients unbox digital greetings, plant care guides, and share feedback with you.',
              icon: '🪴'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-soft relative group hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="font-heading font-extrabold text-3xl text-emerald-200 group-hover:text-emerald-500 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#132E20] mb-2">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
              Handpicked Botanicals
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-[#132E20]">
              Featured Plant Gifts
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-[#2D6A4F] hover:text-[#132E20] flex items-center gap-1 self-start"
          >
            <span>View All 20+ Plants</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. WHY PLANT GIFTS? */}
      <section className="bg-[#132E20] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                Why Choose Plants?
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                Appreciation That Keeps Growing
              </h2>
              <p className="text-stone-300 text-sm mt-4 leading-relaxed">
                Unlike cut flowers that wither in days or plastic trinkets that end up in landfills, plant gifts create a lasting bond of gratitude that flourishes every single day.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: 'Lasting Memory',
                    desc: 'Every time your recipient waters their plant, they remember your thoughtful gesture.'
                  },
                  {
                    title: 'Workplace Health & Productivity',
                    desc: 'Plants naturally clean office air toxins and boost focus by up to 15%.'
                  },
                  {
                    title: 'Measurable Eco Impact',
                    desc: 'Each plant offsets CO₂ and replaces single-use corporate plastics with living greenery.'
                  }
                ].map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 text-emerald-300 flex items-center justify-center font-bold shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{reason.title}</h4>
                      <p className="text-xs text-stone-300 mt-0.5">{reason.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=600"
                  alt="Areca Palm in office"
                  className="rounded-2xl object-cover h-64 w-full shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=600"
                  alt="Executive Bonsai"
                  className="rounded-2xl object-cover h-64 w-full shadow-lg mt-8"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. POPULAR GIFT PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
            Curated Bundles
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#132E20]">
            Popular Appreciation Packages
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            All-in-one green gifting boxes complete with decorative ceramic pots, greeting cards, and plant food.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* 6. CORPORATE GIFTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-[#132E20] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-300 text-xs font-extrabold uppercase tracking-wider inline-block">
                For HR & Corporate Teams
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
                Bulk Employee & Client Recognition
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Automate work anniversaries, festive gifting, and employee rewards with custom company logo planter tags, bulk delivery scheduling, and impact analytics.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/gifting"
                  className="py-3 px-6 rounded-xl bg-white text-[#132E20] hover:bg-emerald-50 font-bold text-sm transition-colors shadow-md"
                >
                  Explore Corporate Platform
                </Link>
                <Link
                  to="/contact"
                  className="py-3 px-6 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
                >
                  Request Bulk Quote
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-emerald-950/60 p-6 rounded-2xl border border-emerald-800/40 text-center space-y-3">
              <Building2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-lg text-white">Trusted by 250+ Companies</h3>
              <p className="text-xs text-stone-300">From early-stage startups to Fortune 500 enterprises.</p>
              <div className="pt-2 flex justify-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-900 text-emerald-200 text-xs font-semibold">DesiColab</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-900 text-emerald-200 text-xs font-semibold">Nexus Tech</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-900 text-emerald-200 text-xs font-semibold">FinCorp</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block mb-1">
            Recipient Stories
          </span>
          <h2 className="font-heading font-extrabold text-3xl text-[#132E20]">
            Loved by Senders & Recipients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(review.overallRating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-xs leading-relaxed italic mb-4">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <img
                  src={review.productImage}
                  alt={review.productName}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{review.recipientName}</h4>
                  <p className="text-[11px] text-stone-500">Gifted by {review.senderName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. PARTNER WITH US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 rounded-3xl p-8 sm:p-10 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">For Nurseries & Plant Vendors</span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#132E20]">
              Are you a plant nursery or shop owner?
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
              Partner with Thank You Plants to receive corporate gifting orders, expand your online reach, and grow your revenue.
            </p>
          </div>

          <Link
            to="/partner/apply"
            className="py-3.5 px-8 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-sm whitespace-nowrap shadow-md transition-colors"
          >
            Apply as Nursery Partner
          </Link>
        </div>
      </section>

    </div>
  );
};
