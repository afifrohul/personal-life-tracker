import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Category, Habit } from '@/types/data';
import { Head } from '@inertiajs/react';
import { HabitForm } from './partials/formHabit';

interface EditProps {
    categories: Category[];
    habit: Habit;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Habit - Edit', href: '/habits/edit' },
];

export default function Edit({ habit, categories }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Habit" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Habit</h1>
                    <Separator className="my-4" />
                    <HabitForm
                        initialData={habit}
                        submitUrl={`/habits/${habit.id}`}
                        method="put"
                        categories={categories}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
