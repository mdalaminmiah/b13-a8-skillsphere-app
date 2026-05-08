import Footer from '@/components/Shared/Footer/Footer.mjs';
import Navbar from '@/components/Shared/Navbar/Navbar.mjs';

export default function DashboardLayout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
