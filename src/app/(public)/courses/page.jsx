import CoursesSearchBar from '@/components/Courses/CoursesSearchBar.mjs';
import CourseCard from '@/components/UI/CourseCard.mjs';
import { searchCourses } from '@/lib/courses';

export const metadata = {
    title: 'All Courses | SkillSphere',
    description:
        'Browse all SkillSphere courses in Web Development, Design, and Marketing.',
};

const CATEGORY_FILTERS = ['All', 'Web Development', 'Design', 'Marketing'];
const LEVEL_FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default async function CoursesPage({ searchParams }) {
    const params = await searchParams;
    const query = params?.q ?? '';
    const category = params?.category ?? 'All';
    const level = params?.level ?? 'All';

    let courses = await searchCourses(query);

    if (category !== 'All')
        courses = courses.filter((c) => c.category === category);
    if (level !== 'All') courses = courses.filter((c) => c.level === level);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pt-32 pb-20 overflow-x-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-orange-600/10 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
                        Explore{' '}
                        <span className="text-orange-600 italic">Courses</span>
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Showing {courses.length} premium results
                    </p>
                </div>

                {/* --- ATTRACTIVE FILTER AREA --- */}
                <div className="relative mb-24 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-indigo-500/20 to-orange-500/20 rounded-[3.5rem] blur-xl opacity-75"></div>

                    <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-2xl">
                        {/* Search Input */}
                        <div className="max-w-2xl mx-auto mb-12">
                            <CoursesSearchBar
                                key={query}
                                defaultValue={query}
                            />
                        </div>

                        {/* Filter Controls */}
                        <div className="flex flex-col md:flex-row justify-between gap-12">
                            {/* Categories */}
                            <div className="flex-1 space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-orange-500/30"></span>{' '}
                                    Category
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {CATEGORY_FILTERS.map((cat) => {
                                        const isActive = category === cat;
                                        return (
                                            <a
                                                key={cat}
                                                href={`/courses?q=${query}&category=${cat}&level=${level}`}
                                                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                                                    isActive
                                                        ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] scale-105'
                                                        : 'bg-slate-950 border border-slate-800 text-slate-500 hover:text-white hover:border-slate-600'
                                                }`}
                                            >
                                                {cat}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Difficulty */}
                            <div className="flex-1 space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-indigo-400/30"></span>{' '}
                                    Difficulty
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {LEVEL_FILTERS.map((lvl) => {
                                        const isActive = level === lvl;
                                        return (
                                            <a
                                                key={lvl}
                                                href={`/courses?q=${query}&category=${category}&level=${lvl}`}
                                                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                                                    isActive
                                                        ? 'bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105'
                                                        : 'bg-slate-950 border border-slate-800 text-slate-500 hover:text-white hover:border-slate-600'
                                                }`}
                                            >
                                                {lvl}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 3-CARD COURSE GRID --- */}
                {courses.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/20 rounded-[3rem] border border-slate-800">
                        <p className="text-xl font-bold text-white">
                            No courses found matching your criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="transition-transform duration-500 hover:-translate-y-2"
                            >
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
