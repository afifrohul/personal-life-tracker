'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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

export const description = 'An interactive bar chart';

type Chart = {
    date: string;
    exp: number;
};

interface ChartProps {
    chartData: Chart[];
}

const chartConfig = {
    views: {
        label: 'Exp Gain',
    },
    exp: {
        label: 'Exp Gain',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function ChartExp({ chartData }: ChartProps) {
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
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b p-4 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1">
                    <CardTitle>Daily Exp Gain</CardTitle>
                    <CardDescription>
                        Showing total exp gain for the last {timeRange}
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
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[220px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={filteredData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
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
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
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
                        />
                        <Bar dataKey="exp" fill="var(--chart-1)" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
