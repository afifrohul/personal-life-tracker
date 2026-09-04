import { HabitFilter } from '@/components/habit-filter';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import type { Habit, HabitLog } from '@/types/data';
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

interface LogIndexProps {
    logs: HabitLog[];
    habits: Habit[];
    validHabitIds: [];
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
                                right: 'dayGridYear,dayGridMonth,dayGridWeek',
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
