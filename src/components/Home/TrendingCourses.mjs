'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFire, FaStar, FaArrowRight } from 'react-icons/fa';

export default function TrendingCourses({ courses = [] }) {
    return (
        <section className="relative py-24 bg-[#0B1120] overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-600/10 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <motion.p
                            className="inline-flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-[0.3em] mb-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <FaFire className="animate-pulse" /> New Releases
                        </motion.p>
                        <motion.h2
                            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Trending{' '}
                            <span className="text-orange-600 italic">
                                Courses
                            </span>
                        </motion.h2>
                    </div>
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-900 hover:text-orange-500 hover:border-orange-500/50 transition-all group w-max"
                    >
                        Explore All
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Trending list */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                        >
                            <Link
                                href={`/courseDetails/${course.id}`}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-orange-500/30 transition-all"
                            >
                                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        sizes="80px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                                        {course.category}
                                    </span>
                                    <h3 className="text-white font-bold leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                                        <FaStar className="text-orange-500" />
                                        <span className="font-bold text-slate-300">
                                            {course.rating}
                                        </span>
                                        <span className="text-slate-600">
                                            • {course.duration}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
