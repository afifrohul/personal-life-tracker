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
import { formatRupiah } from '@/lib/format-rupiah';
import { formatRupiahShort } from '@/lib/format-rupiah-short';

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
        income: number;
        expense: number;
    }[];
}

export function ChartFinanceYear({ chartData }: ChartProps) {
    const maxValue = Math.max(
        ...chartData.flatMap((item) => [item.income, item.expense]),
    );

    const upperDomain = Math.ceil(maxValue * 1.15);

    return (
        <Card>
            <CardHeader>
                <div className="space-y-1">
                    <CardTitle>Total Income and Expense per Year</CardTitle>
                    <CardDescription>
                        Showing total income and expense per year
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                >
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
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
                            content={<ChartTooltipContent indicator="dashed" />}
                            formatter={(value, name) => (
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-2.5 w-2.5 rounded-[2px]"
                                        style={
                                            {
                                                backgroundColor: `var(--color-${name})`,
                                            } as React.CSSProperties
                                        }
                                    />
                                    {
                                        chartConfig[
                                            name as keyof typeof chartConfig
                                        ]?.label
                                    }
                                    <span className="ml-auto font-semibold tabular-nums">
                                        {formatRupiah(Number(value))}
                                    </span>
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
