import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <div className="flex min-h-svh max-w-full flex-1 flex-col bg-gray-50">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="p-2">{children}</div>
            </div>
        </AppShell>
    );
}
