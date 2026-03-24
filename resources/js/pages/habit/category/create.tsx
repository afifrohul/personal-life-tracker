import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CategoryForm } from './partials/formCategory';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Habit Category - Create', href: '/categories/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create Category</h1>
                    <Separator className="my-4" />
                    <CategoryForm submitUrl="/habit-categories" method="post" />
                </div>
            </div>
        </AppLayout>
    );
}
