import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PersonalTaksForm } from './partials/formPersonalTask';

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
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Edit Personal Task
                    </h1>
                    <Separator className="my-4" />
                    <PersonalTaksForm
                        initialData={personalTask}
                        submitUrl={`/personal-tasks/${personalTask.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
