'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatEnrolled } from '@/lib/courses';
import { FaStar, FaUsers, FaClock } from 'react-icons/fa';

// Updated to match the neon/dark theme colors
const CATEGORY_STYLES = {
    'Web Development': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    Development: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Design: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    Marketing: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

const LEVEL_STYLES = {
    Beginner: 'text-emerald-400',
    Intermediate: 'text-orange-400',
    Advanced: 'text-rose-400',
};

export default function CourseCard({ course }) {
    const thumbnail =
        course?.thumbnail || course?.image || '/images/course-placeholder.png';
    const avatar = course?.instructor?.avatar || '/images/avatar.png';
    const instructorName =
        course?.instructor?.name || course?.instructor || 'Unknown Instructor';

    const categoryStyle =
        CATEGORY_STYLES[course?.category] ??
        'bg-slate-800 text-slate-400 border-slate-700';
    const levelStyle = LEVEL_STYLES[course?.level] ?? 'text-slate-400';

    return (
        <Link href={`/courses/${course?.id}`} className="block h-full group">
            <motion.div
                whileHover={{ y: -8 }}
                className="relative bg-slate-900 border border-slate-800 rounded-3xl h-full overflow-hidden transition-all duration-300 group-hover:border-orange-500/30 group-hover:shadow-[0_20px_40px_-15px_rgba(234,88,12,0.15)]"
            >
                {/* Thumbnail Section */}
                <figure className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={thumbnail}
                        alt={course?.title || 'Course Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {course?.badge && (
                            <span className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-lg">
                                {course.badge}
                            </span>
                        )}
                    </div>
                </figure>

                {/* Content Section */}
                <div className="p-6 flex flex-col h-[calc(100%-16/10)]">
                    {/* Category & Level */}
                    <div className="flex items-center justify-between mb-4">
                        <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${categoryStyle}`}
                        >
                            {course?.category || 'General'}
                        </span>
                        <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${levelStyle}`}
                        >
                            {course?.level || 'N/A'}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-bold text-lg leading-tight mb-4 line-clamp-2 group-hover:text-orange-500 transition-colors">
                        {course?.title || 'Untitled Course'}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700">
                            <Image
                                src={avatar}
                                alt={instructorName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-sm text-slate-400 font-medium truncate">
                            {instructorName}
                        </span>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-1.5">
                            <FaStar className="text-orange-500" />
                            <span className="font-bold text-slate-300">
                                {course?.rating || 0}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaUsers className="text-slate-600" />
                            <span>
                                {formatEnrolled?.(course?.enrolled || 0)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                            <FaClock className="text-slate-600" />
                            <span>{course?.duration || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                                Price
                            </span>
                            <span className="text-2xl font-black text-white">
                                ${course?.price ?? 0}
                            </span>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                            <span className="text-xl font-light">→</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
