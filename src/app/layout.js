import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata = {
    title: 'SkillSphere — Learn Web Dev, Design & Marketing',
    description: 'Master in-demand skills with world-class instructors.',
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body
                className="min-h-full flex flex-col bg-[#0B1120]"
                suppressHydrationWarning
            >
                {/* Ambient background glows */}
                <div className="pointer-events-none fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full z-0" />
                <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full z-0" />

                <main className="min-h-screen relative z-10">{children}</main>

                {/* Global toast notifications — styled to match dark theme */}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#0f172a',
                            color: '#f1f5f9',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: '500',
                            padding: '14px 18px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#ea580c',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </body>
        </html>
    );
}
