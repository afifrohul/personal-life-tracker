import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { FaPlusCircle } from 'react-icons/fa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flowcash Category',
        href: '/flowcash-categories',
    },
];

type Flowcash = {
    id: number;
    name: string;
    icon: string;
};

interface FlowcashCategoryIndexProps {
    categories: Flowcash[];
}

export default function Index({ categories }: FlowcashCategoryIndexProps) {
    const columns: ColumnDef<Flowcash>[] = [
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

                return <IconComponent className="h-4 w-4" />;
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton
                        url={`/flowcash-categories/${row.original.id}/edit`}
                    />
                    <DeleteButton
                        url={`/flowcash-categories/${row.original.id}`}
                        confirmMessage="Are you sure to delete this category?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category Habit" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Flowcash>
                            showIndexColumn
                            columns={columns}
                            data={categories}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.get(
                                            '/flowcash-categories/create',
                                        )
                                    }
                                >
                                    <FaPlusCircle className="mr-2" /> Create New
                                    Flowcash Category
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
