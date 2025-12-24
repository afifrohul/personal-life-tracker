import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { HabitForm, HabitFormValues } from './partials/formHabit';

type Category = {
    id: number;
    name: string;
    icon: string;
};

interface EditProps {
    categories: Category[];
    habit: HabitFormValues & {
        id: number;
        category_id: number;
        name: string;
        color: string;
        exp: number;
        icon: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Habit - Edit', href: '/habits/edit' },
];

export default function Edit({ habit, categories }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Habit" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
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
