import { ChartHabit } from '@/components/chart-habit';
import { HabitFilter } from '@/components/habit-filter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { lucideIcons } from '@/lib/lucide-icons';
import { BreadcrumbItem } from '@/types';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Head, Link, router } from '@inertiajs/react';
import { Square, SquareCheck } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit Tracker',
        href: '/habit-tracker',
    },
];

type Habit = {
    id: number;
    name: string;
    icon: string;
    color: string;
};

type Log = {
    id: number;
    exp_gain: number;
    date: string;
    habit: Habit;
};

type Category = {
    id: number;
    name: string;
    icon: string;
    habits: Habit[];
};

interface LogIndexProps {
    logs: Log[];
    habits: Habit[];
    validHabitIds: [];
    categories: Category[];
    weeklyLog: Record<string, any[]>;
    dates: {
        key: string;
        label: string;
    }[];
    chartData: [];
}

export default function Index({
    logs,
    habits,
    validHabitIds,
    categories,
    weeklyLog,
    dates,
    chartData,
}: LogIndexProps) {
    const events = logs.map((log) => ({
        ...log,
        id: log.id.toString(),
    }));

    const [selectedHabits, setSelectedHabits] =
        useState<number[]>(validHabitIds);

    const updateFilter = (values: number[]) => {
        setSelectedHabits(values);

        router.get(
            '/tracker',
            {
                habits: values,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const renderEventContent = (eventInfo: any) => {
        const iconName = eventInfo.event.extendedProps.icon;
        const IconComponent = (lucideIcons as Record<string, any>)[iconName];

        return (
            <div
                style={{ backgroundColor: eventInfo.event.extendedProps.color }}
                className="px-1 py-0.5"
            >
                <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <p>{eventInfo.event.title}</p>
                </div>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habit Tracker" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex w-full gap-4">
                    {categories?.map((item, index) => {
                        const iconCategoryName = item.icon;
                        const IconCategoryComponent = (
                            lucideIcons as Record<string, any>
                        )[iconCategoryName];

                        return (
                            <Card
                                key={index}
                                className="w-full gap-3 border p-4"
                            >
                                <CardHeader className="p-0">
                                    <div className="flex items-center gap-2">
                                        <IconCategoryComponent className="h-3.5 w-3.5" />
                                        <p className="text-sm">{item.name}</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-1.5">
                                        {item.habits?.map((h, index) => {
                                            const iconHabitName = h.icon;
                                            const IconHabitComponent = (
                                                lucideIcons as Record<
                                                    string,
                                                    any
                                                >
                                            )[iconHabitName];

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex justify-between rounded border px-1 py-0.5"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <IconHabitComponent
                                                            className="h-3 w-3"
                                                            style={{
                                                                color: h.color,
                                                            }}
                                                        />
                                                        <p
                                                            className="text-xs"
                                                            key={index}
                                                        >
                                                            {h.name}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={`/habit-tracker/${h.id}`}
                                                    >
                                                        <div className="rounded bg-accent px-1 py-0.5 text-xs underline duration-200 hover:bg-muted">
                                                            Track
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
                <Card className="p-1.5">
                    <div className="overflow-x-auto rounded">
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left">
                                        Habit
                                    </th>
                                    {dates.map((d) => (
                                        <th key={d.key} className="px-4 py-2">
                                            {d.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {habits.map((habit) => {
                                    const iconHabitName = habit.icon;
                                    const IconHabitComponent = (
                                        lucideIcons as Record<string, any>
                                    )[iconHabitName];
                                    return (
                                        <tr
                                            key={habit.id}
                                            className="text-center"
                                        >
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-3">
                                                    <IconHabitComponent
                                                        className="h-4 w-4"
                                                        style={{
                                                            color: habit.color,
                                                        }}
                                                    />
                                                    <p>{habit.name}</p>
                                                </div>
                                            </td>

                                            {dates.map((d) => {
                                                const isDone =
                                                    weeklyLog[habit.id]?.some(
                                                        (l) => l.date === d.key,
                                                    ) ?? false;

                                                return (
                                                    <td
                                                        key={d.key}
                                                        className="px-4 py-2"
                                                    >
                                                        {isDone ? (
                                                            <div className="flex justify-center">
                                                                <SquareCheck className="h-4 w-4 text-primary" />
                                                            </div>
                                                        ) : (
                                                            <div className="flex justify-center">
                                                                <Square className="h-4 w-4 text-muted" />
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
                <ChartHabit chartData={chartData} />
                <Card className='py-3'>
                    <div className="space-y-4 p-4 text-xs">
                        <div className="flex justify-start">
                            <HabitFilter
                                habits={habits}
                                selected={selectedHabits}
                                onChange={updateFilter}
                            />
                        </div>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridYear,dayGridMonth,dayGridWeek,dayGridDay',
                            }}
                            events={events}
                            eventContent={renderEventContent}
                            dayMaxEventRows={true}
                        />
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
