'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    year: number;
    month: string;
    habit: number;
};

interface ChartProps {
    chartData: Chart[];
    uniqueYears: number[];
    color: string;
}

export const description = 'A horizontal bar chart';

const chartConfig = {
    habit: {
        label: 'Habit',
    },
} satisfies ChartConfig;

export function ChartDetailHabit({
    chartData,
    uniqueYears,
    color,
}: ChartProps) {
    const [year, setYear] = useState(String(new Date().getFullYear()));

    const filteredChartData = chartData.filter((data) => {
        return data.year === Number(year);
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <CardTitle>
                        Total Habit Done per Month
                    </CardTitle>
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
                                    {String(item)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[220px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={filteredChartData}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <XAxis type="number" dataKey="habit" hide />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="habit"
                            fill={color}
                            radius={5}
                            barSize={25}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
