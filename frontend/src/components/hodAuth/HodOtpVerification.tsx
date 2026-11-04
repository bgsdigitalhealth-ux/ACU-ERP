import React, { useState, useEffect, useRef } from 'react';
import { KeyRound, RotateCcw, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { useHod } from '../../context/HodContext';

interface OtpVerificationProps {
  onBackToEmail: () => void;
  onSuccess: () => void;
}

export const HodOtpVerification: React.FC<OtpVerificationProps> = ({ onBackToEmail, onSuccess }) => {
  const { pendingLogin, verifyOtp, resendOtp } = useHod();

  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on load
    inputRefs.current[0]?.focus();

    // Auto-countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Take only the last entered digit
    const char = value.slice(-1);
    if (!/^\d*$/.test(char)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setError('');

    // Auto-advance
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newDigits = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
      setOtpDigits(newDigits);
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otpDigits.join('');

    if (fullCode.length < 6) {
      setError('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const res = verifyOtp(fullCode);
      setIsVerifying(false);

      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Verification failed.');
      }
    }, 450);
  };

  const handleResend = () => {
    const res = resendOtp();
    if (res.success) {
      setCountdown(60);
      setError('');
    }
  };

  // Demo helper: auto-fill OTP for fast test
  const handleAutoFillDemo = () => {
    if (pendingLogin?.otpCode) {
      setOtpDigits(pendingLogin.otpCode.split(''));
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200/90 shadow-2xl relative animate-in fade-in select-none">
      {/* Top back button */}
      <button
        type="button"
        onClick={onBackToEmail}
        className="flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 mb-4 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Change Email / College</span>
      </button>

      {/* Title */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold shadow-xs">
          <KeyRound className="w-6 h-6 stroke-[2]" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[#1e1b4b] tracking-tight">
            Verify Email OTP
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Security code sent to <strong className="text-purple-900">{pendingLogin?.email}</strong>
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 mb-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Demo Tip Banner */}
      <div className="mb-5 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11.5px] text-amber-900 flex items-center justify-between">
        <span>Demo OTP: <strong>246810</strong></span>
        <button
          type="button"
          onClick={handleAutoFillDemo}
          className="text-xs font-bold text-amber-800 underline hover:text-amber-950 cursor-pointer"
        >
          Auto-fill
        </button>
      </div>

      {/* 6 Digit Inputs */}
      <form onSubmit={handleVerify} className="space-y-5">
        <div className="flex items-center justify-between gap-2">
          {otpDigits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-extrabold text-[#1e1b4b] bg-purple-50/60 border-2 border-purple-200 rounded-2xl outline-none focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all shadow-xs"
            />
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isVerifying}
          className="w-full py-3.5 bg-gradient-to-r from-[#4a157c] to-[#320b60] hover:from-[#3a0e69] hover:to-[#250646] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          {isVerifying ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Verify &amp; Enter HOD Portal</span>
            </>
          )}
        </button>

        {/* Resend Countdown */}
        <div className="pt-2 text-center text-xs">
          {countdown > 0 ? (
            <span className="text-gray-500 font-medium">
              Resend code in <strong className="text-purple-900">{countdown}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-purple-700 font-bold hover:underline flex items-center gap-1.5 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resend OTP Code</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
