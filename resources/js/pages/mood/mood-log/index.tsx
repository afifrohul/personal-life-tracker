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
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { FaFaceAngry, FaFaceFrown, FaFaceMeh, FaFaceSmile, FaFaceSmileBeam } from 'react-icons/fa6';

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
};

interface MoodLogIndexProps {
    mood_logs: MoodLog[];
}

export default function Index({ mood_logs }: MoodLogIndexProps) {
    const columns: ColumnDef<MoodLog>[] = [
        {
            accessorKey: 'mood_score',
            header: 'Mood',
            cell: ({ row }) => {
                if (Number(row.original.mood_score) === 1) {
                    return (
                        <div className="flex items-center gap-2">
                            <FaFaceAngry className="text-lg text-rose-500" />
                            <p>Bad</p>
                        </div>
                    );
                } else if (Number(row.original.mood_score) === 2) {
                    return (
                        <div className='flex items-center gap-2'>
                            <FaFaceFrown className='text-lg text-amber-500' />
                            <p>Not Good</p>
                        </div>
                    );
                } else if (Number(row.original.mood_score) === 3) {
                    return (
                        <div className='flex items-center gap-2'>
                            <FaFaceMeh className='text-lg text-yellow-500' />
                            <p>Okay</p>
                        </div>
                    );
                } else if (Number(row.original.mood_score) === 4) {
                    return (
                        <div className='flex items-center gap-2'>
                            <FaFaceSmile className='text-lg text-lime-500' />
                            <p>Good</p>
                        </div>
                    );
                } else if (Number(row.original.mood_score) === 5) {
                    return (
                        <div className='flex items-center gap-2'>
                            <FaFaceSmileBeam className='text-lg text-emerald-500' />
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
                format(new Date(info.getValue() as string), 'dd MMM yyyy'),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex justify-start gap-2">
                    <DeleteButton
                        url={`/mood-logs/${row.original.id}`}
                        confirmMessage="Are you sure to delete this log?"
                    />
                </div>
            ),
        },
    ];

    const [open, setOpen] = useState(false);

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        router.post(
            '/mood-logs',
            { ...form, mood_score: Number(form.mood_score) },
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
            <Head title="Mood Log" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <DataTable<MoodLog>
                            showIndexColumn
                            columns={columns}
                            data={mood_logs}
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
                                            Create New Mood Log
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <form onSubmit={handleSubmit}>
                                            <DialogHeader className="mb-4">
                                                <DialogTitle>
                                                    Create Mood Log
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4">
                                                {/* Mood */}
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

                                                {/* Date */}
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
