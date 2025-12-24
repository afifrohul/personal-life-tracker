import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
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
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit Log',
        href: '/habit-logs',
    },
];

type Category = {
    id: number;
    name: string;
    icon: string;
};

type Habit = {
    id: number;
    name: string;
    icon: string;
    color: string;
    habit_category: Category;
};

type Log = {
    id: number;
    exp_gain: number;
    date: string;
    habit: Habit;
};

interface LogIndexProps {
    logs: Log[];
    selectedDate: string;
    habits: Habit[];
}

export default function Index({ logs, selectedDate, habits }: LogIndexProps) {
    const columns: ColumnDef<Log>[] = [
        {
            accessorKey: 'category',
            header: 'Category',
            cell: ({ row }) => {
                const iconName = row.original.habit.habit_category.icon;
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
                        {row.original.habit.habit_category.name}
                    </div>
                );
            },
        },
        {
            accessorKey: 'habit',
            header: 'Habit',
            cell: ({ row }) => {
                const iconName = row.original.habit.icon;
                const IconComponent = (lucideIcons as Record<string, any>)[
                    iconName
                ];

                if (!IconComponent) {
                    return (
                        <div className="text-sm text-red-500">Invalid icon</div>
                    );
                }

                return (
                    <div
                        className="flex w-fit items-center gap-2 rounded border px-1.5 py-1 text-white"
                        style={{ backgroundColor: row.original.habit.color }}
                    >
                        <IconComponent className="h-3 w-3" />
                        <p>{row.original.habit.name}</p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'exp_gain',
            header: 'Exp Gain',
            cell: ({ row }) => {
                return (
                    <div>
                        <p
                            className="font-semibold"
                            style={{ color: row.original.habit.color }}
                        >
                            + {row.original.exp_gain} Exp
                        </p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'date',
            header: 'Date',
            cell: (info) =>
                format(new Date(info.getValue() as string), 'dd MMM yyyy'),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <DeleteButton
                        url={`/habit-logs/${row.original.id}`}
                        confirmMessage="Are you sure to delete this log?"
                    />
                </div>
            ),
        },
    ];

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(
        selectedDate ? new Date(selectedDate) : undefined,
    );

    const [openForm, setOpenForm] = useState(false);

    const [form, setForm] = useState({
        habit_id: '',
        date: selectedDate,
    });

    const handleChange = (key: any, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const resetForm = () =>
        setForm({
            habit_id: '',
            date: selectedDate,
        });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        router.post(
            '/habit-logs',
            { ...form, habit_id: Number(form.habit_id) },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setOpenForm(false);
                    resetForm();
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habit Log" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="date"
                                className="w-full justify-between font-normal"
                            >
                                {date
                                    ? format(new Date(date), 'dd MMMM yyyy')
                                    : 'Select date'}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                        >
                            <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                onSelect={(newDate) => {
                                    setDate(newDate);
                                    setOpen(false);

                                    if (newDate) {
                                        router.get(
                                            '/habit-logs',
                                            {
                                                date: format(
                                                    newDate,
                                                    'yyyy-MM-dd',
                                                ),
                                            },
                                            {
                                                preserveState: true,
                                                preserveScroll: true,
                                            },
                                        );
                                    }
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Log>
                            showIndexColumn
                            columns={columns}
                            data={logs}
                            createButton={
                                <Dialog
                                    open={openForm}
                                    onOpenChange={(isOpen) => {
                                        setOpenForm(isOpen);
                                        if (isOpen) resetForm();
                                    }}
                                >
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            <FaPlusCircle className="mr-2" />{' '}
                                            Create New Log
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <form onSubmit={handleSubmit}>
                                            <DialogHeader className="mb-4">
                                                <DialogTitle>
                                                    Create Habit Log on{' '}
                                                    {format(
                                                        new Date(selectedDate),
                                                        'dd MMMM yyyy',
                                                    )}
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name-1">
                                                        Habit
                                                    </Label>
                                                    <Select
                                                        value={form.habit_id}
                                                        onValueChange={(
                                                            value,
                                                        ) =>
                                                            handleChange(
                                                                'habit_id',
                                                                value,
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select habit" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {habits?.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <SelectItem
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={String(
                                                                            item.id,
                                                                        )}
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <DialogFooter className="mt-4">
                                                <DialogClose asChild>
                                                    <Button variant="outline">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button type="submit">
                                                    Save
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
