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
import { formatRupiah } from '@/lib/format-rupiah';

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
}

export function ChartFinanceYear({ chartData }: ChartProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div className="space-y-1">
                        <CardTitle>Total Income and Expense per Year</CardTitle>
                        <CardDescription>
                            Showing total income and expense per year
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                >
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
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
