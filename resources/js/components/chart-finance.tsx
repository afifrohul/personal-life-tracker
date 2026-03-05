'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
import { formatRupiahShort } from '@/lib/format-rupiah-short';
import { useState } from 'react';

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

    const maxValue = Math.max(
        ...filteredChartData.flatMap((item) => [item.expense]),
    );
    const upperDomain = Math.ceil(maxValue * 1.15);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div className="space-y-1">
                        <CardTitle>
                            Total Income and Expense per Month
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
                    className="h-[180px] w-full"
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
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={48}
                            domain={[0, upperDomain]}
                            tickFormatter={(value) =>
                                formatRupiahShort(Number(value))
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                            formatter={(value, name, item, index) => (
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                                            style={
                                                {
                                                    '--color-bg': `var(--color-${name})`,
                                                } as React.CSSProperties
                                            }
                                        />
                                        <div className="flex gap-6">
                                            <p>
                                                {chartConfig[
                                                    name as keyof typeof chartConfig
                                                ]?.label || name}
                                            </p>
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
                                    </div>
                                    {index === 1 && (
                                        <div>
                                            <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                                Balance
                                                <div className="ml-auto flex items-baseline gap-0.5 text-foreground tabular-nums">
                                                    {formatRupiah(
                                                        item.payload.income -
                                                            item.payload
                                                                .expense,
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex basis-full items-center pt-1.5 text-xs font-medium text-foreground">
                                                Saving Rate
                                                <div className="ml-auto flex items-baseline gap-0.5 text-foreground tabular-nums">
                                                    {item.payload.income ===
                                                        0 &&
                                                    item.payload.expense === 0
                                                        ? 0
                                                        : (
                                                              ((item.payload
                                                                  .income -
                                                                  item.payload
                                                                      .expense) /
                                                                  item.payload
                                                                      .income) *
                                                              100
                                                          ).toFixed(2)}
                                                    %
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
