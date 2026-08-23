import DataTable from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import GenerateHabitLogButton from '@/components/generate-habit-log-button';
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
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
    ChevronDownIcon,
    ChevronLeft,
    ChevronRight,
    SquarePen,
} from 'lucide-react';
import { useState } from 'react';

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
    habit_id: number;
    habit: Habit;
};

interface LogIndexProps {
    logs: Log[];
    selectedDate: string;
    habits: Habit[];
}

export default function Index({ logs, selectedDate, habits }: LogIndexProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                format(new Date(info.getValue() as string), 'dd MMMM yyyy'),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        onClick={() => {
                            setMode('edit');
                            setOpenForm(true);
                            filteredHabitLog(row.original.id);
                        }}
                    >
                        <SquarePen />
                    </Button>
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

    const filteredHabitLog = (id: number) => {
        const habitLog = logs?.filter((log) => {
            return log.id === id;
        });

        setIdEdit(habitLog[0].id);
        setForm({
            habit_id: String(habitLog[0].habit_id),
            date: habitLog[0].date,
        });
    };

    const [mode, setMode] = useState<'create' | 'edit'>('create');

    const [idEdit, setIdEdit] = useState<number>();

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

    const handleSubmit = (e: any, id?: number) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (mode == 'create') {
            router.post(
                '/habit-logs',
                { ...form, habit_id: Number(form.habit_id) },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setOpenForm(false);
                        resetForm();
                        setIsSubmitting(false);
                    },
                },
            );
        } else {
            router.put(
                `/habit-logs/${id}`,
                { ...form, habit_id: Number(form.habit_id) },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setOpenForm(false);
                        resetForm();
                        setIsSubmitting(false);
                    },
                },
            );
        }
    };

    function addDays(date: Date, days: number) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    const nowDate = new Date(selectedDate);
    const nextDate = addDays(nowDate, 1);
    const prevDate = addDays(nowDate, -1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habit Log" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="default"
                        onClick={() => {
                            setDate(prevDate);
                            router.get(
                                '/habit-logs',
                                { date: format(prevDate, 'yyyy-MM-dd') },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                },
                            );
                        }}
                    >
                        <ChevronLeft />
                    </Button>
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
                    <Button
                        variant="outline"
                        size="default"
                        onClick={() => {
                            setDate(nextDate);
                            router.get(
                                '/habit-logs',
                                { date: format(nextDate, 'yyyy-MM-dd') },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                },
                            );
                        }}
                    >
                        <ChevronRight />
                    </Button>
                </div>
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<Log>
                            showIndexColumn
                            columns={columns}
                            data={logs}
                            createButton={
                                <div className="flex items-center gap-2">
                                    <Dialog
                                        open={openForm}
                                        onOpenChange={(isOpen) => {
                                            setMode('create');
                                            setOpenForm(isOpen);
                                            if (isOpen) resetForm();
                                        }}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className=""
                                            >
                                                Create New Habit Log
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <form
                                                onSubmit={
                                                    mode == 'create'
                                                        ? handleSubmit
                                                        : (e) =>
                                                              handleSubmit(
                                                                  e,
                                                                  idEdit,
                                                              )
                                                }
                                            >
                                                <DialogHeader className="mb-4">
                                                    <DialogTitle>
                                                        {mode === 'create'
                                                            ? `Create Habit Log on ${format(new Date(selectedDate), 'dd MMMM yyyy')}`
                                                            : 'Edit Habit Log'}
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="name-1">
                                                            Habit
                                                        </Label>
                                                        <Select
                                                            value={
                                                                form.habit_id
                                                            }
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
                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting
                                                            ? 'Saving...'
                                                            : 'Save'}
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                    <GenerateHabitLogButton
                                        label="Generate All Habit Logs"
                                        data={{ date: form.date }}
                                    />
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
