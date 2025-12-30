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
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

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
            <Head title="Journal Log" />
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
                                            '/journal-logs',
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
                        {logs?.length === 0 ? (
                            <div className='text-sm text-center italic'>Journal log not found.</div>
                        ) : (
                            logs?.map((item, index) => (
                                <div className="" key={index}>
                                    <p className="text-sm font-medium italic">
                                        Journal Log -{' '}
                                        {format(item.date, 'dd MMMM yyyy')}{' '}
                                        {format(item.created_at, 'HH:m:s')}
                                    </p>
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
