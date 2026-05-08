import React from 'react';
import Image from 'next/image';
import { FiStar, FiBookOpen, FiArrowUpRight } from 'react-icons/fi';

const TOP_INSTRUCTORS = [
    {
        name: 'Andrew Ng',
        role: 'AI & Machine Learning Specialist',
        avatar: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        courses: 2,
        bio: 'Pioneer in Deep Learning and AI fundamentals, focusing on neural networks and model scaling.',
    },
    {
        name: 'Michael Chen',
        role: 'Senior Frontend Architect',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        courses: 1,
        bio: 'React expert specializing in modern hooks, context API, and high-performance web structures.',
    },
    {
        name: 'Geoffrey Hinton',
        role: 'Deep Learning Scientist',
        avatar: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        courses: 1,
        bio: 'Advanced instructor for TensorFlow and complex neural architecture development.',
    },
];

export default function TopInstructors() {
    return (
        <section className="py-24 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-6">
                            Expert{' '}
                            <span className="text-orange-600 italic">
                                Faculty
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg border-l-2 border-orange-600 pl-6">
                            Learn from the world leading engineers and
                            researchers who are shaping the future of
                            technology.
                        </p>
                    </div>
                </div>

                {/* Instructor Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {TOP_INSTRUCTORS.map((instructor, idx) => (
                        <div key={idx} className="group relative">
                            {/* Decorative Background Glow */}
                            <div className="absolute -inset-2 bg-linear-to-br from-orange-600/20 to-indigo-600/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative bg-slate-900 border border-white/5 rounded-[3rem] overflow-hidden p-8 transition-transform duration-500 group-hover:-translate-y-4">
                                {/* Profile Image */}
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    <div className="absolute inset-0 bg-orange-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 p-1">
                                        <div className="w-full h-full rounded-full overflow-hidden relative">
                                            <Image
                                                src={instructor.avatar}
                                                alt={instructor.name}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-white mb-2">
                                        {instructor.name}
                                    </h3>
                                    <p className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
                                        {instructor.role}
                                    </p>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 h-12 line-clamp-2 italic">
                                        "{instructor.bio}"
                                    </p>

                                    {/* Stats Row */}
                                    <div className="flex items-center justify-around py-6 border-t border-white/5">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-white font-bold mb-1">
                                                <FiStar
                                                    className="text-orange-500"
                                                    size={14}
                                                />
                                                {instructor.rating}
                                            </div>
                                            <span className="text-[9px] uppercase text-slate-500 tracking-widest">
                                                Rating
                                            </span>
                                        </div>
                                        <div className="w-px h-8 bg-white/5" />
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-white font-bold mb-1">
                                                <FiBookOpen
                                                    className="text-indigo-400"
                                                    size={14}
                                                />
                                                {instructor.courses}
                                            </div>
                                            <span className="text-[9px] uppercase text-slate-500 tracking-widest">
                                                Courses
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className="mt-4 w-full py-4 bg-slate-950 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-orange-600 hover:border-orange-600 transition-all flex items-center justify-center gap-2 group/btn">
                                        View Full Portfolio
                                        <FiArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
