import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FlowcashCategoryForm, FlowcashCategoryFormValues } from './partials/formFlowcashCategory';

interface EditProps {
    category: FlowcashCategoryFormValues & { id: number; name: string; icon: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Flowcash Category - Edit', href: '/categories/edit' },
];

export default function Edit({ category }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Flowcash Category" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Flowcash Category</h1>
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
