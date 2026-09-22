import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Pagination, Project, ProjectTask } from '@/types/data';
import { Head } from '@inertiajs/react';
import TableProjectTask from './project-task/partials/tableProjectTask';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project Detail',
        href: '/projects/show',
    },
];

interface ShowProps {
    project: Project;
    projectTasks: Pagination<ProjectTask>;
    filters: {
        search: string;
        status: string;
        priority: string;
        perPage: number;
    };
}

export default function Show({ project, projectTasks, filters }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TableProjectTask
                    project={project}
                    paginationData={projectTasks}
                    filters={filters}
                />
            </div>
        </AppLayout>
    );
}
