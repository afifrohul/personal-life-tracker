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
    type ChartConfig,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const chartConfig = {
    mood_score: {
        label: 'Avg Score',
        color: '#cbd5e1',
    },
} satisfies ChartConfig;

type Chart = {
    year: number;
    month: string;
    mood_score: number;
};

interface ChartProps {
    chartData: Chart[];
    uniqueYears: number[];
}

const moodColorMap = {
    1: '#f43f5e',
    2: '#d97706',
    3: '#eab308',
    4: '#22c55e',
    5: '#0d9488',
};

function getMoodColor(score: number) {
    if (score < 2) return moodColorMap[1];
    if (score < 3) return moodColorMap[2];
    if (score < 4) return moodColorMap[3];
    if (score < 5) return moodColorMap[4];
    if (score == 5) return moodColorMap[5];
}

function getMoodLabel(score: number) {
    if (score < 2) return 'Bad 😞';
    if (score < 3) return 'Not Good 😕';
    if (score < 4) return 'Neutral 😐';
    if (score < 5) return 'Good 🙂';
    return 'Great 😄';
}

function MoodTooltipContent({ active, payload }: any) {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;
    const score = data.mood_score;
    const label = getMoodLabel(score);
    const color = getMoodColor(score);

    return (
        <div className="rounded-lg border bg-background px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{data.month}</span>
            </div>

            <div className="mt-1 text-sm text-muted-foreground">
                Avg Score:{' '}
                <span className="font-medium text-foreground">{score}</span>
            </div>

            <div className="flex items-center gap-1">
                <div
                    className="h-2.5 w-2.5 rounded-[2px]"
                    style={{ backgroundColor: color }}
                />
                <div className="text-sm">
                    Mood: <span className="font-semibold">{label}</span>
                </div>
            </div>
        </div>
    );
}

export function ChartMoodAvg({ chartData, uniqueYears }: ChartProps) {
    const [year, setYear] = useState(String(new Date().getFullYear()));

    const filteredChartData = chartData.filter((data) => {
        return data.year === Number(year);
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div>
                        <CardTitle>Mood Average</CardTitle>
                        <CardDescription className="mt-1">
                            Showing the average mood score each month
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
                    className="h-[180px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={filteredChartData}
                        margin={{ top: 24, left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<MoodTooltipContent />}
                        />

                        <Line
                            dataKey="mood_score"
                            type="natural"
                            stroke="var(--color-mood_score)"
                            strokeWidth={2}
                            dot={(props: any) => {
                                const { cx, cy, payload } = props;
                                const color = getMoodColor(payload.mood_score);

                                return (
                                    <circle
                                        key={payload.month + payload.year}
                                        cx={cx}
                                        cy={cy}
                                        r={5}
                                        fill={color}
                                        stroke="white"
                                        strokeWidth={0.5}
                                    />
                                );
                            }}
                            activeDot={(props: any) => {
                                const { cx, cy, payload } = props;
                                const color = getMoodColor(payload.mood_score);

                                return (
                                    <circle
                                        cx={cx}
                                        cy={cy}
                                        r={7}
                                        fill={color}
                                        stroke="white"
                                        strokeWidth={2}
                                    />
                                );
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
