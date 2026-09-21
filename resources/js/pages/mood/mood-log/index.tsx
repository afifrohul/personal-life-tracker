import DeleteButton from '@/components/delete-button';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
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
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    Angry,
    CalendarDays,
    CalendarIcon,
    Clock,
    Frown,
    Meh,
    RotateCcw,
    Smile,
    SmilePlus,
    SquarePen,
} from 'lucide-react';
import { useState } from 'react';

import { Separator } from '@/components/ui/separator';
import type { MoodLog, Pagination } from '@/types/data';
import type { DateRange } from 'react-day-picker';
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mood Log',
        href: '/mood-logs',
    },
];

interface MoodLogIndexProps {
    mood_logs: Pagination<MoodLog>;
    filters: {
        type: string;
        from: Date;
        to: Date;
    };
}

export default function Index({ mood_logs, filters }: MoodLogIndexProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [idEdit, setIdEdit] = useState<number>();
    const [openForm, setOpenForm] = useState(false);
    const [form, setForm] = useState({
        mood_score: '',
        date: '',
    });
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(filters.type);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: filters.from,
        to: filters.to,
    });

    const filteredMoodColumn = (id: number) => {
        const mood = mood_logs.data?.filter((mood) => {
            return mood.id === id;
        });

        setIdEdit(mood[0].id);
        setForm({
            mood_score: String(mood[0].mood_score),
            date: mood[0].date,
        });
    };

    const handleChange = (key: any, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const resetForm = () =>
        setForm({
            mood_score: '',
            date: '',
        });

    const handleSubmit = (e: any, id?: number) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (mode == 'create') {
            router.post(
                '/mood-logs',
                { ...form, mood_score: Number(form.mood_score) },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setOpenForm(false);
                        resetForm();
                        setIsSubmitting(false);
                    },
                    onError: () => {
                        setIsSubmitting(false);
                    },
                },
            );
        } else {
            router.put(
                `/mood-logs/${id}`,
                { ...form, mood_score: Number(form.mood_score) },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setOpenForm(false);
                        resetForm();
                        setIsSubmitting(false);
                    },
                    onError: () => {
                        setIsSubmitting(false);
                    },
                },
            );
        }
    };

    const goToUrl = (url: string) => {
        router.get(url);
    };

    const applyFilter = (
        type: string,
        dateRange: DateRange | undefined,
    ) => {
        router.get(
            '/mood-logs',
            {
                page: 1,
                type: Number(type),
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mood Log" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                        <p className="font-medium">Mood Log Data</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <Dialog
                                    open={openForm}
                                    onOpenChange={(isOpen) => {
                                        setMode('create');
                                        setOpenForm(isOpen);
                                        if (isOpen) resetForm();
                                    }}
                                >
                                    <DialogTrigger asChild>
                                        <Button size="sm">
                                            Create New Mood Log
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
                                            <AlertDialogHeader className="mb-4">
                                                <DialogTitle>
                                                    {mode == 'create'
                                                        ? 'Create'
                                                        : 'Edit'}{' '}
                                                    Mood Log
                                                </DialogTitle>
                                            </AlertDialogHeader>
                                            <div className="grid gap-4">
                                                <div className="grid gap-3">
                                                    <Label>Mood</Label>
                                                    <Select
                                                        value={form.mood_score}
                                                        onValueChange={(
                                                            value,
                                                        ) =>
                                                            handleChange(
                                                                'mood_score',
                                                                value,
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select mood" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">
                                                                Bad
                                                            </SelectItem>
                                                            <SelectItem value="2">
                                                                Not Good
                                                            </SelectItem>
                                                            <SelectItem value="3">
                                                                Okay
                                                            </SelectItem>
                                                            <SelectItem value="4">
                                                                Good
                                                            </SelectItem>
                                                            <SelectItem value="5">
                                                                Great
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="grid gap-3">
                                                    <Label>Date</Label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className="w-full justify-between text-left font-normal"
                                                            >
                                                                {form.date
                                                                    ? format(
                                                                          new Date(
                                                                              form.date,
                                                                          ),
                                                                          'PPP',
                                                                      )
                                                                    : 'Pick a date'}
                                                                <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>

                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    form.date
                                                                        ? new Date(
                                                                              form.date,
                                                                          )
                                                                        : undefined
                                                                }
                                                                onSelect={(
                                                                    date,
                                                                ) => {
                                                                    handleChange(
                                                                        'date',
                                                                        date
                                                                            ? format(
                                                                                  date,
                                                                                  'yyyy-MM-dd',
                                                                              )
                                                                            : '',
                                                                    );
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
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
                            </div>
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
                                        applyFilter(type, value);
                                    }}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                        <Select
                            value={type}
                            onValueChange={(value) => {
                                setType(value);
                                applyFilter(value, dateRange);
                            }}
                        >
                            <SelectTrigger
                                className="hidden w-full rounded-lg sm:ml-auto sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="0" className="rounded-lg">
                                    All Mood Type
                                </SelectItem>
                                <SelectItem value="1" className="rounded-lg">
                                    Bad
                                </SelectItem>
                                <SelectItem value="2" className="rounded-lg">
                                    Not Good
                                </SelectItem>
                                <SelectItem value="3" className="rounded-lg">
                                    Okay
                                </SelectItem>
                                <SelectItem value="4" className="rounded-lg">
                                    Good
                                </SelectItem>
                                <SelectItem value="5" className="rounded-lg">
                                    Great
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="secondary"
                            onClick={() => router.get('/mood-logs')}
                        >
                            <RotateCcw />
                        </Button>
                    </div>

                    <div className="">
                        <div className="mx-auto flex w-full flex-col gap-4">
                            {mood_logs.data?.length > 0 ? (
                                <div className="grid grid-cols-3 gap-4">
                                    {mood_logs.data?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-8 rounded-xl border px-3 py-2"
                                        >
                                            <div className="flex w-full items-center gap-4">
                                                <div className="flex flex-1 items-center justify-between">
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-sm font-semibold">
                                                            {Number(
                                                                item.mood_score,
                                                            ) === 1
                                                                ? 'Bad'
                                                                : Number(
                                                                        item.mood_score,
                                                                    ) === 2
                                                                  ? 'Not Good'
                                                                  : Number(
                                                                          item.mood_score,
                                                                      ) === 3
                                                                    ? 'Okay'
                                                                    : Number(
                                                                            item.mood_score,
                                                                        ) === 4
                                                                      ? 'Good'
                                                                      : 'Great'}
                                                        </p>
                                                        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                                                            <div className="flex items-center gap-1.5">
                                                                <CalendarDays className="h-3 w-3" />
                                                                <p className="italic">
                                                                    {format(
                                                                        item.date,
                                                                        'dd MMMM yyyy',
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock className="h-3 w-3" />
                                                                <p className="italic">
                                                                    {format(
                                                                        item.created_at!,
                                                                        'HH.ii',
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {Number(
                                                            item.mood_score,
                                                        ) === 1 ? (
                                                            <Angry className="h-9 w-9 fill-rose-500" />
                                                        ) : Number(
                                                              item.mood_score,
                                                          ) === 2 ? (
                                                            <Frown className="h-9 w-9 fill-amber-500" />
                                                        ) : Number(
                                                              item.mood_score,
                                                          ) === 3 ? (
                                                            <Meh className="h-9 w-9 fill-yellow-500" />
                                                        ) : Number(
                                                              item.mood_score,
                                                          ) === 4 ? (
                                                            <Smile className="h-9 w-9 fill-green-500" />
                                                        ) : (
                                                            <SmilePlus className="h-9 w-9 fill-teal-500" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <Button
                                                        className="scale-65"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setMode('edit');
                                                            setOpenForm(true);
                                                            filteredMoodColumn(
                                                                item.id,
                                                            );
                                                        }}
                                                    >
                                                        <SquarePen className="" />
                                                    </Button>
                                                    <DeleteButton
                                                        variant="outline"
                                                        className="scale-65"
                                                        url={`/mood-logs/${item.id}`}
                                                        confirmMessage="Are you sure to delete this log?"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <p className="text-xs">No data found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                        <p className="text-xs">
                            Showing {mood_logs.from} to {mood_logs.to} of{' '}
                            {mood_logs.total} data
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={mood_logs.current_page === 1}
                                    onClick={() =>
                                        goToUrl(mood_logs.first_page_url)
                                    }
                                >
                                    <MdKeyboardDoubleArrowLeft />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={mood_logs.current_page === 1}
                                    onClick={() =>
                                        goToUrl(
                                            mood_logs.prev_page_url as string,
                                        )
                                    }
                                >
                                    <MdKeyboardArrowLeft />
                                </Button>
                                <span className="text-xs">
                                    {mood_logs.current_page} /{' '}
                                    {mood_logs.last_page}
                                </span>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={
                                        mood_logs.current_page ===
                                        mood_logs.last_page
                                    }
                                    onClick={() =>
                                        goToUrl(
                                            mood_logs.next_page_url as string,
                                        )
                                    }
                                >
                                    <MdKeyboardArrowRight />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={
                                        mood_logs.current_page ===
                                        mood_logs.last_page
                                    }
                                    onClick={() =>
                                        goToUrl(mood_logs.last_page_url)
                                    }
                                >
                                    <MdKeyboardDoubleArrowRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
