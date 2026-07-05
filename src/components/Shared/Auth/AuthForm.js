'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGraduationCap, FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AuthForm({ type = 'login' }) {
    const isRegister = type === 'register';
    const router = useRouter();
    const searchParams = useSearchParams();
    // Where to send the user after a successful login (protected-route return).
    const next = searchParams.get('next') || '/';
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    /* ── submit handler ──────────────────────────────────────────── */
    const onSubmit = async (data) => {
        setLoading(true);

        try {
            if (isRegister) {
                const { error } = await authClient.signUp.email({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    image: data.photo?.trim() || undefined,
                });

                if (error) {
                    toast.error(
                        error.message ||
                            'Registration failed. Please try again.',
                    );
                    return;
                }

                toast.success('🎉 Account created! Please sign in.');
                router.push('/login');
            } else {
                const { error } = await authClient.signIn.email({
                    email: data.email,
                    password: data.password,
                });

                if (error) {
                    toast.error(error.message || 'Invalid email or password.');
                    return;
                }

                toast.success('Welcome back! Redirecting…');
                router.push(next);
                router.refresh();
            }
        } catch (err) {
            toast.error('Something went wrong. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    /* ── Google sign-in ──────────────────────────────────────────── */
    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: next,
        });
    };

    /* ── render ──────────────────────────────────────────────────── */
    return (
        <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-10">
                <div className="w-11 h-11 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
                    <FaGraduationCap className="text-white text-xl" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">
                    Skill<span className="text-orange-500">Sphere</span>
                </span>
            </div>

            {/* Card */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/8 rounded-3xl p-8 shadow-2xl">
                <h1 className="text-3xl font-black text-white mb-1">
                    {isRegister ? 'Create account' : 'Welcome back'}
                </h1>
                <p className="text-slate-400 text-sm mb-8">
                    {isRegister
                        ? 'Join thousands of learners today'
                        : 'Sign in to continue your journey'}
                </p>

                {/* Social button — Google only */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={handleGoogle}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-bold hover:bg-slate-700 hover:text-white transition-all"
                    >
                        <FaGoogle className="text-red-400" />
                        Continue with Google
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-slate-800" />
                    <span className="text-slate-600 text-xs uppercase tracking-widest">
                        or
                    </span>
                    <div className="flex-1 h-px bg-slate-800" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {isRegister && (
                        <>
                            {/* Name */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600 ${
                                        errors.name
                                            ? 'border-red-500/60 focus:border-red-500'
                                            : 'border-slate-800 focus:border-orange-500/50'
                                    }`}
                                    {...register('name', {
                                        required: 'Name is required',
                                    })}
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Photo URL */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                                    Photo URL{' '}
                                    <span className="text-slate-600 normal-case tracking-normal font-normal">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
                                    {...register('photo')}
                                />
                            </div>
                        </>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600 ${
                                errors.email
                                    ? 'border-red-500/60 focus:border-red-500'
                                    : 'border-slate-800 focus:border-orange-500/50'
                            }`}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Enter a valid email',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder={
                                    isRegister ? 'Min 8 characters' : '••••••••'
                                }
                                className={`w-full bg-slate-950 border rounded-xl px-4 py-3 pr-12 text-white text-sm outline-none transition-colors placeholder:text-slate-600 ${
                                    errors.password
                                        ? 'border-red-500/60 focus:border-red-500'
                                        : 'border-slate-800 focus:border-orange-500/50'
                                }`}
                                {...register('password', {
                                    required: 'Password is required',
                                    ...(isRegister && {
                                        minLength: {
                                            value: 8,
                                            message: 'Minimum 8 characters',
                                        },
                                    }),
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? (
                                    <FaEye size={15} />
                                ) : (
                                    <FaEyeSlash size={15} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-600/20 active:scale-[0.98]"
                    >
                        {loading
                            ? 'Please wait…'
                            : isRegister
                              ? 'Create my account'
                              : 'Sign in'}
                    </button>
                </form>

                {/* Switch link */}
                <p className="text-center text-slate-400 text-sm mt-6">
                    {isRegister
                        ? 'Already have an account? '
                        : "Don't have an account? "}
                    <Link
                        href={isRegister ? '/login' : '/register'}
                        className="text-orange-500 hover:text-orange-400 font-bold transition-colors"
                    >
                        {isRegister ? 'Sign in' : 'Register free'}
                    </Link>
                </p>
            </div>
        </div>
    );
}
