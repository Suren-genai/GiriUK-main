import React, { useState, useMemo } from 'react';
import { Order, OrderStatus } from '../../../types';
import { Search, Download, ChevronDown, ChevronUp, Package, MapPin } from 'lucide-react';

interface AdminOrdersSectionProps {
  orders: Order[];
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
}

const STATUS_OPTIONS: OrderStatus[] = ['Processing', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled'];

const STATUS_BADGE: Record<OrderStatus, string> = {
  Processing: 'bg-amber-100 text-amber-800',
  Dispatched: 'bg-blue-100 text-blue-800',
  'In Transit': 'bg-purple-100 text-purple-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const PAGE_SIZE = 10;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatGBP(n: number) {
  return `£${n.toFixed(2)}`;
}

export const AdminOrdersSection: React.FC<AdminOrdersSectionProps> = ({ orders, onUpdateOrderStatus }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<Record<string, OrderStatus>>({});
  const [editTracking, setEditTracking] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders
      .filter(o => {
        const matchSearch =
          !q ||
          o.orderNumber.toLowerCase().includes(q) ||
          o.shippingAddress.fullName.toLowerCase().includes(q) ||
          o.shippingAddress.email.toLowerCase().includes(q);
        const matchStatus = statusFilter === 'All' || o.status === statusFilter;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getStatus = (o: Order): OrderStatus => editStatus[o.id] ?? o.status;
  const getTracking = (o: Order): string => editTracking[o.id] ?? o.trackingNumber;

  const handleStatusChange = (id: string, s: OrderStatus) => {
    setEditStatus(prev => ({ ...prev, [id]: s }));
  };

  const handleSave = (o: Order) => {
    onUpdateOrderStatus(o.id, getStatus(o));
  };

  const exportCSV = () => {
    const headers = [
      'Order#', 'Date', 'Customer', 'Email', 'Items', 'Subtotal', 'Discount', 'Total',
      'Payment', 'Shipping', 'Status', 'Tracking',
    ];
    const rows = orders.map(o => [
      o.orderNumber,
      formatDate(o.createdAt),
      o.shippingAddress.fullName,
      o.shippingAddress.email,
      o.items.reduce((s, i) => s + i.quantity, 0),
      o.subtotal.toFixed(2),
      o.discount.toFixed(2),
      o.total.toFixed(2),
      o.paymentMethod,
      o.shippingMethod,
      o.status,
      o.trackingNumber,
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'giriuk_orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#164E45]">Orders Management</h2>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-[#cca730] hover:bg-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search order# or customer…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#164E45]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#164E45]"
        >
          <option value="All">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-[#164E45] text-white">
            <tr>
              {['Order#', 'Date', 'Customer', 'Items', 'Subtotal', 'Discount', 'Total', 'Payment', 'Shipping', 'Status', 'Tracking', 'Actions'].map(h => (
                <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && (
              <tr><td colSpan={12} className="text-center py-10 text-gray-500">No orders found.</td></tr>
            )}
            {paged.map(order => {
              const isExpanded = expandedId === order.id;
              const currentStatus = getStatus(order);
              const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
              return (
                <React.Fragment key={order.id}>
                  <tr
                    className={`border-t border-gray-100 cursor-pointer hover:bg-[#FCF9F2] transition ${isExpanded ? 'bg-[#FCF9F2]' : ''}`}
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  >
                    <td className="px-3 py-3 font-mono font-semibold text-[#164E45] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-600">{formatDate(order.createdAt)}</td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-gray-800">{order.shippingAddress.fullName}</div>
                      <div className="text-xs text-gray-500">{order.shippingAddress.email}</div>
                    </td>
                    <td className="px-3 py-3 text-center">{itemCount}</td>
                    <td className="px-3 py-3 whitespace-nowrap">{formatGBP(order.subtotal)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-green-700">-{formatGBP(order.discount)}</td>
                    <td className="px-3 py-3 whitespace-nowrap font-semibold">{formatGBP(order.total)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-600">{order.paymentMethod}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-600">{order.shippingMethod}</td>
                    <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                      <select
                        value={currentStatus}
                        onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#164E45] ${STATUS_BADGE[currentStatus]}`}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                      <input
                        type="text"
                        value={getTracking(order)}
                        onChange={e => setEditTracking(prev => ({ ...prev, [order.id]: e.target.value }))}
                        placeholder="—"
                        className="border border-gray-200 rounded px-2 py-1 text-xs w-28 focus:outline-none focus:ring-1 focus:ring-[#164E45]"
                      />
                    </td>
                    <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => handleSave(order)}
                        className="bg-[#164E45] hover:bg-[#00362f] text-white text-xs px-3 py-1 rounded-lg transition whitespace-nowrap"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-[#FCF9F2]">
                      <td colSpan={12} className="px-6 py-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Shipping Address */}
                          <div>
                            <h4 className="flex items-center gap-2 font-semibold text-[#164E45] mb-2">
                              <MapPin size={14} /> Shipping Address
                            </h4>
                            <div className="text-sm text-gray-700 space-y-0.5">
                              <div className="font-medium">{order.shippingAddress.fullName}</div>
                              <div>{order.shippingAddress.addressLine1}</div>
                              {order.shippingAddress.addressLine2 && <div>{order.shippingAddress.addressLine2}</div>}
                              <div>{order.shippingAddress.city}, {order.shippingAddress.postcode}</div>
                              <div>{order.shippingAddress.country}</div>
                              <div className="text-gray-500">{order.shippingAddress.phone}</div>
                            </div>
                          </div>
                          {/* Order Items */}
                          <div>
                            <h4 className="flex items-center gap-2 font-semibold text-[#164E45] mb-2">
                              <Package size={14} /> Items ({itemCount})
                            </h4>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm">
                                  {item.product.image && (
                                    <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded" />
                                  )}
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-800">{item.product.name}</div>
                                    <div className="text-gray-500 text-xs">SKU: {item.product.sku}</div>
                                  </div>
                                  <div className="text-gray-600">×{item.quantity}</div>
                                  <div className="font-semibold">{formatGBP(item.product.price * item.quantity)}</div>
                                </div>
                              ))}
                            </div>
                            {order.couponCode && (
                              <div className="mt-2 text-xs text-green-700">Coupon: <span className="font-mono font-bold">{order.couponCode}</span></div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} orders</span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
          >
            ‹ Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded border ${p === page ? 'bg-[#164E45] text-white border-[#164E45]' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
};
