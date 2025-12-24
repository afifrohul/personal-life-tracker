import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { HabitForm } from './partials/formHabit';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Habit - Create', href: '/habits/create' },
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
            <Head title="Create Habit" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
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
