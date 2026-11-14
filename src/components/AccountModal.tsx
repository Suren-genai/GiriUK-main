import React, { useState } from 'react';
import { X, User, Lock, Mail, CheckCircle2, Package, MapPin, Heart, LogOut } from 'lucide-react';
import { Order, Product } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; email: string } | null;
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
  orders: Order[];
  wishlist: Product[];
  onSelectProduct: (product: Product) => void;
  onTrackOrder: (orderNumber: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  orders,
  wishlist,
  onSelectProduct,
  onTrackOrder
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('suren.genaiarchitect@gmail.com');
  const [password, setPassword] = useState('••••••••••');
  const [name, setName] = useState('Suren Murugesan');
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      onLogin(name, email);
    } else {
      onLogin(name || 'Devotee Customer', email);
    }
  };

  const handleSocialLogin = (provider: string) => {
    onLogin(name || `${provider} User`, email);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
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
                  activeTab === 'orders' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders ({orders.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`pb-3 mr-6 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'wishlist' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Saved Wishlist ({wishlist.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-3 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'profile' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
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
                  <p className="text-xs text-stone-500 py-8 text-center">Your wishlist is empty. Click the heart icon on any product to save it.</p>
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
                          <p className="text-[10px] text-stone-500">{item.category} · {item.inStock ? 'In Stock' : 'Out of Stock'}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#164E45] font-mono">£{item.price.toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Profile View */}
            {activeTab === 'profile' && (
              <div className="space-y-3 text-xs bg-[#FAF7F0] p-4 rounded-xl border border-stone-200">
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Full Name:</span>
                  <span className="font-bold text-stone-800">{currentUser.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Email:</span>
                  <span className="font-mono text-stone-800">{currentUser.email}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Primary UK Address:</span>
                  <span className="text-right text-stone-800">18 Station Road, Harrow, London HA1 2TU, UK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Loyalty Tier:</span>
                  <span className="font-bold text-[#cca730]">Temple Patron (10% Rewards)</span>
                </div>
              </div>
            )}

            {/* Logout button */}
            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={onLogout}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Account</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#164E45] text-white text-xs font-bold hover:bg-[#00362f] cursor-pointer"
              >
                Close Portal
              </button>
            </div>
          </div>
        ) : (
          /* Login / Register Form */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex border-b border-stone-200 text-xs font-bold">
              <button
                onClick={() => setMode('login')}
                className={`pb-3 mr-6 cursor-pointer ${mode === 'login' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-400'}`}
              >
                Sign In to Account
              </button>
              <button
                onClick={() => setMode('register')}
                className={`pb-3 cursor-pointer ${mode === 'register' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-400'}`}
              >
                Create New Account
              </button>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="p-2.5 rounded-lg border border-stone-300 hover:bg-stone-50 flex items-center justify-center gap-2 font-semibold text-stone-700 cursor-pointer"
              >
                <span>Continue with Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="p-2.5 rounded-lg border border-stone-300 hover:bg-stone-50 flex items-center justify-center gap-2 font-semibold text-stone-700 cursor-pointer"
              >
                <span>Continue with Facebook</span>
              </button>
            </div>

            <div className="relative text-center">
              <span className="bg-white px-3 text-[11px] text-stone-400 relative z-10">or continue with email</span>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {mode === 'register' && (
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Your Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-stone-600 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#164E45]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {mode === 'login' ? 'Sign In to GIRI UK' : 'Create My Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
