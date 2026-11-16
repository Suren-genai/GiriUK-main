import React, { useMemo } from 'react';
import {
  Package,
  ShoppingCart,
  PoundSterling,
  Sparkles,
  Users,
  Plus,
  Download,
  TrendingUp,
  Clock,
} from 'lucide-react';
import type { Product, Order, OnDemandRequest } from '../../../types';

interface AdminOverviewSectionProps {
  products: Product[];
  orders: Order[];
  onDemandRequests: OnDemandRequest[];
  onNavigate: (tab: string) => void;
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Processing: 'bg-amber-100 text-amber-800',
    Dispatched: 'bg-blue-100 text-blue-800',
    'In Transit': 'bg-purple-100 text-purple-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}

function exportOrdersCSV(orders: Order[]) {
  const headers = ['Order#', 'Date', 'Customer', 'Email', 'Items', 'Subtotal', 'Discount', 'Total', 'Status', 'Payment', 'Shipping'];
  const rows = orders.map(o => [
    o.orderNumber,
    new Date(o.createdAt).toLocaleDateString('en-GB'),
    o.shippingAddress.fullName,
    o.shippingAddress.email,
    o.items.reduce((s, i) => s + i.quantity, 0),
    `£${o.subtotal.toFixed(2)}`,
    `£${o.discount.toFixed(2)}`,
    `£${o.total.toFixed(2)}`,
    o.status,
    o.paymentMethod,
    o.shippingMethod,
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `giriuk-orders-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export const AdminOverviewSection: React.FC<AdminOverviewSectionProps> = ({
  products,
  orders,
  onDemandRequests,
  onNavigate,
}) => {
  const totalRevenue = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders]);
  const pendingOnDemand = useMemo(() => onDemandRequests.filter(r => r.status === 'Received' || r.status === 'Under Review with Sourcing Team').length, [onDemandRequests]);
  const recentOrders = useMemo(() => [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5), [orders]);
  const pendingRequests = useMemo(() => onDemandRequests.filter(r => r.status === 'Received' || r.status === 'Under Review with Sourcing Team').slice(0, 3), [onDemandRequests]);

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, trend: 'All categories', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingCart, trend: 'All time', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Revenue', value: `£${totalRevenue.toFixed(2)}`, icon: PoundSterling, trend: 'All orders', color: 'text-[#cca730]', bg: 'bg-amber-50' },
    { label: 'Pending On-Demand', value: pendingOnDemand, icon: Sparkles, trend: 'Awaiting action', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Registered Users', value: 0, icon: Users, trend: 'Placeholder', color: 'text-gray-600', bg: 'bg-gray-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <TrendingUp className="w-3 h-3" />
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#cca730] text-white font-medium text-sm hover:bg-[#b8921f] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
        <button
          onClick={() => exportOrdersCSV(orders)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export Orders CSV
        </button>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          <button onClick={() => onNavigate('orders')} className="text-sm text-[#cca730] hover:underline font-medium">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-4 py-3 text-left">Order #</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-right">Items</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">No orders yet</td>
                </tr>
              ) : recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-gray-800">{order.orderNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{order.shippingAddress.fullName}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{order.items.reduce((s, i) => s + i.quantity, 0)}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">£{order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">{statusBadge(order.status)}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* On-Demand Requests Summary */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Pending On-Demand Requests</h2>
          <button onClick={() => onNavigate('ondemand')} className="text-sm text-[#cca730] hover:underline font-medium">
            View all
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {pendingRequests.length === 0 ? (
            <p className="px-6 py-8 text-center text-gray-400 text-sm">No pending requests</p>
          ) : pendingRequests.map(req => (
            <div key={req.id} className="px-6 py-4 flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800 text-sm">{req.fullName}</span>
                  <span className="text-xs text-gray-400">{req.email}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{req.productDescription}</p>
                <p className="text-xs text-gray-400 mt-1">{req.itemCategory} · {req.approximateBudget ?? 'No budget given'}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Clock className="w-3 h-3 text-amber-500" />
                <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{req.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
