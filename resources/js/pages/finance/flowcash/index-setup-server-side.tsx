import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
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
import type { Flowcash, FlowcashCategory } from '@/types/data';
import { Head, router } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight, CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flowcash',
        href: '/flowcashes',
    },
];

interface FlowcashIndexProps {
    allFlowcashes: {
        data: Flowcash[];
        current_page: number;
        last_page: number;
        first_page_url: string;
        next_page_url: null | string;
        prev_page_url: null | string;
        last_page_url: string;
        links: [];
        per_page: number;
        path: string;
        from: number;
        to: number;
        total: number;
    };
    categories: FlowcashCategory[];
    totalIncome: number;
    totalExpense: number;
}

export default function Index({
    allFlowcashes,
    categories,
    totalIncome,
    totalExpense,
}: FlowcashIndexProps) {
    const [category, setCategory] = useState('0');
    const [type, setType] = useState('all');
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });

    const applyFilter = (
        category: string,
        type: string,
        dateRange: DateRange | undefined,
    ) => {
        router.get(
            '/flowcashes',
            {
                category: Number(category),
                type: type,
                from: dateRange?.from
                    ? format(dateRange.from, 'yyyy-MM-dd')
                    : undefined,
                to: dateRange?.to
                    ? format(dateRange.to, 'yyyy-MM-dd')
                    : undefined,
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
                const iconName = row.original.flowcash_category?.icon;
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
                        {row.original.flowcash_category?.name}
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
                format(new Date(info.getValue() as string), 'dd MMMM yyyy'),
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

    console.log(allFlowcashes);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="date"
                                className="w-full justify-between font-normal"
                            >
                                {dateRange?.from && dateRange?.to
                                    ? `${format(dateRange.from, 'dd MMMM yyyy')} - ${format(dateRange.to, 'dd MMMM yyyy')}`
                                    : 'Select date range'}
                                <CalendarDays />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                        >
                            <Calendar
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={(value) => {
                                    setDateRange(value);
                                    applyFilter(category, type, value);
                                }}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                    <Select
                        value={category}
                        onValueChange={(value) => {
                            setCategory(value);
                            applyFilter(value, type, dateRange);
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
                            applyFilter(category, value, dateRange);
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
                        <div className="w-full space-y-4">
                            <div className="overflow-x-auto rounded-md border">
                                <table className="w-full text-xs">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="px-4 py-2 text-left">
                                                #
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Description
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Category
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Type
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Date
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Amount
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allFlowcashes.data.length > 0 ? (
                                            allFlowcashes.data.map(
                                                (item, index) => (
                                                    <tr
                                                        className="border-b"
                                                        key={index}
                                                    >
                                                        <td className="px-4 py-2">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {item.description}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {(() => {
                                                                const iconName = item.flowcash_category?.icon;
                                                                const IconComponent = iconName ? (lucideIcons as Record<string,any>)[iconName] : undefined;

                                                                if ( !IconComponent ) {
                                                                    return (
                                                                        <div className="text-sm text-red-500">
                                                                            Invalid icon
                                                                        </div>
                                                                    );
                                                                }

                                                                return (
                                                                    <div className="flex gap-2">
                                                                        <IconComponent className="h-4 w-4" />
                                                                        { item.flowcash_category?.name }
                                                                    </div>
                                                                );
                                                            })()}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {item.type ===
                                                            'income' ? (
                                                                <SubtleBadge
                                                                    color="teal"
                                                                    label={
                                                                        item.type
                                                                    }
                                                                    icon={
                                                                        <ArrowDownLeft className="h-2.5 w-2.5" />
                                                                    }
                                                                />
                                                            ) : (
                                                                <SubtleBadge
                                                                    color="rose"
                                                                    label={
                                                                        item.type
                                                                    }
                                                                    icon={
                                                                        <ArrowUpRight className="h-2.5 w-2.5" />
                                                                    }
                                                                />
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {format(
                                                                new Date(
                                                                    item.date as string,
                                                                ),
                                                                'dd MMMM yyyy',
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <p
                                                                className={`font-medium ${item.type === 'income' ? 'text-teal-500' : 'text-rose-500'}`}
                                                            >
                                                                {formatRupiah(
                                                                    item.amount,
                                                                )}
                                                            </p>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <div className="flex justify-start gap-2">
                                                                <EditButton
                                                                    url={`/flowcashes/${item.id}/edit`}
                                                                />
                                                                <DeleteButton
                                                                    url={`/flowcashes/${item.id}`}
                                                                    confirmMessage="Are you sure to delete this habit?"
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={7}
                                                    className="py-4 text-center"
                                                >
                                                    No data found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-xs">
                                    Showing {allFlowcashes.from} to{' '}
                                    {allFlowcashes.to} from{' '}
                                    {allFlowcashes.total} data
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs">Rows per page</p>
                                        <Select
                                            value={String(
                                                allFlowcashes.per_page,
                                            )}
                                        >
                                            <SelectTrigger className="w-18">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[10, 25, 50, 100].map(
                                                    (num) => (
                                                        <SelectItem
                                                            key={num}
                                                            value={String(num)}
                                                        >
                                                            {num}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center justify-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={
                                                allFlowcashes.current_page == 1
                                            }
                                            onClick={() =>
                                                router.get(
                                                    allFlowcashes.first_page_url,
                                                )
                                            }
                                        >
                                            <MdKeyboardDoubleArrowLeft />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={
                                                allFlowcashes.current_page == 1
                                            }
                                            onClick={() =>
                                                router.get(
                                                    allFlowcashes.prev_page_url!,
                                                )
                                            }
                                        >
                                            <MdKeyboardArrowLeft />
                                        </Button>
                                        <span className="text-xs">
                                            {allFlowcashes.current_page} /{' '}
                                            {allFlowcashes.last_page}
                                        </span>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={
                                                allFlowcashes.current_page ==
                                                allFlowcashes.last_page
                                            }
                                            onClick={() =>
                                                router.get(
                                                    allFlowcashes.next_page_url!,
                                                )
                                            }
                                        >
                                            <MdKeyboardArrowRight />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={
                                                allFlowcashes.current_page ==
                                                allFlowcashes.last_page
                                            }
                                            onClick={() =>
                                                router.get(
                                                    allFlowcashes.last_page_url,
                                                )
                                            }
                                        >
                                            <MdKeyboardDoubleArrowRight />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
