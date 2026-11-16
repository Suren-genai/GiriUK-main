import React, { useState } from 'react';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Sparkles,
  Users,
  Tag,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Store,
} from 'lucide-react';
import type { Product, Order, OnDemandRequest, OrderStatus, Coupon } from '../../types';
import { AdminOverviewSection } from './sections/AdminOverviewSection';
import { AdminProductsSection } from './sections/AdminProductsSection';
import { AdminOrdersSection } from './sections/AdminOrdersSection';
import { AdminOnDemandSection } from './sections/AdminOnDemandSection';
import { AdminUsersSection } from './sections/AdminUsersSection';
import { AdminCouponsSection } from './sections/AdminCouponsSection';
import { AdminSettingsSection } from './sections/AdminSettingsSection';

export interface AdminDashboardProps {
  adminUser: { name: string; email: string; role: string };
  products: Product[];
  orders: Order[];
  onDemandRequests: OnDemandRequest[];
  coupons: Coupon[];
  onLogout: () => void;
  onUpdateProduct: (p: Product) => void;
  onAddProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onUpdateOnDemandStatus: (id: string, status: string) => void;
  onAddCoupon?: (c: Coupon) => void;
  onNavigateToStore: () => void;
}

type Tab = 'overview' | 'products' | 'orders' | 'ondemand' | 'users' | 'coupons' | 'settings';

const NAV_ITEMS: { id: Tab; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: 'overview',  label: 'Overview',    Icon: BarChart3 },
  { id: 'products',  label: 'Products',    Icon: Package },
  { id: 'orders',    label: 'Orders',      Icon: ShoppingCart },
  { id: 'ondemand',  label: 'On Demand',   Icon: Sparkles },
  { id: 'users',     label: 'Users',       Icon: Users },
  { id: 'coupons',   label: 'Coupons',     Icon: Tag },
  { id: 'settings',  label: 'Settings',    Icon: Settings },
];

function AvatarCircle({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-[#cca730] text-white text-xs font-bold flex items-center justify-center shrink-0">
      {initials}
    </div>
  );
}

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
        <Settings className="w-8 h-8 text-gray-300" />
      </div>
      <p className="font-medium text-gray-500">{title}</p>
      <p className="text-sm">Coming soon — this section is under construction.</p>
    </div>
  );
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  products,
  orders,
  onDemandRequests,
  coupons,
  onLogout,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateOnDemandStatus,
  onAddCoupon,
  onNavigateToStore,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as Tab);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <AdminOverviewSection
            products={products}
            orders={orders}
            onDemandRequests={onDemandRequests}
            onNavigate={handleNavigate}
          />
        );
      case 'products':
        return (
          <AdminProductsSection
            products={products}
            onUpdateProduct={onUpdateProduct}
            onAddProduct={onAddProduct}
            onDeleteProduct={onDeleteProduct}
          />
        );
      case 'orders':
        return (
          <AdminOrdersSection
            orders={orders}
            onUpdateOrderStatus={onUpdateOrderStatus}
          />
        );
      case 'ondemand':
        return (
          <AdminOnDemandSection
            requests={onDemandRequests}
            onUpdateStatus={onUpdateOnDemandStatus}
          />
        );
      case 'users':
        return <AdminUsersSection />;
      case 'coupons':
        return (
          <AdminCouponsSection
            coupons={coupons}
            onAddCoupon={onAddCoupon || (() => {})}
          />
        );
      case 'settings':
        return <AdminSettingsSection adminUser={adminUser} />;
      default:
        return null;
    }
  };

  const currentTabLabel = NAV_ITEMS.find(n => n.id === activeTab)?.label ?? 'Dashboard';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#cca730] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">G</span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm leading-tight">GIRI UK</p>
            <p className="text-white/50 text-xs">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => handleNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#cca730] text-white shadow-sm'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
              {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom: Store link + Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <button
          onClick={onNavigateToStore}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
        >
          <Store className="w-4 h-4 shrink-0" />
          Back to Store
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F5F0E8] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#00362f] shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-10 flex flex-col w-56 bg-[#00362f] h-full">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center gap-3 shrink-0 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-gray-900 text-sm truncate">{currentTabLabel}</h1>
            <p className="text-xs text-gray-400 truncate hidden sm:block">GIRI UK Admin Portal</p>
          </div>

          {/* Admin Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm font-medium text-gray-800">{adminUser.name}</span>
              <span className="text-xs text-gray-400 capitalize">{adminUser.role.replace('_', ' ')}</span>
            </div>
            <AvatarCircle name={adminUser.name} />
            <button
              onClick={onLogout}
              title="Logout"
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
