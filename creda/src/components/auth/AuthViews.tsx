import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Smartphone, Mail, Lock, Building2, CheckCircle2 } from 'lucide-react';
import { ViewMode } from '../../types';
import { Wordmark } from '../common/Logo';
import { supabase, supabaseConfigured } from '../../lib/supabase';

interface AuthViewProps {
  mode: 'login' | 'signup';
  onNavigate: (view: ViewMode) => void;
  onSuccess: () => void;
  onOpenOnboarding: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  mode,
  onNavigate,
  onSuccess,
  onOpenOnboarding,
}) => {
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fullPhone = () => '+233' + phone.replace(/\D/g, '').replace(/^0/, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!supabaseConfigured) {
      setError('Sign-in is not configured yet. Add the Supabase environment variables.');
      return;
    }
    setLoading(true);
    try {
      const isPhone = authMethod === 'phone';
      if (!otpSent) {
        const options = {
          shouldCreateUser: mode === 'signup',
          data: { business_name: businessName },
        };
        const { error: err } = isPhone
          ? await supabase.auth.signInWithOtp({ phone: fullPhone(), options })
          : await supabase.auth.signInWithOtp({ email, options });
        if (err) throw err;
        setOtpSent(true);
      } else {
        const { error: err } = isPhone
          ? await supabase.auth.verifyOtp({ phone: fullPhone(), token: otpCode, type: 'sms' })
          : await supabase.auth.verifyOtp({ email, token: otpCode, type: 'email' });
        if (err) throw err;
        if (mode === 'signup') onOpenOnboarding();
        else onSuccess();
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          onClick={() => onNavigate('marketing')}
          aria-label="Creda home"
          className="inline-flex items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          <Wordmark size={44} />
        </button>
        <p className="text-xs text-neutral-500 mt-1">
          Your business. Your financial identity.
        </p>

        <h2 className="mt-6 text-2xl font-bold text-neutral-950">
          {mode === 'login' ? 'Sign in to your business account' : 'Build your verified Financial Passport'}
        </h2>
        <p className="mt-1 text-xs text-neutral-600">
          {mode === 'login' ? (
            <>
              Don't have a Creda account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="font-semibold text-emerald-700 hover:text-emerald-800 underline"
              >
                Sign up free
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="font-semibold text-emerald-700 hover:text-emerald-800 underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>

      {/* Auth Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-neutral-200 sm:px-10 space-y-6">
          
          {/* Method Selector */}
          <div className="flex p-1 bg-neutral-100 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setAuthMethod('phone'); setOtpSent(false); }}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                authMethod === 'phone' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Ghana Phone (+233)
            </button>
            <button
              type="button"
              onClick={() => { setAuthMethod('email'); setOtpSent(false); }}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                authMethod === 'email' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Email Address
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Registered Business Name
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your registered business name"
                  className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            )}

            {authMethod === 'phone' ? (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Mobile Money Registered Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-600 text-xs font-mono">
                    +233
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="24 492 8109"
                    className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="director@company.com.gh"
                  className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            )}

            {otpSent && (
              <div className="space-y-1.5 animate-fadeIn">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-neutral-700">Enter Verification Code</label>
                  <span className="text-[11px] text-emerald-700 font-semibold">Code sent</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={8}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="6-digit code"
                  className="w-full px-3.5 py-2 text-center text-base tracking-widest font-mono font-bold border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            )}

            {error && <p className="text-xs text-red-600" role="alert">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{loading ? 'Please wait...' : otpSent ? 'Verify & Continue' : 'Send Verification Code'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted with Bank of Ghana risk compliance</span>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
