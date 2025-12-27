import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarDays, ChevronLeft } from 'lucide-react';
import {
    FaCheckCircle,
    FaCircle,
    FaPlusCircle,
    FaStopCircle,
} from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project Detail',
        href: '/projects/show',
    },
];

type ProjectTask = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: string;
    status: string;
};

type Project = {
    id: number;
    name: string;
    description: string;
    status: string;
    created_at: string;
    project_task: ProjectTask[];
};

interface ShowProps {
    project: Project;
}

export default function Show({ project }: ShowProps) {
    const columns: ColumnDef<ProjectTask>[] = [
        {
            accessorKey: 'title',
            header: 'Title',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) =>
                row.original.description?.length > 30
                    ? row.original.description.substring(0, 30) + '...'
                    : row.original.description || '-',
        },
        {
            accessorKey: 'priority',
            header: 'Priority',
            cell: ({ row }) => {
                const color =
                    row.original.priority === 'high'
                        ? 'text-red-500'
                        : row.original.priority === 'medium'
                          ? 'text-yellow-500'
                          : 'text-green-500';
                return (
                    <div className="flex w-fit items-center gap-1 rounded border px-2 py-1 text-xs">
                        <FaCircle className={`h-2 ${color}`} />
                        {row.original.priority?.charAt(0).toUpperCase() +
                            row.original.priority?.slice(1)}
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <div className="w-fit rounded border px-2 py-1">
                    {row.original.status === 'completed' ? (
                        <div className="flex items-center gap-1 text-xs">
                            <FaCheckCircle className="h-4 text-green-600" />{' '}
                            Completed
                        </div>
                    ) : row.original.status === 'in_progress' ? (
                        <div className="flex items-center gap-1 text-xs">
                            <FiLoader className="h-4 text-yellow-600" /> In Progress
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 text-xs">
                            <FaStopCircle className="h-4 text-rose-600" />{' '}
                            Pending
                        </div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'due_date',
            header: 'Due Date',
            cell: (info) =>
                format(new Date(info.getValue() as string), 'dd MMM yyyy'),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton
                        url={`/projects/${project.id}/tasks/${row.original.id}/edit`}
                    />
                    <DeleteButton
                        url={`/projects/${project.id}/tasks/${row.original.id}`}
                        confirmMessage="Are you sure to delete this task?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${project.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.get(`/projects`)}
                                >
                                    <ChevronLeft></ChevronLeft>
                                </Button>
                            </div>
                            <h1 className="text-xl font-semibold">
                                {project.name}
                            </h1>
                        </div>
                        <Separator></Separator>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-2">
                                <p className="font-medium">Description</p>
                                <p className="text-sm">
                                    {project.description ||
                                        'No description provided.'}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium">Status</p>
                                <div className="w-fit rounded border px-1 py-0.5">
                                    {project.status === 'completed' ? (
                                        <div className="flex items-center gap-1 text-xs">
                                            <FaCheckCircle className="h-4 text-green-600" />{' '}
                                            Completed
                                        </div>
                                    ) : project.status === 'in_progress' ? (
                                        <div className="flex items-center gap-1 text-xs">
                                            <FiLoader className="h-4 text-yellow-600" /> In
                                            Progress
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-xs">
                                            <FaStopCircle className="h-4 text-rose-600" />{' '}
                                            Pending
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="font-medium">Created At</p>
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4"></CalendarDays>
                                    <p className="text-sm">
                                        {format(
                                            new Date(
                                                project.created_at as string,
                                            ),
                                            'dd MMM yyyy',
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <p className="font-semibold">Project Tasks</p>
                        </div>
                        <Separator></Separator>
                        <div className="mx-auto flex w-full flex-col gap-4">
                            <DataTable<ProjectTask>
                                showIndexColumn
                                columns={columns}
                                data={project.project_task}
                                createButton={
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            router.get(
                                                `/projects/${project.id}/tasks/create`,
                                            )
                                        }
                                    >
                                        <FaPlusCircle className="mr-2" /> Create
                                        New Project Task
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
