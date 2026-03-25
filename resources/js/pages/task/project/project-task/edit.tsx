import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ProjectTaskForm } from './partials/formProjectTask';

interface EditProps {
    projectId: number;
    projectTask: {
        id: number;
        title: string;
        description: string;
        due_date: string;
        priority: string;
        status: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Project Task - Edit', href: '/project-tasks/edit' },
];

export default function Edit({ projectId, projectTask }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Project Task" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Edit Project Task
                    </h1>
                    <Separator className="my-4" />
                    <ProjectTaskForm
                        projectId={projectId}
                        initialData={projectTask}
                        submitUrl={`/projects/${projectId}/tasks/${projectTask.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
