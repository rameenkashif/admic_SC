import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';
import { ScLogo } from './ScLogo';
import bgImg from '../assets/images/admin_panel_bg.jpg';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('rameen');
  const [password, setPassword] = useState('12345678');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = username.trim().toLowerCase();
      if ((cleanUser === 'rameen' || cleanUser === 'rameen@stepsport.com') && password === '12345678') {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Kredencialet janë gabim! Përdorni: rameen / 12345678');
      }
    }, 350);
  };

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center p-4 overflow-hidden bg-slate-950 font-sans bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Dark overlay to keep the login card readable over the background photo */}
      <div className="absolute inset-0 z-0 bg-slate-950/40 pointer-events-none"></div>

      {/* Main Figma Liquid Glass Card Block */}
      <div className="relative z-10 w-full max-w-md">
        <div className="liquid-glass-card rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden text-white shadow-2xl">
          
          {/* Liquid Glass Highlight Rim */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

          {/* Centered Logo & Welcome Heading */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-4 flex justify-center">
              <ScLogo showSubtitle={false} />
            </div>

            {/* Title in Cal Sans */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-cal tracking-tight" style={{ fontFamily: "'Cal Sans', 'CalSans', sans-serif" }}>
              Log In
            </h1>
            
            {/* Subtitle in Inter */}
            <p className="text-xs sm:text-sm text-slate-200/80 font-normal font-['Inter']">
              Welcome back. Please log in to your account.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-['Inter']">
            {error && (
              <div className="p-3 rounded-2xl bg-red-500/20 border border-red-400/40 text-red-200 text-xs font-medium text-center">
                {error}
              </div>
            )}

            {/* Email / Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90 block pl-1">
                E-mail address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/60">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="rameen"
                  className="liquid-glass-input w-full pl-10 pr-4 py-3 rounded-2xl text-sm focus:outline-none transition-all placeholder-white/40"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90 block pl-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="liquid-glass-input w-full pl-10 pr-10 py-3 rounded-2xl text-sm focus:outline-none transition-all placeholder-white/40 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/60 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-white/80 cursor-pointer select-none">
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                    rememberMe ? 'bg-white/30 border-white/60 text-white' : 'border-white/30 bg-white/5'
                  }`}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Ju lutemi kontaktoni Super Adminin për të rivendosur fjalëkalimin.')}
                className="text-white/80 hover:text-white underline underline-offset-4 transition font-medium"
              >
                Forgot password
              </button>
            </div>

            {/* Liquid Glass Log In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="liquid-glass-button w-full py-3.5 px-6 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span className="font-cal text-base tracking-wide" style={{ fontFamily: "'Cal Sans', 'CalSans', sans-serif" }}>Log In</span>
                )}
              </button>
            </div>
          </form>

          {/* Fast Autofill Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              onClick={() => {
                setUsername('rameen');
                setPassword('12345678');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] text-white/90 font-medium transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
              <span>Plotëso automatikisht: <strong>rameen / 12345678</strong></span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
