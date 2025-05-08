import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const barChartData = [
    { month: 'Januari', applicants: 186 },
    { month: 'Februari', applicants: 305 },
    { month: 'Maret', applicants: 237 },
    { month: 'April', applicants: 73 },
    { month: 'Mei', applicants: 209 },
    { month: 'Juni', applicants: 214 },
];

const barChartConfig = {
    applicants: {
        label: 'Pendaftar',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

const pieChartData = [
    { status: 'lulus', applicants: 275, fill: 'var(--color-lulus)' },
    { status: 'diProses', applicants: 200, fill: 'var(--color-diProses)' },
    { status: 'tidakLulus', applicants: 187, fill: 'var(--color-tidakLulus)' },
];
const pieChartConfig = {
    applicants: {
        label: 'Pendaftar',
    },
    lulus: {
        label: 'Lulus',
        color: 'hsl(var(--chart-5))',
    },
    diProses: {
        label: 'Diproses',
        color: 'hsl(var(--chart-3))',
    },
    tidakLulus: {
        label: 'Tidak Lulus',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

export default function AdminDashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="@container space-y-8">
                {/* Quick Info */}
                <div className="grid grid-cols-1 justify-items-center gap-2 @3xl:grid-cols-2 @5xl:grid-cols-4">
                    <Card className="w-full items-center justify-center @5xl:max-w-72">
                        <CardContent>
                            <h2 className="mb-1 text-gray-700">Total Pendaftar</h2>
                            <p className="text-xl font-medium">1234</p>
                        </CardContent>
                    </Card>
                    <Card className="w-full items-center justify-center @5xl:max-w-72">
                        <CardContent>
                            <h2 className="mb-1 text-gray-700">Status Pendaftaran</h2>
                            <div className="flex gap-4 md:gap-6">
                                <div>
                                    <p>
                                        <span className="text-green-600">1234</span>
                                        <br />
                                        <span className="text-sm">Lulus</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-amber-600">1234</span>
                                        <br />
                                        <span className="text-sm">Diproses</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-red-600">1234</span>
                                        <br />
                                        <span className="text-sm">Tidak lulus</span>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full items-center justify-center @5xl:max-w-72">
                        <CardContent>
                            <h2 className="mb-1 text-gray-700">Status Pembayaran</h2>
                            <div className="flex gap-4 md:gap-6">
                                <div>
                                    <p>
                                        <span className="text-green-600">1234</span>
                                        <br />
                                        <span className="text-sm">Valid</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-amber-600">1234</span>
                                        <br />
                                        <span className="text-sm">Menunggu</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="text-red-600">1234</span>
                                        <br />
                                        <span className="text-sm">Tidak Valid</span>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full items-center justify-center @5xl:max-w-72">
                        <CardContent>
                            <h2 className="mb-1 text-gray-700">Berkas Terverifikasi</h2>
                            <p className="text-xl font-medium">1234</p>
                        </CardContent>
                    </Card>
                </div>
                {/* Chart */}
                <div className="grid grid-cols-1 gap-2 @4xl:grid-cols-2">
                    <Card className="justify-center">
                        <CardHeader>
                            <CardTitle className="text-center">Trend Pendaftaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={barChartConfig} className="mx-auto max-h-[320px]">
                                <BarChart accessibilityLayer data={barChartData}>
                                    <CartesianGrid vertical={false} />
                                    <YAxis dataKey="applicants" tickLine={false} tickMargin={10} axisLine={false} />
                                    <XAxis dataKey="month" tickLine={false} tickMargin={10} tickFormatter={(value) => value.slice(0, 3)} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="applicants" fill="var(--color-applicants)" radius={8} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-center">
                        <CardHeader className="items-center pb-0">
                            <CardTitle className="text-center">Status Pendaftaran</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[320px]">
                                <PieChart>
                                    <Pie data={pieChartData} dataKey="applicants" nameKey="status" />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <ChartLegend
                                        content={<ChartLegendContent nameKey="status" />}
                                        className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
                                    />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Aktivitas Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div className="flex items-center justify-between border-b px-6 py-2 hover:bg-gray-50" key={index}>
                                <div>
                                    <p className="font-medium">Aktivitas {index + 1}</p>
                                    <p className="text-sm text-gray-700">15 menit yang lalu</p>
                                </div>
                                <Button variant="link" asChild>
                                    <Link href="/dashboard">Lihat Detail</Link>
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
