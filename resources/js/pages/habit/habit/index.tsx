import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Habit, Pagination } from '@/types/data';
import { Head } from '@inertiajs/react';
import TableHabit from './partials/tableHabit';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit',
        href: '/habits',
    },
];

interface HabitIndexProps {
    habits: Pagination<Habit>;
    filters: {
        search: string;
        perPage: number;
    };
}

export default function Index({ habits, filters }: HabitIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TableHabit paginationData={habits} filters={filters} />
            </div>
        </AppLayout>
    );
}
