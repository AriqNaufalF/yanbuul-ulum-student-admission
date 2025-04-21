import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from '@/components/timeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { BookMarked, BookOpenText, CircleChevronRight, Clock, GraduationCap, Mail, MapPin, Medal, Menu, Phone, X } from 'lucide-react';
import React, { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const isMobile = useIsMobile(1024);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useOutsideClick(() => setMobileMenuOpen(false));
    const navLinks = [
        { name: 'Beranda', href: '#beranda' },
        { name: 'Tentang Kami', href: '#tentang-kami' },
        { name: 'Program', href: '#program' },
        { name: 'Hubungi Kami', href: '#hubungi-kami' },
    ];

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {/* Navigation */}
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
                                    <a
                                        href={link.href}
                                        className="after:bg-secondary after:absolute after:-bottom-0.5 after:left-0 after:h-1 after:w-full after:opacity-0 after:transition-opacity after:duration-100 hover:after:opacity-100"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Button asChild>
                                    <Link href="/register">Daftar Sekarang</Link>
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            {/* Main section */}
            <main className="pt-16">
                {HeroSection()}
                {AboutSection()}
                {EducationSystemSection()}
                {RegistrationPeriodSection()}
                {RequirementsSection()}
                {AchievementSection()}
                {ContactSection()}
            </main>
            {Footer()}
        </>
    );
}

function HeroSection() {
    return (
        <section id="beranda" className="bg-primary grid grid-cols-1 place-items-center items-center px-24 py-16 md:grid-cols-2">
            <div>
                <h1 className="text-4xl font-bold text-white">
                    <span className="text-5xl">SELAMAT DATANG</span>
                    <br /> di Ponpes
                    <span className="text-secondary"> YANBU'UL ULUM</span>
                </h1>
                <p className="mt-4 text-2xl text-white">Menyediakan pendidikan berkualitas untuk generasi masa depan.</p>
                <Button className="mt-6" variant="secondary" asChild>
                    <Link href="/">
                        Pelajari lebih lanjut <CircleChevronRight fill="#f8f8f8" color="#D4AD37" />
                    </Link>
                </Button>
            </div>
            <div className="relative isolate max-w-sm">
                <img src="/images/foto-santri.png" alt="Foto santri" />
                <img
                    src="/images/blob-1.svg"
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 z-[-1] w-10/12 -translate-x-1/2 -translate-y-1/2"
                />
            </div>
        </section>
    );
}

function AboutSection() {
    return (
        <SectionWrapper id="tentang-kami">
            <SectionTitle>
                Tentang <span className="text-primary">Yanbu'ul Ulum</span>
            </SectionTitle>
            <div className="mt-6 grid grid-cols-1 justify-center gap-6 md:grid-cols-3">
                <div className="bg-[#F7F2EC] px-6 py-8">
                    <div className="text-primary mb-4 flex flex-col items-center text-center text-xl font-semibold md:text-2xl">
                        <BookOpenText size={32} />
                        <h3>Visi & Misi</h3>
                    </div>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam alias suscipit soluta explicabo neque ipsum incidunt
                        repudiandae nesciunt atque error, vero perspiciatis omnis accusantium aliquam velit ipsa nihil eveniet tenetur.
                    </p>
                </div>
                <div className="bg-[#F7F2EC] px-6 py-8">
                    <div className="text-primary mb-4 flex flex-col items-center text-center text-xl font-semibold md:text-2xl">
                        <Medal size={32} />
                        <h3>Akreditasi</h3>
                    </div>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam alias suscipit soluta explicabo neque ipsum incidunt
                        repudiandae nesciunt atque error, vero perspiciatis omnis accusantium aliquam velit ipsa nihil eveniet tenetur.
                    </p>
                </div>
                <div className="place-items-center bg-[#F7F2EC] px-6 py-8">
                    <div className="text-primary mb-4 flex flex-col items-center text-center text-xl font-semibold md:text-2xl">
                        <MapPin size={32} />
                        <h3>Lokasi</h3>
                    </div>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam alias suscipit soluta explicabo neque ipsum incidunt
                        repudiandae nesciunt atque error, vero perspiciatis omnis accusantium aliquam velit ipsa nihil eveniet tenetur.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}

function EducationSystemSection() {
    return (
        <SectionWrapper id="sistem-pendidikan">
            <SectionTitle>Sistem Pendidikan</SectionTitle>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="bg-[#F7F2EC]">
                    <div className="text-primary-foreground bg-primary mb-4 flex items-center justify-center gap-2 px-4 py-6 text-center text-xl font-semibold md:text-2xl">
                        <GraduationCap size={32} />
                        <h3>Pendidikan Formal</h3>
                    </div>
                    <p className="px-6 py-8">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam alias suscipit soluta explicabo neque ipsum incidunt
                        repudiandae nesciunt atque error, vero perspiciatis omnis accusantium aliquam velit ipsa nihil eveniet tenetur.
                    </p>
                </div>
                <div className="bg-[#F7F2EC]">
                    <div className="text-primary-foreground bg-primary mb-4 flex items-center justify-center gap-2 px-4 py-6 text-center text-xl font-semibold md:text-2xl">
                        <BookMarked size={32} />
                        <h3>Pendidikan Non-Formal</h3>
                    </div>
                    <p className="px-6 py-8">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam alias suscipit soluta explicabo neque ipsum incidunt
                        repudiandae nesciunt atque error, vero perspiciatis omnis accusantium aliquam velit ipsa nihil eveniet tenetur.
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
}

function RegistrationPeriodSection() {
    const months = ['Januari', 'Februari', 'Maret', 'April'];
    return (
        <SectionWrapper id="periode-pendaftaran">
            <SectionTitle>Periode Pendaftaran</SectionTitle>
            <Timeline>
                {months.map((month, index) => (
                    <TimelineItem key={index}>
                        <TimelinePoint />
                        <TimelineContent>
                            <h3 className="text-lg font-semibold">{month}</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum impedit corrupti provident cumque quibusdam eos
                                reprehenderit, iure rerum nostrum dignissimos hic harum! Reprehenderit amet officiis sequi aliquam optio aspernatur
                                obcaecati?
                            </p>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </SectionWrapper>
    );
}

function RequirementsSection() {
    return (
        <section
            id="kebutuhan-pendaftaran"
            className="container mx-auto flex min-h-96 items-center bg-white/40 bg-[url(https://plus.unsplash.com/premium_photo-1661331705504-7a513e8b3266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat px-8 py-8 bg-blend-soft-light md:px-16"
        >
            <div className="max-w-md">
                <h2 className="text-primary text-2xl font-bold underline underline-offset-4 md:text-3xl">Road to Yanbu'ul Ulum</h2>
                <p className="text-primary mt-2 font-bold">
                    <q>Barang siapa yang menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga.</q> (H.R. Muslim)
                </p>
                <Button className="mt-6" asChild>
                    <Link href="/">
                        Selengkapnya <CircleChevronRight />
                    </Link>
                </Button>
            </div>
        </section>
    );
}

function AchievementSection() {
    return (
        <SectionWrapper id="prestasi">
            <SectionTitle>Prestasi Santri</SectionTitle>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 10000,
                        stopOnInteraction: false,
                    }),
                ]}
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 2xl:basis-1/4" key={index}>
                            <Card className="overflow-hidden p-0">
                                <CardHeader className="p-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Prestasi santri"
                                    />
                                </CardHeader>
                                <CardContent className="px-4 pb-6">
                                    <h3 className="font-semibold">Juara 1 lomba Adzan</h3>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
        </SectionWrapper>
    );
}

function ContactSection() {
    return (
        <SectionWrapper id="hubungi-kami">
            <SectionTitle>Hubungi Kami</SectionTitle>
            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="w-full space-y-4">
                    <div className="flex items-center gap-2">
                        <MapPin className="text-primary w-6 md:w-8" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">Alamat</h3>
                            <p className="text-sm">
                                JI.Setia Pahlawan (JI. Pelajar) RT. 003 RW. 004 Kel.Simpang Belutu Kec,Kandis Kab Siak Kandis, Indonesia Riau
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="text-primary w-6 md:w-8" />
                        <div>
                            <h3 className="text-lg font-semibold">Nomor Telepon</h3>
                            <p className="text-sm">+62 28374 189723</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="text-primary w-6 md:w-8" />
                        <div>
                            <h3 className="text-lg font-semibold">Email</h3>
                            <p className="text-sm">yanbululum@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="text-primary w-6 md:w-8" />
                        <div>
                            <h3 className="text-lg font-semibold">Jam Kerja</h3>
                            <p className="text-sm">Senin - Jumat: 8:00 - 16:00</p>
                            <p className="text-sm">Saturday: 8:00 - 12:00</p>
                            <p className="text-sm">Tutup Hari Minggu dan Hari Besar Lainnya.</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <iframe
                        className="w-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1186.03757326764!2d101.25202983661829!3d0.8881569824471275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d48d8244fce829%3A0x34f6ca6ab861b8d5!2sPondok%20Pesantren%20Yanbuul%20Ulum%20Kandis!5e0!3m2!1sen!2sid!4v1745225242966!5m2!1sen!2sid"
                        style={{ border: 0 }}
                        height={320}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </SectionWrapper>
    );
}

function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
                {/* Left Section */}
                <div>
                    <h4 className="mb-4 text-lg font-bold">YAYASAN YANBU'UL ULUM</h4>
                    <div className="mb-2 flex items-center space-x-2">
                        <Mail className="h-5 w-5" />
                        <span>yanbululum@gmail.com</span>
                    </div>
                    <div className="mb-2 flex items-center space-x-2">
                        <Phone className="h-5 w-5" />
                        <span>+62 28374 189723</span>
                    </div>
                    <div className="mt-4 flex space-x-4">
                        <a href="https://www.facebook.com/YUKIBS2021" target="_blank">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor">
                                <title>Facebook</title>
                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                            </svg>
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a href="http://" target="_blank">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor">
                                <title>X</title>
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                            </svg>
                            <span className="sr-only">X</span>
                        </a>
                        <a href="https://www.instagram.com/ponpes_yanbuul_ulum_kandis/" target="_blank">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor">
                                <title>Instagram</title>
                                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                            </svg>
                            <span className="sr-only">Instagram</span>
                        </a>
                    </div>
                </div>

                {/* Center Section */}
                <div>
                    <h4 className="mb-4 text-lg font-bold">Link Cepat</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="hover:underline">
                                Pendaftaran
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:underline">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:underline">
                                Informasi
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="hover:underline">
                                Kontak
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <h4 className="mb-4 text-lg font-bold">Informasi Kontak</h4>
                    <p className="text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam quidem vitae necessitatibus voluptate ut eos perferendis
                        fuga pariatur esse repellendus commodi, velit ratione delectus itaque ipsa ducimus veniam eum quasi!
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-800 py-4 text-sm text-gray-300">
                <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 md:flex-row">
                    <div className="space-x-4">
                        <Link href="/" className="hover:underline">
                            Terms of Service
                        </Link>
                        <span>•</span>
                        <Link href="/" className="hover:underline">
                            Privacy Policy
                        </Link>
                        <span>•</span>
                        <Link href="/" className="hover:underline">
                            Sitemap
                        </Link>
                        <span>•</span>
                        <Link href="/" className="hover:underline">
                            Security
                        </Link>
                    </div>
                    <div>
                        © 2025 <span className="text-primary font-semibold">IUM</span> Made with <span className="text-red-500">❤️</span> by{' '}
                        <span className="text-primary font-semibold">IUM-25-098</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SectionWrapper({ children, ...props }: React.ComponentProps<'section'>) {
    return (
        <section className="container mx-auto px-8 py-8 md:px-16" {...props}>
            {children}
        </section>
    );
}

function SectionTitle({ children }: React.ComponentProps<'h2'>) {
    return (
        <h2 className="after:bg-primary relative mb-6 text-center text-2xl font-bold after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-28 after:-translate-x-1/2 md:text-3xl">
            {children}
        </h2>
    );
}
