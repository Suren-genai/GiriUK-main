import React, { useState } from 'react';
import { Coupon } from '../../../types';
import { Copy, Trash2, Plus, Check, Tag } from 'lucide-react';

interface AdminCouponsSectionProps {
  coupons: Coupon[];
  onAddCoupon: (c: Coupon) => void;
}

const EMPTY_FORM: Coupon = {
  code: '',
  discountPercent: 10,
  description: '',
  minSpend: undefined,
};

export const AdminCouponsSection: React.FC<AdminCouponsSectionProps> = ({ coupons, onAddCoupon }) => {
  const [localCoupons, setLocalCoupons] = useState<Coupon[]>(coupons);
  const [form, setForm] = useState<Coupon>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Coupon, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof Coupon, string>> = {};
    if (!form.code.trim()) e.code = 'Code is required.';
    if (localCoupons.some(c => c.code === form.code.toUpperCase())) e.code = 'Code already exists.';
    if (form.discountPercent < 1 || form.discountPercent > 100) e.discountPercent = 'Must be 1–100.';
    if (!form.description.trim()) e.description = 'Description is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    const newCoupon: Coupon = {
      ...form,
      code: form.code.toUpperCase(),
      minSpend: form.minSpend || undefined,
    };
    setLocalCoupons(prev => [...prev, newCoupon]);
    onAddCoupon(newCoupon);
    setForm(EMPTY_FORM);
    setShowForm(false);
    setErrors({});
  };

  const handleDelete = (code: string) => {
    setLocalCoupons(prev => prev.filter(c => c.code !== code));
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#164E45]">Coupons</h2>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-[#cca730] hover:bg-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <Plus size={16} /> Add Coupon
        </button>
      </div>

      {/* Add Coupon Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-[#164E45] mb-4 flex items-center gap-2"><Tag size={16} /> New Coupon</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Code */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Code <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.code}
                onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                placeholder="e.g. SAVE10"
                className={`w-full border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#164E45] ${errors.code ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
            </div>

            {/* Discount % */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Discount % <span className="text-red-500">*</span></label>
              <input
                type="number"
                min={1}
                max={100}
                value={form.discountPercent}
                onChange={e => setForm(f => ({ ...f, discountPercent: Number(e.target.value) }))}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#164E45] ${errors.discountPercent ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.discountPercent && <p className="text-red-500 text-xs mt-1">{errors.discountPercent}</p>}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="e.g. 10% off your first order"
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#164E45] ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Min Spend */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Min Spend (£) <span className="text-gray-400 font-normal">optional</span></label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.minSpend ?? ''}
                onChange={e => setForm(f => ({ ...f, minSpend: e.target.value ? Number(e.target.value) : undefined }))}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#164E45]"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleAdd}
              className="bg-[#164E45] hover:bg-[#00362f] text-white px-5 py-2 rounded-lg text-sm font-medium transition"
            >
              Add Coupon
            </button>
            <button
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setErrors({}); }}
              className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-5 py-2 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-[#164E45] text-white">
            <tr>
              {['Code', 'Discount %', 'Description', 'Min Spend', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {localCoupons.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-gray-500">No coupons yet. Add one above!</td></tr>
            )}
            {localCoupons.map(coupon => (
              <tr key={coupon.code} className="border-t border-gray-100 hover:bg-[#FCF9F2] transition">
                <td className="px-4 py-3">
                  <span className="font-mono font-bold text-[#164E45] bg-[#164E45]/10 px-2 py-0.5 rounded">
                    {coupon.code}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-[#cca730]/20 text-[#8a6e1a] font-semibold px-2 py-0.5 rounded-full text-xs">
                    {coupon.discountPercent}% OFF
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{coupon.description}</td>
                <td className="px-4 py-3 text-gray-600">
                  {coupon.minSpend ? `£${coupon.minSpend.toFixed(2)}` : <span className="text-gray-400">None</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      title="Copy code"
                      className="flex items-center gap-1 text-xs text-[#164E45] hover:text-[#cca730] transition font-medium"
                    >
                      {copied === coupon.code ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      {copied === coupon.code ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => handleDelete(coupon.code)}
                      title="Delete coupon"
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition font-medium"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
