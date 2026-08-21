import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FlowcashForm } from './partials/formFlowcash';

type Category = {
    id: number;
    name: string;
    icon: string;
};

interface EditProps {
    categories: Category[];
    flowcash: {
        id: number;
        description: string;
        date: string;
        type: string;
        amount: number;
        flowcash_category_id: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Flowcash - Edit', href: '/flowcashes/edit' },
];

export default function Edit({ flowcash, categories }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Flowcash</h1>
                    <Separator className="my-4" />
                    <FlowcashForm
                        initialData={flowcash}
                        submitUrl={`/flowcashes/${flowcash.id}`}
                        method="put"
                        categories={categories}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
