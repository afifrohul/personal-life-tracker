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
import { addWeeks, endOfWeek, format, startOfWeek } from 'date-fns';
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
        title: 'Weekly Summary',
        href: '/weekly-summary',
    },
];

type Insight = {
    value: number;
    previous: number;
    change_percent: number;
    trend: 'up' | 'down' | 'neutral';
};

interface WeeklyProps {
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

export default function Weekly({
    selectedStartDate,
    selectedEndDate,
    chartDataMood,
    chartDataHabit,
    chartDataExp,
    chartDataExpense,
    insights,
}: WeeklyProps) {
    console.log(insights);

    const [open, setOpen] = useState(false);

    function parseDate(date: string) {
        const [y, m, d] = date.split('-').map(Number);
        return new Date(y, m - 1, d);
    }

    const [startDate, setStartDate] = useState<Date | null>(
        selectedStartDate ? parseDate(selectedStartDate) : null,
    );

    const [endDate, setEndDate] = useState<Date | null>(
        selectedEndDate ? parseDate(selectedEndDate) : null,
    );

    const [anchorDate, setAnchorDate] = useState<Date | null>(null);

    function getWeekRange(date: Date) {
        const start = startOfWeek(date, { weekStartsOn: 0 });
        const end = endOfWeek(date, { weekStartsOn: 0 });
        return { start, end };
    }

    function updateViewParams(start: Date, end: Date) {
        router.get(
            '/weekly-summary',
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

    function goToPrevWeek() {
        if (!startDate) return;
        const target = addWeeks(startDate, -1);
        const { start, end } = getWeekRange(target);
        setStartDate(start);
        setEndDate(end);
        updateViewParams(start, end);
    }

    function goToNextWeek() {
        if (!startDate) return;
        const target = addWeeks(startDate, 1);
        const { start, end } = getWeekRange(target);
        setStartDate(start);
        setEndDate(end);
        updateViewParams(start, end);
    }

    function jumpToWeek(date?: Date) {
        if (!date) return;
        const { start, end } = getWeekRange(date);
        setStartDate(start);
        setEndDate(end);
        setOpen(false);
        updateViewParams(start, end);
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
                                selected={anchorDate ?? undefined}
                                onSelect={jumpToWeek}
                            />
                        </PopoverContent>
                    </Popover>

                    <Button variant="outline" onClick={goToNextWeek}>
                        <ChevronRight />
                    </Button>
                </div>

                <div className="flex w-full items-center gap-4">
                    <InsightCard
                        type="mood"
                        range="week"
                        title="Mood Score Average"
                        icon={
                            <Sticker className="h-4 w-4 text-muted-foreground" />
                        }
                        value={insights.mood.value}
                        change_percent={insights.mood.change_percent}
                        trend={insights.mood.trend}
                    />
                    <InsightCard
                        type="habit_done"
                        range="week"
                        title="Total Habit Done"
                        icon={
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        }
                        value={insights.habit.value}
                        change_percent={insights.habit.change_percent}
                        trend={insights.habit.trend}
                    />
                    <InsightCard
                        type="exp_gain"
                        range="week"
                        title="Total EXP Gain"
                        icon={
                            <Award className="h-4 w-4 text-muted-foreground" />
                        }
                        value={insights.exp_gain.value}
                        change_percent={insights.exp_gain.change_percent}
                        trend={insights.exp_gain.trend}
                    />
                    <InsightCard
                        type="expense"
                        range="week"
                        title="Total Expense"
                        icon={
                            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                        }
                        value={formatRupiah(insights.expense.value)}
                        change_percent={insights.expense.change_percent}
                        trend={insights.expense.trend}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <ChartMood
                        chartData={chartDataMood}
                        isActiveFilter={false}
                    />
                    <ChartExpense
                        chartData={chartDataExpense}
                        isActiveFilter={false}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ChartHabit
                        chartData={chartDataHabit}
                        isActiveFilter={false}
                    />
                    <ChartExp chartData={chartDataExp} isActiveFilter={false} />
                </div>
            </div>
        </AppLayout>
    );
}
