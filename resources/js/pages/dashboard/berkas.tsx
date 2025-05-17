import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormItem, FormTitle } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Berkas',
        href: '/Berkas',
    },
];

interface FileUploadForm {
    kartuKeluarga: File | null;
    aktaLahir: File | null;
    ijazah: File | null;
    fotoFormal: File | null;
}
export default function Berkas() {
    const { data, setData, processing, errors } = useForm<Required<FileUploadForm>>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(data);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Unggah Berkas" />
            <Card>
                <CardContent className="@container">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-2 @5xl:gap-8">
                            <div>
                                <FormTitle>PEMBERKASAN</FormTitle>
                                <p className="text-muted-foreground">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis minus iusto, illo quisquam optio hic sint
                                    expedita facilis, ducimus et ad adipisci dolorem provident, nemo quibusdam fugit quaerat obcaecati consectetur.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <FormItem>
                                    <Label htmlFor="kartu-keluarga">Scan/Foto Kartu Keluarga (PDF/JPG)</Label>
                                    <Input
                                        id="kartu-keluarga"
                                        type="file"
                                        required
                                        multiple={false}
                                        accept="application/pdf, image/jpeg"
                                        onChange={(e) => setData('kartuKeluarga', e.target.files?.[0] || null)}
                                    />
                                    <InputError message={errors.kartuKeluarga} />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor="akta-kelahiran">Scan/Foto Akta Kelahiran (PDF/JPG)</Label>
                                    <Input
                                        id="akta-kelahiran"
                                        type="file"
                                        required
                                        multiple={false}
                                        accept="application/pdf, image/jpeg"
                                        onChange={(e) => setData('aktaLahir', e.target.files?.[0] || null)}
                                    />
                                    <InputError message={errors.aktaLahir} />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor="ijazah">Scan/Foto Ijazah/SKL (PDF/JPG)</Label>
                                    <Input
                                        id="ijazah"
                                        type="file"
                                        required
                                        multiple={false}
                                        accept="application/pdf, image/jpeg"
                                        onChange={(e) => setData('ijazah', e.target.files?.[0] || null)}
                                    />
                                    <InputError message={errors.ijazah} />
                                </FormItem>
                                <FormItem>
                                    <Label htmlFor="foto-formal">Foto Formal Ukuran 3x4 (PNG/JPG)</Label>
                                    <Input
                                        id="foto-formal"
                                        type="file"
                                        required
                                        multiple={false}
                                        accept="application/pdf, image/jpeg"
                                        onChange={(e) => setData('fotoFormal', e.target.files?.[0] || null)}
                                    />
                                    <InputError message={errors.fotoFormal} />
                                </FormItem>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Unggah
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
