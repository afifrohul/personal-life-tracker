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
import { Pie, PieChart } from 'recharts';

import { formatRupiah } from '@/lib/format-rupiah';
import * as d3 from 'd3-scale-chromatic';

interface ChartProps {
    data: {
        category: string;
        expense: number;
    }[];
}

export default function ChartExpenseByCategory({ data }: ChartProps) {
    const filteredData = data.filter((d) => {
        return d.expense > 0;
    });

    // const colors = d3.schemeSet3;
    const colors = d3.schemeReds[filteredData.length];

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
                    <CardTitle>Expense by Category</CardTitle>
                    <CardDescription>
                        Showing total expense by category
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto h-[220px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
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
