import React, { useState } from 'react';
import { X, Building2, Truck, RefreshCw, HelpCircle, Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export type StaticPageType = 'about' | 'delivery' | 'returns' | 'faqs' | 'contact' | 'loyalty' | 'privacy';

interface StaticPagesModalProps {
  pageType: StaticPageType | null;
  onClose: () => void;
}

export const StaticPagesModal: React.FC<StaticPagesModalProps> = ({ pageType, onClose }) => {
  if (!pageType) return null;

  const [contactSent, setContactSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF7F0] border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900 font-serif">
            {pageType === 'about' && 'About GIRI UK & SHIVAYAA'}
            {pageType === 'delivery' && 'UK & International Delivery Policy'}
            {pageType === 'returns' && 'Returns, Refunds & Cancellations'}
            {pageType === 'faqs' && 'Frequently Asked Questions (FAQs)'}
            {pageType === 'contact' && 'Contact Customer Support (UK & EU)'}
            {pageType === 'loyalty' && 'Temple Patron Loyalty Rewards'}
            {pageType === 'privacy' && 'Privacy Notice & Data Security'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto text-xs sm:text-sm text-stone-700 leading-relaxed space-y-4">
          {pageType === 'about' && (
            <div className="space-y-3">
              <div className="aspect-16/9 rounded-xl overflow-hidden mb-4 border border-stone-200">
                <img src="/src/assets/images/hero_deepavali_brass_1793710718525.jpg" alt="Giri UK Heritage" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#164E45]">Carrying Bharat&apos;s Spiritual Heritage to the Global Diaspora</h3>
              <p>
                Founded in Chennai, India in the early 1950s, <strong>GIRI</strong> has stood for over seven decades as the definitive guardian of authentic devotional essentials, sacred publications, hand-sculpted temple metalcraft, and classical arts.
              </p>
              <p>
                In the United Kingdom and Europe, <strong>GIRI UK is operated in exclusive partnership with SHIVAYAA</strong>, bringing genuine temple-grade artifacts, Agamic idols, pure Mysore sandalwood, certified Salem silks, and festival puja samagri directly to families across England, Scotland, Wales, and Northern Ireland.
              </p>
              <div className="bg-[#FCF9F2] p-4 rounded-xl border border-[#E8E3D7] mt-4">
                <h4 className="font-bold text-stone-900 mb-1">Our Core Commitment to UK Devotees</h4>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li>Direct procurement from verified generational sthapatis and silk weavers.</li>
                  <li>UK-based stockholding for dispatch within 24 to 48 hours.</li>
                  <li>No surprise customs duties or import tariffs for UK and EU customers.</li>
                </ul>
              </div>
            </div>
          )}

          {pageType === 'delivery' && (
            <div className="space-y-3">
              <h3 className="text-base font-serif font-bold text-[#164E45]">Fast, Insured UK &amp; European Shipping</h3>
              <p>
                All orders placed on <strong>giriuk.com</strong> are dispatched from our automated fulfilment hub in the Greater London area using trackable, insured courier services.
              </p>
              <div className="space-y-2 mt-4">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <p className="font-bold text-stone-900">Standard UK Mainland (Royal Mail Tracked 48)</p>
                  <p className="text-xs text-stone-600">FREE on orders of £50 and above. (£3.99 for orders under £50). Delivery within 2-3 business days with door-to-door tracking.</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <p className="font-bold text-stone-900">Express UK Next Day (DPD Courier)</p>
                  <p className="text-xs text-stone-600">£5.99 flat fee. Orders placed before 2:00 PM Monday through Thursday receive guaranteed next working day delivery with a 1-hour delivery window.</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <p className="font-bold text-stone-900">European Union Tracked (France, Germany, Ireland, etc.)</p>
                  <p className="text-xs text-stone-600">£9.99 flat fee. Delivery within 4 to 6 working days. Customs and VAT cleared under IOSS provisions.</p>
                </div>
              </div>
            </div>
          )}

          {pageType === 'returns' && (
            <div className="space-y-3">
              <h3 className="text-base font-serif font-bold text-[#164E45]">14-Day Reassurance Policy</h3>
              <p>
                We take immense pride in the craftsmanship of every sacred article. If an item arrives damaged during transit or fails to match your expectations, you may return it within 14 days of receipt for a replacement or full refund.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone-600">
                <li>Brass idols, puja lamps, and books must be returned in their original packaging.</li>
                <li>Due to religious hygiene guidelines, opened sacred threads (poonal), vermillion/kumkum packets, and consecrated vastrams cannot be returned once unsealed unless defective.</li>
                <li>Refunds are credited to the original payment method (Debit/Credit Card, PayPal) within 3-5 business days.</li>
              </ul>
            </div>
          )}

          {pageType === 'faqs' && (
            <div className="space-y-3">
              <h3 className="text-base font-serif font-bold text-[#164E45]">Frequently Asked Questions</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <p className="font-bold text-stone-900 mb-0.5">Are your brass idols cast from pure solid brass?</p>
                  <p className="text-stone-600">Yes. All our brass murtis are solid cast using traditional sand-cast or lost-wax (cire perdue) techniques in Kumbakonam and Moradabad. They do not contain hollow plastic fillers.</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <p className="font-bold text-stone-900 mb-0.5">Is the Tamil Panchangam adjusted for UK sunrise and sunset times?</p>
                  <p className="text-stone-600">Yes! The GIRI UK Tamil Panchangam is specifically recalculated for the Greenwich Meridian timezone so that Rahu Kaalam, Yamagandam, and Ekadashi tithis are accurate for UK residents.</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <p className="font-bold text-stone-900 mb-0.5">Can I order custom sizes or rare books not listed?</p>
                  <p className="text-stone-600">Certainly. Simply click &ldquo;On Demand&rdquo; in the top navigation or banner to submit a request. Our sourcing team will contact you within 48 hours.</p>
                </div>
              </div>
            </div>
          )}

          {pageType === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#FAF7F0] rounded-xl border border-stone-200 text-center">
                  <MapPin className="w-5 h-5 text-[#164E45] mx-auto mb-1" />
                  <p className="font-bold text-stone-900 text-xs">UK Office &amp; Hub</p>
                  <p className="text-[11px] text-stone-600 mt-0.5">Harrow, Greater London, United Kingdom</p>
                </div>
                <div className="p-3 bg-[#FAF7F0] rounded-xl border border-stone-200 text-center">
                  <Phone className="w-5 h-5 text-[#164E45] mx-auto mb-1" />
                  <p className="font-bold text-stone-900 text-xs">Phone &amp; WhatsApp</p>
                  <p className="text-[11px] text-stone-600 mt-0.5">+44 (0)20 8900 1234</p>
                </div>
                <div className="p-3 bg-[#FAF7F0] rounded-xl border border-stone-200 text-center">
                  <Mail className="w-5 h-5 text-[#164E45] mx-auto mb-1" />
                  <p className="font-bold text-stone-900 text-xs">Customer Support</p>
                  <p className="text-[11px] text-stone-600 mt-0.5">support@giriuk.com</p>
                </div>
              </div>

              {contactSent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800">
                  <Check className="w-6 h-6 mx-auto mb-1" />
                  <p className="font-bold">Thank you for your message</p>
                  <p className="text-xs mt-0.5">Our London customer support team will reply within 1 business day.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSent(true);
                  }}
                  className="space-y-3 pt-2"
                >
                  <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">Send an Enquiry</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <input type="text" required placeholder="Your Name" className="px-3 py-2 rounded-lg border border-stone-300" />
                    <input type="email" required placeholder="Your Email" className="px-3 py-2 rounded-lg border border-stone-300" />
                  </div>
                  <textarea rows={3} required placeholder="How can our UK team assist you?" className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300" />
                  <button type="submit" className="px-5 py-2.5 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer">
                    <Send className="w-3.5 h-3.5 text-[#ffdb96]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {pageType === 'loyalty' && (
            <div className="space-y-3">
              <h3 className="text-base font-serif font-bold text-[#164E45]">GIRI UK Temple Patron Loyalty Program</h3>
              <p>
                Earn 5 sacred points for every £1 spent on <strong>giriuk.com</strong>. Redeem your points against future festival purchases, exclusive Tamil panchangams, and hand-embroidered deity vastrams.
              </p>
            </div>
          )}

          {pageType === 'privacy' && (
            <div className="space-y-3">
              <h3 className="text-base font-serif font-bold text-[#164E45]">Privacy &amp; GDPR Compliance</h3>
              <p>
                GIRI UK and SHIVAYAA comply strictly with the UK Data Protection Act 2018 and the UK General Data Protection Regulation (UK GDPR). Your payment details are encrypted with TLS 1.3 and processed securely by authorized banking gateways.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
