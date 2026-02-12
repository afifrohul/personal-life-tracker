'use client';

import { Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const chartConfig = {
    amounts: {
        label: 'Numbers',
    },
    bad: {
        label: 'Bad',
        color: '#f43f5e',
    },
    notGood: {
        label: 'Not Good',
        color: '#d97706',
    },
    okay: {
        label: 'Okay',
        color: '#eab308',
    },
    good: {
        label: 'Good',
        color: '#22c55e',
    },
    great: {
        label: 'Great',
        color: '#0d9488',
    },
} satisfies ChartConfig;

interface ChartProps {
    moodDistribution: [];
    uniqueYears: [];
}

export function ChartMoodByScore({
    moodDistribution,
    uniqueYears,
}: ChartProps) {
    const [monthMoodDistribution, setMonthMoodDistribution] = useState(
        String(new Date().getMonth() + 1),
    );
    const [yearMoodDistribution, setYearMoodDistribution] = useState(
        String(new Date().getFullYear()),
    );

    const applyFilter = (month: string, year: string) => {
        router.get(
            '/mood-tracker',
            {
                monthMoodDistribution: month,
                yearMoodDistribution: year,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <Card className="pt-0">
            <CardHeader className="flex flex-col items-stretch border-b p-4 sm:flex-row">
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-1 flex-col justify-center gap-1">
                        <CardTitle>Mood Distribution</CardTitle>
                        <CardDescription>
                            Shows the proportion of each mood
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select
                            value={monthMoodDistribution}
                            onValueChange={(value) => {
                                setMonthMoodDistribution(value);
                                applyFilter(value, yearMoodDistribution);
                            }}
                        >
                            <SelectTrigger
                                className="hidden w-32 rounded-lg sm:ml-auto sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="December" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="1" className="rounded-lg">
                                    January
                                </SelectItem>
                                <SelectItem value="2" className="rounded-lg">
                                    February
                                </SelectItem>
                                <SelectItem value="3" className="rounded-lg">
                                    March
                                </SelectItem>
                                <SelectItem value="4" className="rounded-lg">
                                    April
                                </SelectItem>
                                <SelectItem value="5" className="rounded-lg">
                                    May
                                </SelectItem>
                                <SelectItem value="6" className="rounded-lg">
                                    June
                                </SelectItem>
                                <SelectItem value="7" className="rounded-lg">
                                    July
                                </SelectItem>
                                <SelectItem value="8" className="rounded-lg">
                                    August
                                </SelectItem>
                                <SelectItem value="9" className="rounded-lg">
                                    September
                                </SelectItem>
                                <SelectItem value="10" className="rounded-lg">
                                    October
                                </SelectItem>
                                <SelectItem value="11" className="rounded-lg">
                                    November
                                </SelectItem>
                                <SelectItem value="12" className="rounded-lg">
                                    December
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={yearMoodDistribution}
                            onValueChange={(value) => {
                                setYearMoodDistribution(value);
                                applyFilter(monthMoodDistribution, value);
                            }}
                        >
                            <SelectTrigger
                                className="hidden w-22 rounded-lg sm:ml-auto sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="2025" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {uniqueYears?.map((item, index) => (
                                    <SelectItem
                                        key={index}
                                        value={String(item)}
                                        className="rounded-lg"
                                    >
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={moodDistribution}
                            dataKey="amounts"
                            label
                            nameKey="mood"
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="mood" />}
                            className="translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
