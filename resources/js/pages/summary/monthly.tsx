'use client';

import { ChartExp } from '@/components/chart-exp';
import { ChartExpense } from '@/components/chart-expense';
import { ChartHabit } from '@/components/chart-habit';
import { ChartMood } from '@/components/chart-mood';
import InsightCard from '@/components/insight-card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/format-rupiah';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { addMonths, endOfMonth, format, startOfMonth } from 'date-fns';
import {
    Award,
    ChevronDownIcon,
    ChevronLeft,
    ChevronRight,
    CircleDollarSign,
    Sticker,
    UserCheck,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Monthly Summary',
        href: '/monthly-summary',
    },
];

type Insight = {
    value: number;
    previous: number;
    change_percent: number;
    trend: 'up' | 'down' | 'neutral';
};

interface MonthlyProps {
    selectedStartDate: string;
    selectedEndDate: string;
    chartDataMood: [];
    chartDataHabit: [];
    chartDataExp: [];
    chartDataExpense: [];
    insights: {
        mood: Insight;
        habit: Insight;
        exp_gain: Insight;
        expense: Insight;
    };
}

export default function Monthly({
    selectedStartDate,
    selectedEndDate,
    chartDataMood,
    chartDataHabit,
    chartDataExp,
    chartDataExpense,
    insights,
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

                <div className="flex w-full items-center gap-4">
                    <InsightCard
                        type="month"
                        title="Mood Score Average"
                        icon={
                            <Sticker className="h-4 w-4 text-muted-foreground" />
                        }
                        value={insights.mood.value}
                        change_percent={insights.mood.change_percent}
                        trend={insights.mood.trend}
                    />
                    <InsightCard
                        type="month"
                        title="Total Habit Done"
                        icon={
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        }
                        value={insights.habit.value}
                        change_percent={insights.habit.change_percent}
                        trend={insights.habit.trend}
                    />
                    <InsightCard
                        type="month"
                        title="Total EXP Gain"
                        icon={
                            <Award className="h-4 w-4 text-muted-foreground" />
                        }
                        value={insights.exp_gain.value}
                        change_percent={insights.exp_gain.change_percent}
                        trend={insights.exp_gain.trend}
                    />
                    <InsightCard
                        type="month"
                        title="Total Expense"
                        icon={
                            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                        }
                        value={formatRupiah(insights.expense.value)}
                        change_percent={insights.expense.change_percent}
                        trend={insights.expense.trend}
                    />
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
