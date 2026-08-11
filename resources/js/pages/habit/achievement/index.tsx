import AllAchievementBadge from '@/components/all-achievement-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import calculateStreaks from '@/lib/calculate-streak';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit Achievement',
        href: '/achievement',
    },
];

type Log = {
    id: number;
    habit_id: number;
    exp_gain: number;
    date: string;
};

type Category = {
    id: number;
    name: string;
    icon: string;
};

type Achievement = {
    id: number;
    habit_id: number;
    achievement_type_id: number;
    created_at: string;
};

type Habit = {
    id: number;
    name: string;
    color: string;
    exp: number;
    icon: string;
    habit_category: Category;
    habit_logs: Log[];
    achievements: Achievement[];
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

interface IndexProps {
    achievementType: AchievementType[];
    habit: Habit;
    gridData: {
        id: number;
        year: string;
        date: string;
    }[];
}

export default function Index({
    achievementType,
    habit,
    gridData,
}: IndexProps) {
    const dateString = gridData.map((d) => new Date(d.date));

    const { longestStreak } = calculateStreaks(dateString);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={habit.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>List Habit Achievements</CardTitle>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {habit.habit_category.name} — {habit.name}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-2">
                                {achievementType.map((item, index) => (
                                    <AllAchievementBadge
                                        key={index}
                                        habit={habit}
                                        achievementType={item}
                                        longestStreak={longestStreak}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
