import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ProjectForm } from './partials/formProject';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Project - Create', href: '/projects/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Create Project</h1>
                    <Separator className="my-4" />
                    <ProjectForm submitUrl="/projects" method="post" />
                </div>
            </div>
        </AppLayout>
    );
}
