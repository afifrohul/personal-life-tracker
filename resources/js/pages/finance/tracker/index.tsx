import { ChartExpense } from '@/components/chart-expense';
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
    chartDataFinance: [];
    chartDataExpense: [];
    uniqueYears: [];
}

export default function Index({
    chartDataFinance,
    chartDataExpense,
    uniqueYears,
}: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Finance Tracker" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <ChartFinance
                        chartData={chartDataFinance}
                        uniqueYears={uniqueYears}
                    ></ChartFinance>
                </div>
                <div>
                    <ChartExpense
                        chartData={chartDataExpense}
                        uniqueYears={uniqueYears}
                    ></ChartExpense>
                </div>
            </div>
        </AppLayout>
    );
}
