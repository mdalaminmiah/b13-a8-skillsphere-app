'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AuthForm({ type = 'login' }) {
    const isRegister = type === 'register';
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSubmitForm = async (data) => {
        setError('');
        setLoading(true);

        try {
            if (isRegister) {
                const { data: res, error: err } = await authClient.signUp.email(
                    {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        image: data.photo || '',
                        callbackURL: '/',
                    },
                );
                if (err) throw new Error(err.message);
                router.push('/');
            } else {
                const { data: res, error: err } = await authClient.signIn.email(
                    {
                        email: data.email,
                        password: data.password,
                        callbackURL: '/',
                    },
                );
                if (err) throw new Error(err.message);
                router.push('/');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
            <h2 className="font-black text-3xl text-white text-center mb-2">
                {isRegister ? 'Create account' : 'Welcome back'}
            </h2>
            <p className="text-slate-400 text-center text-sm mb-8">
                {isRegister
                    ? 'Join thousands of learners'
                    : 'Sign in to continue learning'}
            </p>

            {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            <form
                className="space-y-4"
                onSubmit={handleSubmit(handleSubmitForm)}
            >
                {isRegister && (
                    <>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                Full name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-500/50 transition-colors"
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
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                Photo URL (optional)
                            </label>
                            <input
                                type="url"
                                placeholder="https://..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-500/50 transition-colors"
                                {...register('photo')}
                            />
                        </div>
                    </>
                )}

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-500/50 transition-colors"
                        {...register('email', {
                            required: 'Email is required',
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-400 text-xs mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder="Min 8 characters"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-12 text-white text-sm outline-none focus:border-orange-500/50 transition-colors"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Min 8 characters',
                                },
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                            {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-400 text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-xl transition-all mt-2"
                >
                    {loading
                        ? 'Please wait…'
                        : isRegister
                          ? 'Create account'
                          : 'Sign in'}
                </button>
            </form>

            <p className="text-center text-slate-400 text-sm mt-6">
                {isRegister
                    ? 'Already have an account?'
                    : "Don't have an account?"}{' '}
                <Link
                    href={isRegister ? '/login' : '/register'}
                    className="text-orange-500 hover:text-orange-400 font-bold"
                >
                    {isRegister ? 'Sign in' : 'Register'}
                </Link>
            </p>
        </div>
    );
}
