import HeroSection from '@/components/home/HeroSection';
import LearningTips from '@/components/Home/LearningTips.mjs';
import PopularCourses from '@/components/Home/PopularCourses.mjs';
import TopInstructors from '@/components/Home/TopInstructors.mjs';
import { getPopularCourses, getTopInstructors } from '@/lib/courses.mjs';

export const metadata = {
    title: 'SkillSphere — Learn Web Dev, Design & Marketing',
    description:
        'Master in-demand skills with world-class instructors from Google, Meta, Airbnb and more.',
};

export default async function HomePage() {
    const [popularCourses, topInstructors] = await Promise.all([
        getPopularCourses(),
        getTopInstructors(),
    ]);
    return (
        <>
            <HeroSection />
            <PopularCourses courses={popularCourses} />
            <LearningTips />
            <TopInstructors />
        </>
    );
}
