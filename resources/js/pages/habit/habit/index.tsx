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
        title: 'Habit',
        href: '/habits',
    },
];

type Category = {
    id: number;
    user_id: number;
    name: string;
    icon: string;
};

type Habit = {
    id: number;
    name: string;
    color: string;
    exp: number;
    icon: string;
    habit_category: Category;
};

interface HabitIndexProps {
    habits: Habit[];
}

export default function Index({ habits }: HabitIndexProps) {
    const columns: ColumnDef<Habit>[] = [
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
            accessorKey: 'category',
            header: 'Category',
            cell: ({ row }) => {
                const iconName = row.original.habit_category.icon;
                const IconComponent = (lucideIcons as Record<string, any>)[
                    iconName
                ];

                if (!IconComponent) {
                    return (
                        <div className="text-sm text-red-500">Invalid icon</div>
                    );
                }

                return (
                    <div className="flex gap-2">
                        <IconComponent className="h-4 w-4" />
                        {row.original.habit_category.name}
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habit" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Habit>
                            showIndexColumn
                            columns={columns}
                            data={habits}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() => router.get('/habits/create')}
                                >
                                    <FaPlusCircle className="mr-2" /> Create New
                                    Habit
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
