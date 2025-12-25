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

import * as d3 from 'd3-scale-chromatic';

interface ChartProps {
    data: {
        category: string;
        exp_gain: number;
    }[];
}

export default function ChartExpGainByCategory({ data }: ChartProps) {
    // const colors = d3.schemeSet3;
    const colors = d3.schemeBlues[data.length];

    // Generate warna otomatis
    const coloredData = data.map((item, index) => ({
        ...item,
        // fill: colors[index % colors.length],
        fill: colors[index],
    }));

    const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
        acc[item.category] = {
            label: item.category,
            color: `var(--chart-${index + 1})`,
        };
        return acc;
    }, {} as ChartConfig);

    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b p-4 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1">
                    <CardTitle>Pie Chart - Exp Gain by Category</CardTitle>
                    <CardDescription>
                        Showing total exp gain by category
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Pie
                            data={coloredData}
                            dataKey="exp_gain"
                            nameKey="category"
                            label
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
