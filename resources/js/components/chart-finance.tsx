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

export const description = 'A multiple bar chart';

const chartConfig = {
    income: {
        label: 'Income',
        color: '#14b8a6',
    },
    expense: {
        label: 'Expense',
        color: '#f43f5e',
    },
} satisfies ChartConfig;

interface ChartProps {
    chartData: {
        year: number;
        month: string;
        income: number;
        expense: number;
    }[];
    uniqueYears: [];
}

export function ChartFinance({ chartData, uniqueYears }: ChartProps) {
    const [year, setYear] = useState(String(new Date().getFullYear()));

    const filteredChartData = chartData.filter((data) => {
        return data.year === Number(year);
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div className="space-y-1">
                        <CardTitle>
                            Total Income and Expense per Year
                        </CardTitle>
                        <CardDescription>
                            Showing total income and expense in {year}
                        </CardDescription>
                    </div>
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
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                >
                    <BarChart accessibilityLayer data={filteredChartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
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
                                            {formatRupiah(Number(value))}
                                        </p>
                                    </div>
                                </div>
                            )}
                        />
                        <Bar
                            dataKey="income"
                            fill="var(--color-income)"
                            radius={4}
                        />
                        <Bar
                            dataKey="expense"
                            fill="var(--color-expense)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
