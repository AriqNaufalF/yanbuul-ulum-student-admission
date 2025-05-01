import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from '@/components/timeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import LandingPageLayout from '@/layouts/landing-page-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { BookMarked, BookOpen, CircleChevronRight, Clock, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <LandingPageLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {/* Main section */}
            <main>
                {HeroSection()}
                {AboutSection()}
                {EducationSystemSection()}
                {RegistrationPeriodSection()}
                {RequirementsSection()}
                {AchievementSection()}
                {ContactSection()}
            </main>
        </LandingPageLayout>
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

            <div className="mx-auto">
                {/* Flex container for side-by-side layout */}
                <div className="relative max-w-7xl">
                    {/* Bookshelf image that overflows */}
                    <div className="relative z-0 -mb-24 ml-auto max-h-64 w-full max-w-xl md:mb-0 md:max-h-full xl:max-w-[720px]">
                        <p className="sr-only">
                            Photo by{' '}
                            <a href="https://unsplash.com/@inakihxz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                                Iñaki del Olmo
                            </a>{' '}
                            on{' '}
                            <a href="https://unsplash.com/photos/assorted-title-of-books-piled-in-the-shelves-NIJuEQw0RKg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                                Unsplash
                            </a>
                        </p>
                        <img src="/images/bookshelf-bg.jpg" alt="Bookshelf background" className="w-fit object-cover opacity-75" />
                    </div>

                    {/* Vision & Mission card */}
                    <div className="relative z-1 max-w-xl flex-1 p-6 text-white md:absolute md:top-1/2 md:left-0 md:mb-0 md:-translate-y-1/2 md:p-0">
                        <div className="bg-primary flex flex-col items-center rounded-lg p-6 text-justify shadow-lg md:p-8">
                            <BookOpen className="h-8 w-8 text-white" />
                            <h3 className="text-xl font-semibold md:text-2xl">Visi & Misi</h3>
                            <div className="mt-4 space-y-2">
                                <p className="text-sm md:text-base">
                                    Menjadi lembaga pendidikan Islam yang unggul dalam membentuk generasi berakhlak mulia, berwawasan luas, dan
                                    berprestasi.
                                </p>
                                <ul className="mt-2 list-disc pl-5 text-left text-sm md:text-base">
                                    <li>Menyelenggarakan pendidikan berkualitas berbasis nilai-nilai Islam</li>
                                    <li>Mengembangkan potensi peserta didik secara komprehensif</li>
                                    <li>Membangun kerja sama dengan berbagai pihak untuk kemajuan pendidikan</li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                    <Link href="/petunjuk-pendaftaran">
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
