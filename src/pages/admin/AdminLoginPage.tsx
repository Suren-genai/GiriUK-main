import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { checkIsAdmin, updateAdminLastLogin } from '../../services/adminService';

interface AdminLoginPageProps {
  onAdminLogin: (user: { name: string; email: string; role: string }) => void;
  onBackToStore: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onAdminLogin,
  onBackToStore,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError || !authData.user) {
        setError(authError?.message ?? 'Authentication failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      // 2. Verify the user is in admin_users
      const { isAdmin, role, name } = await checkIsAdmin(email.trim());

      if (!isAdmin) {
        // Sign out immediately — not an admin
        await supabase.auth.signOut();
        setError('Access Denied — not an authorised admin.');
        setLoading(false);
        return;
      }

      // 3. Update last_login timestamp
      await updateAdminLastLogin(email.trim());

      // 4. Call the success callback
      onAdminLogin({ name, email: email.trim(), role });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#00362f] flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Card header */}
        <div className="bg-[#164E45] px-8 pt-10 pb-8 flex flex-col items-center gap-3">
          {/* Logo / wordmark */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold tracking-widest text-[#D4AF37]">GIRI</span>
            <span className="text-3xl font-extrabold tracking-widest text-white">UK</span>
          </div>

          {/* Admin Portal badge */}
          <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold px-3 py-1 rounded-full tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Portal
          </span>

          <p className="text-white/60 text-sm mt-1 text-center">
            Restricted access — authorised personnel only
          </p>
        </div>

        {/* Form body */}
        <div className="px-8 py-8">
          {/* Error banner */}
          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <span className="mt-0.5 shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-[#164E45] focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm text-gray-900 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-[#164E45] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#cca730] hover:bg-[#D4AF37]
                text-white font-semibold py-2.5 px-4 text-sm transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in to Admin Portal'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-8 py-5 flex justify-center">
          <button
            type="button"
            onClick={onBackToStore}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#164E45] transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to GIRI UK Store
          </button>
        </div>
      </div>

      {/* Bottom credit */}
      <p className="mt-6 text-white/30 text-xs">
        © {new Date().getFullYear()} GIRI UK. All rights reserved.
      </p>
    </div>
  );
};

export default AdminLoginPage;
