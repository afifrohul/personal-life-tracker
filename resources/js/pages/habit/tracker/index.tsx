import { ChartExp } from '@/components/chart-exp';
import ChartExpGainByCategory from '@/components/chart-exp-gain-by-category';
import ChartExpGainByHabit from '@/components/chart-exp-gain-by-habit';
import { ChartHabit } from '@/components/chart-habit';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { lucideIcons } from '@/lib/lucide-icons';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronsRight, Square, SquareCheck } from 'lucide-react';

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

type Category = {
    id: number;
    name: string;
    icon: string;
    habits: Habit[];
};

interface LogIndexProps {
    habits: Habit[];
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

export default function Index({
    habits,
    categories,
    weeklyLog,
    dates,
    chartDataHabit,
    chartDataExp,
    expGainByCategory,
    expGainByHabit,
}: LogIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habit Tracker" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="p-0">
                    <CardContent>
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            defaultValue="item-1"
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Habit List</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {habits.length > 1 ? (
                                        <div className="grid w-full grid-cols-3 gap-4">
                                            {categories?.map((item, index) => {
                                                const iconCategoryName =
                                                    item.icon;
                                                const IconCategoryComponent = (
                                                    lucideIcons as Record<
                                                        string,
                                                        any
                                                    >
                                                )[iconCategoryName];

                                                return (
                                                    <Card
                                                        key={index}
                                                        className="w-full gap-3 border p-4"
                                                    >
                                                        <CardHeader className="p-0">
                                                            <div className="flex items-center gap-2">
                                                                <IconCategoryComponent className="h-3.5 w-3.5" />
                                                                <p className="text-sm">
                                                                    {item.name}
                                                                </p>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="space-y-1.5">
                                                                {item.habits?.map(
                                                                    (
                                                                        h,
                                                                        index,
                                                                    ) => {
                                                                        const iconHabitName =
                                                                            h.icon;
                                                                        const IconHabitComponent =
                                                                            (
                                                                                lucideIcons as Record<
                                                                                    string,
                                                                                    any
                                                                                >
                                                                            )[
                                                                                iconHabitName
                                                                            ];
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
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
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            h.name
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                <Link
                                                                                    href={`/habit-tracker/${h.id}`}
                                                                                >
                                                                                    <div className="flex items-center gap-1 rounded bg-accent px-1 py-0.5 text-xs italic duration-200 hover:bg-muted hover:text-muted-foreground">
                                                                                        Track
                                                                                        <ChevronsRight className="h-3 w-3" />
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <p className="text-xs">
                                                No data found.
                                            </p>
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
                <Card className="p-1.5">
                    <div className="overflow-x-auto rounded">
                        {habits.length > 1 ? (
                            <table className="min-w-full text-xs">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-2 text-left">
                                            Habit
                                        </th>
                                        {dates.map((d) => (
                                            <th
                                                key={d.key}
                                                className="px-4 py-2"
                                            >
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
                                                        weeklyLog[
                                                            habit.id
                                                        ]?.some(
                                                            (l) =>
                                                                l.date ===
                                                                d.key,
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
                        ) : (
                            <div className="flex justify-center">
                                <p className="text-xs">
                                    History habit data found.
                                </p>
                            </div>
                        )}
                    </div>
                </Card>
                <ChartHabit chartData={chartDataHabit} />
                <div>
                    <ChartExp chartData={chartDataExp}></ChartExp>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ChartExpGainByCategory data={expGainByCategory} />
                    <ChartExpGainByHabit data={expGainByHabit} />
                </div>
            </div>
        </AppLayout>
    );
}
