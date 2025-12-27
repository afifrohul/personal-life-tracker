import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { FaCheckCircle, FaPlusCircle, FaStopCircle } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project',
        href: '/projects',
    },
];

type Project = {
    id: number;
    title: string;
    description: string;
    status: string;
};

interface IndexProps {
    projects: Project[];
}

export default function Index({ projects }: IndexProps) {
    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
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
                            <FiLoader className="h-4" /> In Progress
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 text-xs">
                            <FaStopCircle className="h-4 text-yellow-500" />{' '}
                            Pending
                        </div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            cell: (info) =>
                format(new Date(info.getValue() as string), 'dd MMM yyyy'),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            router.get(`/projects/${row.original.id}/show`)
                        }
                    >
                        View
                    </Button>
                    <EditButton url={`/projects/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/projects/${row.original.id}`}
                        confirmMessage="Are you sure to delete this habit?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Project>
                            showIndexColumn
                            columns={columns}
                            data={projects}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.get('/projects/create')
                                    }
                                >
                                    <FaPlusCircle className="mr-2" /> Create New
                                    Project
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
