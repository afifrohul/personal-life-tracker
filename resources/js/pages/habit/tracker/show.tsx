import { ChartDetailHabit } from '@/components/chart-detail-habit';
import HabitGrid from '@/components/habit-grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import calculateStreaks from '@/lib/calculate-streak';
import { lucideIcons } from '@/lib/lucide-icons';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FlameIcon, ZapIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit Tracker',
        href: '/tracker',
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

type Habit = {
    id: number;
    name: string;
    color: string;
    exp: number;
    icon: string;
    habit_category: Category;
    habit_logs: Log[];
};

interface ShowProps {
    habit: Habit;
    chartData: [];
    gridData: {
        id: number;
        year: string;
        date: string;
    }[];
    uniqueYears: number[];
}

export default function Show({
    habit,
    chartData,
    gridData,
    uniqueYears,
}: ShowProps) {
    const dateString = gridData.map((d) => new Date(d.date));

    const { currentStreak, longestStreak } = calculateStreaks(dateString);

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={habit.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Detail Habit Tracker — {habit.name}
                            </CardTitle>
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
                                                    <FlameIcon className="h-3.5 w-3.5 fill-orange-400 text-orange-600" />
                                                    <p className="font-semibold text-orange-600">
                                                        {longestStreak} Streak
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-1">
                                                    <ZapIcon className="h-3.5 w-3.5 fill-yellow-400 text-yellow-600" />
                                                    <p className="font-semibold text-yellow-600">
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
                    <ChartDetailHabit
                        chartData={chartData}
                        uniqueYears={uniqueYears}
                        color={habit.color}
                    />
                    <div>
                        <HabitGrid
                            gridData={gridData}
                            uniqueYears={uniqueYears}
                            color={habit.color}
                        ></HabitGrid>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
