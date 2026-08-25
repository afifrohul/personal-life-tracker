import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { FlowcashCategory } from '@/types/data';
import { Head } from '@inertiajs/react';
import { FlowcashCategoryForm } from './partials/formFlowcashCategory';

interface EditProps {
    category: FlowcashCategory;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Flowcash Category - Edit', href: '/categories/edit' },
];

export default function Edit({ category }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Flowcash Category" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Edit Flowcash Category
                    </h1>
                    <Separator className="my-4" />
                    <FlowcashCategoryForm
                        initialData={category}
                        submitUrl={`/flowcash-categories/${category.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
