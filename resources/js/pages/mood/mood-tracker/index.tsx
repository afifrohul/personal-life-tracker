import { ChartMood } from '@/components/chart-mood';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit Tracker',
        href: '/habit-tracker',
    },
];

interface IndexProps {
    chartData: [];
}

export default function Index({ chartData }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habit Tracker" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <ChartMood chartData={chartData}></ChartMood>
                </div>
            </div>
        </AppLayout>
    );
}
