'use client';

import { ChartExp } from '@/components/chart-exp';
import { ChartExpense } from '@/components/chart-expense';
import { ChartHabit } from '@/components/chart-habit';
import { ChartMood } from '@/components/chart-mood';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { addMonths, endOfMonth, format, startOfMonth } from 'date-fns';
import { ChevronDownIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Monthly',
        href: '/monthly-summary',
    },
];

interface MonthlyProps {
    selectedStartDate: string;
    selectedEndDate: string;
    chartDataMood: [];
    chartDataHabit: [];
    chartDataExp: [];
    chartDataExpense: [];
}

export default function Monthly({
    selectedStartDate,
    selectedEndDate,
    chartDataMood,
    chartDataHabit,
    chartDataExp,
    chartDataExpense,
}: MonthlyProps) {
    const [open, setOpen] = useState(false);

    function parseDate(date: string) {
        const [y, m, d] = date.split('-').map(Number);
        return new Date(y, m - 1, d);
    }

    const { start } = getMonthRange(parseDate(selectedStartDate));

    const [currentMonth, setCurrentMonth] = useState<Date | null>(start);
    const [startDate, setStartDate] = useState<Date | null>(
        selectedStartDate ? parseDate(selectedStartDate) : null,
    );

    const [endDate, setEndDate] = useState<Date | null>(
        selectedEndDate ? parseDate(selectedEndDate) : null,
    );

    const [anchorDate, setAnchorDate] = useState<Date | null>(null);

    function getMonthRange(date: Date) {
        return {
            start: startOfMonth(date),
            end: endOfMonth(date),
        };
    }

    function updateViewParams(start: Date, end: Date) {
        router.get(
            '/monthly-summary',
            {
                start_date: format(start, 'yyyy-MM-dd'),
                end_date: format(end, 'yyyy-MM-dd'),
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function goToPrevMonth() {
        if (!currentMonth) return;
        const target = addMonths(currentMonth, -1);
        const { start, end } = getMonthRange(target);
        setCurrentMonth(start);
        setStartDate(start);
        setEndDate(end);
        updateViewParams(start, end);
    }

    function goToNextMonth() {
        if (!currentMonth) return;
        const target = addMonths(currentMonth, 1);
        const { start, end } = getMonthRange(target);
        setCurrentMonth(start);
        setStartDate(start);
        setEndDate(end);
        updateViewParams(start, end);
    }

    function jumpToMonth(date?: Date) {
        if (!date) return;
        const { start, end } = getMonthRange(date);
        setCurrentMonth(start);
        setStartDate(start);
        setEndDate(end);
        setOpen(false);
        updateViewParams(start, end);
    }

    function renderMonthLabel() {
        if (!currentMonth) return 'Select Month';
        return format(currentMonth, 'MMMM yyyy');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Monthly Summary" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
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
                                selected={anchorDate ?? undefined}
                                onSelect={jumpToMonth}
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
                <ChartMood chartData={chartDataMood} isActiveFilter={false} />
                <ChartHabit chartData={chartDataHabit} isActiveFilter={false} />
                <ChartExp chartData={chartDataExp} isActiveFilter={false} />
                <ChartExpense
                    chartData={chartDataExpense}
                    isActiveFilter={false}
                />
            </div>
        </AppLayout>
    );
}
