import DataTable from '@/components/data-table-v9';
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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Pagination, Project, ProjectTask } from '@/types/data';
import { router } from '@inertiajs/react';
import { tableFeatures, type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarDays, Eye, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { FaCheckCircle, FaCircle, FaStopCircle } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';

interface TableProjectTaskProps {
    project: Project;
    paginationData: Pagination<ProjectTask>;
    filters: {
        search: string;
        status: string;
        priority: string;
        perPage: number;
    };
}

const features = tableFeatures({});

export default function TableProjectTask({
    project,
    paginationData,
    filters,
}: TableProjectTaskProps) {
    const data = paginationData?.data;

    const [search, setSearch] = useState(filters.search);
    const debouncedSearch = useDebouncedCallback((value: string) => {
        applyFilter(perPage, status, priority, value);
    }, 1000);
    const [status, setStatus] = useState(filters.status);
    const [priority, setPriority] = useState(filters.priority);
    const [perPage, setPerPage] = useState(String(filters.perPage));

    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);

    const applyFilter = (
        perPage: string,
        status: string,
        priority: string,
        search: string,
    ) => {
        router.get(
            `/projects/${project.id}/show`,
            {
                page: 1,
                perPage: Number(perPage),
                status: status,
                priority: priority,
                search: search,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const columns: ColumnDef<typeof features, ProjectTask>[] = [
        {
            id: 'number',
            header: '#',
            cell: ({ row }) =>
                paginationData.from !== null
                    ? paginationData.from + row.index
                    : '-',
        },
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
        <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
                <p className="font-medium">Project Task Data</p>
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search by title..."
                        className="w-64"
                        onChange={(e) => {
                            const value = e.target.value;

                            setSearch(value);
                            debouncedSearch(value);
                        }}
                        value={search}
                    />
                    <Button
                        size="sm"
                        onClick={() =>
                            router.get(`/projects/${project.id}/tasks/create`)
                        }
                    >
                        Create New Project Task
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
                <Select
                    value={priority}
                    onValueChange={(value) => {
                        setPriority(value);
                        applyFilter(perPage, status, value, search);
                    }}
                >
                    <SelectTrigger
                        className="hidden w-full rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="all" className="rounded-lg">
                            All Priority
                        </SelectItem>
                        <SelectItem value="low" className="rounded-lg">
                            Low
                        </SelectItem>
                        <SelectItem value="medium" className="rounded-lg">
                            Medium
                        </SelectItem>
                        <SelectItem value="high" className="rounded-lg">
                            High
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    value={status}
                    onValueChange={(value) => {
                        setStatus(value);
                        applyFilter(perPage, value, priority, search);
                    }}
                >
                    <SelectTrigger
                        className="hidden w-full rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="all" className="rounded-lg">
                            All Status
                        </SelectItem>
                        <SelectItem value="pending" className="rounded-lg">
                            Pending
                        </SelectItem>
                        <SelectItem value="in_progress" className="rounded-lg">
                            In Progress
                        </SelectItem>
                        <SelectItem value="completed" className="rounded-lg">
                            Completed
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant="secondary"
                    onClick={() => router.get(`/projects/${project.id}/show`)}
                >
                    <RotateCcw />
                </Button>
            </div>
            <div className="mx-auto flex w-full flex-col gap-4">
                <DataTable
                    options={{
                        features,
                        columns,
                        data,
                    }}
                    pagination={paginationData}
                    onPaginationChange={{
                        page: (url: string) => router.get(url),
                        perPage: (value: number) =>
                            applyFilter(
                                String(value),
                                priority,
                                status,
                                search,
                            ),
                    }}
                />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:min-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{selectedTask?.title}</DialogTitle>
                        <DialogDescription>
                            {selectedTask?.description || 'No description'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <p className="font-medium">Priority:</p>
                            {selectedTask?.priority === 'low' ? (
                                <SubtleBadge
                                    color="teal"
                                    label={selectedTask?.priority || '-'}
                                    icon={<FaCircle className="h-1.5 w-1.5" />}
                                />
                            ) : selectedTask?.priority === 'medium' ? (
                                <SubtleBadge
                                    color="yellow"
                                    label={selectedTask?.priority || '-'}
                                    icon={<FaCircle className="h-1.5 w-1.5" />}
                                />
                            ) : (
                                <SubtleBadge
                                    color="rose"
                                    label={selectedTask?.priority || '-'}
                                    icon={<FaCircle className="h-1.5 w-1.5" />}
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
                            ) : selectedTask?.status === 'in_progress' ? (
                                <SubtleBadge
                                    color="yellow"
                                    label={'In Progress'}
                                    icon={<FiLoader className="h-2.5 w-2.5" />}
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
                                              new Date(selectedTask.due_date),
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
    );
}
