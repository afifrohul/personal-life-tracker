import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Category } from '@/types/data';
import { Head } from '@inertiajs/react';
import { HabitForm } from './partials/formHabit';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Habit - Create', href: '/habits/create' },
];

interface CreateProps {
    categories: Category[];
}

export default function Create({ categories }: CreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Habit" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create Habit</h1>
                    <Separator className="my-4" />
                    <HabitForm
                        submitUrl="/habits"
                        method="post"
                        categories={categories}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
