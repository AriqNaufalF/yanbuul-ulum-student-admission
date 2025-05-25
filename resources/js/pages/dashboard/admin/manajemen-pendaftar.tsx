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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Pendaftar" />
            <Card>
                <CardContent>
                    <DataTable columns={columns} data={pendaftar} />
                </CardContent>
            </Card>
        </AppLayout>
    );
}
