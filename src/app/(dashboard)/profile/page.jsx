'use client';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    FaEnvelope,
    FaUserEdit,
    FaGraduationCap,
    FaClock,
    FaShieldAlt,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    /* redirect to login if not authenticated */
    useEffect(() => {
        if (!isPending && !session) {
            toast.error('Please log in to view your profile.');
            router.push('/login');
        }
    }, [session, isPending, router]);

    const handleLogout = async () => {
        const toastId = toast.loading('Signing you out…');
        try {
            await signOut();
            toast.success('Logged out successfully!', { id: toastId });
            router.push('/');
            router.refresh();
        } catch {
            toast.error('Logout failed. Try again.', { id: toastId });
        }
    };

    /* loading skeleton */
    if (isPending) {
        return (
            <div className="min-h-screen bg-slate-950 pt-32 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-slate-800 animate-pulse" />
                    <div className="w-48 h-5 rounded-full bg-slate-800 animate-pulse" />
                    <div className="w-32 h-4 rounded-full bg-slate-800 animate-pulse" />
                </div>
            </div>
        );
    }

    if (!session) return null;

    const user = session.user;
    const avatarSrc =
        user.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=ea580c&color=fff&size=200`;

    const joinedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'Recently';

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pt-28 pb-20 overflow-x-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-orange-600/10 blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                {/* ── Header card ─────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-slate-900/80 border border-white/8 rounded-[2.5rem] p-8 md:p-12 mb-6 overflow-hidden"
                >
                    {/* decorative corner glow */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/10 blur-[60px] rounded-full pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="absolute inset-0 bg-orange-600/30 rounded-full blur-lg scale-110" />
                            <Image
                                src={avatarSrc}
                                alt={user.name || 'Profile photo'}
                                width={96}
                                height={96}
                                className="relative w-24 h-24 rounded-full object-cover border-[3px] border-orange-500/60"
                            />
                            {/* verified badge */}
                            {user.emailVerified && (
                                <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                                    <FaShieldAlt className="text-white text-[10px]" />
                                </span>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <div className="inline-flex items-center gap-2 bg-orange-600/10 border border-orange-600/20 rounded-full px-3 py-1 mb-3">
                                <FaGraduationCap className="text-orange-500 text-xs" />
                                <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest">
                                    SkillSphere Member
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
                                {user.name || 'Learner'}
                            </h1>
                            <p className="text-slate-400 text-sm flex items-center gap-2 justify-center sm:justify-start">
                                <FaEnvelope className="text-orange-600 shrink-0" />
                                {user.email}
                            </p>

                            <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start text-slate-500 text-xs">
                                <FaClock className="shrink-0" />
                                <span>Member since {joinedDate}</span>
                            </div>
                        </div>

                        {/* Update button */}
                        <Link
                            href="/update"
                            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all"
                        >
                            <FaUserEdit />
                            Edit profile
                        </Link>
                    </div>
                </motion.div>

                {/* ── Stats row ────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-3 gap-4 mb-6"
                >
                    {[
                        { label: 'Enrolled', value: '0' },
                        { label: 'Completed', value: '0' },
                        { label: 'Certificates', value: '0' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-slate-900/60 border border-white/6 rounded-2xl p-6 text-center"
                        >
                            <p className="text-3xl font-black text-white mb-1">
                                {stat.value}
                            </p>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* ── Account details ──────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="bg-slate-900/60 border border-white/6 rounded-3xl p-8 mb-6"
                >
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">
                        Account details
                    </h2>

                    <dl className="space-y-5">
                        {[
                            { label: 'Display name', value: user.name || '—' },
                            { label: 'Email address', value: user.email },
                            {
                                label: 'Email verified',
                                value: user.emailVerified
                                    ? 'Yes ✓'
                                    : 'Not verified',
                                accent: user.emailVerified
                                    ? 'text-emerald-400'
                                    : 'text-amber-400',
                            },
                            { label: 'User ID', value: user.id, mono: true },
                        ].map(({ label, value, accent, mono }) => (
                            <div
                                key={label}
                                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 py-4 border-b border-slate-800/60 last:border-0"
                            >
                                <dt className="sm:w-44 text-xs font-bold text-slate-500 uppercase tracking-widest shrink-0">
                                    {label}
                                </dt>
                                <dd
                                    className={`text-sm font-medium truncate ${
                                        accent || 'text-slate-200'
                                    } ${mono ? 'font-mono text-xs text-slate-400' : ''}`}
                                >
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </motion.div>

                {/* ── Actions ──────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/courses"
                        className="flex-1 py-4 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl text-center transition-all shadow-lg shadow-orange-600/20"
                    >
                        Browse courses
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex-1 py-4 bg-red-500/10 border border-red-500/20 text-red-400 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-red-500/20 hover:text-red-300 transition-all"
                    >
                        Log out
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
