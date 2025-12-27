import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ProjectForm } from './partials/formProject';

interface EditProps {
    project: {
        id: number;
        name: string;
        description: string;
        status: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Project - Edit', href: '/projects/edit' },
];

export default function Edit({ project }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Project" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Project</h1>
                    <Separator className="my-4" />
                    <ProjectForm
                        initialData={project}
                        submitUrl={`/projects/${project.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
