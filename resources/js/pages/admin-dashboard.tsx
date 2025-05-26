import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Month } from 'date-fns';
import { id } from 'date-fns/locale';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';

interface DashboardProps {
    totalPendaftar: number;
    statusCounts: {
        menunggu: number;
        revisi: number;
        ditolak: number;
        selesai: number;
    };
    pembayaranCounts: {
        lunas: number;
        belum_lunas: number;
    };
    pendaftarPerBulan: {
        month: number;
        count: number;
    }[];
}

const breadcrumbs = [{ title: 'Dashboard', href: '/dashboard' }];

export default function AdminDashboard() {
    const {
        totalPendaftar = 0,
        statusCounts = { menunggu: 0, revisi: 0, ditolak: 0, selesai: 0 },
        pembayaranCounts = { lunas: 0, belum_lunas: 0 },
        pendaftarPerBulan = [],
    } = usePage<{
        totalPendaftar: number;
        statusCounts: DashboardProps['statusCounts'];
        pembayaranCounts: DashboardProps['pembayaranCounts'];
        pendaftarPerBulan: DashboardProps['pendaftarPerBulan'];
    }>().props;

    const barChartData = pendaftarPerBulan.map((item) => ({
        month: id.localize.month((item.month - 1) as Month, { width: 'abbreviated' }),
        applicants: item.count,
    }));

    const pieChartData = [
        { status: 'Menunggu', applicants: statusCounts.menunggu, fill: '#f59e0b' },
        { status: 'Revisi', applicants: statusCounts.revisi, fill: '#3b82f6' },
        { status: 'Ditolak', applicants: statusCounts.ditolak, fill: '#ef4444' },
        { status: 'Selesai', applicants: statusCounts.selesai, fill: '#10b981' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="@container space-y-8">
                {/* Quick Info */}
                <div className="grid grid-cols-1 justify-items-center gap-2 @2xl:grid-cols-2 @4xl:grid-cols-3">
                    <Card className="w-full justify-center @4xl:max-w-80">
                        <CardContent>
                            <h2 className="mb-1 text-gray-700">Total Pendaftar</h2>
                            <p className="text-xl font-medium">{totalPendaftar}</p>
                        </CardContent>
                    </Card>
                    <Card className="w-full justify-center @4xl:max-w-80">
                        <CardContent>
                            <h2 className="mb-1 text-gray-700">Status Pendaftaran</h2>
                            <div className="flex gap-4 md:gap-6">
                                <div>
                                    <p>
                                        <span className="text-amber-600">{statusCounts.menunggu}</span>
                                        <br />
                                        <span className="text-sm">Menunggu</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-blue-600">{statusCounts.revisi}</span>
                                        <br />
                                        <span className="text-sm">Revisi</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-red-600">{statusCounts.ditolak}</span>
                                        <br />
                                        <span className="text-sm">Ditolak</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-green-600">{statusCounts.selesai}</span>
                                        <br />
                                        <span className="text-sm">Selesai</span>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full justify-center @4xl:max-w-80">
                        <CardContent>
                            <h2 className="mb-1 text-gray-700">Status Pembayaran</h2>
                            <div className="flex gap-4 md:gap-6">
                                <div>
                                    <p>
                                        <span className="text-green-600">{pembayaranCounts.lunas}</span>
                                        <br />
                                        <span className="text-sm">Lunas</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-red-600">{pembayaranCounts.belum_lunas}</span>
                                        <br />
                                        <span className="text-sm">Belum Lunas</span>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Chart */}
                <div className="grid grid-cols-1 gap-2 @4xl:grid-cols-2">
                    <Card className="flex justify-center">
                        <CardHeader>
                            <CardTitle className="text-center">Trend Pendaftaran</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            {barChartData.length === 0 ? (
                                <p className="text-gray-500">Belum ada data pendaftaran</p>
                            ) : (
                                <BarChart width={400} height={300} data={barChartData}>
                                    <CartesianGrid vertical={false} />
                                    <YAxis dataKey="applicants" tickLine={false} tickMargin={10} axisLine={false} />
                                    <XAxis dataKey="month" tickLine={false} tickMargin={10} />
                                    <Tooltip />
                                    <Bar dataKey="applicants" fill="#3b82f6" radius={8} />
                                </BarChart>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-center">
                        <CardHeader className="items-center pb-0">
                            <CardTitle className="text-center">Status Pendaftaran</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-1 justify-center pb-0">
                            {pieChartData.reduce((acc, current) => acc + current.applicants, 0) === 0 ? (
                                <p className="text-gray-500">Belum ada data pendaftaran</p>
                            ) : (
                                <PieChart width={400} height={300}>
                                    <Pie data={pieChartData} dataKey="applicants" nameKey="status" cx="50%" cy="50%" outerRadius={100} />
                                    <Tooltip />
                                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                                </PieChart>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
