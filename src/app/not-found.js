'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        // overflow-hidden prevents horizontal scrolling caused by background elements
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
            {/* --- 1. Responsive Background Spheres --- */}
            {/* Sized dynamically so they don't break the layout on mobile */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 md:w-[30rem] md:h-[30rem] bg-orange-300 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-72 h-72 sm:w-[28rem] sm:h-[28rem] bg-blue-200 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"
            />

            {/* --- 2. Main Content Container --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center w-full max-w-2xl mx-auto flex flex-col items-center"
            >
                {/* Responsive 404 Text - Scales gracefully down to mobile */}
                <motion.h1
                    drag
                    dragConstraints={{
                        left: -20,
                        right: 20,
                        top: -20,
                        bottom: 20,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-grab active:cursor-grabbing leading-none text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-orange-700 drop-shadow-2xl select-none"
                >
                    404
                </motion.h1>

                {/* User-Friendly Message */}
                <div className="mt-4 sm:mt-8 space-y-3 sm:space-y-5 px-2 sm:px-0">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
                        Whoops! This space is empty.
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
                        It looks like the lesson you&rsquo;re looking for
                        hasn&rsquo;t been created yet, or the link has drifted
                        away.
                    </p>
                </div>

                {/* --- 3. Responsive Buttons --- */}
                {/* flex-col on mobile (stack), flex-row on screens > 640px (side-by-side) */}
                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                    >
                        <Link
                            href="/"
                            className="btn btn-primary w-full sm:w-auto bg-orange-600 hover:bg-orange-700 border-none text-white px-6 sm:px-8 py-3 sm:py-4 h-auto min-h-0 rounded-xl sm:rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 group text-sm sm:text-base"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to SkillSphere
                        </Link>
                    </motion.div>

                    <Link
                        href="/courses"
                        className="btn btn-ghost w-full sm:w-auto text-slate-600 hover:bg-slate-200 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 sm:py-4 h-auto min-h-0 text-sm sm:text-base"
                    >
                        Browse Courses
                    </Link>
                </div>
            </motion.div>

            {/* --- 4. Floating Elements (Hidden on mobile to save space) --- */}
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute top-24 right-[10%] lg:right-[20%] text-5xl lg:text-6xl hidden md:block select-none"
            >
                🎓
            </motion.div>
            <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                }}
                className="absolute bottom-24 left-[10%] lg:left-[20%] text-5xl lg:text-6xl hidden md:block select-none"
            >
                📚
            </motion.div>
        </div>
    );
}
