import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import type { Habit } from '@/types/data';
import { Head, router } from '@inertiajs/react';
import type { type ColumnDef } from '@tanstack/react-table';
import { FaCircle } from 'react-icons/fa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit',
        href: '/habits',
    },
];

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
                                    Create New Habit
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
