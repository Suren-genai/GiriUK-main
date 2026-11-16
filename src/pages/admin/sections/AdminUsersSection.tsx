import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Search, CheckCircle, XCircle, Users, AlertTriangle } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  email_confirmed_at: string | null;
  raw_user_meta_data?: { full_name?: string; name?: string; [key: string]: unknown };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getInitial(user: AdminUser): string {
  const name =
    user.raw_user_meta_data?.full_name ||
    user.raw_user_meta_data?.name ||
    user.email;
  return (name as string).charAt(0).toUpperCase();
}

function getDisplayName(user: AdminUser): string {
  return (
    (user.raw_user_meta_data?.full_name as string | undefined) ||
    (user.raw_user_meta_data?.name as string | undefined) ||
    '—'
  );
}

export const AdminUsersSection: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call get_all_users RPC function
        const { data: rpcData, error: rpcErr } = await supabase.rpc('get_all_users');
        if (rpcErr) {
          console.warn('RPC get_all_users error:', rpcErr);
          setPermissionDenied(true);
          setError('User data requires service role key or permission.');
        } else {
          setUsers((rpcData as AdminUser[]) || []);
        }
      } catch {
        setPermissionDenied(true);
        setError('User data requires service role key');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filtered = users.filter(u =>
    !search || u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#164E45] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#164E45]">Registered Customers</h2>
        <div className="flex items-center gap-2 bg-[#164E45]/10 text-[#164E45] px-3 py-1.5 rounded-full text-sm font-medium">
          <Users size={15} />
          {users.length} total users
        </div>
      </div>

      {/* Permission Denied Banner */}
      {permissionDenied && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-800">User data requires service role key</p>
            <p className="text-sm text-amber-700 mt-1">
              Direct access to <code className="bg-amber-100 px-1 rounded">auth.users</code> requires a Supabase service role key.
              To enable this, create a secure server-side API or a database view/function accessible to your admin role.
            </p>
            <p className="text-sm text-amber-700 mt-1">
              Showing placeholder UI below. Configure the backend to unlock full user management.
            </p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#164E45]"
        />
      </div>

      {/* Table or Placeholder */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-[#164E45] text-white">
            <tr>
              {['Avatar', 'Name', 'Email', 'Joined Date', 'Email Verified'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionDenied && filtered.length === 0 ? (
              /* Placeholder rows */
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
                  </td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-28 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-40 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-5 bg-gray-200 rounded-full w-12 animate-pulse" /></td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-10 text-gray-500">No users found.</td></tr>
            ) : (
              filtered.map(user => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-[#FCF9F2] transition">
                  <td className="px-4 py-3">
                    <div className="w-9 h-9 rounded-full bg-[#164E45] text-white flex items-center justify-center font-bold text-sm">
                      {getInitial(user)}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{getDisplayName(user)}</td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatDate(user.created_at)}</td>
                  <td className="px-4 py-3">
                    {user.email_confirmed_at ? (
                      <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium w-fit">
                        <CheckCircle size={12} /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-xs font-medium w-fit">
                        <XCircle size={12} /> Unverified
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {error && !permissionDenied && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
};
