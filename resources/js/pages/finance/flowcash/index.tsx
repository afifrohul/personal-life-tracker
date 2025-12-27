import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/format-rupiah';
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { FaPlusCircle } from 'react-icons/fa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flowcash',
        href: '/flowcashes',
    },
];

type Category = {
    id: number;
    name: string;
    icon: string;
};

type Flowcash = {
    id: number;
    date: string;
    amount: number;
    description: string;
    type: string;
    flowcash_category: Category;
};

interface FlowcashIndexProps {
    flowcashes: Flowcash[];
}

export default function Index({ flowcashes }: FlowcashIndexProps) {
    const columns: ColumnDef<Flowcash>[] = [
        {
            accessorKey: 'description',
            header: 'Description',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: ({ row }) => {
                const iconName = row.original.flowcash_category.icon;
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
                        {row.original.flowcash_category.name}
                    </div>
                );
            },
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => (
                <div
                    className={`${row.original.type === 'income' ? 'bg-green-600' : 'bg-red-600'} w-fit rounded px-1 py-0.5`}
                >
                    <p className="text-white capitalize">{row.original.type}</p>
                </div>
            ),
        },
        {
            accessorKey: 'date',
            header: 'Date',
            cell: (info) =>
                format(new Date(info.getValue() as string), 'dd MMM yyyy'),
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: ({ row }) => (
                <p
                    className={`${row.original.type === 'income' ? 'text-green-600' : 'text-red-500'}`}
                >
                    {formatRupiah(row.original.amount)}
                </p>
            ),
        },

        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <EditButton url={`/flowcashes/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/flowcashes/${row.original.id}`}
                        confirmMessage="Are you sure to delete this habit?"
                    />
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Flowcash>
                            showIndexColumn
                            columns={columns}
                            data={flowcashes}
                            createButton={
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.get('/flowcashes/create')
                                    }
                                >
                                    <FaPlusCircle className="mr-2" /> Create New
                                    Flowcash
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
