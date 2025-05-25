import { Chip, ChipVariants } from '@/components/chip';
import DocumentItem from '@/components/Document-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

type Status = 'Selesai' | 'Menunggu' | 'Revisi' | 'Ditolak' | 'Belum Lunas';

interface PendaftarData {
    id: number;
    regisNum: string;
    registrationDate: string;
    status: Status;
    name: string;
    nik: string;
    gender: string;
    birthPlace: string;
    birthDate: string;
    address: string;
    province: string;
    city: string;
    postalCode: string;
    schoolOrigin: string;
    graduationYear: string;
    program: string;
    email: string;
    fathersName: string;
    mothersName: string;
    fathersJob: string;
    mothersJob: string;
    phone: string;
    kk: string;
    akta: string;
    certificate: string;
    photo: string;
}

export default function DetailPendaftar({ id }: { id: string }) {
    const { pendaftar, auth } = usePage<{ pendaftar: PendaftarData; auth: SharedData['auth'] }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Manajemen Pendaftar', href: '/manajemen-pendaftar' },
        { title: 'Detail Pendaftar', href: `/manajemen-pendaftar/${id}` },
    ];

    const { data, setData, processing } = useForm({
        id: pendaftar.id,
        adminId: auth.user.id,
        status: '',
        comment: '',
    });

    const handleClick = (action: string) => {
        const statusMap: { [key: string]: string } = {
            approve: 'selesai',
            revision: 'revisi',
            reject: 'ditolak',
        };
        const status = statusMap[action];

        router.patch(
            `/manajemen-pendaftar/${pendaftar.id}`,
            { status, comment: data.comment },
            {
                onSuccess: () => toast.success('Status berhasil diperbarui!'),
                onError: () => toast.error('Gagal memperbarui status!'),
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Pendaftar" />
            <div className="@container">
                <div className="grid gap-6 @4xl:grid-cols-3">
                    <div className="@4xl:col-span-2">
                        {/* Data pendaftar */}
                        <Card className="mb-6">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle>{pendaftar.regisNum}</CardTitle>
                                    <CardDescription>
                                        Tanggal registrasi: {format(new Date(pendaftar.registrationDate), 'dd-MM-yyyy')}
                                    </CardDescription>
                                </div>
                                <StatusChip status={pendaftar.status} />
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="student">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="student">Data Calon Santri</TabsTrigger>
                                        <TabsTrigger value="parent">Data Orang Tua</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="student">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <DataItem label="Nama Lengkap" value={pendaftar.name} />
                                            <DataItem label="NIK" value={pendaftar.nik} />
                                            <DataItem label="Tempat Lahir" value={pendaftar.birthPlace} />
                                            <DataItem label="Tanggal Lahir" value={format(new Date(pendaftar.birthDate), 'dd-MM-yyyy')} />
                                            <DataItem label="Sekolah Asal" value={pendaftar.schoolOrigin} />
                                            <DataItem label="Tahun Lulus" value={pendaftar.graduationYear.toString()} />
                                            <DataItem label="Jenis Kelamin" value={pendaftar.gender} />
                                            <DataItem label="Alamat" value={pendaftar.address} />
                                            <DataItem label="Provinsi" value={pendaftar.province} />
                                            <DataItem label="Kota" value={pendaftar.city} />
                                            <DataItem label="Kode Pos" value={pendaftar.postalCode} />
                                            <DataItem label="Program" value={pendaftar.program} />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="parent">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <DataItem label="Email" value={pendaftar.email} />
                                            <DataItem label="Nomor Telepon" value={pendaftar.phone} />
                                            <DataItem label="Nama Ayah" value={pendaftar.fathersName} />
                                            <DataItem label="Pekerjaan Ayah" value={pendaftar.fathersJob} />
                                            <DataItem label="Nama Ibu" value={pendaftar.mothersName} />
                                            <DataItem label="Pekerjaan Ibu" value={pendaftar.mothersJob} />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Dokumen */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Berkas</CardTitle>
                                <CardDescription>Berkas pendukung calon santri</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <DocumentItem label="Scan/Foto Kartu Keluarga" url={pendaftar.kk} />
                                    <DocumentItem label="Scan/Foto Akta Kelahiran" url={pendaftar.akta} />
                                    <DocumentItem label="Scan/Foto Ijazah/SKL" url={pendaftar.certificate} />
                                    <DocumentItem label="Scan/Foto Foto Formal" url={pendaftar.photo} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tindakan Verifikasi */}
                    <div>
                        <Card className="sticky top-2">
                            <CardHeader>
                                <CardTitle>Tindakan Verifikasi</CardTitle>
                                <CardDescription>Tambahkan catatan & update status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormItem>
                                    <Label htmlFor="comment">Catatan/Umpan Balik</Label>
                                    <Textarea
                                        placeholder="Tambahkan catatan atau umpan balik..."
                                        value={data.comment}
                                        onChange={(e) => setData('comment', e.target.value)}
                                        className="min-h-[120px] resize-y"
                                    />
                                </FormItem>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button
                                    className="w-full"
                                    onClick={() => handleClick('approve')}
                                    disabled={pendaftar.status !== 'Menunggu' || processing}
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" /> Setujui Verifikasi
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleClick('revision')}
                                    disabled={pendaftar.status !== 'Menunggu' || processing}
                                >
                                    <Clock className="mr-2 h-4 w-4" /> Minta Revisi
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => handleClick('reject')}
                                    disabled={pendaftar.status !== 'Menunggu' || processing}
                                >
                                    <AlertCircle className="mr-2 h-4 w-4" /> Tolak Verifikasi
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function DataItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-muted-foreground text-sm">{value}</p>
        </div>
    );
}

function StatusChip({ status }: { status: Status }) {
    const statusCondition: { [key in Status]: ChipVariants & { text: string } } = {
        Selesai: { text: 'Selesai', variant: 'success' },
        Menunggu: { text: 'Menunggu', variant: 'warning' },
        Revisi: { text: 'Revisi', variant: 'info' },
        Ditolak: { text: 'Ditolak', variant: 'danger' },
        'Belum Lunas': { text: 'Belum Lunas', variant: 'danger' },
    };
    const currStatus = statusCondition[status];

    return <Chip variant={currStatus.variant}>{currStatus.text}</Chip>;
}
