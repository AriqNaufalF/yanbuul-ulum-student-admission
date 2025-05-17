import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bolt, CreditCard, FileCheck, FileInput, FileOutput, House, LayoutDashboard, UserRound, UserRoundPlus } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: '/dashboard',
        icon: House,
    },
    {
        title: 'Data Diri',
        href: '/data-calon-santri',
        icon: UserRound,
    },
    {
        title: 'Berkas',
        href: '/berkas',
        icon: FileInput,
    },
    {
        title: 'Pembayaran',
        href: '/pembayaran',
        icon: CreditCard,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Manajemen',
        href: '/manajemen-pendaftar',
        icon: UserRoundPlus,
    },
    {
        title: 'Verifikasi Berkas',
        href: '/verifikasi-berkas',
        icon: FileCheck,
    },
    {
        title: 'Rekapitulasi & Export',
        href: '/rekapitulasi',
        icon: FileOutput,
    },
    {
        title: 'Pengaturan Daftar',
        href: '/pengaturan-daftar',
        icon: Bolt,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user?.isAdmin;
    const navItems = isAdmin ? adminNavItems : mainNavItems;
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
