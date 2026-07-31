import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import calculateStreaks from '@/lib/calculate-streak';
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { FlameIcon, ZapIcon } from 'lucide-react';
import { useState } from 'react';

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
    color_code: string;
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

    const { currentStreak, longestStreak } = calculateStreaks(dateString);

    const todayStreak = dateString.some(
        (date) => date.toDateString() === new Date().toDateString(),
    );

    const iconCategoryName = habit.habit_category.icon;
    const IconCategoryComponent = (lucideIcons as Record<string, any>)[
        iconCategoryName
    ];

    const iconHabitName = habit.icon;
    const IconHabitComponent = (lucideIcons as Record<string, any>)[
        iconHabitName
    ];

    const total_exp = habit.habit_logs.reduce((accumulator, current_value) => {
        return accumulator + current_value.exp_gain;
    }, 0);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const claimAchievement = (achievement_type_id: number) => {
        console.log(achievement_type_id);
        router.post(
            `/habit-tracker/${habit.id}/achievement`,
            {
                achievement_type_id: achievement_type_id,
            },
            {
                onSuccess: () => setIsSubmitting(false),
                onError: () => setIsSubmitting(false),
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={habit.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Habit — {habit.name}</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div>
                                <table className="min-w-full text-xs">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="px-4 py-2">
                                                Habit Name
                                            </th>
                                            <th className="px-4 py-2">
                                                Category Habit
                                            </th>
                                            <th className="px-4 py-2">
                                                Total Habit Done
                                            </th>
                                            <th className="px-4 py-2">
                                                Total Exp Gain
                                            </th>
                                            <th className="px-4 py-2">
                                                Longest Streak
                                            </th>
                                            <th className="px-4 py-2">
                                                Current Streak
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-2">
                                                    <IconHabitComponent
                                                        className="h-3.5 w-3.5"
                                                        style={{
                                                            color: habit.color,
                                                        }}
                                                    />
                                                    <p>{habit.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-2">
                                                    <IconCategoryComponent className="h-3.5 w-3.5" />
                                                    <p>
                                                        {
                                                            habit.habit_category
                                                                .name
                                                        }
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                {habit.habit_logs.length} Reps
                                            </td>
                                            <td className="px-4 py-2">
                                                <p
                                                    style={{
                                                        color: habit.color,
                                                    }}
                                                    className="font-semibold"
                                                >
                                                    +{total_exp} Exp
                                                </p>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-1">
                                                    <ZapIcon className="h-3.5 w-3.5 fill-yellow-400 text-yellow-600" />
                                                    <p className="font-semibold text-yellow-600">
                                                        {longestStreak} Streak
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-1">
                                                    <FlameIcon
                                                        className={`h-3.5 w-3.5 ${todayStreak ? 'fill-orange-400 text-orange-600' : 'text-muted-foreground'} `}
                                                    />
                                                    <p
                                                        className={`font-semibold ${todayStreak ? 'text-orange-600' : 'text-muted-foreground'} `}
                                                    >
                                                        {currentStreak} Streak
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                List Achievements — {habit.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                                {achievementType.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex w-full items-center justify-between rounded border p-2"
                                    >
                                        <div className="item flex gap-2">
                                            <div
                                                className="w-fit rounded border p-2"
                                                style={{
                                                    backgroundColor:
                                                        item.color_code,
                                                }}
                                            >
                                                <IconHabitComponent className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                        {habit.achievements.find(
                                            (acv) =>
                                                acv.achievement_type_id ===
                                                item.id,
                                        ) ? (
                                            <div className="text-xs italic">
                                                Earned{' '}
                                                {format(
                                                    new Date(
                                                        habit.achievements.find(
                                                            (acv) =>
                                                                acv.achievement_type_id ===
                                                                item.id,
                                                        )?.created_at as string,
                                                    ),
                                                    'dd MMMM yyyy',
                                                )}
                                            </div>
                                        ) : (item.trigger === 'reps' &&
                                              habit.habit_logs.length >=
                                                  item.criteria) ||
                                          (item.trigger === 'streak' &&
                                              longestStreak >=
                                                  item.criteria) ? (
                                            <Button
                                                className="text-xs italic"
                                                size={'sm'}
                                                onClick={() =>
                                                    claimAchievement(item.id)
                                                }
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting
                                                    ? 'Claiming...'
                                                    : 'Claim'}
                                            </Button>
                                        ) : item.trigger === 'reps' ? (
                                            <div>
                                                <p className="text-xs text-muted-foreground italic">
                                                    {habit.habit_logs.length} /{' '}
                                                    {item.criteria}
                                                </p>
                                            </div>
                                        ) : item.trigger === 'streak' ? (
                                            <div>
                                                <p className="text-xs text-muted-foreground italic">
                                                    {longestStreak} /{' '}
                                                    {item.criteria}
                                                </p>
                                            </div>
                                        ) : (
                                            <Button
                                                className="text-xs italic"
                                                size={'sm'}
                                                variant={'secondary'}
                                                disabled
                                            >
                                                Claim
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
