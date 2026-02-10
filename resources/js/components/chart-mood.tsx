'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    ChartContainer,
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

type MoodChartData = {
    date: string;
    mood_score: 1 | 2 | 3 | 4 | 5;
};

const chartConfig = {
    mood_score: {
        label: 'Mood',
    },
} satisfies ChartConfig;

const moodColors: Record<number, string> = {
    1: '#f43f5e',
    2: '#d97706',
    3: '#eab308',
    4: '#22c55e',
    5: '#0d9488',
};

const moodLabels: Record<number, string> = {
    1: 'Bad 😞',
    2: 'Not Good 😕',
    3: 'Okay 😐',
    4: 'Good 🙂',
    5: 'Great 😄',
};

interface ChartMoodProps {
    chartData: MoodChartData[];
    chartName?: string;
    chartDescription?: string;
    isActiveFilter?: boolean;
}

export function ChartMood({
    chartData,
    chartName = 'Daily Mood',
    chartDescription = 'Mood history over time',
    isActiveFilter = true,
}: ChartMoodProps) {
    const [range, setRange] = useState<'7d' | '14d' | '30d' | '90d'>('7d');

    const daysMap = {
        '7d': 7,
        '14d': 14,
        '30d': 30,
        '90d': 90,
    };

    const processedData = chartData
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((item) => ({
            ...item,
            color: moodColors[item.mood_score],
        }));

    const filteredData = isActiveFilter
        ? processedData.filter((item) => {
              const date = new Date(item.date);
              const from = new Date();
              from.setDate(from.getDate() - daysMap[range]);
              return date >= from;
          })
        : processedData;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex flex-col gap-1">
                    <CardTitle>{chartName}</CardTitle>
                    <CardDescription>{chartDescription}</CardDescription>
                </div>

                {isActiveFilter && (
                    <Select
                        value={range}
                        onValueChange={(v) => setRange(v as any)}
                    >
                        <SelectTrigger
                            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
                            aria-label="Select a value"
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                value="90d"
                                className="rounded-lg"
                                disabled={chartData.length < 90}
                            >
                                Last 3 months
                            </SelectItem>
                            <SelectItem
                                value="30d"
                                className="rounded-lg"
                                disabled={chartData.length < 30}
                            >
                                Last 30 days
                            </SelectItem>
                            <SelectItem
                                value="14d"
                                className="rounded-lg"
                                disabled={chartData.length < 14}
                            >
                                Last 14 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[180px] w-full"
                >
                    <BarChart data={filteredData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        });
                                    }}
                                />
                            }
                            formatter={(value, _name, item) => {
                                const color = item.payload.color;

                                return (
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                            style={{ backgroundColor: color }}
                                        />
                                        <p>Mood</p>
                                        <p className="ml-auto font-medium">
                                            {moodLabels[value as number]}
                                        </p>
                                    </div>
                                );
                            }}
                        />

                        <Bar dataKey="mood_score" radius={[4, 4, 0, 0]}>
                            {filteredData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
