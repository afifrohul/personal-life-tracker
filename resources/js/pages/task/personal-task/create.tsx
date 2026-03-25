import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PersonalTaskForm } from './partials/formPersonalTask';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Personal Task - Create', href: '/personal-tasks/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Personal Task" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Create Personal Task
                    </h1>
                    <Separator className="my-4" />
                    <PersonalTaskForm
                        submitUrl="/personal-tasks"
                        method="post"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
