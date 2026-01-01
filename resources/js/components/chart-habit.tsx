'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
    ChartLegend,
    ChartLegendContent,
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
}

export const description = 'An interactive area chart';

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    habit: {
        label: 'Habit',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function ChartHabit({ chartData }: ChartProps) {
    const [timeRange, setTimeRange] = useState('7d');

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date();
        let daysToSubtract = 7;
        if (timeRange === '90d') {
            daysToSubtract = 90;
        } else if (timeRange === '30d') {
            daysToSubtract = 30;
        } else if (timeRange === '14d') {
            daysToSubtract = 14;
        } else if (timeRange === '7d') {
            daysToSubtract = 7;
        }

        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Daily Amount of Habit</CardTitle>
                    <CardDescription>
                        Showing total amount habit for the last {timeRange}
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
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
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[180px] w-full"
                >
                    <AreaChart
                        data={filteredData}
                        margin={{ top: 16 }}
                        className="mt-2"
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
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
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
                                            year: 'numeric'
                                        });
                                    }}
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
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
