'use client';
import { authClient, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaUser, FaImage, FaArrowLeft, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: { name: '', image: '' } });

    /* Protect route + prefill form once the session loads */
    useEffect(() => {
        if (isPending) return;
        if (!session) {
            toast.error('Please log in to update your profile.');
            router.push('/login?next=/update');
            return;
        }
        reset({
            name: session.user.name || '',
            image: session.user.image || '',
        });
    }, [session, isPending, router, reset]);

    const previewImage = watch('image');
    const previewName = watch('name');

    const onSubmit = async (data) => {
        setSaving(true);
        try {
            const { error } = await authClient.updateUser({
                name: data.name,
                image: data.image?.trim() || undefined,
            });

            if (error) {
                toast.error(error.message || 'Update failed. Try again.');
                return;
            }

            toast.success('Profile updated successfully!');
            router.push('/profile');
            router.refresh();
        } catch {
            toast.error('Something went wrong. Check your connection.');
        } finally {
            setSaving(false);
        }
    };

    if (isPending || !session) {
        return (
            <div className="min-h-screen bg-slate-950 pt-32 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
            </div>
        );
    }

    const avatarSrc =
        previewImage?.trim() ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            previewName || 'User',
        )}&background=ea580c&color=fff&size=200`;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pt-28 pb-20 overflow-x-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-64 bg-orange-600/10 blur-[100px] pointer-events-none" />

            <div className="max-w-xl mx-auto px-6 relative z-10">
                <Link
                    href="/profile"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors mb-8"
                >
                    <FaArrowLeft /> Back to Profile
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-900/80 border border-white/8 rounded-[2.5rem] p-8 md:p-10"
                >
                    <h1 className="text-3xl font-black text-white mb-1">
                        Update Information
                    </h1>
                    <p className="text-slate-400 text-sm mb-8">
                        Change your display name and profile photo.
                    </p>

                    {/* Live avatar preview */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-orange-600/30 rounded-full blur-lg scale-110" />
                            <Image
                                src={avatarSrc}
                                alt="Avatar preview"
                                width={96}
                                height={96}
                                unoptimized
                                className="relative w-24 h-24 rounded-full object-cover border-[3px] border-orange-500/60"
                            />
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                                Full name
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className={`w-full bg-slate-950 border rounded-xl pl-11 pr-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600 ${
                                        errors.name
                                            ? 'border-red-500/60 focus:border-red-500'
                                            : 'border-slate-800 focus:border-orange-500/50'
                                    }`}
                                    {...register('name', {
                                        required: 'Name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'At least 2 characters',
                                        },
                                    })}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                                Photo URL
                            </label>
                            <div className="relative">
                                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-sm" />
                                <input
                                    type="url"
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
                                    {...register('image')}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full flex items-center justify-center gap-2 py-4 mt-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-600/20 active:scale-[0.98]"
                        >
                            <FaSave />
                            {saving ? 'Saving…' : 'Update Information'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
