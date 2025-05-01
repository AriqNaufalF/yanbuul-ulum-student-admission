import InputError from '@/components/input-error';
import { FormItem, FormTitle } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: '/dashboard',
    },
    {
        title: 'Data Calon Santri',
        href: '/dashboard/data-calon-santri',
    },
    {
        title: 'Pendidikan',
        href: '/dashboard/riwayat-pendidikan',
    },
];

type RiwayatPendidikanForm = {
    schoolOrigin: string;
    lastLevelEducation: string;
    graduationYear: string;
    schoolAddress: string;
};

export default function RiwayatPendidikan() {
    const { data, setData, processing, errors } = useForm<Required<RiwayatPendidikanForm>>({
        schoolOrigin: '',
        lastLevelEducation: '',
        graduationYear: '',
        schoolAddress: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Pendidikan" />
            <div className="p-4">
                <FormTitle>RIWAYAT PENDIDIKAN</FormTitle>
                <hr />
                <form onSubmit={submit}>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormItem>
                            <Label htmlFor="school-origin">Nama Sekolah Asal</Label>
                            <Input
                                id="school-origin"
                                type="text"
                                required
                                value={data.schoolOrigin}
                                onChange={(e) => setData('schoolOrigin', e.target.value)}
                            />
                            <InputError message={errors.schoolOrigin} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="last-level-education">Jenjang Pendidikan Terakhir</Label>
                            <Input
                                id="last-level-education"
                                type="text"
                                required
                                value={data.lastLevelEducation}
                                onChange={(e) => setData('lastLevelEducation', e.target.value)}
                            />
                            <InputError message={errors.lastLevelEducation} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="graduation-year">Tahun Lulus</Label>
                            <Input
                                id="graduation-year"
                                type="text"
                                required
                                value={data.graduationYear}
                                onChange={(e) => setData('graduationYear', e.target.value)}
                            />
                            <InputError message={errors.graduationYear} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="school-address">Alamat Sekolah</Label>
                            <Textarea
                                id="school-adress"
                                className="h-full resize-none"
                                required
                                value={data.schoolAddress}
                                onChange={(e) => setData('schoolAddress', e.target.value)}
                            />
                            <InputError message={errors.schoolAddress} />
                        </FormItem>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
