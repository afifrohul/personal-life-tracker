import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Category, Pagination } from '@/types/data';
import { Head } from '@inertiajs/react';
import TableCategory from './partials/tableCategory';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit Category',
        href: '/habit-categories',
    },
];

interface CategoryIndexProps {
    habitCategories: Pagination<Category>;
    filters: {
        search: string;
        perPage: number;
    };
}

export default function Index({
    habitCategories,
    filters,
}: CategoryIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TableCategory
                    paginationData={habitCategories}
                    filters={filters}
                />
            </div>
        </AppLayout>
    );
}
