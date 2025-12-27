import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ProjectTaskForm } from './partials/formProjectTask';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Project Task - Create', href: '/project-tasks/create' },
];

interface CreateProps {
    projectId: number;
}

export default function Create({ projectId }: CreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project Task" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Create Project Task
                    </h1>
                    <Separator className="my-4" />
                    <ProjectTaskForm
                        projectId={projectId}
                        submitUrl={`/projects/${projectId}/tasks`}
                        method="post"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
