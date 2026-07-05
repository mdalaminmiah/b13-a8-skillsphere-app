import coursesData from '@/data/courses.json';

/**
 * Returns all courses (async to mirror a real DB call).
 */
export async function getAllCourses() {
    return coursesData;
}

/**
 * Returns a single course by ID (string or number), or null.
 */
export async function getCourseById(id) {
    return coursesData.find((c) => String(c.id) === String(id)) ?? null;
}

/**
 * Returns courses marked as popular (top-rated picks for the home page).
 */
export async function getPopularCourses() {
    const popular = coursesData.filter((c) => c.popular);
    if (popular.length) return popular;
    // Fallback: top 3 highest-rated courses.
    return [...coursesData].sort((a, b) => b.rating - a.rating).slice(0, 3);
}

/**
 * Returns the newest / trending courses for the "Trending" home section.
 * Uses the highest-id courses to mimic "New Releases".
 */
export async function getTrendingCourses() {
    return [...coursesData].sort((a, b) => b.id - a.id).slice(0, 6);
}

/**
 * Full-text search on title, category, instructor name.
 */
export async function searchCourses(query) {
    if (!query?.trim()) return coursesData;
    const q = query.toLowerCase();
    return coursesData.filter(
        (c) =>
            c.title.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q) ||
            c.instructor.name.toLowerCase().includes(q),
    );
}

/**
 * Get unique instructors for the Top Instructors section.
 */
export async function getTopInstructors() {
    const seen = new Set();
    return coursesData
        .filter((c) => {
            if (seen.has(c.instructor.name)) return false;
            seen.add(c.instructor.name);
            return true;
        })
        .slice(0, 4)
        .map((c) => ({
            ...c.instructor,
            courseTitle: c.title,
            category: c.category,
            students: c.enrolled,
            rating: c.rating,
        }));
}

export function formatEnrolled(n) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}
