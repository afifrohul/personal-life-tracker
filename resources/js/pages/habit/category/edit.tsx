import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CategoryForm, CategoryFormValues } from './partials/formCategory';

interface EditProps {
    category: CategoryFormValues & { id: number; name: string; icon: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Habit Category - Edit', href: '/categories/edit' },
];

export default function Edit({ category }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Category</h1>
                    <Separator className="my-4" />
                    <CategoryForm
                        initialData={category}
                        submitUrl={`/habit-categories/${category.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
