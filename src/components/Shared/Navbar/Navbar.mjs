'use client';
import React, { useState } from 'react';
import Link from 'next/link'; // Standard Next.js Link
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';
import { useSession, sigsignUpnOut } from '@/lib/auth-client';
import Image from 'next/image';

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '/courses' },
        { name: 'Profile', href: '/my-profile' },
    ];

    return (
        /* Full width container with a border at the bottom */
        <nav className="fixed top-0 inset-x-0 z-[100] bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                            <FaGraduationCap className="text-white text-xl" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">
                            Skill<span className="text-orange-500">Sphere</span>
                        </span>
                    </Link>

                    {/* Desktop Menu - Centered */}
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

                    {/* Auth Actions */}
                    <div className="flex items-center gap-4">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/my-profile"
                                    className="hidden sm:block"
                                >
                                    <Image
                                        src={
                                            session.user.image ||
                                            'https://i.pravatar.cc/100'
                                        }
                                        className="w-10 h-10 rounded-full border-2 border-orange-500 hover:scale-105 transition-transform"
                                        alt="profile"
                                        height={100}
                                        width={100}
                                    />
                                </Link>
                                <button
                                    onClick={() => signUp()}
                                    className="hidden lg:block text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-400 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-6 py-2.5 text-gray-300 font-bold text-sm hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-600/20"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2.5 text-white bg-white/5 rounded-xl border border-white/10"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Responsive Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden overflow-hidden border-t border-white/5"
                        >
                            <div className="flex flex-col gap-5 py-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-lg font-bold ${pathname === link.href ? 'text-orange-500' : 'text-gray-300'}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                {!session && (
                                    <Link
                                        href="/register"
                                        className="w-full py-4 bg-orange-600 text-center text-white font-bold rounded-xl"
                                    >
                                        Join SkillSphere
                                    </Link>
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
