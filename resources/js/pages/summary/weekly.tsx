import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    eachWeekOfInterval,
    getDate,
    getMonth,
    getYear,
    lastDayOfMonth,
} from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Weekly',
        href: '/weekly-summary',
    },
];

interface SummaryProps {}

export default function Weekly({}: SummaryProps) {
    const dateNow = new Date();
    const year = getYear(dateNow);
    const month = getMonth(dateNow);

    const lastDay = getDate(lastDayOfMonth(new Date(year, month, 1)));
    const result = eachWeekOfInterval({
        start: new Date(year, month, 1),
        end: new Date(year, month, lastDay),
    });

    console.log(result);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Summary" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex items-center gap-4"></div>
            </div>
        </AppLayout>
    );
}
