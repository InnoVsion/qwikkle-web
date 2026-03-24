'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { loginSchema, type LoginInput } from '@/lib/validations/auth.schemas';
import { adminLogin } from '@/lib/api/auth';

export function LoginForm(): React.ReactElement {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginInput): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);

    const qkId = values.qkId.toUpperCase().endsWith('.QK')
      ? values.qkId
      : `${values.qkId}.QK`;

    try {
      await adminLogin({ qkId, password: values.password });
      router.replace('/admin');
      router.refresh();
      window.location.assign('/admin');
    } catch {
      setErrorMessage('Invalid .QK ID or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-md rounded-2xl border border-[#E4E8EC] bg-white p-8 md:p-10"
      style={{ boxShadow: '0 2px 16px rgba(38, 50, 56, 0.06)' }}
    >
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#263238]">Welcome back</h1>
        <p className="mt-1 text-sm text-[#9E9E9E]">Sign in to your admin account</p>
      </div>

      {/* Error banner */}
      {errorMessage && (
        <div
          className="mb-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium"
          style={{
            background: 'rgba(244, 67, 54, 0.06)',
            borderColor: 'rgba(244, 67, 54, 0.20)',
            color: '#C62828',
          }}
          role="alert"
        >
          <AlertCircle size={16} className="shrink-0" />
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Admin ID */}
        <div>
          <label
            htmlFor="qkId"
            className="mb-1.5 block text-sm font-medium text-[#263238]"
          >
            Admin .QK ID
          </label>
          <input
            id="qkId"
            type="text"
            autoComplete="username"
            disabled={isLoading}
            {...register('qkId')}
            className={cn(
              'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-[#263238] outline-none transition-colors',
              'placeholder:text-[#B0BEC5]',
              'focus:border-[#E91E63] focus:ring-2 focus:ring-[rgba(233,30,99,0.15)]',
              'disabled:cursor-not-allowed disabled:opacity-60',
              errors.qkId
                ? 'border-[rgba(244,67,54,0.60)]'
                : 'border-[#E4E8EC] hover:border-[#C9D0D8]',
            )}
            placeholder="admin.QK"
          />
          {errors.qkId && (
            <p className="mt-1.5 text-xs text-[#C62828]" role="alert">
              {errors.qkId.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-[#263238]"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              disabled={isLoading}
              {...register('password')}
              className={cn(
                'w-full rounded-xl border bg-white py-2.5 pl-4 pr-10 text-sm text-[#263238] outline-none transition-colors',
                'placeholder:text-[#B0BEC5]',
                'focus:border-[#E91E63] focus:ring-2 focus:ring-[rgba(233,30,99,0.15)]',
                'disabled:cursor-not-allowed disabled:opacity-60',
                errors.password
                  ? 'border-[rgba(244,67,54,0.60)]'
                  : 'border-[#E4E8EC] hover:border-[#C9D0D8]',
              )}
              placeholder="Minimum 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] transition-colors hover:text-[#263238]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-[#C62828]" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all duration-200',
            'disabled:cursor-not-allowed disabled:opacity-70',
            'hover:opacity-90 active:scale-[0.98]',
          )}
          style={{
            background: '#E91E63',
            boxShadow: isLoading ? 'none' : '0 4px 14px rgba(233, 30, 99, 0.30)',
          }}
        >
          {isLoading && <Loader2 size={15} className="animate-spin" />}
          {isLoading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      {/* Footer links */}
      <div className="mt-6 space-y-4">
        <button
          type="button"
          className="block text-sm text-[#9E9E9E] transition-colors hover:text-[#E91E63]"
        >
          Forgot your password?
        </button>
        <div className="border-t border-[#E4E8EC] pt-4">
          <p className="text-xs text-[#B0BEC5]">
            Having trouble? Contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
