import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { FormItem, FormTitle } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { getYear } from 'date-fns';
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
];

type DataCalonSantri = {
    name: string;
    nik: string;
    birthDate: Date;
    gender: string;
    birthPlace: string;
    address: string;
    phone: string;
    email: string;
    fathersName?: string;
    fathersJob?: string;
    mothersName?: string;
    mothersJob?: string;
    parentsPhone?: string;
};

export default function DataCalonSantri() {
    const { data, setData, processing, errors } = useForm<DataCalonSantri>({
        name: '',
        nik: '',
        gender: '',
        birthPlace: '',
        birthDate: new Date(),
        address: '',
        phone: '',
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(data);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Calon Santri" />
            <div className="p-4">
                <form onSubmit={submit}>
                    <FormTitle>DATA PRIBADI</FormTitle>
                    <hr />
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormItem>
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                type="text"
                                id="name"
                                required
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
                            <Input
                                type="text"
                                id="nik"
                                required
                                autoComplete="nik"
                                value={data.nik}
                                onChange={(e) => setData('nik', e.target.value)}
                            />
                            <InputError message={errors.nik} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="birth-date">Tanggal Lahir</Label>
                            <DatePicker date={data.birthDate} setDate={(date) => setData('birthDate', date)} endYear={getYear(new Date())} />
                            <InputError message={errors.birthDate} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="gender">Jenis Kelamin</Label>
                            <Select onValueChange={(val) => setData('gender', val)} defaultValue={data.gender}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Laki-Laki</SelectItem>
                                    <SelectItem value="female">Perempuan</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.gender} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="birth-place">Tempat Lahir</Label>
                            <Input
                                type="text"
                                id="birth-place"
                                required
                                autoComplete="birth-place"
                                value={data.birthPlace}
                                onChange={(e) => setData('birthPlace', e.target.value)}
                            />
                            <InputError message={errors.birthPlace} />
                        </FormItem>
                        <FormItem className="row-span-1 flex flex-col md:row-span-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                                id="address"
                                className="h-full resize-none"
                                required
                                autoComplete="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                            />
                            <InputError message={errors.address} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="phone">No. HP Aktif</Label>
                            <Input
                                type="phone"
                                id="phone"
                                required
                                autoComplete="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <InputError message={errors.phone} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="email">Email aktif</Label>
                            <Input
                                type="email"
                                id="email"
                                required
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </FormItem>
                    </div>
                    <FormTitle className="mt-8">DATA ORANG TUA/WALI</FormTitle>
                    <hr />
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormItem>
                            <Label htmlFor="fathers-name">Nama Ayah</Label>
                            <Input
                                type="text"
                                id="fathers-name"
                                required
                                value={data.fathersName}
                                onChange={(e) => setData('fathersName', e.target.value)}
                            />
                            <InputError message={errors.fathersName} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="fathers-job">Pekerjaan Ayah</Label>
                            <Input
                                type="text"
                                id="fathers-job"
                                required
                                value={data.fathersJob}
                                onChange={(e) => setData('fathersJob', e.target.value)}
                            />
                            <InputError message={errors.fathersJob} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="mothers-name">Nama Ibu</Label>
                            <Input
                                type="text"
                                id="mothers-name"
                                required
                                value={data.mothersName}
                                onChange={(e) => setData('mothersName', e.target.value)}
                            />
                            <InputError message={errors.mothersName} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="mothers-job">Pekerjaan Ibu</Label>
                            <Input
                                type="text"
                                id="mothers-job"
                                required
                                value={data.mothersJob}
                                onChange={(e) => setData('mothersJob', e.target.value)}
                            />
                            <InputError message={errors.mothersJob} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="parents-phone">No. HP Aktif</Label>
                            <Input
                                type="text"
                                id="parents-phone"
                                required
                                autoComplete="phone"
                                value={data.parentsPhone}
                                onChange={(e) => setData('parentsPhone', e.target.value)}
                            />
                            <InputError message={errors.parentsPhone} />
                        </FormItem>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
