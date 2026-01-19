import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/format-rupiah';
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
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
    categories: Category[];
}

export default function Index({ flowcashes, categories }: FlowcashIndexProps) {
    const [category, setCategory] = useState('0');
    const [type, setType] = useState('all');

    const applyFilter = (category: string, type: string) => {
        router.get(
            '/flowcashes',
            {
                category: Number(category),
                type: type,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

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
            cell: ({ row }) =>
                row.original.type === 'income' ? (
                    <SubtleBadge
                        color="teal"
                        label={row.original.type}
                        icon={<ArrowDownLeft className="h-2.5 w-2.5" />}
                    />
                ) : (
                    <SubtleBadge
                        color="rose"
                        label={row.original.type}
                        icon={<ArrowUpRight className="h-2.5 w-2.5" />}
                    />
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
                    className={`font-medium ${row.original.type === 'income' ? 'text-teal-500' : 'text-rose-500'}`}
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
                <div className="flex items-center gap-4">
                    <Select
                        value={category}
                        onValueChange={(value) => {
                            setCategory(value);
                            applyFilter(value, type);
                        }}
                    >
                        <SelectTrigger
                            className="hidden w-full rounded-lg sm:ml-auto sm:flex"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem
                                value={String(0)}
                                className="rounded-lg"
                            >
                                All Categories
                            </SelectItem>
                            {categories?.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={String(item.id)}
                                    className="rounded-lg"
                                >
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={type}
                        onValueChange={(value) => {
                            setType(value);
                            applyFilter(category, value);
                        }}
                    >
                        <SelectTrigger
                            className="hidden w-full rounded-lg sm:ml-auto sm:flex"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="all" className="rounded-lg">
                                All Types
                            </SelectItem>
                            <SelectItem value="income" className="rounded-lg">
                                Income
                            </SelectItem>
                            <SelectItem value="expense" className="rounded-lg">
                                Expense
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

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
