import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
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
    ktp: File | null;
    suratPernyataan: File | null;
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
            <div className="p-4">
                <form onSubmit={submit}>
                    <FormTitle>BERKAS</FormTitle>
                    <hr />
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
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
                            <Label htmlFor="foto-formal">Scan/Foto Foto Formal (PDF/JPG)</Label>
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
                        <FormItem>
                            <Label htmlFor="ktp">Scan/Foto KTP Orang Tua (PDF/JPG)</Label>
                            <Input
                                id="ktp"
                                type="file"
                                required
                                multiple={false}
                                accept="application/pdf, image/jpeg"
                                onChange={(e) => setData('ktp', e.target.files?.[0] || null)}
                            />
                            <InputError message={errors.ktp} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor="surat-pernyataan">Surat Pernyataan (PDF)</Label>
                            <Input
                                id="surat-pernyataan"
                                type="file"
                                required
                                multiple={false}
                                accept="application/pdf"
                                onChange={(e) => setData('suratPernyataan', e.target.files?.[0] || null)}
                            />
                            <InputError message={errors.suratPernyataan} />
                        </FormItem>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="animate-spin" />}
                            Lanjut ke Pembayaran
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
