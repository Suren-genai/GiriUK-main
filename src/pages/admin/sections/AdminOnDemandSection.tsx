import React, { useState, useMemo } from 'react';
import { OnDemandRequest } from '../../../types';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface AdminOnDemandSectionProps {
  requests: OnDemandRequest[];
  onUpdateStatus: (id: string, status: string) => void;
}

type OnDemandStatus = OnDemandRequest['status'];

const STATUS_OPTIONS: OnDemandStatus[] = [
  'Received',
  'Under Review with Sourcing Team',
  'Quote Sent',
  'Procured',
];

const STATUS_BADGE: Record<OnDemandStatus, string> = {
  Received: 'bg-stone-100 text-stone-700',
  'Under Review with Sourcing Team': 'bg-amber-100 text-amber-800',
  'Quote Sent': 'bg-blue-100 text-blue-800',
  Procured: 'bg-green-100 text-green-800',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

const TRUNCATE_LEN = 60;

export const AdminOnDemandSection: React.FC<AdminOnDemandSectionProps> = ({ requests, onUpdateStatus }) => {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<Record<string, OnDemandStatus>>({});

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return requests
      .filter(r => {
        return (
          !q ||
          r.fullName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.itemCategory.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [requests, search]);

  const getStatus = (r: OnDemandRequest): OnDemandStatus => editStatus[r.id] ?? r.status;

  const handleStatusChange = (id: string, s: OnDemandStatus) => {
    setEditStatus(prev => ({ ...prev, [id]: s }));
    onUpdateStatus(id, s);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#164E45]">On-Demand Requests</h2>
        <span className="text-sm text-gray-500">{requests.length} total</span>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or category…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#164E45]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-[#164E45] text-white">
            <tr>
              {['ID', 'Date', 'Customer', 'Phone', 'Category', 'Description', 'Budget', 'Needed By', 'Status'].map(h => (
                <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={9} className="text-center py-10 text-gray-500">No requests found.</td></tr>
            )}
            {filtered.map(req => {
              const isExpanded = expandedId === req.id;
              const currentStatus = getStatus(req);
              const shortDesc = req.productDescription.length > TRUNCATE_LEN
                ? req.productDescription.slice(0, TRUNCATE_LEN) + '…'
                : req.productDescription;

              return (
                <React.Fragment key={req.id}>
                  <tr
                    className={`border-t border-gray-100 cursor-pointer hover:bg-[#FCF9F2] transition ${isExpanded ? 'bg-[#FCF9F2]' : ''}`}
                    onClick={() => setExpandedId(isExpanded ? null : req.id)}
                  >
                    <td className="px-3 py-3 font-mono text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        {req.id.slice(0, 8)}
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-600 text-xs">{formatDate(req.createdAt)}</td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-gray-800">{req.fullName}</div>
                      <div className="text-xs text-gray-500">{req.email}</div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-600">{req.phone}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="bg-[#164E45]/10 text-[#164E45] text-xs px-2 py-0.5 rounded-full font-medium">{req.itemCategory}</span>
                    </td>
                    <td className="px-3 py-3 max-w-[200px]">
                      <span className="text-gray-700 text-xs">{isExpanded ? req.productDescription : shortDesc}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-600">
                      {req.approximateBudget ?? '—'}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-600">
                      {req.neededByDate ? formatDate(req.neededByDate) : '—'}
                    </td>
                    <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                      <select
                        value={currentStatus}
                        onChange={e => handleStatusChange(req.id, e.target.value as OnDemandStatus)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#164E45] ${STATUS_BADGE[currentStatus]}`}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-amber-50">
                      <td colSpan={9} className="px-6 py-4">
                        <div className="text-sm">
                          <span className="font-semibold text-[#164E45]">Full Description: </span>
                          <span className="text-gray-700">{req.productDescription}</span>
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
    </div>
  );
};
