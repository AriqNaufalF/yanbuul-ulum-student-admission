import { Chip } from '@/components/chip';
import DocumentItem from '@/components/Document-item';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { Eye, MessageSquareWarning } from 'lucide-react';

type AcceptanceStatus = 'diterima' | 'diproses' | 'ditolak';
interface RegistrationData {
    id: number;
    name: string;
    regisNumber: string;
    status: AcceptanceStatus;
    date: Date;
    birthPlace: string;
    birthDate: Date;
    address: string;
    province: string;
    city: string;
    postalCode: string;
    nik: string;
    fatherName: string;
    motherName: string;
    parentPhone: string;
    parentEmail: string;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const registrationData = {
        id: 1,
        name: 'John Doe',
        regisNumber: '123456789',
        status: 'diproses' as AcceptanceStatus,
        date: new Date(),
        birthPlace: 'Jakarta',
        birthDate: new Date('2000-01-01'),
        address: 'Jl. Raya No. 1',
        province: 'DKI Jakarta',
        city: 'Jakarta',
        postalCode: '12345',
        nik: '1234567890123456',
        fatherName: 'Bapak Doe',
        motherName: 'Ibu Doe',
        parentPhone: '08123456789',
        parentEmail: '@example.com',
    } as RegistrationData;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Card>
                <CardContent>
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
                                        <TableCell>{format(registrationData.date, 'dd-MM-yyyy')}</TableCell>
                                        <TableCell>{registrationData.regisNumber}</TableCell>
                                        <TableCell>{registrationData.name}</TableCell>
                                        <TableCell>
                                            <ChipStatus status={registrationData.status} />
                                        </TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="icon" className="border-blue-500" type="button">
                                                        <Eye className="text-blue-500" />
                                                        <span className="sr-only">Detail</span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-h-screen overflow-y-scroll xl:overflow-hidden">
                                                    <DialogHeader className="border-b pb-2">
                                                        <DialogTitle className="text-xl md:text-2xl">Data Registrasi</DialogTitle>
                                                    </DialogHeader>
                                                    {/* Revision alert */}
                                                    <Alert variant="warning">
                                                        <MessageSquareWarning />
                                                        <AlertTitle>Revisi!</AlertTitle>
                                                        <AlertDescription>
                                                            Silahkan lengkapi data dan dokumen yang diperlukan untuk proses pendaftaran.
                                                        </AlertDescription>
                                                    </Alert>

                                                    <Tabs defaultValue="data">
                                                        <TabsList className="grid w-full grid-cols-2">
                                                            <TabsTrigger value="data">Data calon santri</TabsTrigger>
                                                            <TabsTrigger value="document">Dokumen calon santri</TabsTrigger>
                                                        </TabsList>
                                                        <TabsContent value="data">
                                                            <div className="space-y-2">
                                                                <h3 className="text-lg font-medium md:text-xl">DATA PRIBADI</h3>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Nomor Pendaftaran</span>
                                                                    <span>: {registrationData.regisNumber}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Nama Lengkap</span>
                                                                    <span>: {registrationData.name}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Tempat Lahir</span>
                                                                    <span>: {registrationData.birthPlace}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Alamat Asal</span>
                                                                    <span>: {format(registrationData.birthDate, 'dd-MM-yyyy')}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Provinsi Asal</span>
                                                                    <span>: {registrationData.province}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Kab/Kota Asal</span>
                                                                    <span>: {registrationData.city}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Kode Pos Asal</span>
                                                                    <span>: {registrationData.postalCode}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">NIK</span>
                                                                    <span>: {registrationData.nik}</span>
                                                                </p>
                                                            </div>
                                                            <div className="mt-4 space-y-2">
                                                                <h3 className="text-lg font-medium md:text-xl">DATA ORANG TUA</h3>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Nama Ayah</span>
                                                                    <span>: {registrationData.fatherName}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Nama Ibu</span>
                                                                    <span>: {registrationData.motherName}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">No HP Orang Tua</span>
                                                                    <span>: {registrationData.parentPhone}</span>
                                                                </p>
                                                                <p className="grid grid-cols-2 gap-4">
                                                                    <span className="font-medium">Email</span>
                                                                    <span>: {registrationData.parentEmail}</span>
                                                                </p>
                                                            </div>
                                                        </TabsContent>
                                                        <TabsContent value="document">
                                                            <div className="space-y-2">
                                                                <DocumentItem label="Scan/Foto Kartu Keluarga" />
                                                                <DocumentItem label="Scan/Foto Akta Kelahiran" />
                                                                <DocumentItem label="Scan/Foto Ijazah/SKL" />
                                                                <DocumentItem label="Scan/Foto Foto Formal" />
                                                            </div>
                                                        </TabsContent>
                                                    </Tabs>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type="button" variant="outline">
                                                                Tutup
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
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
                </CardContent>
            </Card>
        </AppLayout>
    );
}

function ChipStatus({ status }: { status: AcceptanceStatus }) {
    if (status === 'diterima') {
        return (
            <Chip variant="success">
                <span>Lolos</span>
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
            <span>Tidak Lolos</span>
        </Chip>
    );
}
