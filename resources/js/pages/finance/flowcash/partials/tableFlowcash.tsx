import DataTable from '@/components/data-table-v9';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
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
import { formatRupiah } from '@/lib/format-rupiah';
import { lucideIcons } from '@/lib/lucide-icons';
import type { Flowcash, FlowcashCategory, Pagination } from '@/types/data';
import { router } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { tableFeatures } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
    ArrowDownLeft,
    ArrowUpRight,
    CalendarDays,
    RotateCcw,
} from 'lucide-react';
import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { useDebouncedCallback } from 'use-debounce';

interface TableFlowcashProps {
    paginationData: Pagination<Flowcash>;
    categories: FlowcashCategory[];
    filters: {
        search: string;
        category: string;
        type: string;
        perPage: number;
        from: Date;
        to: Date;
    };
}

const features = tableFeatures({});

export default function TableFlowcash({
    paginationData,
    categories,
    filters,
}: TableFlowcashProps) {
    const data = paginationData?.data;

    const [search, setSearch] = useState(filters.search);
    const debouncedSearch = useDebouncedCallback((value: string) => {
        applyFilter(perPage, value, category, type, dateRange);
    }, 1000);
    const [perPage, setPerPage] = useState(String(filters.perPage));
    const [category, setCategory] = useState(String(filters.category));
    const [type, setType] = useState(filters.type);
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: filters.from,
        to: filters.to,
    });

    const applyFilter = (
        perPage: string,
        search: string,
        category: string,
        type: string,
        dateRange: DateRange | undefined,
    ) => {
        router.get(
            '/flowcashes',
            {
                page: 1,
                perPage: Number(perPage),
                search: search,
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

    const columns: ColumnDef<typeof features, Flowcash>[] = [
        {
            id: 'number',
            header: '#',
            cell: ({ row }) =>
                paginationData.from !== null
                    ? paginationData.from + row.index
                    : '-',
        },
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

    return (
        <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
                <p className="font-medium">Flowcash Data</p>
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
                    <Button size='sm' onClick={() => router.get('/flowcashes/create')}>
                        Create New Flowcash
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
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
                                applyFilter(
                                    perPage,
                                    search,
                                    category,
                                    type,
                                    value,
                                );
                            }}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
                <Select
                    value={category}
                    onValueChange={(value) => {
                        setCategory(value);
                        applyFilter(perPage, search, value, type, dateRange);
                    }}
                >
                    <SelectTrigger
                        className="hidden w-full rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value={String(0)} className="rounded-lg">
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
                        applyFilter(
                            perPage,
                            search,
                            category,
                            value,
                            dateRange,
                        );
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
                <Button
                    variant="secondary"
                    onClick={() => router.get('/flowcashes')}
                >
                    <RotateCcw />
                </Button>
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
                            applyFilter(
                                String(value),
                                search,
                                category,
                                type,
                                dateRange,
                            ),
                    }}
                />
            </div>
        </div>
    );
}
