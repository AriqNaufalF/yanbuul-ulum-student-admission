import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormItem, FormTitle } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        href: '/dashboard/data-calon-santri/pendidikan',
    },
];

type RiwayatPendidikanForm = {
    schoolOrigin: string;
    graduationYear: string;
    program: string;
};

export default function RiwayatPendidikan() {
    const { data, setData, processing, errors } = useForm<Required<RiwayatPendidikanForm>>({
        schoolOrigin: '',
        graduationYear: '',
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
            <Card>
                <CardContent className="@container">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-2 @5xl:gap-8">
                            <div>
                                <FormTitle>RIWAYAT PENDIDIKAN</FormTitle>
                                <p className="text-muted-foreground">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis minus iusto, illo quisquam optio hic sint
                                    expedita facilis, ducimus et ad adipisci dolorem provident, nemo quibusdam fugit quaerat obcaecati consectetur.
                                </p>
                            </div>
                            <div className="space-y-4">
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
                                    <Label htmlFor="graduation-year">Tahun Lulus</Label>
                                    <Select onValueChange={(value) => setData('graduationYear', value)} defaultValue={data.graduationYear}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Tahun Lulus" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 30 }, (_, i) => {
                                                const year = new Date().getFullYear() - i;
                                                return (
                                                    <SelectItem key={year} value={String(year)}>
                                                        {year}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.graduationYear} />
                                </FormItem>
                            </div>
                        </div>
                        <hr className="my-8" />
                        <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-2 @5xl:gap-8">
                            <div>
                                <FormTitle>PROGRAM PILIHAN</FormTitle>
                                <p className="text-muted-foreground">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis minus iusto, illo quisquam optio hic sint
                                    expedita facilis, ducimus et ad adipisci dolorem provident, nemo quibusdam fugit quaerat obcaecati consectetur.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <FormItem>
                                    <Label htmlFor="program">Program</Label>
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
                                    <InputError message={errors.program} />
                                </FormItem>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Simpan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
