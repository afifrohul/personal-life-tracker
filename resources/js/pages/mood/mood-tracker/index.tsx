import CalendarMood from '@/components/calendar-mood';
import { ChartMood } from '@/components/chart-mood';
import { ChartMoodByScore } from '@/components/chart-mood-by-score';
import { Calendar } from '@/components/ui/calendar';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mood Tracker',
        href: '/mood-tracker',
    },
];

interface IndexProps {
    chartData: [];
    moodDistribution: [];
    uniqueYears: [];
}

export default function Index({
    chartData,
    moodDistribution,
    uniqueYears,
}: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mood Tracker" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <ChartMood chartData={chartData}></ChartMood>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ChartMoodByScore
                        moodDistribution={moodDistribution}
                        uniqueYears={uniqueYears}
                    ></ChartMoodByScore>
                    <div>
                        <CalendarMood chartData={chartData} uniqueYears={uniqueYears}></CalendarMood>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
