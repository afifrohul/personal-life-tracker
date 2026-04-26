import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
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
    name: string;
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
            cell: ({ row }) =>
                row.original.name?.length > 30
                    ? row.original.name.substring(0, 30) + '...'
                    : row.original.name || '-',
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
            cell: ({ row }) =>
                row.original.status === 'completed' ? (
                    <SubtleBadge
                        color="teal"
                        label={'Completed'}
                        icon={<FaCheckCircle className="h-2.5 w-2.5" />}
                    />
                ) : row.original.status === 'in_progress' ? (
                    <SubtleBadge
                        color="yellow"
                        label={'In Progress'}
                        icon={<FiLoader className="h-2.5 w-2.5" />}
                    />
                ) : (
                    <SubtleBadge
                        color="rose"
                        label={'Pending'}
                        icon={<FaStopCircle className="h-2.5 w-2.5" />}
                    />
                ),
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            cell: (info) =>
                format(new Date(info.getValue() as string), 'dd MMMM yyyy'),
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
                        <Eye />
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
