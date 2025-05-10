import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { FormItem, FormTitle } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { City, getCities, getProvinces, Province } from '@/lib/wilayah-api';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { getYear } from 'date-fns';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';

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

interface ProspectiveStudent {
    name: string;
    nik: string;
    birthDate: Date;
    birthPlace: string;
    gender: string;
    address: string;
    province: string;
    city: string;
    postalCode: string;
}

interface ParentData {
    phone: string;
    email: string;
    fathersName: string;
    fathersJob: string;
    mothersName: string;
    mothersJob: string;
}

export default function DataCalonSantri() {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [loadingProvinces, setLoadingProvinces] = useState<boolean>(false);
    const [loadingCities, setLoadingCities] = useState<boolean>(false);

    const { data, setData, processing, errors } = useForm<Required<ProspectiveStudent & ParentData>>({
        name: '',
        nik: '',
        gender: '',
        birthPlace: '',
        birthDate: new Date(),
        address: '',
        province: '',
        city: '',
        postalCode: '',
        phone: '',
        email: '',
        fathersName: '',
        fathersJob: '',
        mothersName: '',
        mothersJob: '',
    });

    // Fetch provinces on component mount
    useEffect(() => {
        setLoadingProvinces(true);
        getProvinces()
            .then(setProvinces)
            .catch((error: Error) => {
                console.error(error.message);
            })
            .finally(() => setLoadingProvinces(false));
    }, []);

    // Fetch cities when a province is selected
    useEffect(() => {
        if (selectedProvince !== '') {
            setLoadingCities(true);
            getCities(selectedProvince)
                .then(setCities)
                .catch((error: Error) => {
                    console.error(error.message);
                })
                .finally(() => setLoadingCities(false));

            setData('province', provinces.find(({ id }) => id === selectedProvince)!.name);
            setData('city', '');
        }
    }, [selectedProvince]);

    const handleProvinceChange = (val: string) => {
        const selectedCity = cities.find(({ id }) => id === val);
        if (selectedCity) {
            setData('city', selectedCity.name);
        }
    };

    const provinceOptions = useMemo(
        () =>
            provinces.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                    {name}
                </SelectItem>
            )),
        [provinces],
    );

    const cityOptions = useMemo(
        () =>
            cities.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                    {name}
                </SelectItem>
            )),
        [cities],
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(data);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Calon Santri" />
            <Card>
                <CardContent className="@container">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-2 @5xl:gap-8">
                            <div>
                                <FormTitle>DATA PRIBADI</FormTitle>
                                <p className="text-muted-foreground">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus aperiam laboriosam quia. Ea inventore totam
                                    voluptas voluptatem ad facere quibusdam in sit aut tempora et saepe adipisci, magnam laborum. Dolorum.
                                </p>
                            </div>
                            <div className="space-y-4">
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
                                    <Label htmlFor="address">Alamat</Label>
                                    <Input
                                        type="text"
                                        id="address"
                                        required
                                        autoComplete="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    <InputError message={errors.address} />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor="province">Provinsi Asal</Label>
                                    <Select onValueChange={setSelectedProvince} defaultValue={data.province}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Provinsi asal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {loadingProvinces ? (
                                                <SelectItem value="loading" disabled>
                                                    <LoaderCircle className="h-2 w-2 animate-spin" /> Memuat
                                                </SelectItem>
                                            ) : (
                                                provinceOptions
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.province} />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor="city">Kab/kota Asal</Label>
                                    <Select onValueChange={handleProvinceChange} defaultValue={data.city}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Kab/Kota asal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {loadingCities ? (
                                                <SelectItem value="loading" disabled>
                                                    <LoaderCircle className="h-2 w-2 animate-spin" /> Memuat
                                                </SelectItem>
                                            ) : (
                                                cityOptions
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.city} />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor="postal-code">Kode Pos</Label>
                                    <Input
                                        type="text"
                                        id="postal-code"
                                        required
                                        value={data.postalCode}
                                        onChange={(e) => setData('postalCode', e.target.value)}
                                    />
                                    <InputError message={errors.postalCode} />
                                </FormItem>
                            </div>
                        </div>
                        <hr className="my-8" />
                        <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-2 @5xl:gap-8">
                            <div>
                                <FormTitle>DATA ORANG TUA/WALI</FormTitle>
                                <p className="text-muted-foreground">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus aperiam laboriosam quia. Ea inventore totam
                                    voluptas voluptatem ad facere quibusdam in sit aut tempora et saepe adipisci, magnam laborum. Dolorum.
                                </p>
                            </div>
                            <div className="space-y-4">
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
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Simpan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
