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
    chartName?: string;
    chartDescription?: string;
    isActiveFilter?: boolean;
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

export function ChartHabit({
    chartData,
    chartName = 'Daily Amount of Habit',
    chartDescription = 'Showing total amount habit over time',
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
            (a, b) =>
                new Date(a.date).getTime() -
                new Date(b.date).getTime(),
        );

    const finalData = isActiveFilter
        ? processedData.filter((item) => {
              const date = new Date(item.date);
              const from = new Date();
              from.setDate(from.getDate() - daysMap[timeRange]);
              return date >= from;
          })
        : processedData;

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>{chartName}</CardTitle>
                    <CardDescription>{chartDescription}</CardDescription>
                </div>

                {isActiveFilter && (
                    <Select
                        value={timeRange}
                        onValueChange={(v) =>
                            setTimeRange(v as any)
                        }
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
                            <SelectItem value="7d">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                )}

            </CardHeader>

            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[180px] w-full"
                >
                    <AreaChart
                        data={finalData}
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
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'short',
                                        day: 'numeric',
                                    },
                                )
                            }
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) =>
                                        new Date(
                                            value,
                                        ).toLocaleDateString(
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

                        <ChartLegend
                            content={<ChartLegendContent />}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

