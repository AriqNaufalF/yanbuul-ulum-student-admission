import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormItem, FormTitle } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Berkas',
        href: '/Berkas',
    },
];

interface FileUploadForm {
    userId: number;
    kartuKeluarga: File | null;
    aktaLahir: File | null;
    ijazah: File | null;
    fotoFormal: File | null;
}
export default function Berkas() {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, processing, errors } = useForm<Required<FileUploadForm>>({
        userId: auth.user.id,
        kartuKeluarga: null,
        aktaLahir: null,
        ijazah: null,
        fotoFormal: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('kartu_keluarga', data.kartuKeluarga as File);
        formData.append('akta_lahir', data.aktaLahir as File);
        formData.append('ijazah', data.ijazah as File);
        formData.append('foto_formal', data.fotoFormal as File);

        router.post(route('berkas.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Berkas berhasil diunggah!');
                setData({
                    userId: auth.user.id,
                    kartuKeluarga: null,
                    aktaLahir: null,
                    ijazah: null,
                    fotoFormal: null,
                });
            },
            onError: (errors) => {
                if (errors.general) {
                    toast.error(errors.general);
                } else {
                    toast.error('Gagal mengunggah berkas. Periksa data Anda.');
                }
            },
        });
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
                                    Silakan unggah berkas-berkas yang diperlukan untuk pendaftaran. Pastikan semua berkas yang diunggah dalam format
                                    PDF atau JPG dan tidak lebih dari 2MB per file.
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
                                        accept="image/jpeg, image/png"
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
