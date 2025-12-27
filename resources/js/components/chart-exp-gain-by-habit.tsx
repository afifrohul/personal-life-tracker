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
        habit: string;
        exp_gain: number;
    }[];
}

export default function ChartExpGainByHabit({ data }: ChartProps) {
    const filteredData = data.filter((d) => {
        return d.exp_gain > 0;
    });

    // const colors = d3.schemeSet3;
    const colors = d3.schemeBlues[filteredData.length] ?? d3.schemeBlues[3];;

    const colorMap = filteredData.reduce<Record<string, string>>(
        (acc, item, index) => {
            acc[item.habit] = colors[index];
            return acc;
        },
        {},
    );

    // Generate warna otomatis
    const coloredData = filteredData.map((item, index) => ({
        ...item,
        // fill: colors[index % colors.length],
        fill: colors[index],
    }));

    // Generate config juga (optional, tooltip utk label)
    const chartConfig: ChartConfig = filteredData.reduce((acc, item, index) => {
        acc[item.habit] = {
            label: item.habit,
            color: colorMap[item.habit],
        };
        return acc;
    }, {} as ChartConfig);

    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b p-4 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1">
                    <CardTitle>Exp Gain by Habit</CardTitle>
                    <CardDescription>
                        Showing total exp gain by habit
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="flex-1 pb-6">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart margin={{ top: 20 }}>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Pie
                            data={coloredData}
                            dataKey="exp_gain"
                            nameKey="habit"
                            label
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="habit" />}
                            className="translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
