'use client';

import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

type Chart = {
    date: string;
    habit: number;
};

interface ChartProps {
    chartData: Chart[];
    chartName?: string;
    chartDescription?: string;
    isActiveFilter?: boolean;
}

const chartConfig = {
    habit: {
        label: 'Habit Done',
        color: 'var(--chart-1)',
    },
    average: {
        label: 'Average',
        color: '#94a3b8',
    },
} satisfies ChartConfig;

export function ChartHabit({
    chartData,
    chartName = 'Daily Amount of Habit',
    chartDescription = 'Showing total amount habit done over time',
    isActiveFilter = true,
}: ChartProps) {
    const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d' | '90d'>(
        '7d',
    );

    const daysMap = {
        '7d': 7,
        '14d': 14,
        '30d': 30,
        '90d': 90,
    };

    const processedData = chartData
        .slice()
        .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

    const finalData = isActiveFilter
        ? processedData.filter((item) => {
              const date = new Date(item.date);
              const from = new Date();
              from.setDate(from.getDate() - daysMap[timeRange]);
              return date >= from;
          })
        : processedData;

    const average =
        finalData.length > 0
            ? finalData.reduce((sum, item) => sum + Number(item.habit), 0) /
              finalData.length
            : 0;

    const chartWithAverage = finalData.map((item) => ({
        ...item,
        average,
    }));

    return (
        <Card className="py-4">
            <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                <div className="flex w-full justify-between px-4 pb-4">
                    <div className="grid flex-1 gap-1">
                        <CardTitle>{chartName}</CardTitle>
                        <CardDescription>{chartDescription}</CardDescription>
                    </div>

                    {isActiveFilter && (
                        <Select
                            value={timeRange}
                            onValueChange={(v) => setTimeRange(v as any)}
                        >
                            <SelectTrigger
                                className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 7 days" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem
                                    value="90d"
                                    disabled={chartData.length < 90}
                                >
                                    Last 3 months
                                </SelectItem>
                                <SelectItem
                                    value="30d"
                                    disabled={chartData.length < 30}
                                >
                                    Last 30 days
                                </SelectItem>
                                <SelectItem
                                    value="14d"
                                    disabled={chartData.length < 14}
                                >
                                    Last 14 days
                                </SelectItem>
                                <SelectItem value="7d">Last 7 days</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </CardHeader>

            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[180px] w-full"
                >
                    <AreaChart
                        data={chartWithAverage}
                        margin={{
                            top: 16,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="fillHabit"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--chart-1)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--chart-1)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            padding={{ left: 10, right: 10 }}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }
                        />

                        <YAxis tickLine={false} axisLine={false} width={20} />

                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            },
                                        )
                                    }
                                    indicator="dot"
                                />
                            }
                        />

                        <Area
                            dataKey="habit"
                            type="natural"
                            fill="url(#fillHabit)"
                            stroke="var(--chart-1)"
                            stackId="a"
                        />
                        <Area
                            dataKey="average"
                            type="natural"
                            fill="url(#fillAverage)"
                            stroke="var(--color-average)"
                            strokeDasharray="4 4"
                            stackId="b"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
