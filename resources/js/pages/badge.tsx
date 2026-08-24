import LatestAchievementBadge from '@/components/latest-achievement-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Badge',
        href: '/badge-habit',
    },
];

type Habit = {
    id: number;
    name: string;
    color: string;
    exp: number;
    icon: string;
};

type AchievementType = {
    id: number;
    name: string;
    desc: string;
    image: string;
    type: string;
    criteria: number;
    trigger: string;
};

type Achievement = {
    id: number;
    habit_id: number;
    achievement_type_id: number;
    created_at: string;
    habit: Habit;
    achievement_type: AchievementType;
};

interface BadgeProps {
    achievement: Achievement[];
    habits: Habit[];
}

export default function Badge({ achievement, habits }: BadgeProps) {
    const [habitFilter, setHabitFilter] = useState('all');

    const applyFilter = (habit_id: string | number) => {
        router.get(
            '/badge-habit',
            {
                habit_id: habit_id,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Badge" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Badge Collection</CardTitle>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Completed Habit Achievement Badge
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 space-y-1">
                                <p className="text-xs font-semibold">
                                    Filter by habit
                                </p>
                                <Select
                                    value={habitFilter}
                                    onValueChange={(value) => {
                                        setHabitFilter(value);
                                        applyFilter(value);
                                    }}
                                >
                                    <SelectTrigger
                                        className="hidden w-full rounded-lg sm:ml-auto sm:flex"
                                        aria-label="Select a value"
                                    >
                                        <SelectValue placeholder="December" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem
                                            value="all"
                                            className="rounded-lg"
                                        >
                                            All Habit
                                        </SelectItem>
                                        {habits.map((item, index) => (
                                            <SelectItem
                                                key={index}
                                                value={String(item.id)}
                                                className="rounded-lg"
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {achievement.length > 0 ? (
                                <div className="grid grid-cols-4 gap-2">
                                    {achievement.map((item, index) => (
                                        <LatestAchievementBadge
                                            key={index}
                                            data={item}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <p className="text-xs">No data found.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
