import React from 'react';

const TIPS = [
    {
        id: '01',
        title: 'Pomodoro Mastery',
        description:
            'Boost focus by working in 25-minute sprints followed by 5-minute breaks. It keeps your brain fresh during long coding sessions.',
        color: 'orange',
    },
    {
        id: '02',
        title: 'Active Recall',
        description:
            'Don’t just re-read notes. Test yourself frequently to strengthen neural pathways and ensure long-term retention.',
        color: 'indigo',
    },
    {
        id: '03',
        title: 'Time Blocking',
        description:
            'Dedicate specific hours of your day solely to your courses. Treat it like a meeting you cannot skip.',
        color: 'white',
    },
];

export default function LearningTips() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">
                            Learning{' '}
                            <span className="text-orange-600 italic">Tips</span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Master your workflow with these efficiency hacks.
                        </p>
                    </div>
                    <div className="h-px flex-1 bg-slate-800 hidden md:block mb-6 mx-8"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TIPS.map((tip) => (
                        <div
                            key={tip.id}
                            className="group relative p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 hover:border-orange-500/30 transition-all duration-500"
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                                    tip.color === 'orange'
                                        ? 'bg-orange-600/20 text-orange-500'
                                        : tip.color === 'indigo'
                                          ? 'bg-indigo-600/20 text-indigo-400'
                                          : 'bg-white/10 text-white'
                                }`}
                            >
                                <span className="font-black">{tip.id}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">
                                {tip.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed">
                                {tip.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
