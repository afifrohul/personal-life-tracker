import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FlowcashForm } from './partials/formFlowcash';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Flowcash - Create', href: '/flowcashes/create' },
];

type Category = {
    id: number;
    name: string;
    icon: string;
};

interface CreateProps {
    categories: Category[];
}

export default function Create({ categories }: CreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create Flowcash</h1>
                    <Separator className="my-4" />
                    <FlowcashForm
                        submitUrl="/flowcashes"
                        method="post"
                        categories={categories}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
