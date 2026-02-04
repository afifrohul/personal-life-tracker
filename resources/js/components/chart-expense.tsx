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
    uniqueYears: [];
}

export function ChartExpense({ chartData, uniqueYears }: ChartProps) {
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [year, setYear] = useState(String(new Date().getFullYear()));

    const filteredChartData = chartData.filter((data) => {
        const date = new Date(data.date);
        const dateYear = date.getFullYear();
        const dateMonth = date.getMonth() + 1;

        return String(dateYear) === year && String(dateMonth) === month;
    });

    return (
        <Card className="py-4">
            <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                <div className="flex w-full justify-between px-4 pb-4">
                    <div className="flex flex-1 flex-col justify-center gap-1">
                        <CardTitle>Daily Expense</CardTitle>
                        <CardDescription>
                            Showing daily expense per month
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select value={month} onValueChange={setMonth}>
                            <SelectTrigger
                                className="hidden w-36 rounded-lg sm:ml-auto sm:flex"
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
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger
                                className="hidden w-28 rounded-lg sm:ml-auto sm:flex"
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
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[180px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={filteredChartData}
                        margin={{ top: 24, left: 12, right: 12 }}
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
                                    formatter={(value, name) => (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                                                style={
                                                    {
                                                        '--color-bg': `var(--color-${name})`,
                                                    } as React.CSSProperties
                                                }
                                            />
                                            {chartConfig[
                                                name as keyof typeof chartConfig
                                            ]?.label || name}
                                            <div className="ml-auto flex items-baseline gap-0.5 font-medium text-foreground tabular-nums">
                                                <p
                                                    className="font-semibold text-(--color-bg)"
                                                    style={
                                                        {
                                                            '--color-bg': `var(--color-${name})`,
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    {formatRupiah(
                                                        Number(value),
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                />
                            }
                        />
                        <Line
                            dataKey="expense"
                            type="monotone"
                            stroke={`var(--color-expense`}
                            strokeWidth={2}
                            dot={{
                                fill: 'var(--color-expense)',
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
