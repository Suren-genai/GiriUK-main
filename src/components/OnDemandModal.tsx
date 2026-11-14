import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { OnDemandRequest } from '../types';

interface OnDemandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (req: OnDemandRequest) => void;
}

export const OnDemandModal: React.FC<OnDemandModalProps> = ({
  isOpen,
  onClose,
  onSubmitRequest
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState<OnDemandRequest | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    itemCategory: 'Idols & Handicrafts (Custom Murti)',
    productDescription: '',
    approximateBudget: '£100 - £250',
    neededByDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: OnDemandRequest = {
      id: `req-${Date.now()}`,
      ...formData,
      status: 'Received',
      createdAt: new Date().toISOString().split('T')[0]
    };
    onSubmitRequest(newReq);
    setSubmitted(newReq);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-[#00362f] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffdb96]" />
            <div>
              <h2 className="text-base font-bold font-serif">On-Demand Sourcing from India</h2>
              <p className="text-[11px] text-stone-300">Custom temple idols, bespoke costumes &amp; rare scriptures</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B99A5B]">Request Acknowledged</span>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">Sourcing Enquiry Received</h3>
              <p className="text-xs text-stone-600 mt-2">
                Enquiry ticket ref: <strong className="text-[#164E45] font-mono">{submitted.id.toUpperCase()}</strong>
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                Our artisanal procurement team in Chennai &amp; Kumbakonam will review your requirements and reply to <strong>{submitted.email}</strong> with photos, weight estimates, and a custom GBP quotation within 48 hours.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#164E45] text-white text-xs font-bold hover:bg-[#00362f] cursor-pointer"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="bg-[#FCF9F2] p-3 rounded-lg border border-[#EBE6DC] text-stone-600 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#164E45] shrink-0 mt-0.5" />
              <span>
                Looking for a specific temple idol size, custom panchaloha composition, custom dance uniform, or rare Sanskrit commentary? We source directly from verified master craftsmen across Bharat and handle all UK customs clearances.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Meera Ramanathan"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">UK Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+44 7..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="meera@example.co.uk"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Item Category</label>
                <select
                  value={formData.itemCategory}
                  onChange={(e) => setFormData({ ...formData, itemCategory: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                >
                  <option value="Idols & Handicrafts (Custom Murti)">Brass / Panchaloha Idol (Custom Size)</option>
                  <option value="Stone / Marble Statue">Black Stone / Sphatik / Marble Idol</option>
                  <option value="Dancewear & Jewellery">Bharatanatyam / Kuchipudi Custom Costume</option>
                  <option value="Rare Books & Scriptures">Out-of-print Sanskrit/Tamil Publication</option>
                  <option value="Temple Vessels & Cooking">Large Temple Uruli / Brass Cookware</option>
                  <option value="Festival & Wedding Bulk">Custom Navratri / Wedding Return Gifts</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Approx. Budget (GBP)</label>
                <select
                  value={formData.approximateBudget}
                  onChange={(e) => setFormData({ ...formData, approximateBudget: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                >
                  <option value="Under £100">Under £100</option>
                  <option value="£100 - £250">£100 - £250</option>
                  <option value="£250 - £600">£250 - £600</option>
                  <option value="£600 - £1,500">£600 - £1,500</option>
                  <option value="£1,500+ (Temple Project)">£1,500+ (Temple Project)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Detailed Specifications (Deity name, posture, dimensions, finish, etc.) *
              </label>
              <textarea
                rows={3}
                required
                value={formData.productDescription}
                onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                placeholder="Please describe the deity, required dimensions in inches/cm, preferred metal/stone composition, and any specific temple iconography..."
                className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#ffdb96]" />
                <span>Submit Sourcing Enquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
