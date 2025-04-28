import { Timeline, TimelineContent, TimelineItem, TimelinePoint } from '@/components/timeline';
import LandingPageLayout from '@/layouts/landing-page-layout';
import { Head } from '@inertiajs/react';

export default function PetunjukPendaftaran() {
    const months = ['Januari', 'Februari', 'Maret', 'April'];

    return (
        <LandingPageLayout>
            <Head title="Petunjuk Pendaftaran" />
            <div className="grid min-h-80 content-end bg-white/40 bg-[url(https://plus.unsplash.com/premium_photo-1661331705504-7a513e8b3266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat bg-blend-soft-light">
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
                        <li>Beragama Islam</li>
                        <li>Berakal sehat</li>
                        <li>Memiliki fisik yang kuat</li>
                    </ol>
                </div>
                <Timeline>
                    {months.map((month, index) => (
                        <TimelineItem key={index}>
                            <TimelinePoint />
                            <TimelineContent>
                                <h3 className="text-lg font-semibold">{month}</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum impedit corrupti provident cumque quibusdam eos
                                    reprehenderit, iure rerum nostrum dignissimos hic harum! Reprehenderit amet officiis sequi aliquam optio
                                    aspernatur obcaecati?
                                </p>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </main>
        </LandingPageLayout>
    );
}
