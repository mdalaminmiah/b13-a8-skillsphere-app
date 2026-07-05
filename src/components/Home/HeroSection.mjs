'use client';
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaArrowRight, FaStar, FaGlobe } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(
        useSpring(y, { stiffness: 100, damping: 30 }),
        [-0.5, 0.5],
        ['15deg', '-15deg'],
    );
    const rotateY = useTransform(
        useSpring(x, { stiffness: 100, damping: 30 }),
        [-0.5, 0.5],
        ['-15deg', '15deg'],
    );

    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#0B1120] overflow-hidden">
            {/* Aesthetic Glows */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-orange-600/10 blur-[120px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                            Industry Experts Leading Your Way
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6">
                            Upgrade Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
                                Skills Today
                            </span>
                        </h1>

                        <p className="text-gray-400 text-base md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                            Master programs like Web Development, Design, and
                            Marketing with high-quality video lessons and static
                            curriculum.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="/courses"
                                className="w-full sm:w-auto px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-2xl shadow-2xl shadow-orange-600/20 flex items-center justify-center gap-3 transition-transform active:scale-95"
                            >
                                Explore Courses <FaArrowRight />
                            </Link>
                            <div className="flex items-center gap-4 py-4 px-6 bg-white/5 rounded-2xl border border-white/10">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full border-2 border-[#0B1120] bg-gray-600 overflow-hidden"
                                        >
                                            <Image
                                                src={`https://i.pravatar.cc/100?u=${i}`}
                                                height={32}
                                                width={32}
                                                alt="user"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white font-bold text-xs">
                                    50k+ Learners
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: 3D Image Card */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 perspective-2000">
                        <motion.div
                            onMouseMove={(e) => {
                                const rect =
                                    e.currentTarget.getBoundingClientRect();
                                x.set(
                                    (e.clientX - rect.left) / rect.width - 0.5,
                                );
                                y.set(
                                    (e.clientY - rect.top) / rect.height - 0.5,
                                );
                            }}
                            onMouseLeave={() => {
                                x.set(0);
                                y.set(0);
                            }}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                            }}
                            className="relative w-full max-w-[480px] mx-auto aspect-square lg:aspect-[4/5] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white/20 p-2 shadow-2xl"
                        >
                            <div className="w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000"
                                    className="w-full h-full object-cover opacity-60"
                                    alt="Learning Experience"
                                    height={400}
                                    width={400}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />

                                {/* Floating Badges inside the card */}
                                <motion.div
                                    style={{ transform: 'translateZ(60px)' }}
                                    className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl hidden sm:block"
                                >
                                    <FaStar className="text-orange-500 text-xl" />
                                </motion.div>

                                <motion.div
                                    style={{ transform: 'translateZ(100px)' }}
                                    className="absolute bottom-10 left-8 right-8 p-6 bg-[#161f31]/80 backdrop-blur-md rounded-3xl border border-white/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-xl">
                                            <FaGlobe />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg leading-none">
                                                Global Reach
                                            </h4>
                                            <p className="text-gray-400 text-xs mt-1">
                                                Join students from 120+
                                                countries
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
