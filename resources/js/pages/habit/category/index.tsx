import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit Category',
        href: '/habit-categories',
    },
];

type Category = {
    id: number;
    name: string;
    icon: string;
};

interface CategoryIndexProps {
    categories: Category[];
}

export default function Index({ categories }: CategoryIndexProps) {
    const columns: ColumnDef<Category>[] = [
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habit Category" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Category>
                            showIndexColumn
                            columns={columns}
                            data={categories}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.get('/habit-categories/create')
                                    }
                                >
                                    Create New Habit Category
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
