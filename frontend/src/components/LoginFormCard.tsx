import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  X,
  Users
} from 'lucide-react';
import { RoleInfo } from '../types/auth';

interface LoginFormCardProps {
  role: RoleInfo;
  onClose: () => void;
  onLogin: (role: RoleInfo, email: string) => void;
}

export const LoginFormCard: React.FC<LoginFormCardProps> = ({ role, onClose, onLogin }) => {
  const [email, setEmail] = useState(role.defaultEmail);
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEmail(role.defaultEmail);
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin(role, email);
    }, 450);
  };

  const formattedRoleName = role.title.replace(/\s*\/\s*/g, ' / ').replace(/\n/g, ' ');

  return (
    <div className="w-full max-w-[350px] sm:max-w-[375px] bg-white rounded-3xl p-5 sm:p-6 border-2 border-purple-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
      {/* Dismiss / Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
        title="Close login card"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Uniform Purple Header Banner matching target reference image */}
      <div className="bg-gradient-to-r from-[#6b119d] to-[#430775] rounded-2xl p-4 text-white flex items-center gap-3.5 shadow-md mb-4 -mt-1 -mx-1 relative overflow-hidden">
        <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
          {role.iconPath ? (
            <img
              src={role.iconPath}
              alt={role.title}
              className="w-7 h-7 object-contain filter brightness-0 invert"
            />
          ) : (
            <Users className="w-6 h-6 text-white" />
          )}
        </div>
        <div className="flex-1 pr-6">
          <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
            ACU ERP
          </h3>
          <p className="text-xs text-purple-200 font-semibold mt-0.5">
            Role Based Login • {formattedRoleName}
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Username / Email */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
            <User className="w-3.5 h-3.5 text-purple-700" />
            <span>Username / Email</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter username or email"
              className="w-full pl-10 pr-4 py-2.5 bg-white text-xs sm:text-sm text-gray-900 border border-purple-200 rounded-xl outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all placeholder-gray-400 font-medium"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
            <Lock className="w-3.5 h-3.5 text-purple-700" />
            <span>Password</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-2.5 bg-white text-xs sm:text-sm text-gray-900 border border-purple-200 rounded-xl outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all placeholder-gray-400 font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600 font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-purple-700 border-gray-300 focus:ring-purple-600 accent-purple-700 cursor-pointer"
            />
            <span>Remember Me</span>
          </label>
          <button
            type="button"
            className="text-purple-700 font-bold hover:underline cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        {/* Primary Login Button with Matching Purple Gradient */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-75 cursor-pointer bg-gradient-to-r from-[#6b119d] to-[#430775]"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              <span>Login</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2.5">
          <div className="w-full border-t border-gray-200"></div>
          <span className="bg-white px-3 text-xs text-gray-400 font-semibold absolute">Or</span>
        </div>

        {/* Google SSO Button matching reference image */}
        <button
          type="button"
          onClick={() => onLogin(role, 'sso.' + role.defaultEmail)}
          className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 border border-gray-300 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          <span>Login with Google (SSO)</span>
        </button>
      </form>
    </div>
  );
};
