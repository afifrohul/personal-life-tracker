import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Pagination, PersonalTask } from '@/types/data';
import { Head } from '@inertiajs/react';
import TablePersonalTask from './partials/tablePersonalTask';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal Task',
        href: '/personal-tasks',
    },
];

interface IndexProps {
    personalTasks: Pagination<PersonalTask>;
    filters: {
        search: string;
        status: string;
        priority: string;
        perPage: number;
    };
}

export default function Index({ personalTasks, filters }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TablePersonalTask paginationData={personalTasks} filters={filters} /> 
            </div>
        </AppLayout>
    );
}
