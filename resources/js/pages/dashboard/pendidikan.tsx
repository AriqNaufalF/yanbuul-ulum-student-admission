import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormItem, FormTitle } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
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
        href: '/dashboard/pendidikan',
    },
];

type RiwayatPendidikanForm = {
    schoolOrigin: string;
    lastLevelEducation: string;
    graduationYear: string;
    schoolAddress: string;
    program: string;
};

export default function RiwayatPendidikan() {
    const { data, setData, processing, errors } = useForm<Required<RiwayatPendidikanForm>>({
        schoolOrigin: '',
        lastLevelEducation: '',
        graduationYear: '',
        schoolAddress: '',
        program: '',
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
                <form onSubmit={submit}>
                    <FormTitle>RIWAYAT PENDIDIKAN</FormTitle>
                    <hr />
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

                    <FormTitle className="mt-8">PILIH PROGRAM</FormTitle>
                    <hr />
                    <div className="mt-4 grid max-w-[calc(1/3*100%-1rem)] gap-4">
                        <Select onValueChange={(value) => setData('program', value)} defaultValue={data.program}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Program" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="program1">Program 1</SelectItem>
                                <SelectItem value="program2">Program 2</SelectItem>
                                <SelectItem value="program3">Program 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Simpan dan Lanjut ke Unggah Berkas
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
