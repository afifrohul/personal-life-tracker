import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    ChevronDownIcon,
    ChevronLeft,
    ChevronRight,
    PencilLine,
    Trash,
} from 'lucide-react';
import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Journal Log',
        href: '/journal-logs',
    },
];

type Log = {
    id: number;
    date: string;
    content: string;
    created_at: string;
    updated_at: string;
};

interface JournalLogIndexProps {
    logs: Log[];
    selectedDate: string;
}

export default function Index({ logs, selectedDate }: JournalLogIndexProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(
        selectedDate ? new Date(selectedDate) : undefined,
    );

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
            <Head title="Journal Log" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-1 items-center gap-2">
                        <Button
                            variant="outline"
                            size="default"
                            onClick={() => {
                                setDate(prevDate);
                                router.get(
                                    '/journal-logs',
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
                                                '/journal-logs',
                                                { date: format(newDate,'yyyy-MM-dd')},
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
                                    '/journal-logs',
                                    { date: format(nextDate, 'yyyy-MM-dd')},
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
                    <Button
                        variant="outline"
                        onClick={() =>
                            router.get(
                                `/journal-logs/create?date=${selectedDate}`,
                            )
                        }
                    >
                        <FaPlusCircle className="mr-2" /> Create New Journal Log
                    </Button>
                </div>
                <div className="">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        {logs?.length === 0 ? (
                            <div className="rounded-md border p-4 text-center text-sm italic">
                                Journal log not found.
                            </div>
                        ) : (
                            logs?.map((item, index) => (
                                <div
                                    className="rounded-md border p-4"
                                    key={index}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium italic">
                                            Journal Log -{' '}
                                            {format(item.date, 'dd MMMM yyyy')}{' '}
                                            {format(
                                                item.created_at,
                                                'HH:mm:ss',
                                            )}{' '}
                                            {item.created_at != item.updated_at
                                                ? '(Edited)'
                                                : null}
                                        </p>

                                        <div className="flex justify-start gap-2">
                                            <EditButton
                                                url={`/journal-logs/${item.id}/edit`}
                                                label={<PencilLine />}
                                            />
                                            <DeleteButton
                                                url={`/journal-logs/${item.id}`}
                                                label={<Trash />}
                                                confirmMessage="Are you sure to delete this log?"
                                            />
                                        </div>
                                    </div>
                                    <Separator className="my-2"></Separator>
                                    <p className="text-sm">{item.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
