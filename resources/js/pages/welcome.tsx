import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from '@/components/timeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import LandingPageLayout from '@/layouts/landing-page-layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { BookMarked, CircleChevronRight, Clock, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
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

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="text-primary flex-row items-center gap-2">
                        <CardTitle className="text-2xl">Visi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Terbentuknya generasi muslim yang beraqidah Ahlus Sunnah Wal Jama'ah berkepribadian islami dan mumpuni dalam ilmu dan
                            teknologi.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="text-primary flex-row items-center gap-2">
                        <CardTitle className="text-2xl">Misi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-inside list-decimal space-y-2">
                            <li>Mewujudkan pembelajaran dan pembiasaan dalam mempelajari Al-Quran dan menjalankan ajaran agama Islam</li>
                            <li>Mewujudkan pembentukan karakter yang mampu mengaktualisasikan diri di masyarakat</li>
                            <li>Menyelenggarakan pendidikan yang berkualitas dalam pencapaian prestasi akademik</li>
                            <li>Meningkatkan pengetahuan dan profesionalisme tenaga kependidikan sesuai dengan perkembangan dunia pendidikan</li>
                            <li>Menjadi madrasah yang berkualitas dan kuantitas terbaik di Kabupaten Siak</li>
                            <li>Menyelenggarakan tata kelola madrasah yang efektif, efisien, transparan dan akuntabel</li>
                            <li>Membentuk santri yang cakap, cerdas, beriman dan bertaqwa</li>
                            <li>Mampu menjadi hafidz/hafidzah yang berkepribadian baik</li>
                            <li>Mampu menguasai kitab kuning, kitab gundul dan ilmu tafsir Al-Qur'an</li>
                            <li>Membentuk alumnus yang handal dan memiliki talenta</li>
                        </ol>
                    </CardContent>
                </Card>
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
                    <div className="text-primary-foreground bg-primary flex items-center justify-center gap-2 px-4 py-6 text-center text-xl font-semibold md:text-2xl">
                        <GraduationCap size={32} />
                        <h3>Jenjang Pendidikan</h3>
                    </div>
                    <ul className="list-inside list-disc px-6 py-4">
                        <li>Madrasah Tsanawiyah (MTs)</li>
                        <li>Madrasah Aliyah (MA)</li>
                        <li>Madrasah Aliyah Lanjutan (MA lanjutan)</li>
                    </ul>
                </div>
                <div className="bg-[#F7F2EC]">
                    <div className="text-primary-foreground bg-primary flex items-center justify-center gap-2 px-4 py-6 text-center text-xl font-semibold md:text-2xl">
                        <BookMarked size={32} />
                        <h3>Kegiatan Pendidikan</h3>
                    </div>
                    <div className="px-6 py-4">
                        <h4 className="font-semibold">Program Unggulan</h4>
                        <ul className="list-inside list-disc">
                            <li>Program Tahfiz</li>
                            <li>Program Kitab Kuning</li>
                            <li>Program Bahasa</li>
                            <li>Ahklak</li>
                        </ul>
                        <h4 className="mt-4 font-semibold">Ekstrakurikuler</h4>
                        <ul className="list-inside list-disc">
                            <li>Klub Sains</li>
                            <li>Pramuka</li>
                            <li>Pramuka</li>
                            <li>Tilawah</li>
                            <li>Klub Fahmil Quran</li>
                            <li>Klub Syahril Quran</li>
                            <li>Olahraga (Futsal, Volly, dll)</li>
                            <li>Hadroh</li>
                            <li>Tapak Suci</li>
                        </ul>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

function RegistrationPeriodSection() {
    const phases = ['Oktober - Desember 2024', 'Januari - Maret 2025', 'Mei - Juni 2025'];
    return (
        <SectionWrapper id="periode-pendaftaran">
            <SectionTitle>Periode Pendaftaran</SectionTitle>
            <Timeline>
                {phases.map((phase, index) => (
                    <TimelineItem key={index}>
                        <TimelinePoint />
                        <TimelineContent>
                            <h3 className="text-lg font-semibold">Gelombang {index + 1}</h3>
                            <p>{phase}</p>
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
            className="bg-primary/80 container mx-auto flex min-h-96 items-center bg-[url(/images/santri-belajar.jpg)] bg-cover bg-center bg-no-repeat px-8 py-8 bg-blend-soft-light md:px-16"
        >
            <div className="max-w-md">
                <h2 className="text-2xl font-bold text-white md:text-3xl">Ayo bergabung dengan Yanbu'ul Ulum</h2>
                <p className="mt-2 font-bold text-white">
                    <q>Barang siapa yang menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga.</q> (H.R. Muslim)
                </p>
                <Button className="mt-6" variant="secondary" asChild>
                    <Link href="/petunjuk-pendaftaran">
                        Selengkapnya <CircleChevronRight />
                    </Link>
                </Button>
            </div>
        </section>
    );
}

function AchievementSection() {
    const achievements = [
        'Juara 1 Fahmil Quran Tingkat Kecamatan 2024',
        'Juara 1 Hifzil Quran 1 Juz Tingkat Kecamatan 2024',
        'Juara 1 Hifzil Quran 1 Juz Tingkat Desa 2024',
        'Juara 1 Syarhil Quran Tingkat Kecamatan 2024',
        'Juara 3 Pidato Bahasa Indonesia Tingkat Provinsi 2024',
        'Juara 2 Tahfiz 5 Juz Tingkat Provinsi 2024',
        'Juara 1 Tilawah Anak-Anak dan Remaja Tingkat Desa 2024',
        'Juara 3 Umum Perkemahan Akbar Kwaran Sabak Auh 2024',
        'Juara 3 MHQ Tingkat SUMBAGTENG 2024',
        'Emiya Caroninta Br. Ginting Menjadi Finalis Forkab Tapak Suci Tingkat Kabupaten 2024',
    ];

    const imagesSrc = ['/images/prestasi-1.jpg', '/images/prestasi-2.jpg'];

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
                    {achievements.map((achievement, index) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3 2xl:basis-1/4" key={index}>
                            <Card className="overflow-hidden p-0">
                                <CardHeader className="p-0">
                                    <img
                                        src={index % 2 === 0 ? imagesSrc[0] : imagesSrc[1]}
                                        alt="Prestasi santri"
                                        className="aspect-4/3 object-contain"
                                    />
                                </CardHeader>
                                <CardContent className="px-4 pb-6">
                                    <h3 className="font-semibold">{achievement}</h3>
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
