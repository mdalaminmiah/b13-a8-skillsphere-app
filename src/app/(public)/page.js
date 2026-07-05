import HeroSection from '@/components/Home/HeroSection.mjs';
import LearningTips from '@/components/Home/LearningTips.mjs';
import PopularCourses from '@/components/Home/PopularCourses.mjs';
import TopInstructors from '@/components/Home/TopInstructors.mjs';
import TrendingCourses from '@/components/Home/TrendingCourses.mjs';
import {
    getPopularCourses,
    getTopInstructors,
    getTrendingCourses,
} from '@/lib/courses.mjs';

export const metadata = {
    title: 'SkillSphere — Learn Web Dev, Design & Marketing',
    description:
        'Master in-demand skills with world-class instructors from Google, Meta, Airbnb and more.',
};

export default async function HomePage() {
    const [popularCourses, topInstructors, trendingCourses] =
        await Promise.all([
            getPopularCourses(),
            getTopInstructors(),
            getTrendingCourses(),
        ]);
    return (
        <>
            <HeroSection />
            <PopularCourses courses={popularCourses} />
            <TrendingCourses courses={trendingCourses} />
            <LearningTips />
            <TopInstructors instructors={topInstructors} />
        </>
    );
}
