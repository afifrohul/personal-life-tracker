import DataTable from '@/components/data-table-v9';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Pagination, Project } from '@/types/data';
import { router } from '@inertiajs/react';
import { tableFeatures, type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { FaCheckCircle, FaStopCircle } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';

interface TableProjectProps {
    paginationData: Pagination<Project>;
    filters: {
        search: string;
        status: string;
        perPage: number;
    };
}

const features = tableFeatures({});

export default function TableProject({
    paginationData,
    filters,
}: TableProjectProps) {
    const data = paginationData?.data;

    const [search, setSearch] = useState(filters.search);
    const debouncedSearch = useDebouncedCallback((value: string) => {
        applyFilter(perPage, status, value);
    }, 1000);
    const [status, setStatus] = useState(filters.status);
    const [perPage, setPerPage] = useState(String(filters.perPage));

    const applyFilter = (perPage: string, status: string, search: string) => {
        router.get(
            '/projects',
            {
                page: 1,
                perPage: Number(perPage),
                status: status,
                search: search,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const columns: ColumnDef<typeof features, Project>[] = [
        {
            id: 'number',
            header: '#',
            cell: ({ row }) =>
                paginationData.from !== null
                    ? paginationData.from + row.index
                    : '-',
        },
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
        <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
                <p className="font-medium">Project Data</p>
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search..."
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
                        onClick={() => router.get('/projects/create')}
                    >
                        Create New Project
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
                <Select
                    value={status}
                    onValueChange={(value) => {
                        setStatus(value);
                        applyFilter(perPage, value, search);
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
                    onClick={() => router.get('/projects')}
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
                />
            </div>
        </div>
    );
}
