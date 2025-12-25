import { HabitFilter } from '@/components/habit-filter';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { lucideIcons } from '@/lib/lucide-icons';
import { BreadcrumbItem } from '@/types';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit Calendar',
        href: '/habit-calendar',
    },
];

type User = {
    name: string;
    email: string;
    avatar: string;
    created_at: string;
    profile_stat: {
        level: number;
        level_exp: number;
        remaining_exp: number;
        total_exp: number;
        exp_to_next_level: number;
    };
};

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
    user: User;
    logs: Log[];
    habits: Habit[];
    validHabitIds: [];
    categories: Category[];
    weeklyLog: Record<string, any[]>;
    dates: {
        key: string;
        label: string;
    }[];
    chartDataHabit: [];
    chartDataExp: [];
    expGainByCategory: [];
    expGainByHabit: [];
}

export default function Index({ logs, habits, validHabitIds }: LogIndexProps) {
    const events = logs.map((log) => ({
        ...log,
        id: log.id.toString(),
    }));

    const [selectedHabits, setSelectedHabits] =
        useState<number[]>(validHabitIds);

    const updateFilter = (values: number[]) => {
        setSelectedHabits(values);

        router.get(
            '/habit-calendar',
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
            <Head title="Habit Calendar" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="py-3">
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
