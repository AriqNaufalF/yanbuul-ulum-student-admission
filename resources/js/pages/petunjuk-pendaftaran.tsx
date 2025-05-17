import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from '@/components/timeline';
import LandingPageLayout from '@/layouts/landing-page-layout';
import { Head } from '@inertiajs/react';

export default function PetunjukPendaftaran() {
    const registrationSteps = [
        {
            desc: "Cari informasi penerimaan santri baru Pondok Pesantren Yanbu'ul Ulum",
            points: ['Masuk ke website', 'Klik "Daftar sekarang"'],
        },
        {
            desc: 'Membuat akun pendaftaran',
            points: ['Buat akun pendaftaran', 'Isi data diri'],
        },
        {
            desc: 'Lengkapi data diri',
            points: ['Isi data diri santri', 'Isi data orang tua/wali', 'Unggah berkas persyaratan'],
        },
        {
            desc: 'pembayaran',
            points: ['Membayar biaya pendaftaran', 'Mengecek secara berkala pengumuman hasil seleksi'],
        },
    ];
    return (
        <LandingPageLayout>
            <Head title="Petunjuk Pendaftaran" />
            <div className="grid min-h-80 content-end bg-white/60 bg-[url(/images/santri-belajar.jpg)] bg-cover bg-center bg-no-repeat bg-blend-soft-light">
                <div className="container mx-auto w-full px-4 py-16 md:px-0">
                    <h2 className="text-primary flex items-center gap-2 text-2xl font-bold underline underline-offset-4 md:text-3xl">
                        Petunjuk Pendaftaran
                    </h2>
                </div>
            </div>
            <main className="container mx-auto px-4 py-8 md:px-0">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold md:text-3xl">Persyaratan umum</h3>
                    <ol className="list-inside list-decimal pl-2">
                        <li>Fotocopy Akte Kelahiran</li>
                        <li>Fotocopy Kartu Keluarga</li>
                        <li>Pas Foto 3x4</li>
                        <li>Surat Keterangan lulus/ijazah</li>
                    </ol>
                </div>
                <Timeline>
                    {registrationSteps.map((step, index) => (
                        <TimelineItem key={index}>
                            <TimelinePoint />
                            <TimelineContent>
                                <h3 className="mb-1.5 text-lg font-semibold">Tahap {index + 1}</h3>
                                <p>{step.desc}</p>
                                <ul className="list-inside list-disc">
                                    {step.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </main>
        </LandingPageLayout>
    );
}
