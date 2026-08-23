import DataTable from '@/components/data-table';
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
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
    Angry,
    CalendarDays,
    CalendarIcon,
    Clock,
    Columns3,
    Frown,
    List,
    Meh,
    Smile,
    SmilePlus,
    SquarePen,
} from 'lucide-react';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

type MoodLog = {
    id: number;
    date: string;
    mood_score: string;
    created_at: string;
};

interface MoodLogIndexProps {
    mood_logs: MoodLog[];
    mood_logs_column: {
        data: MoodLog[];
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        total: number;
        prev_page_url: string | null;
        next_page_url: string | null;
        first_page_url: string;
        last_page_url: string;
    };
    view: string;
}

export default function Index({
    mood_logs,
    mood_logs_column,
    view,
}: MoodLogIndexProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const columns: ColumnDef<MoodLog>[] = [
        {
            accessorKey: 'mood_score',
            header: 'Mood',
            cell: ({ row }) => {
                if (Number(row.original.mood_score) === 1) {
                    return (
                        <div className="flex items-center gap-2 font-medium">
                            <Angry className="fill-rose-500 text-lg" />
                            <p>Bad</p>
                        </div>
                    );
                } else if (Number(row.original.mood_score) === 2) {
                    return (
                        <div className="flex items-center gap-2 font-medium">
                            <Frown className="fill-amber-500 text-lg" />
                            <p>Not Good</p>
                        </div>
                    );
                } else if (Number(row.original.mood_score) === 3) {
                    return (
                        <div className="flex items-center gap-2 font-medium">
                            <Meh className="fill-yellow-500 text-lg" />
                            <p>Okay</p>
                        </div>
                    );
                } else if (Number(row.original.mood_score) === 4) {
                    return (
                        <div className="flex items-center gap-2 font-medium">
                            <Smile className="fill-green-500 text-lg" />
                            <p>Good</p>
                        </div>
                    );
                } else if (Number(row.original.mood_score) === 5) {
                    return (
                        <div className="flex items-center gap-2 font-medium">
                            <SmilePlus className="fill-teal-500 text-lg" />
                            <p>Great</p>
                        </div>
                    );
                }
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
                        className=""
                        variant="outline"
                        size={'sm'}
                        onClick={() => {
                            setMode('edit');
                            setOpenForm(true);
                            filteredMood(row.original.id);
                        }}
                    >
                        <SquarePen />
                    </Button>
                    <DeleteButton
                        url={`/mood-logs/${row.original.id}`}
                        confirmMessage="Are you sure to delete this log?"
                    />
                </div>
            ),
        },
    ];

    const filteredMood = (id: number) => {
        const mood = mood_logs?.filter((mood) => {
            return mood.id === id;
        });

        setIdEdit(mood[0].id);
        setForm({
            mood_score: String(mood[0].mood_score),
            date: mood[0].date,
        });
    };

    const filteredMoodColumn = (id: number) => {
        const mood = mood_logs_column.data?.filter((mood) => {
            return mood.id === id;
        });

        setIdEdit(mood[0].id);
        setForm({
            mood_score: String(mood[0].mood_score),
            date: mood[0].date,
        });
    };

    const [mode, setMode] = useState<'create' | 'edit'>('create');

    const [idEdit, setIdEdit] = useState<number>();

    const [openForm, setOpenForm] = useState(false);

    const [form, setForm] = useState({
        mood_score: '',
        date: '',
    });

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

    const changeTab = (value: string) => {
        router.get(
            '/mood-logs',
            {
                view: value,
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
                <Tabs defaultValue={view}>
                    <div className="flex items-center justify-between">
                        <TabsList className="">
                            <div>
                                <TabsTrigger
                                    value="column"
                                    onClick={() => changeTab('column')}
                                >
                                    <div className="flex items-center gap-1">
                                        <Columns3 />
                                        <p className="text-xs">Column View</p>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="list"
                                    onClick={() => changeTab('list')}
                                >
                                    <div className="flex items-center gap-1">
                                        <List />
                                        <p className="text-xs">List View</p>
                                    </div>
                                </TabsTrigger>
                            </div>
                        </TabsList>
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
                                    <Button variant="outline">
                                        Create New Mood Log
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <form
                                        onSubmit={
                                            mode == 'create'
                                                ? handleSubmit
                                                : (e) => handleSubmit(e, idEdit)
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
                                                    onValueChange={(value) =>
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
                    <TabsContent value="column">
                        <div className="rounded-xl border p-4">
                            <div className="mx-auto flex w-full flex-col gap-4">
                                {mood_logs_column.data?.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-4">
                                        {mood_logs_column.data?.map(
                                            (item, index) => (
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
                                                                            ) ===
                                                                            2
                                                                          ? 'Not Good'
                                                                          : Number(
                                                                                  item.mood_score,
                                                                              ) ===
                                                                              3
                                                                            ? 'Okay'
                                                                            : Number(
                                                                                    item.mood_score,
                                                                                ) ===
                                                                                4
                                                                              ? 'Good'
                                                                              : 'Great'}
                                                                </p>
                                                                <div className="flex items-center gap-4 text-xs">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <CalendarDays className="h-4 w-4" />
                                                                        <p className="italic">
                                                                            {format(
                                                                                item.date,
                                                                                'dd MMMM yyyy',
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5">
                                                                        <Clock className="h-4 w-4" />
                                                                        <p className="italic">
                                                                            {format(
                                                                                item.created_at,
                                                                                'HH:ii:ss',
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
                                                                    setMode(
                                                                        'edit',
                                                                    );
                                                                    setOpenForm(
                                                                        true,
                                                                    );
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
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <p className="text-xs">
                                            No data found.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-xs">
                                Showing {mood_logs_column.from} to{' '}
                                {mood_logs_column.to} of{' '}
                                {mood_logs_column.total} data
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={
                                            mood_logs_column.current_page === 1
                                        }
                                        onClick={() =>
                                            goToUrl(
                                                mood_logs_column.first_page_url,
                                            )
                                        }
                                    >
                                        <MdKeyboardDoubleArrowLeft />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={
                                            mood_logs_column.current_page === 1
                                        }
                                        onClick={() =>
                                            goToUrl(
                                                mood_logs_column.prev_page_url as string,
                                            )
                                        }
                                    >
                                        <MdKeyboardArrowLeft />
                                    </Button>
                                    <span className="text-xs">
                                        {mood_logs_column.current_page} /{' '}
                                        {mood_logs_column.last_page}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={
                                            mood_logs_column.current_page ===
                                            mood_logs_column.last_page
                                        }
                                        onClick={() =>
                                            goToUrl(
                                                mood_logs_column.next_page_url as string,
                                            )
                                        }
                                    >
                                        <MdKeyboardArrowRight />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={
                                            mood_logs_column.current_page ===
                                            mood_logs_column.last_page
                                        }
                                        onClick={() =>
                                            goToUrl(
                                                mood_logs_column.last_page_url,
                                            )
                                        }
                                    >
                                        <MdKeyboardDoubleArrowRight />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="list">
                        <div className="rounded-xl border p-4">
                            <div className="mx-auto flex w-full flex-col gap-4">
                                <DataTable<MoodLog>
                                    showIndexColumn
                                    columns={columns}
                                    data={mood_logs}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
