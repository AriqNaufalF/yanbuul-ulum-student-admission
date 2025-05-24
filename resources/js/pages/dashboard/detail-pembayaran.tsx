import { Chip } from '@/components/chip';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { LoaderCircle } from 'lucide-react';

export default function DetailPembayaran() {
    type PaymentInfo = {
        id: number;
        regisNumber: string;
        detail: string;
        status: 'lunas' | 'belum lunas';
        dueDate: string;
        subTotal: number;
        tax: number;
        total: number;
        paymentDetails: { desc: string; amount: number }[];
        method: string;
    };

    const { paymentInfo } = usePage<{ paymentInfo: PaymentInfo | null }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pembayaran', href: '/pembayaran' },
        { title: 'Detail Pembayaran', href: '/pembayaran/detail' },
    ];

    if (!paymentInfo) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Detail Pembayaran" />
                <div className="p-4">Anda belum memiliki detail pembayaran.</div>
            </AppLayout>
        );
    }

    const { data, setData, processing } = useForm<{ method: string }>({
        method: paymentInfo.method || '',
    });

    const paymentMethods = [
        { value: 'BRI', label: 'BRI' },
        { value: 'BCA', label: 'BCA' },
        { value: 'BNI', label: 'BNI' },
        { value: 'Mandiri', label: 'Mandiri' },
        { value: 'BCA Virtual Account', label: 'BCA Virtual Account' },
        { value: 'BRI Virtual Account', label: 'BRI Virtual Account' },
    ];

    const bayar = (e: React.FormEvent) => {
        e.preventDefault();
        router.patch(`/pembayaran/${paymentInfo.id}/pay`, { method: data.method });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Pembayaran" />
            <div className="flex flex-col gap-8 p-4 lg:flex-row">
                <Card className="md:flex-1">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-medium md:text-xl">ID #{paymentInfo.regisNumber}</h2>
                            {paymentInfo.status === 'lunas' ? (
                                <Chip variant="success">
                                    <span>Lunas</span>
                                </Chip>
                            ) : (
                                <Chip variant="danger">
                                    <span>Belum Lunas</span>
                                </Chip>
                            )}
                            <div className="ml-auto">
                                <h3 className="text-sm text-gray-700">Tanggal Jatuh Tempo</h3>
                                <p className="text-sm font-semibold">{format(new Date(paymentInfo.dueDate), 'PPPP', { locale: id })}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Dibayarkan kepada:</h3>
                            <p>Yayasan Pondok Pesantren Yanbu'ul Ulum</p>
                            <p>NPWP : 72.599.599.5-311.012</p>
                            <p>Jl. Setia Pahlawan RT. 003 RW.004 Kel. Simpang Belutu Kabupaten Siak Provinsi Riau</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <h3 className="mt-4 font-semibold text-gray-700">Rincian Pembayaran</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-gray-700">Deskripsi</TableHead>
                                    <TableHead className="text-right text-gray-700">Jumlah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paymentInfo.paymentDetails.map(({ desc, amount }, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{desc}</TableCell>
                                        <TableCell className="text-right">
                                            {amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell className="font-medium">Sub Total</TableCell>
                                    <TableCell className="text-right">
                                        {paymentInfo.subTotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">11.00% PPN</TableCell>
                                    <TableCell className="text-right">
                                        {paymentInfo.tax.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow className="bg-gray-100">
                                    <TableCell className="font-medium">Total</TableCell>
                                    <TableCell className="text-right font-medium">
                                        {paymentInfo.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </CardContent>
                </Card>
                <Card className="text-primary-foreground h-min bg-[#256A52]">
                    <CardHeader>
                        <h3>Total Pembayaran</h3>
                        <p>{paymentInfo.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                        <hr />
                    </CardHeader>
                    {paymentInfo.status !== 'lunas' && (
                        <CardContent>
                            <h3>Metode Pembayaran</h3>
                            <form onSubmit={bayar}>
                                <Select onValueChange={(val) => setData('method', val)} defaultValue={paymentInfo.method}>
                                    <SelectTrigger className="w-full data-[placeholder]:text-gray-200">
                                        <SelectValue className="text-primary-foreground" placeholder="Pilih metode pembayaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentMethods.map((method) => (
                                            <SelectItem key={method.value} value={method.value}>
                                                {method.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button type="submit" className="text-primary mt-4 w-full bg-yellow-400 hover:bg-yellow-500" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Bayar
                                </Button>
                            </form>
                        </CardContent>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
