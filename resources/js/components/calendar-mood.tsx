import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { eachDayOfInterval, eachWeekOfInterval, format } from 'date-fns';
import {
    Angry,
    CircleDashed,
    Frown,
    Meh,
    Smile,
    SmilePlus,
} from 'lucide-react';
import { useState } from 'react';

type CalendarMood = {
    date: string;
    mood_score: number;
};

interface ChartProps {
    chartData: CalendarMood[];
    uniqueYears: [];
}

export default function CalendarMood({ chartData, uniqueYears }: ChartProps) {
    const [monthMoodCalendar, setMonthMoodCalendar] = useState(
        String(new Date().getMonth() + 1),
    );
    const [yearMoodCalendar, setYearMoodCalendar] = useState(
        String(new Date().getFullYear()),
    );

    const today = new Date();
    const nowMonth = Number(monthMoodCalendar) - 1;

    const weeks = eachWeekOfInterval({
        start: new Date(Number(yearMoodCalendar), nowMonth, 1),
        end: new Date(Number(yearMoodCalendar), nowMonth, 1),
    });

    const allDayWeeks = [];

    for (let i = 0; i < 6; i++) {
        const row = eachDayOfInterval({
            start: new Date(
                weeks[0].getFullYear(),
                weeks[0].getMonth(),
                weeks[0].getDate() + i * 7,
            ),
            end: new Date(
                weeks[0].getFullYear(),
                weeks[0].getMonth(),
                weeks[0].getDate() + i * 7 + 6,
            ),
        });
        allDayWeeks.push(row);
    }

    const start = format(weeks[0], 'yyyy-MM-dd');
    const end = format(weeks[0].setDate(weeks[0].getDate() + 41), 'yyyy-MM-dd');

    const filteredData = chartData.filter((data) => {
        return data.date >= start && data.date <= end;
    });

    return (
        <Card className="gap-4 pt-0">
            <CardHeader className="border-b p-4">
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-1 flex-col justify-center gap-1">
                        <CardTitle>Mood Calendar</CardTitle>
                        <CardDescription>
                            Show history mood in calendar view
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select
                            value={monthMoodCalendar}
                            onValueChange={(value) => {
                                setMonthMoodCalendar(value);
                            }}
                        >
                            <SelectTrigger
                                className="hidden w-32 rounded-lg sm:ml-auto sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="December" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="1" className="rounded-lg">
                                    January
                                </SelectItem>
                                <SelectItem value="2" className="rounded-lg">
                                    February
                                </SelectItem>
                                <SelectItem value="3" className="rounded-lg">
                                    March
                                </SelectItem>
                                <SelectItem value="4" className="rounded-lg">
                                    April
                                </SelectItem>
                                <SelectItem value="5" className="rounded-lg">
                                    May
                                </SelectItem>
                                <SelectItem value="6" className="rounded-lg">
                                    June
                                </SelectItem>
                                <SelectItem value="7" className="rounded-lg">
                                    July
                                </SelectItem>
                                <SelectItem value="8" className="rounded-lg">
                                    August
                                </SelectItem>
                                <SelectItem value="9" className="rounded-lg">
                                    September
                                </SelectItem>
                                <SelectItem value="10" className="rounded-lg">
                                    October
                                </SelectItem>
                                <SelectItem value="11" className="rounded-lg">
                                    November
                                </SelectItem>
                                <SelectItem value="12" className="rounded-lg">
                                    December
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={yearMoodCalendar}
                            onValueChange={(value) => {
                                setYearMoodCalendar(value);
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
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-4">
                    <div className="grid grid-cols-7 text-center font-semibold">
                        <p className="text-xs">S</p>
                        <p className="text-xs">M</p>
                        <p className="text-xs">T</p>
                        <p className="text-xs">W</p>
                        <p className="text-xs">T</p>
                        <p className="text-xs">F</p>
                        <p className="text-xs">S</p>
                    </div>
                    <div className="mt-2 flex flex-col gap-0.5">
                        {allDayWeeks.map((row, rowIndex) => (
                            <div className="grid grid-cols-7" key={rowIndex}>
                                {row.map((item, index) => {
                                    const data = filteredData.filter((d) => {
                                        return (
                                            d.date ===
                                            format(item, 'yyyy-MM-dd')
                                        );
                                    });

                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-center ${item.getMonth() === nowMonth ? 'font-medium' : 'opacity-30'}`}
                                        >
                                            <div
                                                className={`flex w-8 flex-col items-center justify-center gap-1 rounded py-1 ${format(item, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') ? 'border bg-accent' : null}`}
                                            >
                                                <div className="text-xs">
                                                    {item.getDate()}
                                                </div>

                                                {data[0]?.mood_score == 1 ? (
                                                    <Angry className="h-4.5 w-4.5 fill-rose-500" />
                                                ) : data[0]?.mood_score == 2 ? (
                                                    <Frown className="h-4.5 w-4.5 fill-amber-500" />
                                                ) : data[0]?.mood_score == 3 ? (
                                                    <Meh className="h-4.5 w-4.5 fill-yellow-500" />
                                                ) : data[0]?.mood_score == 4 ? (
                                                    <Smile className="h-4.5 w-4.5 fill-green-500" />
                                                ) : data[0]?.mood_score == 5 ? (
                                                    <SmilePlus className="h-4.5 w-4.5 fill-teal-500" />
                                                ) : (
                                                    <CircleDashed className="h-4.5 w-4.5" />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
