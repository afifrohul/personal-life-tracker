import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Pagination, Project } from '@/types/data';
import { Head } from '@inertiajs/react';
import TableProject from './partials/tableProject';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project',
        href: '/projects',
    },
];

interface IndexProps {
    projects: Pagination<Project>;
    filters: {
        search: string;
        status: string;
        perPage: number;
    };
}

export default function Index({ projects, filters }: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TableProject paginationData={projects} filters={filters} />
            </div>
        </AppLayout>
    );
}
