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
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { Eye, MessageSquareWarning } from 'lucide-react';
import { toast } from 'sonner';

type AcceptanceStatus = 'Belum Lunas' | 'Menunggu' | 'Revisi' | 'Ditolak' | 'Selesai';

interface RegistrationData {
    id: number;
    name: string;
    program: string;
    regisNumber: string;
    status: AcceptanceStatus;
    comment: string;
    date: string;
    birthPlace: string;
    birthDate: string;
    address: string;
    province: string;
    city: string;
    postalCode: string;
    nik: string;
    fatherName: string;
    motherName: string;
    parentPhone: string;
    parentEmail: string;
    kk: string;
    akta: string;
    certificate: string;
    photo: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { registrationData } = usePage<{ registrationData: RegistrationData | null }>().props;

    console.log('registrationData:', registrationData);

    const handleDocClick = (url: string) => {
        if (!url) {
            toast.error('Dokumen tidak tersedia!');
            return;
        }
        window.open(url, '_blank');
    };

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
                                <TableHead>Nama</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Detail</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registrationData ? (
                                <TableRow>
                                    <TableCell>{format(new Date(registrationData.date), 'dd-MM-yyyy')}</TableCell>
                                    <TableCell>{registrationData.regisNumber}</TableCell>
                                    <TableCell>{registrationData.name}</TableCell>
                                    <TableCell>{registrationData.program}</TableCell>
                                    <TableCell>
                                        <ChipStatus status={registrationData.status} />
                                    </TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="icon" className="border-blue-500">
                                                    <Eye className="text-blue-500" />
                                                    <span className="sr-only">Detail</span>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-h-screen overflow-y-scroll xl:overflow-hidden">
                                                <DialogHeader className="border-b pb-2">
                                                    <DialogTitle className="text-xl md:text-2xl">Data Registrasi</DialogTitle>
                                                </DialogHeader>

                                                {/* ALERT KOMENTAR */}
                                                {registrationData.comment && (
                                                    <Alert variant="warning">
                                                        <MessageSquareWarning />
                                                        <AlertTitle>Status: {registrationData.status}</AlertTitle>
                                                        <AlertDescription>{registrationData.comment}</AlertDescription>
                                                    </Alert>
                                                )}

                                                <Tabs defaultValue="data">
                                                    <TabsList className="grid w-full grid-cols-2">
                                                        <TabsTrigger value="data">Data Calon Santri</TabsTrigger>
                                                        <TabsTrigger value="document">Dokumen</TabsTrigger>
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
                                                                <span className="font-medium">Tanggal Lahir</span>
                                                                <span>: {format(new Date(registrationData.birthDate), 'dd-MM-yyyy')}</span>
                                                            </p>
                                                            <p className="grid grid-cols-2 gap-4">
                                                                <span className="font-medium">Alamat Asal</span>
                                                                <span>: {registrationData.address}</span>
                                                            </p>
                                                            <p className="grid grid-cols-2 gap-4">
                                                                <span className="font-medium">Provinsi</span>
                                                                <span>: {registrationData.province}</span>
                                                            </p>
                                                            <p className="grid grid-cols-2 gap-4">
                                                                <span className="font-medium">Kab/Kota</span>
                                                                <span>: {registrationData.city}</span>
                                                            </p>
                                                            <p className="grid grid-cols-2 gap-4">
                                                                <span className="font-medium">Kode Pos</span>
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
                                                            <DocumentItem
                                                                label="Scan/Foto Kartu Keluarga"
                                                                onClick={() => handleDocClick(registrationData.kk)}
                                                            />
                                                            <DocumentItem
                                                                label="Scan/Foto Akta Kelahiran"
                                                                onClick={() => handleDocClick(registrationData.akta)}
                                                            />
                                                            <DocumentItem
                                                                label="Scan/Foto Ijazah/SKL"
                                                                onClick={() => handleDocClick(registrationData.certificate)}
                                                            />
                                                            <DocumentItem
                                                                label="Scan/Foto Foto Formal"
                                                                onClick={() => handleDocClick(registrationData.photo)}
                                                            />
                                                        </div>
                                                    </TabsContent>
                                                </Tabs>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Tutup</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Anda belum memiliki data pendaftaran.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

function ChipStatus({ status }: { status: AcceptanceStatus }) {
    const statusMap: { [key in AcceptanceStatus]: { text: string; variant: 'success' | 'warning' | 'info' | 'danger' } } = {
        Selesai: { text: 'Selesai', variant: 'success' },
        Menunggu: { text: 'Menunggu', variant: 'warning' },
        Revisi: { text: 'Revisi', variant: 'info' },
        Ditolak: { text: 'Ditolak', variant: 'danger' },
        'Belum Lunas': { text: 'Belum Lunas', variant: 'danger' },
    };

    const currStatus = statusMap[status];

    return <Chip variant={currStatus.variant}>{currStatus.text}</Chip>;
}
