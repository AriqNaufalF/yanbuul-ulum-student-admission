import { Chip, ChipVariants } from '@/components/chip';
import { ColumnFilter, ColumnSorter, DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pendaftar',
        href: '/manajemen-pendaftar',
    },
];

type Status = 'lulus' | 'menunggu' | 'ditolak' | 'revisi';

type Pendaftar = {
    id: number;
    regisNum: string;
    name: string;
    date: Date;
    status: Status;
};

const pendaftar: Pendaftar[] = [
    {
        id: 1,
        regisNum: '123',
        name: 'John Doe',
        date: new Date(),
        status: 'lulus',
    },
    {
        id: 2,
        regisNum: '1234',

        name: 'Jane Doe',
        date: new Date(),
        status: 'menunggu',
    },
    {
        id: 3,
        regisNum: '12345',
        name: 'John Smith',
        date: new Date(),
        status: 'ditolak',
    },
    {
        id: 4,
        regisNum: '123456',
        name: 'Jane Smith',
        date: new Date(),
        status: 'revisi',
    },
];

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
        accessorKey: 'date',
        header: ({ column }) => <ColumnSorter column={column} title="Tanggal Daftar" />,
        cell: ({ row }) => {
            const date = row.getValue('date') as Date;
            return format(date, 'dd-MM-yyyy');
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <ColumnFilter
                column={column}
                title="Status"
                valueFormat={(value) => {
                    const status = value as Status;
                    const statusCondition = {
                        lulus: 'Lulus',
                        menunggu: 'Di proses',
                        revisi: 'Revisi',
                        ditolak: 'Di tolak',
                    };

                    return statusCondition[status];
                }}
            />
        ),
        cell: ({ row }) => {
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
            const status = statusCondition[row.getValue('status') as Status];

            return <Chip variant={status.variant}>{status.text}</Chip>;
        },
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Button variant="link">
                    <Link href={`/manajemen-pendaftar/${data.regisNum}`}>Detail</Link>
                </Button>
            );
        },
    },
];

export default function ManajemenPendaftar() {
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
