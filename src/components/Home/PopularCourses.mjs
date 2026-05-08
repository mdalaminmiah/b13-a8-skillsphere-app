'use client';

import Link from 'next/link';
import { motion } from 'framer-motion'; // Changed to standard framer-motion for compatibility
import CourseCard from '../UI/CourseCard.mjs';

export default function PopularCourses({ courses }) {
    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-orange-600/5 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <motion.p
                            className="text-orange-500 font-bold text-xs uppercase tracking-[0.3em] mb-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            Handpicked For You
                        </motion.p>
                        <motion.h2
                            className="text-4xl md:text-5xl font-black text-white tracking-tighter"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Most Popular{' '}
                            <span className="text-orange-600 italic">
                                Courses
                            </span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-900 hover:text-orange-500 hover:border-orange-500/50 transition-all group"
                        >
                            View All Courses
                            <span className="group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </Link>
                    </motion.div>
                </div>

                {/* Grid Section - Fully Responsive */}
                {/* 
                    grid-cols-1: Mobile
                    sm:grid-cols-2: Tablet
                    lg:grid-cols-3: Small Laptop
                    xl:grid-cols-4: Large Desktop 
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: i * 0.1,
                                duration: 0.5,
                                ease: 'easeOut',
                            }}
                            className="h-full"
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
