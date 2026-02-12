'use client';

import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    XAxis,
    YAxis,
} from 'recharts';

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
    exp: number;
};

interface ChartProps {
    chartData: Chart[];
    chartName?: string;
    chartDescription?: string;
    isActiveFilter?: boolean;
}

const chartConfig = {
    exp: {
        label: 'Exp Gain',
        color: 'var(--chart-1)',
    },
    average: {
        label: 'Average',
        color: '#94a3b8',
    },
} satisfies ChartConfig;

export function ChartExp({
    chartData,
    chartName = 'Daily Exp Gain',
    chartDescription = 'Showing total exp gain over time',
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
            ? finalData.reduce((sum, item) => sum + Number(item.exp), 0) /
              finalData.length
            : 0;

    const chartWithAverage = finalData.map((item) => ({
        ...item,
        average,
    }));

    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b p-4 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1">
                    <CardTitle>{chartName}</CardTitle>
                    <CardDescription>{chartDescription}</CardDescription>
                </div>
                <Select
                    value={timeRange}
                    onValueChange={(v) => setTimeRange(v as any)}
                >
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
                    className="aspect-auto h-[180px] w-full"
                >
                    <ComposedChart
                        accessibilityLayer
                        data={chartWithAverage}
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
                        <YAxis tickLine={false} axisLine={false} width={20} />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="min-w-[150px]"
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
                        <Bar
                            dataKey="exp"
                            fill="var(--chart-1)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Line
                            dataKey="average"
                            type="monotone"
                            stroke="var(--color-average)"
                            strokeDasharray="4 4"
                            dot={false}
                            strokeWidth={1.5}
                        />
                    </ComposedChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
