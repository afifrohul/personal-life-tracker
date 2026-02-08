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
import { addMonths, endOfMonth, format, startOfMonth } from 'date-fns';
import { ChevronDownIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Monthly',
        href: '/monthly-summary',
    },
];

export default function Monthly() {
    const [open, setOpen] = useState(false);

    const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    function getMonthRange(date: Date) {
        return {
            start: startOfMonth(date),
            end: endOfMonth(date),
        };
    }

    useEffect(() => {
        const now = new Date();
        const { start, end } = getMonthRange(now);
        setCurrentMonth(start);
        setStartDate(start);
        setEndDate(end);
    }, []);

    function goToPrevMonth() {
        if (!currentMonth) return;
        const target = addMonths(currentMonth, -1);
        const { start, end } = getMonthRange(target);
        setCurrentMonth(start);
        setStartDate(start);
        setEndDate(end);
    }

    function goToNextMonth() {
        if (!currentMonth) return;
        const target = addMonths(currentMonth, 1);
        const { start, end } = getMonthRange(target);
        setCurrentMonth(start);
        setStartDate(start);
        setEndDate(end);
    }

    function jumpToMonth(date?: Date) {
        if (!date) return;
        const { start, end } = getMonthRange(date);
        setCurrentMonth(start);
        setStartDate(start);
        setEndDate(end);
        setOpen(false);
    }

    function renderMonthLabel() {
        if (!currentMonth) return 'Select Month';
        return format(currentMonth, 'MMMM yyyy');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Monthly Summary" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* HEADER MONTH SELECTOR */}
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={goToPrevMonth}>
                        <ChevronLeft />
                    </Button>

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex w-full items-center justify-between font-normal"
                            >
                                {renderMonthLabel()}
                                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                        >
                            <Calendar
                                mode="single"
                                selected={currentMonth ?? undefined}
                                onSelect={jumpToMonth}
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>

                    <Button variant="outline" onClick={goToNextMonth}>
                        <ChevronRight />
                    </Button>
                </div>

                <div className="rounded-md border p-4 text-sm text-muted-foreground">
                    Monthly summary content goes here…
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
