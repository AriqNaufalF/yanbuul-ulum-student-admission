import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormItem, FormTitle } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Program',
        href: '/daftar',
    },
];

const paymentMethods = [
    { value: 'BRI', label: 'BRI' },
    { value: 'BCA', label: 'BCA' },
    { value: 'BNI', label: 'BNI' },
    { value: 'Mandiri', label: 'Mandiri' },
    { value: 'BCA Virtual Account', label: 'BCA Virtual Account' },
    { value: 'BRI Virtual Account', label: 'BRI Virtual Account' },
];

export default function DaftarProgram({ isRegistered, method, program }: { isRegistered: boolean; method: string | null; program: string | null }) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors } = useForm({
        userId: auth.user.id,
        program: program || '',
        method: method || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('program.store'), {
            onSuccess: () => {
                toast.success('Program berhasil didaftarkan!');
            },
            onError: (errors) => {
                if (errors.general) {
                    toast.error(errors.general);
                } else {
                    toast.error('Terjadi kesalahan saat mendaftarkan program.');
                }
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Seleksi" />
            <Card>
                <CardContent className="@container">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-2 @5xl:gap-8">
                            <div>
                                <FormTitle>PROGRAM PILIHAN</FormTitle>
                                <p className="bg-yellow-100 px-2 py-3">
                                    <span className="font-bold">Perhatian!</span> <br /> Anda hanya bisa mendaftar satu program saja.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <FormItem>
                                    <Label htmlFor="program">Program</Label>
                                    <Select onValueChange={(value) => setData('program', value)} defaultValue={data.program} disabled={isRegistered}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Program" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MTS">Madrasah Tsanawiyah (MTs)</SelectItem>
                                            <SelectItem value="MA">Madrasah Aliyah (MA)</SelectItem>
                                            <SelectItem value="MA LANJUTAN">MA Lanjutan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.program} />
                                </FormItem>
                                <FormItem>
                                    <Label>Metode Bayar</Label>
                                    <Select onValueChange={(val) => setData('method', val)} defaultValue={data.method} disabled={isRegistered}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih metode pembayaran" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {paymentMethods.map((method) => (
                                                <SelectItem key={method.value} value={method.value}>
                                                    {method.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.method} />
                                </FormItem>
                                <FormItem>
                                    <Label>Biaya Pendaftaran</Label>
                                    <Input
                                        value={(200000).toLocaleString('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            maximumFractionDigits: 0,
                                        })}
                                        disabled
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button type="submit" disabled={processing || isRegistered}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Daftar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
