import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Monthly',
        href: '/monthly-summary',
    },
];

interface SummaryProps {}

export default function Monthly({}: SummaryProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Summary" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex items-center gap-4"></div>
            </div>
        </AppLayout>
    );
}
