import DataTable from '@/components/data-table-v9';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { lucideIcons } from '@/lib/lucide-icons';
import type { Category, Pagination } from '@/types/data';
import { router } from '@inertiajs/react';
import { tableFeatures, type ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface TableCategoryProps {
    paginationData: Pagination<Category>;
    filters: {
        search: string;
        perPage: number;
    };
}

const features = tableFeatures({});

export default function TableCategory({
    paginationData,
    filters,
}: TableCategoryProps) {
    const data = paginationData?.data;

    const [search, setSearch] = useState(filters.search);
    const debouncedSearch = useDebouncedCallback((value: string) => {
        applyFilter(perPage, value);
    }, 1000);
    const [perPage, setPerPage] = useState(String(filters.perPage));

    const applyFilter = (perPage: string, search: string) => {
        router.get(
            '/habit-categories',
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

    const columns: ColumnDef<typeof features, Category>[] = [
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
            header: 'Category Name',
            cell: (info) => info.getValue(),
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
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton
                        url={`/habit-categories/${row.original.id}/edit`}
                    />
                    <DeleteButton
                        url={`/habit-categories/${row.original.id}`}
                        confirmMessage="Are you sure to delete this category?"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
                <p className="font-medium">Habit Category Data</p>
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
                        onClick={() => router.get('/habit-categories/create')}
                    >
                        Create New Habit Category
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
