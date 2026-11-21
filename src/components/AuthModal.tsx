import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

type AuthMode = 'signin' | 'signup' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onAuthSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setError(null);
    setSuccessMsg(null);
  };

  const switchMode = (m: AuthMode) => {
    setMode(m);
    resetForm();
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out. Please try again.')), 10000)
    );

    try {
      const { data, error: authError } = await Promise.race([
        supabase.auth.signInWithPassword({ email, password }),
        timeout,
      ]);
      if (authError) throw authError;
      const name =
        data.user?.user_metadata?.full_name ||
        data.user?.user_metadata?.name ||
        email.split('@')[0];
      onAuthSuccess({ name, email: data.user!.email! });
      onClose();
    } catch (err: unknown) {
      setError((err as { message?: string }).message || 'Sign in failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Wrap with a 15-second timeout so it never hangs forever
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out. Please check your internet connection and try again.')), 15000)
    );

    try {
      const result = await Promise.race([
        supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/`,
          },
        }),
        timeout,
      ]);

      const { data, error: authError } = result;
      if (authError) throw authError;

      // Check if user already exists (Supabase returns user with empty identities array)
      if (data?.user && data.user.identities && data.user.identities.length === 0) {
        setError('An account with this email already exists. Please sign in instead.');
        setLoading(false);
        return;
      }

      // If email confirmation is disabled, user is immediately confirmed and gets a session
      if (data?.session) {
        const name = data.user?.user_metadata?.full_name || fullName || email.split('@')[0];
        onAuthSuccess({ name, email: data.user!.email! });
        onClose();
      } else if (data?.user) {
        // Email confirmation required — show success message
        setSuccessMsg(
          `✅ Account created! Check your inbox at ${email} for a confirmation link, then sign in.`
        );
      } else {
        // Unexpected response — no user and no error
        setError('Something went wrong. Please try again.');
      }
    } catch (err: unknown) {
      const message = (err as { message?: string }).message || 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });
      if (authError) throw authError;
      setSuccessMsg(`Password reset link sent to ${email}. Check your inbox.`);
    } catch (err: unknown) {
      setError((err as { message?: string }).message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
      if (authError) throw authError;
      // Google auth redirects the browser; onAuthSuccess fires via onAuthStateChange in App
    } catch (err: unknown) {
      setError((err as { message?: string }).message || 'Google sign in failed.');
      setLoading(false);
    }
  };

  const titles: Record<AuthMode, string> = {
    signin: 'Welcome Back',
    signup: 'Create Account',
    forgot: 'Reset Password',
  };

  const subtitles: Record<AuthMode, string> = {
    signin: 'Sign in to access your GIRI UK account',
    signup: 'Join thousands of UK devotees on GIRI UK',
    forgot: "Enter your email and we'll send a reset link",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Top decorative bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#164E45] via-[#D4AF37] to-[#164E45]" />

        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <img
                src="/assets/aistudio/GiriUK_Logo_aae825c0.png"
                alt="GIRI UK"
                className="h-7 w-auto object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-stone-900 font-serif mt-2">{titles[mode]}</h2>
            <p className="text-xs text-stone-500 mt-0.5">{subtitles[mode]}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer mt-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Error / Success banners */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Google sign-in (not on forgot page) */}
          {mode !== 'forgot' && (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 hover:border-stone-400 transition-all text-sm font-semibold text-stone-700 cursor-pointer disabled:opacity-50"
            >
              {/* Google G icon */}
              <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
            </button>
          )}

          {mode !== 'forgot' && (
            <div className="relative flex items-center gap-3 text-[11px] text-stone-400">
              <div className="flex-1 border-t border-stone-200" />
              <span>or continue with email</span>
              <div className="flex-1 border-t border-stone-200" />
            </div>
          )}

          {/* Sign In Form */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-[#164E45] focus:ring-2 focus:ring-[#164E45]/15 transition-all"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-600">Password</label>
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-[11px] text-[#164E45] hover:underline font-medium cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-[#164E45] focus:ring-2 focus:ring-[#164E45]/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#164E45] hover:bg-[#00362f] text-white text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                {loading ? 'Signing in…' : 'Sign In to GIRI UK'}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Full Name"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-[#164E45] focus:ring-2 focus:ring-[#164E45]/15 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-[#164E45] focus:ring-2 focus:ring-[#164E45]/15 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    required
                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-[#164E45] focus:ring-2 focus:ring-[#164E45]/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-[#164E45] focus:ring-2 focus:ring-[#164E45]/15 transition-all"
                  />
                </div>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                By creating an account you agree to our{' '}
                <span className="text-[#164E45] underline cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-[#164E45] underline cursor-pointer">Privacy Policy</span>.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#164E45] hover:bg-[#00362f] text-white text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                {loading ? 'Creating account…' : 'Create My GIRI UK Account'}
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:border-[#164E45] focus:ring-2 focus:ring-[#164E45]/15 transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#164E45] hover:bg-[#00362f] text-white text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          )}

          {/* Mode switcher footer */}
          <div className="text-center text-xs text-stone-500 pt-1">
            {mode === 'signin' && (
              <>
                New to GIRI UK?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  className="text-[#164E45] font-bold hover:underline cursor-pointer"
                >
                  Create a free account
                </button>
              </>
            )}
            {mode === 'signup' && (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => switchMode('signin')}
                  className="text-[#164E45] font-bold hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </>
            )}
            {mode === 'forgot' && (
              <>
                Remembered it?{' '}
                <button
                  onClick={() => switchMode('signin')}
                  className="text-[#164E45] font-bold hover:underline cursor-pointer"
                >
                  Back to Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
