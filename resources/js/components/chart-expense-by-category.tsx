'use client';

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
import { Pie, PieChart } from 'recharts';

import { formatRupiah } from '@/lib/format-rupiah';
import { router } from '@inertiajs/react';
import * as d3 from 'd3-scale-chromatic';
import { useState } from 'react';

interface ChartProps {
    data: {
        category: string;
        expense: number;
    }[];
    uniqueYears: [];
}

export default function ChartExpenseByCategory({
    data,
    uniqueYears,
}: ChartProps) {
    const [monthExpenseCategory, setMonthExpenseCategory] = useState(
        String(new Date().getMonth() + 1),
    );
    const [yearExpenseCategory, setYearExpenseCategory] = useState(
        String(new Date().getFullYear()),
    );

    const applyFilter = (month: string, year: string) => {
        router.get(
            '/finance-tracker',
            {
                expenseByCategoryMonth: month,
                expenseByCategoryYear: year,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const filteredData = data.filter((d) => {
        return d.expense > 0;
    });

    // const colors = d3.schemeSet3;
    const colors = d3.schemeReds[filteredData.length] ?? d3.schemeReds[3];

    const colorMap = filteredData.reduce<Record<string, string>>(
        (acc, item, index) => {
            acc[item.category] = colors[index];
            return acc;
        },
        {},
    );

    // Generate warna otomatis
    const coloredData = filteredData.map((item) => ({
        ...item,
        // fill: colors[index % colors.length],
        fill: colorMap[item.category],
    }));

    const chartConfig: ChartConfig = filteredData.reduce((acc, item) => {
        acc[item.category] = {
            label: item.category,
            color: colorMap[item.category],
        };
        return acc;
    }, {} as ChartConfig);

    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b p-4 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1">
                    <div className="flex w-full items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <CardTitle>Expense by Category</CardTitle>
                            <CardDescription>
                                Showing total expense by category
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <Select
                                value={monthExpenseCategory}
                                onValueChange={(value) => {
                                    setMonthExpenseCategory(value);
                                    applyFilter(value, yearExpenseCategory);
                                }}
                            >
                                <SelectTrigger
                                    className="hidden w-32 rounded-lg sm:ml-auto sm:flex"
                                    aria-label="Select a value"
                                >
                                    <SelectValue placeholder="December" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem
                                        value="1"
                                        className="rounded-lg"
                                    >
                                        January
                                    </SelectItem>
                                    <SelectItem
                                        value="2"
                                        className="rounded-lg"
                                    >
                                        February
                                    </SelectItem>
                                    <SelectItem
                                        value="3"
                                        className="rounded-lg"
                                    >
                                        March
                                    </SelectItem>
                                    <SelectItem
                                        value="4"
                                        className="rounded-lg"
                                    >
                                        April
                                    </SelectItem>
                                    <SelectItem
                                        value="5"
                                        className="rounded-lg"
                                    >
                                        May
                                    </SelectItem>
                                    <SelectItem
                                        value="6"
                                        className="rounded-lg"
                                    >
                                        June
                                    </SelectItem>
                                    <SelectItem
                                        value="7"
                                        className="rounded-lg"
                                    >
                                        July
                                    </SelectItem>
                                    <SelectItem
                                        value="8"
                                        className="rounded-lg"
                                    >
                                        August
                                    </SelectItem>
                                    <SelectItem
                                        value="9"
                                        className="rounded-lg"
                                    >
                                        September
                                    </SelectItem>
                                    <SelectItem
                                        value="10"
                                        className="rounded-lg"
                                    >
                                        October
                                    </SelectItem>
                                    <SelectItem
                                        value="11"
                                        className="rounded-lg"
                                    >
                                        November
                                    </SelectItem>
                                    <SelectItem
                                        value="12"
                                        className="rounded-lg"
                                    >
                                        December
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={yearExpenseCategory}
                                onValueChange={(value) => {
                                    setYearExpenseCategory(value);
                                    applyFilter(monthExpenseCategory, value);
                                }}
                            >
                                <SelectTrigger
                                    className="hidden w-22 rounded-lg sm:ml-auto sm:flex"
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
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart margin={{ top: 20 }}>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                            formatter={(value, name) => (
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                                        style={
                                            {
                                                '--color-bg':
                                                    chartConfig[
                                                        name as keyof typeof chartConfig
                                                    ]?.color,
                                            } as React.CSSProperties
                                        }
                                    />
                                    {chartConfig[
                                        name as keyof typeof chartConfig
                                    ]?.label || name}
                                    <div className="ml-auto flex items-baseline gap-0.5 font-medium text-foreground tabular-nums">
                                        <p className="font-semibold">
                                            {formatRupiah(Number(value))}
                                        </p>
                                    </div>
                                </div>
                            )}
                        />

                        <Pie
                            data={coloredData}
                            dataKey="expense"
                            nameKey="category"
                            label={({ payload, ...props }) => {
                                return (
                                    <text
                                        cx={props.cx}
                                        cy={props.cy}
                                        x={props.x}
                                        y={props.y}
                                        textAnchor={props.textAnchor}
                                        dominantBaseline={
                                            props.dominantBaseline
                                        }
                                        fill="hsla(var(--foreground))"
                                    >
                                        {formatRupiah(payload.expense)}
                                    </text>
                                );
                            }}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="category" />}
                            className="translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
