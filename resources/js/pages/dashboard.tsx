import { Chip } from '@/components/chip';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';

type AcceptanceStatus = 'diterima' | 'diproses' | 'ditolak';
interface RegistrationData {
    id: number;
    name: string;
    regisNumber: string;
    status: AcceptanceStatus;
    date: string;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const registrationData = {} as RegistrationData;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-4">
                <Button className="mb-4" asChild>
                    <Link href="/dashboard/data-calon-santri">Daftar</Link>
                </Button>
                <hr />
                <Table className="mt-4 border">
                    <TableHeader className="bg-slate-100">
                        <TableRow>
                            <TableHead>Tanggal Daftar</TableHead>
                            <TableHead>Nomor Pendaftaran</TableHead>
                            <TableHead className="min-w-36">Nama</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Detail</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            {registrationData?.name ? (
                                <>
                                    <TableCell>{registrationData.date}</TableCell>
                                    <TableCell>{registrationData.regisNumber}</TableCell>
                                    <TableCell>{registrationData.name}</TableCell>
                                    <TableCell>
                                        <ChipStatus status={registrationData.status} />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="icon" className="border-blue-500" type="button">
                                            <Eye className="text-blue-500" />
                                            <span className="sr-only">Detail</span>
                                        </Button>
                                    </TableCell>
                                </>
                            ) : (
                                <TableCell colSpan={5} className="text-center">
                                    Anda masih belum mendaftar.
                                </TableCell>
                            )}
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}

function ChipStatus({ status }: { status: AcceptanceStatus }) {
    if (status === 'diterima') {
        return (
            <Chip variant="success">
                <span>Diterima</span>
            </Chip>
        );
    }

    if (status === 'diproses') {
        return (
            <Chip variant="warning">
                <span>Sedang Diproses</span>
            </Chip>
        );
    }

    return (
        <Chip variant="danger">
            <span>Ditolak</span>
        </Chip>
    );
}
