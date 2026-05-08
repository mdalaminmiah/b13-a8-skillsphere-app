// src/app/(auth)/layout.js
export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
            {children}
        </div>
    );
}
