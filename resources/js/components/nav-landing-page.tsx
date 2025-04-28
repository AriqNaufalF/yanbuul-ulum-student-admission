import { useIsMobile } from '@/hooks/use-mobile';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function NavLandingPage() {
    const isMobile = useIsMobile(1024);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useOutsideClick(() => setMobileMenuOpen(false));
    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang Kami', href: '/#tentang-kami' },
        { name: 'Prestasi', href: '/#prestasi' },
        { name: 'Hubungi Kami', href: '/#hubungi-kami' },
    ];
    return (
        <header ref={headerRef} className="fixed top-0 right-0 left-0 z-50 w-full bg-white px-5 py-4">
            <div className="container mx-auto flex flex-col justify-between lg:flex-row">
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold uppercase">
                        yanbu'ul ulum
                    </Link>
                    <Button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="ml-auto lg:hidden">
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
                <nav
                    className={
                        'grid overflow-hidden transition-all duration-300 ' +
                        (mobileMenuOpen || !isMobile ? 'mt-2.5 grid-rows-[1fr] lg:mt-0' : 'grid-rows-[0fr]')
                    }
                >
                    <ul
                        className={
                            'flex min-h-0 flex-col items-center gap-6 transition-[visibility] duration-500 lg:flex-row xl:gap-8 ' +
                            (mobileMenuOpen || !isMobile ? 'visible' : 'invisible')
                        }
                    >
                        {navLinks.map((link) => (
                            <li key={link.name} className="group relative font-semibold">
                                <Link
                                    href={link.href}
                                    className="after:bg-secondary after:absolute after:-bottom-0.5 after:left-0 after:h-1 after:w-full after:opacity-0 after:transition-opacity after:duration-100 hover:after:opacity-100"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Button asChild>
                                <Link href="/register">Daftar Sekarang</Link>
                            </Button>
                        </li>
                        <li>
                            <Button asChild variant="outline">
                                <Link href="/register">Cek Kelulusan</Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
