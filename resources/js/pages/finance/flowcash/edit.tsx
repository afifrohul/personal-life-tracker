import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FlowcashForm, FlowcashFormValues } from './partials/formFlowcash';

type Category = {
    id: number;
    name: string;
    icon: string;
};

interface EditProps {
    categories: Category[];
    flowcash: FlowcashFormValues & {
        id: number;
        category_id: number;
        name: string;
        color: string;
        exp: number;
        icon: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Flowcash - Edit', href: '/flowcashes/edit' },
];

export default function Edit({ flowcash, categories }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Flowcash" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
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
