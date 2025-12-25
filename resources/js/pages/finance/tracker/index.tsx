import { ChartFinance } from '@/components/chart-finance';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finance Tracker',
        href: '/finance-tracker',
    },
];

interface IndexProps {
    chartData: [];
    uniqueYears: [];
}

export default function Index({ chartData, uniqueYears }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Finance Tracker" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <ChartFinance chartData={chartData} uniqueYears={uniqueYears}></ChartFinance>
                </div>
            </div>
        </AppLayout>
    );
}
