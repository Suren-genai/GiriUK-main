import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Heart, Truck } from 'lucide-react';
import { StaticPageType } from './StaticPagesModal';
import { CATEGORIES_TAXONOMY } from '../data/mockData';

interface FooterProps {
  onOpenStaticPage: (page: StaticPageType) => void;
  onOpenTrackOrder: () => void;
  onSelectCategory: (categoryName: string) => void;
  onNavigatePage?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenStaticPage,
  onOpenTrackOrder,
  onSelectCategory,
  onNavigatePage
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="bg-[#002b25] text-stone-300 pt-16 pb-12 border-t-2 border-[#B99A5B]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter & Discount Club */}
        <div className="bg-[#00362f] rounded-2xl p-6 sm:p-8 border border-[#164e45] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#ffdb96]">
              Exclusive Devotee Circle
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Receive 10% Off Your First Order + Festival Muhurtham Alerts
            </h3>
            <p className="text-xs text-stone-300 max-w-xl">
              Subscribe to the GIRI UK circular for Panchangam tithi reminders, auspicious temple festival alerts, and new handloom arrivals.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#ffdb96] font-bold bg-[#164e45] px-4 py-3 rounded-full">
                <Check className="w-4 h-4 text-[#cca730]" />
                <span>Thank you! Code GIRIUK2026 is activated for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="px-4 py-2.5 rounded-full bg-stone-900/60 border border-stone-600 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#cca730] flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#cca730] hover:bg-[#b89528] text-[#002b25] text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-white tracking-tight">GIRI<span className="text-[#cca730] text-xl">UK</span></span>
            </div>
            <p className="text-[11px] text-[#ffdb96] font-medium">In UK &amp; Europe by SHIVAYAA</p>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              The premier destination for traditional Indian devotional literature, Kumbakonam brass idols, puja samagri, and authentic South Indian handlooms across Great Britain and Europe.
            </p>
            <div className="pt-2 text-[11px] text-stone-400 space-y-0.5">
              <p>📍 Harrow, London, United Kingdom</p>
              <p>📞 +44 (0)20 8900 1234</p>
              <p>✉️ support@giriuk.com</p>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Customer Care</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={onOpenTrackOrder} className="hover:text-white transition-colors cursor-pointer">
                  Track My Order (Royal Mail / DPD)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage ? onNavigatePage('delivery') : onOpenStaticPage('delivery')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  UK &amp; EU Delivery Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage ? onNavigatePage('delivery') : onOpenStaticPage('returns')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns &amp; Cancellations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage ? onNavigatePage('faq') : onOpenStaticPage('faqs')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStaticPage('loyalty')} className="hover:text-white transition-colors cursor-pointer">
                  Temple Patron Loyalty Program
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage ? onNavigatePage('contact') : onOpenStaticPage('contact')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Wembley Seva Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Top Menu List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Top Menu</h4>
            <ul className="space-y-2 text-stone-400">
              {CATEGORIES_TAXONOMY.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => {
                      if (cat.name === 'On Demand') {
                        if (onNavigatePage) onNavigatePage('on-demand');
                      } else {
                        onSelectCategory(cat.name);
                      }
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Heritage & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trust &amp; Heritage</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={() => onNavigatePage ? onNavigatePage('about') : onOpenStaticPage('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About GIRI Legacy (70-Year Story)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigatePage ? onNavigatePage('about') : onOpenStaticPage('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SHIVAYAA European Partnership
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStaticPage('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Notice &amp; Cookies
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStaticPage('delivery')} className="hover:text-white transition-colors cursor-pointer">
                  UK VAT &amp; Customs Compliance
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-semibold text-stone-300">Accepted Payment Methods:</span>
            <span className="px-2 py-0.5 rounded bg-white text-[#002b25] font-bold text-[10px]">VISA</span>
            <span className="px-2 py-0.5 rounded bg-white text-[#002b25] font-bold text-[10px]">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-white text-[#002b25] font-bold text-[10px]">AMEX</span>
            <span className="px-2 py-0.5 rounded bg-white text-[#002b25] font-bold text-[10px]">PayPal</span>
            <span className="px-2 py-0.5 rounded bg-white text-[#002b25] font-bold text-[10px]">Apple Pay</span>
          </div>

          <div className="text-center sm:text-right text-stone-500">
            <p>© 2026 GIRI UK · All rights reserved. In UK &amp; EU by SHIVAYAA.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
