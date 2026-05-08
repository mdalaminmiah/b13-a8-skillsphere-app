'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';

export default function CoursesSearchBar({ defaultValue = '' }) {
    // Initialize state directly from the prop.
    // No useEffect needed for the initial sync.
    const [value, setValue] = useState(defaultValue);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set('q', value.trim());
        } else {
            params.delete('q');
        }

        // Use { scroll: false } to maintain user position on the grid
        router.push(`/courses?${params.toString()}`, { scroll: false });
    };

    const handleClear = () => {
        setValue('');
        const params = new URLSearchParams(searchParams.toString());
        params.delete('q');
        router.push(`/courses?${params.toString()}`, { scroll: false });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="group relative flex flex-col sm:flex-row items-stretch gap-4 w-full"
        >
            <div className="relative flex-1">
                {/* Visual Glow Focus */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-indigo-600 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />

                <div className="relative flex items-center bg-slate-950/90 border border-white/10 rounded-2xl backdrop-blur-xl transition-all group-focus-within:border-orange-500/50">
                    <FiSearch
                        className="ml-4 text-slate-500 group-focus-within:text-orange-500"
                        size={20}
                    />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search courses..."
                        className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 px-4 py-4 text-sm md:text-base outline-none"
                    />
                    {value && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="pr-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <FiX size={18} />
                        </button>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="px-8 py-4 sm:py-0 rounded-2xl bg-orange-600 text-white font-black uppercase tracking-widest text-[11px] transition-all hover:bg-orange-500 hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] active:scale-95"
            >
                Search
            </button>
        </form>
    );
}
