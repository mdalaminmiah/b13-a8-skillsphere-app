import Footer from '@/components/Shared/Footer/Footer.mjs';
import Navbar from '@/components/Shared/Navbar/Navbar.mjs';

export default function PublicLayout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
