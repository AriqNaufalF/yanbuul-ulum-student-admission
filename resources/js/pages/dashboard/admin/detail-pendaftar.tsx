import { Chip, ChipVariants } from '@/components/chip';
import DocumentItem from '@/components/Document-item';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

type UserData = {
    id: number;
    status: string;
    regisNum: string;
    registrationDate: Date;
    name: string;
    nik: string;
    gender: string;
    birthPlace: string;
    birthDate: Date;
    address: string;
    province: string;
    city: string;
    postalCode: string;
    schoolOrigin: string;
    graduationYear: number;
    program: string;
    email: string;
    fathersName: string;
    mothersName: string;
    fathersJob: string;
    mothersJob: string;
    phone: string;
};

type Status = 'lulus' | 'menunggu' | 'ditolak' | 'revisi';

const userData: UserData = {
    id: 1,
    regisNum: '123456789',
    registrationDate: new Date(),
    status: 'menunggu',
    name: 'John Doe',
    nik: '1234567890123456',
    gender: 'Laki-laki',
    birthPlace: 'New York',
    birthDate: new Date('1990-01-01'),
    address: '123 Main St, New York, NY 10001',
    province: 'New York',
    city: 'New York City',
    postalCode: '10001',
    program: 'MTS',
    email: 'test@mail.com',
    fathersName: 'John Doe Sr.',
    mothersName: 'Jane Doe',
    fathersJob: 'Engineer',
    mothersJob: 'Teacher',
    phone: '+1 (555) 987-6543',
    schoolOrigin: 'ABC High School',
    graduationYear: 2020,
};

export default function DetailPendaftar({ id }: { id: string }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manajemen Pendaftar',
            href: '/manajemen-pendaftar',
        },
        {
            title: 'Detail Pendaftar',
            href: `/manajemen-pendaftar/${id}`,
        },
    ];

    const { data, setData, processing, errors } = useForm({
        id: userData.id,
        comment: '',
    });

    const handleClick = (action: string) => {
        if (action === 'approve') {
            // Handle approve action
            console.log('Approve action');
            return;
        }

        if (action === 'revision') {
            // Handle revision action
            console.log('Revision action');
            return;
        }

        if (action === 'reject') {
            // Handle reject action
            console.log('Reject action');
            return;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Pendaftar" />
            <div className="@container">
                <div className="grid gap-6 @4xl:grid-cols-3">
                    <div className="@4xl:col-span-2">
                        {/* Student info list */}
                        <Card className="mb-6">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle>{userData.regisNum}</CardTitle>
                                    <CardDescription>Tanggal registrasi: {format(userData.registrationDate, 'dd-MM-yyyy')}</CardDescription>
                                </div>
                                <StatusChip status={userData.status as Status} />
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="student">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="student">Data calon santri</TabsTrigger>
                                        <TabsTrigger value="parent">Data orang tua santri</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="student">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <DataItem label="Nama Lengkap" value={userData.name} />
                                            <DataItem label="NIK" value={userData.nik} />
                                            <DataItem label="Tempat Lahir" value={userData.birthPlace} />
                                            <DataItem label="Tanggal Lahir" value={format(userData.birthDate, 'dd-MM-yyyy')} />
                                            <DataItem label="Sekolah Asal" value={userData.schoolOrigin} />
                                            <DataItem label="Tahun Lulus" value={userData.graduationYear.toString()} />
                                            <DataItem label="Jenis Kelamin" value={userData.gender} />
                                            <DataItem label="Alamat" value={userData.address} />
                                            <DataItem label="Provinsi" value={userData.province} />
                                            <DataItem label="Kota" value={userData.city} />
                                            <DataItem label="Kode Pos" value={userData.postalCode} />
                                            <DataItem label="Program" value={userData.program} />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="parent">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <DataItem label="Email" value={userData.email} />
                                            <DataItem label="Nomor Telepon" value={userData.phone} />
                                            <DataItem label="Nama Ayah" value={userData.fathersName} />
                                            <DataItem label="Pekerjaan Ayah" value={userData.fathersJob} />
                                            <DataItem label="Nama Ibu" value={userData.mothersName} />
                                            <DataItem label="Pekerjaan Ibu" value={userData.mothersJob} />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                        {/* Student document */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Berkas</CardTitle>
                                <CardDescription>Berkas pendukung calon santri baru</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <DocumentItem label="Scan/Foto Kartu Keluarga" />
                                    <DocumentItem label="Scan/Foto Akta Kelahiran" />
                                    <DocumentItem label="Scan/Foto Ijazah/SKL" />
                                    <DocumentItem label="Scan/Foto Foto Formal" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Action */}
                    <div>
                        <Card className="sticky top-2">
                            <CardHeader>
                                <CardTitle>Tindakan Verifikasi</CardTitle>
                                <CardDescription>Tinjau dan ambil tindakan terhadap permintaan verifikasi ini</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <FormItem>
                                            <Label htmlFor="comment">Catatan/umpan balik</Label>
                                            <Textarea
                                                placeholder="Tambahkan catatan atau umpan balik..."
                                                value={data.comment}
                                                onChange={(e) => setData('comment', e.target.value)}
                                                className="min-h-[120px] resize-y"
                                            />
                                        </FormItem>
                                    </div>
                                    {userData.status !== 'menunggu' && <ShowAlert status={userData.status} notes={data.comment} />}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button
                                    className="w-full"
                                    onClick={() => handleClick('approve')}
                                    disabled={userData.status !== 'menunggu' || processing}
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Setujui Verifikasi
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleClick('revision')}
                                    disabled={userData.status !== 'menunggu' || processing}
                                >
                                    <Clock className="mr-2 h-4 w-4" />
                                    Minta Revisi
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => handleClick('reject')}
                                    disabled={userData.status !== 'menunggu' || processing}
                                >
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    Tolak Verifikasi
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
    const statusCondition: { [key: string]: ChipVariants & { text: string } } = {
        lulus: {
            text: 'Lulus',
            variant: 'success',
        },
        menunggu: {
            text: 'Menunggu',
            variant: 'warning',
        },
        revisi: {
            text: 'Revisi',
            variant: 'info',
        },
        ditolak: {
            text: 'Di tolak',
            variant: 'danger',
        },
    };
    const currStatus = statusCondition[status];

    return <Chip variant={currStatus.variant}>{currStatus.text}</Chip>;
}

function ShowAlert({ status, notes }: { status: string; notes?: string }) {
    return (
        <Alert variant={status === 'lulus' ? 'default' : status === 'rejected' ? 'destructive' : 'warning'}>
            <div className="flex items-center gap-2">
                {status === 'lulus' && <CheckCircle className="h-4 w-4" />}
                {status === 'ditolak' && <AlertCircle className="h-4 w-4" />}
                {status === 'revisi' && <Clock className="h-4 w-4" />}
                <AlertTitle className="capitalize">{status}</AlertTitle>
            </div>
            <AlertDescription className="mt-2">
                {status === 'lulus' && 'Verifikasi ini telah disetujui.'}
                {status === 'ditolak' && 'Verifikasi ini telah ditolak.'}
                {status === 'revisi' && 'Revisi telah diminta.'}
                {notes && <p className="mt-2 text-sm">{notes}</p>}
            </AlertDescription>
        </Alert>
    );
}
