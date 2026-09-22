import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { FlowcashCategory, Pagination } from '@/types/data';
import { Head } from '@inertiajs/react';
import TableFlowcashCategory from './partials/tableFlowcashCategory';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flowcash Category',
        href: '/flowcash-categories',
    },
];

interface FlowcashCategoryIndexProps {
    flowcashCategories: Pagination<FlowcashCategory>;
    filters: {
        search: string;
        perPage: number;
    };
}

export default function Index({
    flowcashCategories,
    filters,
}: FlowcashCategoryIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TableFlowcashCategory
                    paginationData={flowcashCategories}
                    filters={filters}
                />
            </div>
        </AppLayout>
    );
}
