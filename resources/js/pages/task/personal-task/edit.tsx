import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PersonalTaskForm } from './partials/formPersonalTask';

interface EditProps {
    personalTask: {
        id: number;
        title: string;
        description: string;
        due_date: string;
        priority: string;
        status: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Personal Task - Edit', href: '/personal-tasks/edit' },
];

export default function Edit({ personalTask }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Personal Task" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Edit Personal Task
                    </h1>
                    <Separator className="my-4" />
                    <PersonalTaskForm
                        initialData={personalTask}
                        submitUrl={`/personal-tasks/${personalTask.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
