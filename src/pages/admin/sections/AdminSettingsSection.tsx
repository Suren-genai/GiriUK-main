import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Store, Shield, Database, Palette, Eye, EyeOff, CheckCircle, X, Loader2, KeyRound } from 'lucide-react';

interface AdminSettingsSectionProps {
  adminUser: {
    name: string;
    email: string;
    role: string;
  };
}

const SUPABASE_PROJECT_REF = 'pyjqoqwzclayudefrwjm';

function SettingsCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-[#164E45]/5">
        <span className="text-[#164E45]">{icon}</span>
        <h3 className="font-semibold text-[#164E45] text-base">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value}</span>
    </div>
  );
}

export const AdminSettingsSection: React.FC<AdminSettingsSectionProps> = ({ adminUser }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);

  const handleChangePassword = async () => {
    setPwError(null);
    if (newPassword.length < 8) {
      setPwError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('Passwords do not match.');
      return;
    }
    setPwLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPwError(error.message);
      } else {
        setPwSuccess(true);
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setShowPasswordModal(false);
          setPwSuccess(false);
        }, 2000);
      }
    } catch {
      setPwError('An unexpected error occurred.');
    } finally {
      setPwLoading(false);
    }
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'editor': return 'Editor';
      default: return role;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-[#164E45]">Settings</h2>

      {/* Store Settings */}
      <SettingsCard icon={<Store size={18} />} title="Store Settings">
        <div className="space-y-1">
          <InfoRow label="Store Name" value="GIRI UK" />
          <InfoRow label="Store Email" value="hello@giriuk.com" />
          <InfoRow label="Currency" value={
            <span className="flex items-center gap-1.5">
              <span className="bg-[#cca730]/20 text-[#8a6e1a] text-xs font-bold px-2 py-0.5 rounded">GBP £</span>
              British Pound
            </span>
          } />
          <InfoRow label="Tax Rate" value="20% VAT (UK Standard)" />
          <InfoRow label="Country" value="United Kingdom 🇬🇧" />
          <InfoRow label="Shipping Regions" value="UK, EU, International" />
        </div>
      </SettingsCard>

      {/* Admin Users */}
      <SettingsCard icon={<Shield size={18} />} title="Admin Account">
        <div className="space-y-1 mb-4">
          <InfoRow label="Name" value={adminUser.name} />
          <InfoRow label="Email" value={adminUser.email} />
          <InfoRow label="Role" value={
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              adminUser.role === 'super_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {roleLabel(adminUser.role)}
            </span>
          } />
        </div>
        <button
          onClick={() => { setShowPasswordModal(true); setPwError(null); setPwSuccess(false); }}
          className="flex items-center gap-2 bg-[#164E45] hover:bg-[#00362f] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <KeyRound size={15} /> Change Password
        </button>
      </SettingsCard>

      {/* Supabase Connection */}
      <SettingsCard icon={<Database size={18} />} title="Supabase Connection">
        <div className="space-y-1">
          <InfoRow label="Status" value={
            <span className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs font-semibold">
              <CheckCircle size={12} /> Connected
            </span>
          } />
          <InfoRow label="Project Ref" value={
            <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{SUPABASE_PROJECT_REF}</span>
          } />
          <InfoRow label="URL" value={
            <a
              href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_REF}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#164E45] underline text-xs hover:text-[#cca730] transition"
            >
              supabase.com/dashboard/project/{SUPABASE_PROJECT_REF}
            </a>
          } />
          <InfoRow label="Region" value="eu-west-2 (London)" />
          <InfoRow label="Auth" value={<span className="text-green-700 font-medium text-xs">✓ Email Auth Enabled</span>} />
          <InfoRow label="Database" value={<span className="text-green-700 font-medium text-xs">✓ PostgreSQL 15</span>} />
        </div>
      </SettingsCard>

      {/* Theme / Appearance */}
      <SettingsCard icon={<Palette size={18} />} title="Theme & Appearance">
        <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400">
          <Palette size={40} className="mb-3 text-gray-300" />
          <p className="font-semibold text-gray-500">Theme customisation coming soon</p>
          <p className="text-sm mt-1">Brand colours, fonts, and layout options will be available in a future update.</p>
        </div>
      </SettingsCard>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#164E45] flex items-center gap-2">
                <KeyRound size={18} /> Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            {pwSuccess ? (
              <div className="flex flex-col items-center py-6 text-green-700 gap-3">
                <CheckCircle size={40} />
                <p className="font-semibold text-lg">Password updated!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pwError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
                    {pwError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#164E45]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm Password</label>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#164E45]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleChangePassword}
                    disabled={pwLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#164E45] hover:bg-[#00362f] text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
                  >
                    {pwLoading ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
                    {pwLoading ? 'Updating…' : 'Update Password'}
                  </button>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
