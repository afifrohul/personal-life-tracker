import DataTable from '@/components/data-table';
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
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/format-rupiah';
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
    ArrowDownLeft,
    ArrowUpRight,
    CalendarDays,
    CircleDollarSign,
} from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
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
    allFlowcashes: Flowcash[];
    categories: Category[];
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
                        <DataTable<Flowcash>
                            showIndexColumn
                            columns={columns}
                            data={allFlowcashes}
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
                    <Separator className="my-4" />
                    <div className="mt-4 rounded-md border bg-muted/30 p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Summary</p>

                            <p className="text-xs text-indigo-500 italic">
                                *Totals are based on the filtered flowcashes except search feature
                            </p>
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-4">
                            <div className="rounded-md border p-3">
                                <div className="flex items-center gap-1">
                                    <ArrowDownLeft className="h-3.5 w-3.5 text-teal-600" />
                                    <p className="text-xs text-muted-foreground">
                                        Total Income
                                    </p>
                                </div>
                                <p className="text-lg font-semibold text-teal-600">
                                    {formatRupiah(totalIncome)}
                                </p>
                            </div>

                            <div className="rounded-md border p-3">
                                <div className="flex items-center gap-1">
                                    <ArrowUpRight className="h-3.5 w-3.5 text-rose-600" />
                                    <p className="text-xs text-muted-foreground">
                                        Total Expense
                                    </p>
                                </div>
                                <p className="text-lg font-semibold text-rose-600">
                                    {formatRupiah(totalExpense)}
                                </p>
                            </div>

                            <div className="rounded-md border p-3">
                                <div className="flex items-center gap-1">
                                    <CircleDollarSign className="h-3.5 w-3.5 text-yellow-600" />
                                    <p className="text-xs text-muted-foreground">
                                        Available Balance
                                    </p>
                                </div>
                                <p className="text-lg font-semibold text-yellow-600">
                                    {formatRupiah(totalIncome - totalExpense)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
