import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FlowcashCategoryForm } from './partials/formFlowcashCategory';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flowcash Category - Create',
        href: '/flowcash-categories/create',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Create Flowcash Category
                    </h1>
                    <Separator className="my-4" />
                    <FlowcashCategoryForm
                        submitUrl="/flowcash-categories"
                        method="post"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
