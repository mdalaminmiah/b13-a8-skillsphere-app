'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhoneAlt,
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaFacebookF size={18} />, href: '#', label: 'Facebook' },
        { icon: <FaTwitter size={18} />, href: '#', label: 'Twitter' },
        { icon: <FaLinkedinIn size={18} />, href: '#', label: 'LinkedIn' },
        { icon: <FaInstagram size={18} />, href: '#', label: 'Instagram' },
    ];

    return (
        <footer className="relative bg-[#020617] text-slate-400 pt-16 pb-8 overflow-hidden border-t border-slate-900">
            {/* Background Aesthetic Glow - Responsive sizing */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[300px] md:max-w-[600px] h-24 bg-orange-600/10 blur-[80px] md:blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* 
                    Grid Configuration:
                    grid-cols-1: Mobile (default)
                    sm:grid-cols-2: Tablets
                    lg:grid-cols-4: Desktop
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
                    {/* --- Brand Section --- */}
                    <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
                        <Link
                            href="/"
                            className="flex items-center gap-3 group w-max"
                        >
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20"
                            >
                                <span className="text-white font-black text-xl italic">
                                    S
                                </span>
                            </motion.div>
                            <span className="text-2xl font-black tracking-tighter text-white">
                                Skill
                                <span className="text-orange-600">Sphere</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Empowering your career journey with industry-leading
                            courses and expert mentorship.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{
                                        y: -5,
                                        backgroundColor: '#EA580C',
                                        color: '#fff',
                                    }}
                                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 transition-all shadow-md"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* --- Navigation --- */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 md:mb-8">
                            Navigation
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {[
                                'All Courses',
                                'Our Mentors',
                                'Pricing Plans',
                                'Success Stories',
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="hover:text-orange-500 transition-all duration-300 block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Contact Info --- */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 md:mb-8">
                            Contact Us
                        </h4>
                        <ul className="space-y-5 text-sm flex flex-col items-center sm:items-start">
                            <li className="flex items-start gap-4">
                                <FaMapMarkerAlt className="text-orange-600 mt-1 shrink-0" />
                                <span>123 Learning Avenue, Dhaka, BD</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <FaEnvelope className="text-orange-600 shrink-0" />
                                <a
                                    href="mailto:support@skillsphere.com"
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    support@skillsphere.com
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <FaPhoneAlt className="text-orange-600 shrink-0" />
                                <a
                                    href="tel:+8801234567890"
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    +880 1234-567890
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* --- Newsletter --- */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 md:mb-8">
                            Newsletter
                        </h4>
                        <p className="text-sm mb-6">
                            Stay updated with the latest trends and course
                            launches.
                        </p>
                        <form className="relative group max-w-xs mx-auto sm:mx-0">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-5 text-sm text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-slate-600"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- Bottom Footer: Legal & Copyright --- */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        &copy; {currentYear} SkillSphere. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Link
                            href="/privacy-policy"
                            className="hover:text-orange-500 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-orange-500 transition-colors"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
