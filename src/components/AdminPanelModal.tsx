import React, { useState } from 'react';
import { X, SlidersHorizontal, Package, ShoppingCart, Tag, MessageSquare, Plus, Check, RefreshCw } from 'lucide-react';
import { Product, Order, Coupon, OnDemandRequest, OrderStatus } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  onDemandRequests: OnDemandRequest[];
  onUpdateProduct: (product: Product) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onAddCoupon: (coupon: Coupon) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  coupons,
  onDemandRequests,
  onUpdateProduct,
  onUpdateOrderStatus,
  onAddCoupon
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'coupons' | 'requests'>('dashboard');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-[#00362f] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#ffdb96]" />
            <div>
              <h2 className="text-base font-bold font-serif">GIRI UK · Store Administration Console</h2>
              <p className="text-[11px] text-stone-300">Catalog, Stock Inventory, Courier Dispatch &amp; Promotions (SOW §19)</p>
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

        {/* Tab Navigation */}
        <div className="bg-[#FAF7F0] border-b border-stone-200 px-6 flex gap-4 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 transition-colors cursor-pointer ${
              activeTab === 'dashboard' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 transition-colors cursor-pointer ${
              activeTab === 'products' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Products &amp; Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`py-3 transition-colors cursor-pointer ${
              activeTab === 'coupons' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Coupons &amp; Offers
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-3 transition-colors cursor-pointer ${
              activeTab === 'requests' ? 'border-b-2 border-[#164E45] text-[#164E45]' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            On-Demand Inquiries ({onDemandRequests.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto text-xs">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold">Total Revenue (GBP)</span>
                  <p className="text-xl font-bold font-mono text-[#164E45] mt-1">£{totalRevenue.toFixed(2)}</p>
                  <p className="text-[10px] text-emerald-700 mt-0.5">Live store sales</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold">Active Orders</span>
                  <p className="text-xl font-bold font-mono text-stone-800 mt-1">{orders.length}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">UK &amp; EU shipments</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold">Live Products</span>
                  <p className="text-xl font-bold font-mono text-stone-800 mt-1">{products.length}</p>
                  <p className="text-[10px] text-emerald-700 mt-0.5">In stock &amp; listed</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold">Custom Inquiries</span>
                  <p className="text-xl font-bold font-mono text-[#B99A5B] mt-1">{onDemandRequests.length}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Sourcing tickets</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-emerald-50 text-emerald-900 flex items-center justify-between">
                <div>
                  <p className="font-bold">Active Campaign: Deepavali 2026 Special</p>
                  <p className="text-[11px] text-emerald-700">Code <strong>GIRIUK2026</strong> gives 10% discount across all categories.</p>
                </div>
                <span className="bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-full text-[10px]">
                  LIVE ON STORE
                </span>
              </div>
            </div>
          )}

          {/* Products Management */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Catalogue &amp; Warehouse Inventory</span>
                <span className="text-stone-400">Click &ldquo;Edit&rdquo; to modify price or toggle stock availability</span>
              </div>

              <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100">
                {products.map((p) => {
                  const isEditing = editingProductId === p.id;

                  return (
                    <div key={p.id} className="p-3 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-md border border-stone-200 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-800 truncate">{p.name}</p>
                          <p className="text-[10px] text-stone-400">{p.category} · SKU: {p.sku}</p>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.01"
                            value={editPrice}
                            onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border border-stone-300 rounded font-mono text-xs"
                          />
                          <input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-stone-300 rounded font-mono text-xs"
                          />
                          <button
                            onClick={() => {
                              onUpdateProduct({
                                ...p,
                                price: editPrice,
                                stockCount: editStock,
                                inStock: editStock > 0
                              });
                              setEditingProductId(null);
                            }}
                            className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-800"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="font-mono font-bold text-stone-800 text-xs">£{p.price.toFixed(2)}</span>
                          <button
                            onClick={() => {
                              onUpdateProduct({ ...p, inStock: !p.inStock });
                            }}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {p.inStock ? `In Stock (${p.stockCount})` : 'Out of Stock'}
                          </button>
                          <button
                            onClick={() => {
                              setEditingProductId(p.id);
                              setEditPrice(p.price);
                              setEditStock(p.stockCount);
                            }}
                            className="text-[#164E45] font-semibold underline hover:text-[#00362f]"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Orders Management */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <span className="font-bold text-stone-800">Dispatch &amp; Fulfilment Desk</span>
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-xl border border-stone-200 bg-[#FAF7F0] space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-stone-900 font-mono">{ord.orderNumber}</span>
                        <span className="text-stone-500 ml-2">Customer: {ord.shippingAddress.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-stone-400">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="px-2 py-1 rounded border border-stone-300 font-bold bg-white text-[#164E45]"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-between text-stone-500 text-[11px]">
                      <span>Destination: {ord.shippingAddress.city}, {ord.shippingAddress.postcode} ({ord.shippingMethod})</span>
                      <span className="font-bold text-[#164E45] font-mono text-xs">Total: £{ord.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coupons Management */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <span className="font-bold text-stone-800">Active Promotional Coupons</span>
              <div className="space-y-2">
                {coupons.map((c) => (
                  <div key={c.code} className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between">
                    <div>
                      <span className="font-bold font-mono text-[#164E45] text-sm">{c.code}</span>
                      <span className="text-stone-500 ml-2">· {c.discountPercent}% Discount</span>
                      <p className="text-stone-400 text-[11px] mt-0.5">{c.description}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* On-Demand Inquiries */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <span className="font-bold text-stone-800">Submitted Custom Product Requests</span>
              {onDemandRequests.length === 0 ? (
                <p className="text-stone-500 py-6 text-center">No custom sourcing tickets submitted yet.</p>
              ) : (
                <div className="space-y-3">
                  {onDemandRequests.map((req) => (
                    <div key={req.id} className="p-4 rounded-xl border border-stone-200 bg-[#FAF7F0] space-y-1.5">
                      <div className="flex justify-between">
                        <span className="font-bold font-mono text-[#164E45]">{req.id.toUpperCase()}</span>
                        <span className="text-stone-400">{req.createdAt}</span>
                      </div>
                      <p className="font-medium text-stone-800">{req.fullName} ({req.email} · {req.phone})</p>
                      <p className="text-stone-600">Category: <strong>{req.itemCategory}</strong> · Budget: {req.approximateBudget}</p>
                      <p className="text-stone-700 bg-white p-2 rounded border border-stone-200">{req.productDescription}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
