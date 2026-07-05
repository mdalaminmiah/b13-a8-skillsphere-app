'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';
import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { signOut } from '@/lib/auth-client';

const Navbar = () => {
    const { data: session, isPending } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '/courses' },
        ...(session ? [{ name: 'Profile', href: '/profile' }] : []),
    ];

    // Change your logout function to this:
    const handleLogout = async () => {
        const toastId = toast.loading('Signing you out…');

        try {
            // Do NOT nest fetchOptions if it's causing JSON serialization errors.
            // Try calling it directly:
            await signOut({
                // Pass the callback directly
                callbackURL: '/',
            });

            toast.success('Logged out successfully.');
            router.push('/');
        } catch (err) {
            console.error('Logout Error:', err);
            toast.error('Logout failed.');
        }
    };
    return (
        <nav className="fixed top-0 inset-x-0 z-[100] bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 12 }}
                            className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20"
                        >
                            <FaGraduationCap className="text-white text-xl" />
                        </motion.div>
                        <span className="text-2xl font-black text-white tracking-tighter">
                            Skill<span className="text-orange-500">Sphere</span>
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden lg:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all relative py-2 ${
                                    pathname === link.href
                                        ? 'text-orange-500'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {link.name}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Auth section */}
                    <div className="flex items-center gap-4">
                        {isPending ? (
                            <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse" />
                        ) : session ? (
                            /* ── logged in ── */
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/profile"
                                    className="hidden sm:block"
                                >
                                    <div className="relative">
                                        <Image
                                            src={
                                                session.user.image ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || 'User')}&background=ea580c&color=fff`
                                            }
                                            className="w-10 h-10 rounded-full border-2 border-orange-500/50 hover:border-orange-500 hover:scale-105 transition-all object-cover"
                                            alt={session.user.name || 'Profile'}
                                            width={40}
                                            height={40}
                                        />
                                        {/* online dot */}
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0B1120] rounded-full" />
                                    </div>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 hover:text-red-300 transition-all"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            /* ── logged out ── */
                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-slate-300 font-bold text-sm hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-600/20"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2.5 text-white bg-white/5 rounded-xl border border-white/10"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden overflow-hidden border-t border-white/5"
                        >
                            <div className="flex flex-col gap-4 py-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-base font-bold transition-colors ${
                                            pathname === link.href
                                                ? 'text-orange-500'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {session ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-black uppercase tracking-widest hover:bg-red-500/20 transition-all text-center"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <div className="flex flex-col gap-3 pt-2 border-t border-white/5 mt-2">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="w-full py-3.5 text-center text-slate-200 font-bold rounded-xl border border-slate-700 hover:bg-white/5 transition-all"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-center text-white font-black rounded-xl transition-all"
                                        >
                                            Join SkillSphere
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
