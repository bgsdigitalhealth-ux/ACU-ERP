import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  X,
  Users,
  GraduationCap,
  Layers
} from 'lucide-react';
import { RoleInfo } from '../types/auth';

interface LoginFormCardProps {
  role: RoleInfo | null;
  onClose?: () => void;
  onLogin: (role: RoleInfo, email: string) => void;
  onRoleChange?: (role: RoleInfo) => void;
  availableRoles?: RoleInfo[];
}

export const LoginFormCard: React.FC<LoginFormCardProps> = ({
  role,
  onClose,
  onLogin,
  onRoleChange,
  availableRoles
}) => {
  const [email, setEmail] = useState(role?.defaultEmail || '');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (role) {
      setEmail(role.defaultEmail);
      setErrorMsg(null);
    }
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setErrorMsg('Please select a role from the dial or dropdown to proceed.');
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin(role, email);
    }, 400);
  };

  return (
    <div className="w-[340px] sm:w-[380px] max-w-[400px] min-w-[320px] shrink-0 bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 select-none">
      
      {/* Card Header matching Image 1: Users Icon + Title + Graduation Cap */}
      <div className="flex items-center justify-between pb-2.5 relative">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Crimson Users Icon */}
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-[#8b0029] stroke-[2.2]" />
          </div>

          {/* Vertical Divider */}
          <div className="w-px h-8 bg-gray-200 shrink-0" />

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-black tracking-tight text-[#8b0029] leading-tight whitespace-nowrap">
              Role Based Login
            </h3>
            <p className="text-[10.5px] text-gray-500 font-semibold mt-0.5 whitespace-nowrap">
              Access Karnataka Higher Education ERP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Graduation Cap in Crimson */}
          <div className="w-8 h-8 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-[#8b0029]" />
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Close login card"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Decorative Rose Wave Curve Divider matching Image 1 */}
      <div className="w-full h-1 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 rounded-full mb-3.5 opacity-90" />

      {errorMsg && (
        <div className="mb-3 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-[11px] font-semibold text-red-700 animate-in fade-in">
          {errorMsg}
        </div>
      )}

      {/* Form Fields matching Image 1 without changing content */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Field 1: Select Your Role * */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-800 whitespace-nowrap">
            Select Your Role <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Layers className="w-4 h-4 text-[#8b0029] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {availableRoles && availableRoles.length > 0 ? (
              <select
                value={role?.id || ''}
                onChange={(e) => {
                  const targetRole = availableRoles.find((r) => r.id === e.target.value);
                  if (targetRole && onRoleChange) {
                    onRoleChange(targetRole);
                  }
                }}
                className="w-full pl-10 pr-8 py-2 bg-white text-xs font-semibold text-gray-900 border border-gray-300 rounded-xl outline-hidden focus:border-[#8b0029] focus:ring-2 focus:ring-[#8b0029]/20 transition-all cursor-pointer shadow-2xs"
              >
                <option value="">-- Select Role --</option>
                {availableRoles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title.replace(/\n/g, ' ')}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full pl-10 pr-3 py-2 bg-white text-xs font-semibold text-gray-900 border border-gray-300 rounded-xl">
                {role ? role.title.replace(/\n/g, ' ') : '-- Select Role --'}
              </div>
            )}
          </div>
        </div>

        {/* Field 2: Username / Email * */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-800 whitespace-nowrap">
            Username / Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#8b0029] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter username or email"
              className="w-full pl-10 pr-4 py-2 bg-white text-xs text-gray-900 border border-gray-300 rounded-xl outline-hidden focus:border-[#8b0029] focus:ring-2 focus:ring-[#8b0029]/20 transition-all placeholder-gray-400 font-medium shadow-2xs"
            />
          </div>
        </div>

        {/* Field 3: Password * */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-800 whitespace-nowrap">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#8b0029] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full pl-10 pr-10 py-2 bg-white text-xs text-gray-900 border border-gray-300 rounded-xl outline-hidden focus:border-[#8b0029] focus:ring-2 focus:ring-[#8b0029]/20 transition-all placeholder-gray-400 font-medium shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8b0029] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Field 4: Remember Me & Forgot Password? */}
        <div className="flex items-center justify-between text-xs pt-0.5 gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer text-gray-700 font-medium whitespace-nowrap">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-[#8b0029] focus:ring-[#8b0029] w-3.5 h-3.5 cursor-pointer"
            />
            <span>Remember Me</span>
          </label>
          <button
            type="button"
            className="text-xs font-bold text-[#8b0029] hover:underline cursor-pointer whitespace-nowrap shrink-0"
          >
            Forgot Password?
          </button>
        </div>

        {/* Field 5: Login Action Button - Rounded Full Pill in Crimson #8b0029 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-5 bg-[#8b0029] hover:bg-[#a00030] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 group mt-2"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
