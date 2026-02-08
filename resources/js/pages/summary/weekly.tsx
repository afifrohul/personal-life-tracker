'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { addWeeks, endOfWeek, format, startOfWeek } from 'date-fns';
import { ChevronDownIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Weekly',
        href: '/weekly-summary',
    },
];

export default function Weekly() {
    const [open, setOpen] = useState(false);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    function getWeekRange(date: Date) {
        const start = startOfWeek(date, { weekStartsOn: 0 });
        const end = endOfWeek(date, { weekStartsOn: 0 });
        return { start, end };
    }

    useEffect(() => {
        const { start, end } = getWeekRange(new Date());
        setStartDate(start);
        setEndDate(end);
    }, []);

    function goToPrevWeek() {
        if (!startDate) return;
        const target = addWeeks(startDate, -1);
        const { start, end } = getWeekRange(target);
        setStartDate(start);
        setEndDate(end);
    }

    function goToNextWeek() {
        if (!startDate) return;
        const target = addWeeks(startDate, 1);
        const { start, end } = getWeekRange(target);
        setStartDate(start);
        setEndDate(end);
    }

    function jumpToWeek(date?: Date) {
        if (!date) return;
        const { start, end } = getWeekRange(date);
        setStartDate(start);
        setEndDate(end);
        setOpen(false);
    }

    function renderWeekLabel() {
        if (!startDate || !endDate) return 'Select Week';

        return `${format(startDate, 'dd MMM')} – ${format(
            endDate,
            'dd MMM yyyy',
        )}`;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Weekly Summary" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={goToPrevWeek}>
                        <ChevronLeft />
                    </Button>

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex w-full items-center justify-between font-normal"
                            >
                                {renderWeekLabel()}
                                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                        >
                            <Calendar
                                mode="single"
                                selected={startDate ?? undefined}
                                onSelect={jumpToWeek}
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>

                    <Button variant="outline" onClick={goToNextWeek}>
                        <ChevronRight />
                    </Button>
                </div>

                <div className="rounded-md border p-4 text-sm text-muted-foreground">
                    Weekly summary content goes here…
                    <br />
                    <span className="text-xs">
                        ({startDate && format(startDate, 'dd MMM yyyy')} –{' '}
                        {endDate && format(endDate, 'dd MMM yyyy')})
                    </span>
                </div>
            </div>
        </AppLayout>
    );
}
