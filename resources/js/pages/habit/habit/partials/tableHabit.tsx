import DataTable from '@/components/data-table-v9';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { lucideIcons } from '@/lib/lucide-icons';
import type { Habit, Pagination } from '@/types/data';
import { router } from '@inertiajs/react';
import { tableFeatures, type ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { useDebouncedCallback } from 'use-debounce';

interface TableHabitProps {
    paginationData: Pagination<Habit>;
    filters: {
        search: string;
        perPage: number;
    };
}

const features = tableFeatures({});

export default function TableHabit({
    paginationData,
    filters,
}: TableHabitProps) {
    const data = paginationData?.data;

    const [search, setSearch] = useState(filters.search);
    const debouncedSearch = useDebouncedCallback((value: string) => {
        applyFilter(perPage, value);
    }, 1000);
    const [perPage, setPerPage] = useState(String(filters.perPage));

    const applyFilter = (perPage: string, search: string) => {
        router.get(
            '/habit',
            {
                page: 1,
                perPage: Number(perPage),
                search: search,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const columns: ColumnDef<typeof features, Habit>[] = [
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
            header: 'Habit Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'color',
            header: 'Color',
            cell: ({ row }) => {
                return (
                    <div
                        className={`h-4 w-10 rounded`}
                        style={{ backgroundColor: row.original.color }}
                    ></div>
                );
            },
        },
        {
            accessorKey: 'difficulty',
            header: 'Difficulty',
            cell: ({ row }) =>
                row.original.difficulty === 'easy' ? (
                    <SubtleBadge
                        color="teal"
                        label={row.original.difficulty}
                        icon={<FaCircle className="h-1.5 w-1.5" />}
                    />
                ) : row.original.difficulty === 'medium' ? (
                    <SubtleBadge
                        color="yellow"
                        label={row.original.difficulty}
                        icon={<FaCircle className="h-1.5 w-1.5" />}
                    />
                ) : (
                    <SubtleBadge
                        color="rose"
                        label={row.original.difficulty}
                        icon={<FaCircle className="h-1.5 w-1.5" />}
                    />
                ),
        },
        {
            accessorKey: 'icon',
            header: 'Icon',
            cell: ({ row }) => {
                const iconName = row.original.icon;
                const IconComponent = (lucideIcons as Record<string, any>)[
                    iconName
                ];

                if (!IconComponent) {
                    return (
                        <div className="text-sm text-red-500">Invalid icon</div>
                    );
                }

                return (
                    <div className="flex items-center gap-1">
                        <IconComponent className="h-4 w-4" />
                        <p>{row.original.icon}</p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: ({ row }) => {
                const iconName = row.original.habit_category?.icon;
                const IconComponent = iconName
                    ? (lucideIcons as Record<string, any>)[iconName]
                    : undefined;

                if (!IconComponent) {
                    return (
                        <div className="text-sm text-red-500">Invalid icon</div>
                    );
                }

                return (
                    <div className="flex gap-2">
                        <IconComponent className="h-4 w-4" />
                        {row.original.habit_category?.name}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton url={`/habits/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/habits/${row.original.id}`}
                        confirmMessage="Are you sure to delete this habit?"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
                <p className="font-medium">Habit Data</p>
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
                        onClick={() =>
                            router.get('/habits/create')
                        }
                    >
                        Create New Habit
                    </Button>
                </div>
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
                            applyFilter(String(value), search),
                    }}
                />
            </div>
        </div>
    );
}
