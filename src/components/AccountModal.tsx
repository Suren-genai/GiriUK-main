import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Edit3,
  Check,
  Loader2,
  Award,
  Sparkles,
  Phone,
  Mail,
  Home
} from 'lucide-react';
import { Order, Product, UserProfile } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRequestSignIn: () => void;
  onRequestSignUp: () => void;
  onLogout: () => void;
  onUpdateProfile?: (updates: { address?: string; phone?: string; name?: string }) => Promise<void>;
  orders: Order[];
  wishlist: Product[];
  onSelectProduct: (product: Product) => void;
  onTrackOrder: (orderNumber: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onRequestSignIn,
  onRequestSignUp,
  onLogout,
  onUpdateProfile,
  orders,
  wishlist,
  onSelectProduct,
  onTrackOrder
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  // Edit address & profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editAddress, setEditAddress] = useState(currentUser?.address || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sync edit fields when currentUser changes or modal opens
  useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name || '');
      setEditAddress(currentUser.address || '');
      setEditPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateProfile) return;
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await onUpdateProfile({
        name: editName.trim(),
        address: editAddress.trim(),
        phone: editPhone.trim(),
      });
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Failed to update details in Supabase.';
      setSaveError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Determine loyalty tier details
  const loyaltyTier = currentUser?.loyaltyTier || 'Welcome Seeker (5% First Order)';
  const isPatron = loyaltyTier.includes('Patron');
  const isDevotee = loyaltyTier.includes('Devotee');

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF7F0] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#164E45]" />
            <h2 className="text-base font-bold text-stone-900 font-serif">
              {currentUser ? `Welcome, ${currentUser.name}` : 'Customer Portal'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentUser ? (
          /* Logged In Dashboard */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Navigation Tabs */}
            <div className="flex border-b border-stone-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-3 mr-6 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-[#164E45] text-[#164E45]'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders ({orders.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`pb-3 mr-6 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'wishlist'
                    ? 'border-b-2 border-[#164E45] text-[#164E45]'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Saved Wishlist ({wishlist.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-[#164E45] text-[#164E45]'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </button>
            </div>

            {/* Orders View */}
            {activeTab === 'orders' && (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {orders.length === 0 ? (
                  <p className="text-xs text-stone-500 py-8 text-center">No previous orders placed yet.</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="p-4 rounded-xl border border-stone-200 bg-[#FAF7F0] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200 text-xs">
                        <div>
                          <span className="font-bold text-[#164E45] font-mono">{order.orderNumber}</span>
                          <span className="text-stone-400 ml-2">Placed on {order.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                            {order.status}
                          </span>
                          <button
                            onClick={() => {
                              onClose();
                              onTrackOrder(order.orderNumber);
                            }}
                            className="text-[11px] text-[#164E45] underline font-medium cursor-pointer"
                          >
                            Live Tracking
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-stone-700">
                            <span className="truncate max-w-xs">{it.product.name} (×{it.quantity})</span>
                            <span className="font-mono tabular-nums">£{(it.product.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-stone-200 flex justify-between text-xs font-bold text-stone-900">
                        <span>Total Paid ({order.paymentMethod})</span>
                        <span className="text-[#164E45] font-mono">£{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Wishlist View */}
            {activeTab === 'wishlist' && (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {wishlist.length === 0 ? (
                  <p className="text-xs text-stone-500 py-8 text-center">
                    Your wishlist is empty. Click the heart icon on any product to save it.
                  </p>
                ) : (
                  wishlist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(item);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:border-[#164E45] bg-[#FAF7F0] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md border border-stone-200" />
                        <div>
                          <p className="text-xs font-bold text-stone-800">{item.name}</p>
                          <p className="text-[10px] text-stone-500">
                            {item.category} · {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#164E45] font-mono">£{item.price.toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Saved Addresses & Profile View */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                {/* Success feedback */}
                {saveSuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Your UK delivery address and details have been saved to your Supabase account!</span>
                  </div>
                )}

                {/* Error feedback */}
                {saveError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                    {saveError}
                  </div>
                )}

                {!isEditing ? (
                  /* Read-only details */
                  <div className="space-y-3 text-xs bg-[#FAF7F0] p-5 rounded-2xl border border-stone-200">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                      <div>
                        <span className="text-stone-500 font-medium">Account Holder</span>
                        <p className="text-sm font-bold text-stone-900 mt-0.5">{currentUser.name}</p>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-300 hover:border-[#164E45] hover:text-[#164E45] text-stone-700 text-xs font-semibold transition-all cursor-pointer shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Address</span>
                      </button>
                    </div>

                    <div className="flex items-start justify-between py-2 border-b border-stone-200">
                      <div className="flex items-center gap-2 text-stone-500 font-medium">
                        <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                        <span>Email Address:</span>
                      </div>
                      <span className="font-mono text-stone-800 font-medium">{currentUser.email}</span>
                    </div>

                    <div className="flex items-start justify-between py-2 border-b border-stone-200">
                      <div className="flex items-center gap-2 text-stone-500 font-medium">
                        <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                        <span>Contact Number:</span>
                      </div>
                      <span className="text-right text-stone-800 font-medium">
                        {currentUser.phone || <span className="text-stone-400 italic">Not provided yet</span>}
                      </span>
                    </div>

                    <div className="flex items-start justify-between py-2 border-b border-stone-200">
                      <div className="flex items-center gap-2 text-stone-500 font-medium">
                        <Home className="w-4 h-4 text-stone-400 shrink-0" />
                        <span>Primary UK Address:</span>
                      </div>
                      <span className="text-right text-stone-800 font-medium max-w-xs">
                        {currentUser.address ? (
                          currentUser.address
                        ) : (
                          <span className="text-stone-400 italic">
                            No UK address saved yet. Click "Edit Address" to add your delivery address.
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 text-stone-500 font-medium">
                        <Award className="w-4 h-4 text-stone-400 shrink-0" />
                        <span>Loyalty Tier:</span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            isPatron
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : isDevotee
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-stone-100 text-stone-800 border border-stone-300'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {loyaltyTier}
                        </span>
                        <p className="text-[10px] text-stone-500 mt-1">
                          {isPatron
                            ? 'Exclusive 10% devotee rewards & priority dispatch on all UK orders.'
                            : isDevotee
                            ? '5% devotee rewards applied at checkout.'
                            : 'Welcome tier for new devotees. Complete 3 orders to reach Temple Patron!'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Edit form */
                  <form onSubmit={handleSaveProfile} className="space-y-4 bg-[#FAF7F0] p-5 rounded-2xl border border-[#164E45]/20">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                        Update Delivery Details & Address
                      </h4>
                      <span className="text-[11px] text-stone-500">Synced with Supabase</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="e.g. Rakshith Suren"
                        required
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-[#164E45] focus:ring-1 focus:ring-[#164E45]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="+44 7700 900123"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-[#164E45] focus:ring-1 focus:ring-[#164E45]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Primary UK Delivery Address (Street, City, Postcode)
                      </label>
                      <textarea
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="e.g. 18 Station Road, Harrow, London, HA1 2TU, United Kingdom"
                        rows={3}
                        required
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-[#164E45] focus:ring-1 focus:ring-[#164E45]"
                      />
                      <p className="text-[10px] text-stone-500 mt-1">
                        This address will be safely stored in Supabase and automatically applied to your UK checkout orders.
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditName(currentUser.name || '');
                          setEditAddress(currentUser.address || '');
                          setEditPhone(currentUser.phone || '');
                        }}
                        disabled={isSaving}
                        className="px-4 py-2 rounded-full border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-semibold transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-60"
                      >
                        {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        <span>{isSaving ? 'Saving to Supabase…' : 'Save Address'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Bottom Actions: Sign Out (Close Portal button completely removed) */}
            <div className="pt-3 border-t border-stone-200 flex justify-between items-center">
              <button
                onClick={onLogout}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1.5 font-semibold cursor-pointer py-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Account</span>
              </button>
            </div>
          </div>
        ) : (
          /* When logged out, prompt to authenticate through Supabase */
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto text-[#164E45]">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">Customer Portal</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Sign in with your verified GIRI UK account to view your past orders, manage your wishlist, and track shipments.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onRequestSignIn();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  onClose();
                  onRequestSignUp();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-stone-300 hover:border-[#164E45] hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all cursor-pointer"
              >
                Create an Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
