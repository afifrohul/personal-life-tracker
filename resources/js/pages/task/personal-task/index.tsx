import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarDays, Eye } from 'lucide-react';
import { useState } from 'react';
import { FaCheckCircle, FaCircle, FaStopCircle } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal Task',
        href: '/personal-tasks',
    },
];

type PersonalTask = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: string;
    status: string;
};

interface IndexProps {
    personalTasks: PersonalTask[];
}

export default function Index({ personalTasks }: IndexProps) {
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<PersonalTask | null>(null);

    const columns: ColumnDef<PersonalTask>[] = [
        {
            accessorKey: 'title',
            header: 'Title',
            cell: ({ row }) =>
                row.original.title?.length > 30
                    ? row.original.title.substring(0, 30) + '...'
                    : row.original.title || '-',
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
            cell: ({ row }) =>
                row.original.priority === 'low' ? (
                    <SubtleBadge
                        color="teal"
                        label={row.original.priority}
                        icon={<FaCircle className="h-1.5 w-1.5" />}
                    />
                ) : row.original.priority === 'medium' ? (
                    <SubtleBadge
                        color="yellow"
                        label={row.original.priority}
                        icon={<FaCircle className="h-1.5 w-1.5" />}
                    />
                ) : (
                    <SubtleBadge
                        color="rose"
                        label={row.original.priority}
                        icon={<FaCircle className="h-1.5 w-1.5" />}
                    />
                ),
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
            accessorKey: 'due_date',
            header: 'Due Date',
            cell: ({ row }) => {
                if (row.original.due_date != null) {
                    return format(
                        new Date(row.original.due_date as string),
                        'dd MMMM yyyy',
                    );
                } else {
                    return '-';
                }
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSelectedTask(row.original);
                            setOpen(true);
                        }}
                    >
                        <Eye />
                    </Button>
                    <EditButton
                        url={`/personal-tasks/${row.original.id}/edit`}
                    />
                    <DeleteButton
                        url={`/personal-tasks/${row.original.id}`}
                        confirmMessage="Are you sure to delete this task?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personal Task" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<PersonalTask>
                            showIndexColumn
                            columns={columns}
                            data={personalTasks}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.get('/personal-tasks/create')
                                    }
                                >
                                    Create New Personal Task
                                </Button>
                            }
                        />
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="sm:min-w-2xl">
                            <DialogHeader>
                                <DialogTitle>{selectedTask?.title}</DialogTitle>
                                <DialogDescription>
                                    {selectedTask?.description ||
                                        'No description'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">Priority:</p>
                                    {selectedTask?.priority === 'low' ? (
                                        <SubtleBadge
                                            color="teal"
                                            label={
                                                selectedTask?.priority || '-'
                                            }
                                            icon={
                                                <FaCircle className="h-1.5 w-1.5" />
                                            }
                                        />
                                    ) : selectedTask?.priority === 'medium' ? (
                                        <SubtleBadge
                                            color="yellow"
                                            label={
                                                selectedTask?.priority || '-'
                                            }
                                            icon={
                                                <FaCircle className="h-1.5 w-1.5" />
                                            }
                                        />
                                    ) : (
                                        <SubtleBadge
                                            color="rose"
                                            label={
                                                selectedTask?.priority || '-'
                                            }
                                            icon={
                                                <FaCircle className="h-1.5 w-1.5" />
                                            }
                                        />
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">Status:</p>
                                    {selectedTask?.status === 'completed' ? (
                                        <SubtleBadge
                                            color="teal"
                                            label={'Completed'}
                                            icon={
                                                <FaCheckCircle className="h-2.5 w-2.5" />
                                            }
                                        />
                                    ) : selectedTask?.status ===
                                      'in_progress' ? (
                                        <SubtleBadge
                                            color="yellow"
                                            label={'In Progress'}
                                            icon={
                                                <FiLoader className="h-2.5 w-2.5" />
                                            }
                                        />
                                    ) : (
                                        <SubtleBadge
                                            color="rose"
                                            label={'Pending'}
                                            icon={
                                                <FaStopCircle className="h-2.5 w-2.5" />
                                            }
                                        />
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">Due Date:</p>
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="h-3.5 w-3.5"></CalendarDays>
                                        <p>
                                            {selectedTask?.due_date
                                                ? format(
                                                      new Date(
                                                          selectedTask.due_date,
                                                      ),
                                                      'dd MMMM yyyy',
                                                  )
                                                : '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    );
}
