import { Button } from '@/components/ui/button';
import { FormTitle } from '@/components/ui/form';
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
        href: '/dashboard/riwayat-pendidikan',
    },
    {
        title: 'Program',
        href: '/dashboard/pilih-program',
    },
];

interface ProgramForm {
    program: string;
}

export default function PilihProgram() {
    const { data, setData, processing, errors } = useForm<Required<ProgramForm>>({
        program: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(data);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pilih Program" />
            <div className="p-4">
                <FormTitle>PILIH PROGRAM</FormTitle>
                <hr />
                <form onSubmit={submit}>
                    <div className="mt-4 grid max-w-max gap-4">
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
