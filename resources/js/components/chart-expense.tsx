'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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
import { formatRupiah } from '@/lib/format-rupiah';
import { useState } from 'react';

export const description = 'An interactive line chart';

const chartConfig = {
    views: {
        label: 'Expense',
    },
    expense: {
        label: 'Expense',
        color: '#f43f5e',
    },
} satisfies ChartConfig;

interface ChartProps {
    chartData: {
        date: string;
        expense: number;
    }[];
    chartName?: string;
    chartDescription?: string;
    isActiveFilter?: boolean;
    uniqueYears?: [];
}

export function ChartExpense({
    chartData,
    chartName = 'Daily Expense',
    chartDescription = 'Showing daily expense in specified time range',
    isActiveFilter = true,
    uniqueYears,
}: ChartProps) {
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [year, setYear] = useState(String(new Date().getFullYear()));

    const processedData = chartData
        .slice()
        .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

    const finalData = isActiveFilter
        ? processedData.filter((item) => {
              const date = new Date(item.date);
              return (
                  String(date.getFullYear()) === year &&
                  String(date.getMonth() + 1) === month
              );
          })
        : processedData;

    return (
        <Card className="py-4">
            <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                <div className="flex w-full justify-between px-4 pb-4">
                    <div className="flex flex-1 flex-col justify-center gap-1">
                        <CardTitle>{chartName}</CardTitle>
                        <CardDescription>{chartDescription}</CardDescription>
                    </div>

                    {isActiveFilter && (
                        <div className="flex items-center gap-4">
                            <Select value={month} onValueChange={setMonth}>
                                <SelectTrigger className="hidden w-36 rounded-lg sm:flex">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {[
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                        'August',
                                        'September',
                                        'October',
                                        'November',
                                        'December',
                                    ].map((m, i) => (
                                        <SelectItem
                                            key={i}
                                            value={String(i + 1)}
                                        >
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={year} onValueChange={setYear}>
                                <SelectTrigger className="hidden w-28 rounded-lg sm:flex">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {uniqueYears?.map((item, index) => (
                                        <SelectItem
                                            key={index}
                                            value={String(item)}
                                        >
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[180px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={finalData}
                        margin={{
                            top: 24,
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
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }
                        />

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
                                    formatter={(value) =>
                                        formatRupiah(Number(value))
                                    }
                                />
                            }
                        />

                        <Line
                            dataKey="expense"
                            type="monotone"
                            stroke="var(--color-expense)"
                            strokeWidth={2}
                            dot={{
                                fill: 'var(--color-expense)',
                            }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
