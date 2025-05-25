import { Chip, ChipVariants } from '@/components/chip';
import { ColumnFilter, ColumnSorter, DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pendaftar',
        href: '/manajemen-pendaftar',
    },
];

type Status = 'Belum Lunas' | 'Menunggu' | 'Revisi' | 'Ditolak' | 'Selesai';

interface Pendaftar {
    id: number;
    regisNum: string;
    name: string;
    date: string;
    status: Status;
    program: string;
}

export default function ManajemenPendaftar() {
    const { pendaftar } = usePage<{ pendaftar: Pendaftar[] }>().props;

    const columns: ColumnDef<Pendaftar>[] = [
        {
            accessorKey: 'regisNum',
            header: 'No Pendaftaran',
        },
        {
            accessorKey: 'name',
            header: 'Nama',
        },
        {
            accessorKey: 'program',
            header: 'Program',
            cell: ({ row }) => row.getValue('program') || '-',
        },
        {
            accessorKey: 'date',
            header: ({ column }) => <ColumnSorter column={column} title="Tanggal Daftar" />,
            cell: ({ row }) => {
                const dateStr = row.getValue('date') as string;
                return dateStr ? format(new Date(dateStr), 'dd-MM-yyyy') : '-';
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <ColumnFilter column={column} title="Status" valueFormat={(value) => value as string} />,
            cell: ({ row }) => {
                const status = row.getValue('status') as Status;

                const statusMap: Record<Status, ChipVariants & { text: string }> = {
                    'Belum Lunas': { text: 'Belum Lunas', variant: 'danger' },
                    Menunggu: { text: 'Menunggu', variant: 'warning' },
                    Revisi: { text: 'Revisi', variant: 'info' },
                    Ditolak: { text: 'Ditolak', variant: 'danger' },
                    Selesai: { text: 'Selesai', variant: 'success' },
                };

                const statusData = statusMap[status] ?? { text: 'Tidak Diketahui', variant: 'danger' };
                return <Chip variant={statusData.variant}>{statusData.text}</Chip>;
            },
        },
        {
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <Button variant="link">
                        <Link href={`/manajemen-pendaftar/${data.id}`}>Detail</Link>
                    </Button>
                );
            },
        },
    ];

    const handleExport = () => {
        const table = document.querySelector('table');
        if (!table) {
            alert('Tabel tidak ditemukan!');
            return;
        }

        const rows = table.querySelectorAll('tbody tr');
        if (!rows.length) {
            alert('Tidak ada data yang ditampilkan!');
            return;
        }

        let csv = 'No Pendaftaran,Nama,Program,Tanggal Daftar,Status\n';
        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const rowData = Array.from(cells).map((cell) => (cell.textContent || '').trim().replace(/,/g, ''));
            csv += rowData.join(',') + '\n';
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'rekapitulasi.csv');
        link.click();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Pendaftar" />
            <div className="flex justify-end p-4">
                <Button variant="outline" onClick={handleExport} className="bg-green-500 text-white hover:bg-green-600">
                    Export CSV
                </Button>
            </div>
            <Card>
                <CardContent>
                    <DataTable columns={columns} data={pendaftar} />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
