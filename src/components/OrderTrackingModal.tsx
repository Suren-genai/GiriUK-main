import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, Package, MapPin } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialOrderNumber?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialOrderNumber = ''
}) => {
  if (!isOpen) return null;

  const [searchRef, setSearchRef] = useState(initialOrderNumber || 'GIRI-UK-849201');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders.find(o => o.orderNumber.toLowerCase() === (initialOrderNumber || 'GIRI-UK-849201').toLowerCase()) || orders[0] || null
  );
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const found = orders.find(
      o => o.orderNumber.toLowerCase() === searchRef.trim().toLowerCase() ||
           o.trackingNumber.toLowerCase() === searchRef.trim().toLowerCase() ||
           o.shippingAddress.email.toLowerCase() === searchRef.trim().toLowerCase()
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      setErrorMsg(`No active dispatch found for "${searchRef}". Please check your order confirmation email.`);
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Payment verified and sent to UK fulfillment depot', done: true },
    { title: 'Temple Packaged', desc: 'Securely packaged with auspicious protection', done: true },
    { 
      title: selectedOrder?.shippingMethod || 'Royal Mail 48 Tracked', 
      desc: `In Transit with courier (Barcode: ${selectedOrder?.trackingNumber || 'Pending'})`, 
      done: selectedOrder?.status === 'In Transit' || selectedOrder?.status === 'Delivered',
      current: selectedOrder?.status === 'In Transit'
    },
    { 
      title: 'Delivered', 
      desc: `Expected arrival: ${selectedOrder?.estimatedDelivery || 'In 2 days'}`, 
      done: selectedOrder?.status === 'Delivered',
      current: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF7F0] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#164E45]" />
            <h2 className="text-base font-bold text-stone-900 font-serif">Track Your Delivery</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Enter Order Number (e.g. GIRI-UK-849201) or Email"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#164E45]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#164E45] hover:bg-[#00362f] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>

          {errorMsg && (
            <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              {errorMsg}
            </p>
          )}

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status Badge & ETA */}
              <div className="p-4 bg-[#FCF9F2] rounded-xl border border-[#E8E3D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Order Reference</span>
                  <p className="text-base font-mono font-bold text-stone-900">{selectedOrder.orderNumber}</p>
                  <p className="text-xs text-stone-500 mt-0.5">Carrier: {selectedOrder.shippingMethod} · Ref: {selectedOrder.trackingNumber}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Status</span>
                  <div>
                    <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">Est. Delivery: <strong>{selectedOrder.estimatedDelivery}</strong></p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Real-Time Courier Milestone Tracking
                </h4>

                <div className="relative border-l-2 border-stone-200 ml-3 pl-6 space-y-6">
                  {steps.map((st, idx) => (
                    <div key={idx} className="relative">
                      {/* Node circle */}
                      <span
                        className={`absolute -left-[31px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          st.done
                            ? 'bg-[#164E45] text-white ring-4 ring-[#164E45]/15'
                            : st.current
                            ? 'bg-[#B99A5B] text-white ring-4 ring-[#B99A5B]/20'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {st.done ? '✓' : idx + 1}
                      </span>

                      <div>
                        <p className={`text-xs font-bold ${st.done || st.current ? 'text-stone-900' : 'text-stone-400'}`}>
                          {st.title}
                        </p>
                        <p className="text-[11px] text-stone-500 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Contents */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                  Package Contents ({selectedOrder.items.length} items)
                </h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((it, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100 last:border-0">
                      <div className="flex items-center gap-2.5">
                        <img src={it.product.image} alt={it.product.name} className="w-10 h-10 object-cover rounded-md border border-stone-200" />
                        <div>
                          <p className="font-semibold text-stone-800">{it.product.name}</p>
                          <p className="text-[10px] text-stone-400">Qty: {it.quantity} · SKU: {it.product.sku}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#164E45] font-mono">
                        £{(it.product.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
