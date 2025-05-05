import { Chip } from '@/components/chip';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormTitle } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaymentStatus } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pembayaran',
        href: '/pembayaran',
    },
];

interface PaymentInfo {
    id: number;
    regisNumber: string;
    detail: string;
    status: PaymentStatus;
    dueDate: Date;
    total: number;
}

export default function Pembayaran() {
    const paymentInfo = {
        id: 1,
        regisNumber: '123456789',
        detail: 'Biaya Pendaftaran',
        status: 'belum lunas' as PaymentStatus,
        dueDate: new Date(),
        total: 1000000,
    } as PaymentInfo;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pembayaran" />
            <Card>
                <CardContent>
                    <FormTitle className="mb-4">Pembayaran</FormTitle>
                    <hr />
                    <Table className="mt-4 border">
                        <TableHeader className="bg-slate-100">
                            <TableRow>
                                <TableHead>ID Pendaftaran</TableHead>
                                <TableHead>Detail</TableHead>
                                <TableHead>Tanggal Jatuh Tempo</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                {paymentInfo?.id ? (
                                    <>
                                        <TableCell>{paymentInfo.regisNumber}</TableCell>
                                        <TableCell>{paymentInfo.detail}</TableCell>
                                        <TableCell>{format(paymentInfo.dueDate, 'PPPP', { locale: id })}</TableCell>
                                        <TableCell>
                                            {paymentInfo.total.toLocaleString('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {paymentInfo.status === 'lunas' ? (
                                                <Chip variant="success">
                                                    <span>Sudah Lunas</span>
                                                </Chip>
                                            ) : (
                                                <Chip variant="danger">
                                                    <span>Belum Lunas</span>
                                                </Chip>
                                            )}
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
                    <div className="flex justify-end">
                        <Button className="mt-4" asChild>
                            <Link href="/pembayaran/bayar">Bayar Sekarang</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
