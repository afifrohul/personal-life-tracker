import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { eachDayOfInterval, format } from 'date-fns';
import { useState } from 'react';

type Chart = {
    id: number;
    year: string;
    date: string;
};

interface GridProps {
    gridData: Chart[];
    uniqueYears: number[];
    color: string;
}

export default function HabitGrid({ gridData, uniqueYears, color }: GridProps) {
    const [year, setYear] = useState(String(new Date().getFullYear()));

    const filteredGridData = gridData.filter((data) => {
        return String(data.year) === year;
    });

    const datesOnly = filteredGridData.map((item) => item.date);

    function buildHabitGrid(year: number) {
        const allDates = eachDayOfInterval({
            start: new Date(year, 0, 1),
            end: new Date(year, 11, 31),
        });

        const weeks: Date[][] = [];
        for (let i = 0; i < allDates.length; i += 7) {
            weeks.push(allDates.slice(i, i + 7));
        }

        return weeks;
    }

    const days = buildHabitGrid(Number(year));

    return (
        <Card className="w-full overflow-hidden">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Habit Tracker — {year}</CardTitle>
                    <div className="w-32">
                        <Select value={year} onValueChange={setYear}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
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
                </div>
            </CardHeader>

            <CardContent>
                <ScrollArea className="w-full overflow-x-auto">
                    <div className="relative inline-block">
                        {/* Month Labels */}
                        <div className="mb-2 flex gap-1">
                            {days.map((week, weekIndex) => {
                                const firstOfMonth = week.find(
                                    (d) => d.getDate() === 1,
                                );
                                const showLabel = Boolean(firstOfMonth);

                                return (
                                    <div
                                        key={weekIndex}
                                        className="w-3.5 text-center text-xs"
                                    >
                                        {showLabel
                                            ? format(firstOfMonth!, 'MMM')
                                            : ''}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Grid */}
                        <div className="flex gap-1">
                            {days.map((week, weekIndex) => (
                                <div
                                    key={weekIndex}
                                    className="flex flex-col gap-1"
                                >
                                    {week.map((day, dayIndex) => {
                                        const dayString = format(
                                            day,
                                            'yyyy-MM-dd',
                                        );
                                        const isCompleted =
                                            datesOnly.includes(dayString);

                                        if (isCompleted) {
                                            return (
                                                <Tooltip key={dayIndex}>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            style={{
                                                                backgroundColor:
                                                                    color,
                                                            }}
                                                            className={`h-3.5 w-3.5 rounded-xs`}
                                                        ></div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className='text-white'>
                                                            {format(
                                                                day,
                                                                'MMMM do',
                                                            )}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            );
                                        } else {
                                            return (
                                                <Tooltip key={dayIndex}>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            className={`h-3.5 w-3.5 rounded-xs bg-muted`}
                                                        ></div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="text-white">
                                                            {format(
                                                                day,
                                                                'MMMM do',
                                                            )}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            );
                                        }
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
