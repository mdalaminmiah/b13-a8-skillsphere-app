// src/app/(dashboard)/courseDetails/[id]/page.jsx  — 🔒 Protected route
import { redirect, notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { getCourseById } from '@/lib/courses.mjs';
import {
    FaStar,
    FaClock,
    FaSignal,
    FaCheckCircle,
    FaPlayCircle,
    FaArrowLeft,
} from 'react-icons/fa';

// A static curriculum shown for every course (per assignment requirement).
const CURRICULUM = [
    'Introduction & Course Roadmap',
    'Setting Up Your Environment',
    'Core Concepts & Fundamentals',
    'Hands-on Guided Project #1',
    'Intermediate Techniques & Patterns',
    'Hands-on Guided Project #2',
    'Best Practices & Real-World Tips',
    'Final Capstone Project & Wrap-up',
];

export async function generateMetadata({ params }) {
    const { id } = await params;
    const course = await getCourseById(id);
    return {
        title: course
            ? `${course.title} | SkillSphere`
            : 'Course | SkillSphere',
    };
}

export default async function CourseDetailsPage({ params }) {
    const { id } = await params;

    // 1. Verify session — protected route.
    const session = await auth.api.getSession({ headers: await headers() });

    // 2. If not logged in → redirect to login, remember where to return.
    if (!session) {
        redirect(`/login?next=${encodeURIComponent(`/courseDetails/${id}`)}`);
    }

    // 3. Load the course.
    const course = await getCourseById(id);
    if (!course) notFound();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pt-28 pb-20 overflow-x-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-orange-600/10 blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors mb-8"
                >
                    <FaArrowLeft /> Back to Courses
                </Link>

                {/* Hero */}
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 mb-10">
                    <div className="relative aspect-[16/7]">
                        <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg mb-4">
                            {course.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight max-w-3xl">
                            {course.title}
                        </h1>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                    {[
                        {
                            icon: <FaStar className="text-orange-500" />,
                            label: 'Rating',
                            value: course.rating,
                        },
                        {
                            icon: <FaClock className="text-indigo-400" />,
                            label: 'Duration',
                            value: course.duration,
                        },
                        {
                            icon: <FaSignal className="text-emerald-400" />,
                            label: 'Level',
                            value: course.level,
                        },
                        {
                            icon: (
                                <FaPlayCircle className="text-orange-400" />
                            ),
                            label: 'Lessons',
                            value: CURRICULUM.length,
                        },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="bg-slate-900/60 border border-white/6 rounded-2xl p-5 text-center"
                        >
                            <div className="flex justify-center mb-2 text-xl">
                                {s.icon}
                            </div>
                            <p className="text-lg font-black text-white">
                                {s.value}
                            </p>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Left: description + curriculum */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-black text-white mb-4">
                                About this course
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                {course.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-white mb-6">
                                Course Curriculum
                            </h2>
                            <ul className="space-y-3">
                                {CURRICULUM.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-4 p-4 bg-slate-900/60 border border-white/6 rounded-2xl hover:border-orange-500/30 transition-colors"
                                    >
                                        <FaCheckCircle className="text-orange-500 shrink-0" />
                                        <span className="text-slate-300 font-medium">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Right: instructor + enroll */}
                    <aside className="lg:col-span-1">
                        <div className="bg-slate-900/60 border border-white/6 rounded-3xl p-6 sticky top-28">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-slate-700 shrink-0">
                                    <Image
                                        src={course.instructor.avatar}
                                        alt={course.instructor.name}
                                        fill
                                        sizes="56px"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                                        Instructor
                                    </p>
                                    <p className="text-white font-bold">
                                        {course.instructor.name}
                                    </p>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-600/20 active:scale-[0.98]">
                                Enroll Now
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-4">
                                Full lifetime access • Certificate included
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
