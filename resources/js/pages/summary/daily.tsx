import SubtleBadge from '@/components/subtle-badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/format-rupiah';
import { lucideIcons } from '@/lib/lucide-icons';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    Angry,
    ArrowDownLeft,
    ArrowUpRight,
    ChevronDownIcon,
    ChevronLeft,
    ChevronRight,
    CircleDashed,
    Frown,
    Meh,
    Smile,
    SmilePlus,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daily',
        href: '/daily-summary',
    },
];

type Habit = {
    date: string;
    habit: {
        name: string;
        icon: string;
        color: string;
    };
};

type Category = {
    id: number;
    name: string;
    icon: string;
};

type Flowcash = {
    id: number;
    date: string;
    amount: number;
    description: string;
    type: string;
    flowcash_category: Category;
};

type Journal = {
    date: string;
    content: string;
    created_at: string;
    updated_at: string;
};

interface SummaryProps {
    selectedDate: string;
    mood: [];
    habit: Habit[];
    exp: number;
    income: Flowcash[];
    incomeAmount: number;
    expense: Flowcash[];
    expenseAmount: number;
    journal: Journal[];
}

export default function Daily({
    selectedDate,
    mood,
    habit,
    exp,
    income,
    incomeAmount,
    expense,
    expenseAmount,
    journal,
}: SummaryProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(
        selectedDate ? new Date(selectedDate) : undefined,
    );
    function addDays(date: Date, days: number) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }
    const nowDate = new Date(selectedDate);
    const nextDate = addDays(nowDate, 1);
    const prevDate = addDays(nowDate, -1);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Summary" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-1 items-center gap-2">
                        <Button
                            variant="outline"
                            size="default"
                            onClick={() => {
                                setDate(prevDate);
                                router.get(
                                    '/daily-summary',
                                    { date: format(prevDate, 'yyyy-MM-dd') },
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    },
                                );
                            }}
                        >
                            <ChevronLeft />
                        </Button>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full justify-between font-normal"
                                >
                                    {date
                                        ? format(new Date(date), 'dd MMMM yyyy')
                                        : 'Select date'}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(newDate) => {
                                        setDate(newDate);
                                        setOpen(false);

                                        if (newDate) {
                                            router.get(
                                                '/daily-summary',
                                                {
                                                    date: format(
                                                        newDate,
                                                        'yyyy-MM-dd',
                                                    ),
                                                },
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                },
                                            );
                                        }
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <Button
                            variant="outline"
                            size="default"
                            onClick={() => {
                                setDate(nextDate);
                                router.get(
                                    '/daily-summary',
                                    { date: format(nextDate, 'yyyy-MM-dd') },
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    },
                                );
                            }}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="rounded-md border p-4">
                        <div>
                            <p className="text-sm font-semibold italic">
                                Mood Today
                            </p>
                        </div>
                        <Separator className="my-2"></Separator>
                        <div className="flex items-center justify-center">
                            {Number(mood) === 1 ? (
                                <Angry className="h-8 w-8 fill-rose-500" />
                            ) : Number(mood) === 2 ? (
                                <Frown className="h-8 w-8 fill-amber-500" />
                            ) : Number(mood) === 3 ? (
                                <Meh className="h-8 w-8 fill-yellow-500" />
                            ) : Number(mood) === 4 ? (
                                <Smile className="h-8 w-8 fill-green-500" />
                            ) : Number(mood) === 5 ? (
                                <SmilePlus className="h-8 w-8 fill-teal-500" />
                            ) : (
                                <CircleDashed className="h-8 w-8 text-muted" />
                            )}
                        </div>
                        <p className="mt-1 text-center text-xs font-medium">
                            {Number(mood) === 1
                                ? 'Bad'
                                : Number(mood) === 2
                                  ? 'Not Good'
                                  : Number(mood) === 3
                                    ? 'Okay'
                                    : Number(mood) === 4
                                      ? 'Good'
                                      : Number(mood) === 5
                                        ? 'Great'
                                        : '-'}
                        </p>
                    </div>
                    <div className="flex-1 rounded-md border p-4">
                        <div>
                            <p className="text-sm font-semibold italic">
                                Habit Log Today ({habit?.length})
                            </p>
                        </div>
                        <Separator className="my-2"></Separator>
                        <div className="mx-auto flex w-full flex-col gap-2">
                            {habit?.length === 0 ? (
                                <div className="text-sm italic">
                                    habit log not found.
                                </div>
                            ) : (
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {habit?.map((item, index) => {
                                            const iconHabitName =
                                                item.habit.icon;
                                            const IconHabitComponent = (
                                                lucideIcons as Record<
                                                    string,
                                                    any
                                                >
                                            )[iconHabitName];
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 rounded border px-2 py-1"
                                                >
                                                    <IconHabitComponent
                                                        className="h-3.5 w-3.5"
                                                        style={{
                                                            color: item.habit
                                                                .color,
                                                        }}
                                                    />
                                                    <p className="text-xs font-medium">
                                                        {item.habit.name}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="rounded border bg-accent px-2 py-1">
                                        <p className="text-xs font-medium">
                                            Total exp gain: +{exp} Exp
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="rounded-md border p-4">
                    <div>
                        <p className="text-sm font-semibold italic">
                            Flowcash Today ({expense?.length + income?.length})
                        </p>
                    </div>
                    <Separator className='my-2'></Separator>
                    <div className="mt-2 grid w-full grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <SubtleBadge
                                color="rose"
                                label={`Expense (${expense?.length})`}
                                icon={
                                    <ArrowUpRight className="h-4 w-4 text-rose-500" />
                                }
                            />
                            <div className="rounded p-2 text-xs">
                                {expense?.length >= 1 ? (
                                    <table className="w-full table-auto">
                                        <thead className="text-left border-b">
                                            <tr>
                                                <th>Description</th>
                                                <th>Category</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {expense?.map((item, index) => {
                                                const iconName =
                                                    item.flowcash_category.icon;
                                                const IconComponent = (
                                                    lucideIcons as Record<
                                                        string,
                                                        any
                                                    >
                                                )[iconName];

                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {item.description
                                                                ?.length > 25
                                                                ? item.description.substring(
                                                                      0,
                                                                      25,
                                                                  ) + '...'
                                                                : item.description}
                                                        </td>
                                                        <td>
                                                            <div className="flex items-center gap-1">
                                                                <IconComponent className="h-3.5 w-3.5" />
                                                                {
                                                                    item
                                                                        .flowcash_category
                                                                        .name
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {formatRupiah(
                                                                Number(
                                                                    item.amount,
                                                                ),
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <tr className="">
                                                <td colSpan={2}>Total</td>
                                                <td className="font-medium text-rose-500">
                                                    {formatRupiah(
                                                        expenseAmount,
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="w-full">
                                        <table className="w-full table-auto">
                                            <thead className="text-left border-b">
                                                <tr>
                                                    <th>Description</th>
                                                    <th>Category</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        <p className="mt-2 text-center">
                                            No data found.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <SubtleBadge
                                color="teal"
                                label={`Income (${income?.length})`}
                                icon={
                                    <ArrowDownLeft className="h-4 w-4 text-teal-500" />
                                }
                            />
                            <div className="rounded p-2 text-xs">
                                {income?.length >= 1 ? (
                                    <table className="w-full table-auto">
                                        <thead className="text-left border-b">
                                            <tr>
                                                <th>Description</th>
                                                <th>Category</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {income?.map((item, index) => {
                                                const iconName =
                                                    item.flowcash_category.icon;
                                                const IconComponent = (
                                                    lucideIcons as Record<
                                                        string,
                                                        any
                                                    >
                                                )[iconName];

                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {item.description
                                                                ?.length > 25
                                                                ? item.description.substring(
                                                                      0,
                                                                      25,
                                                                  ) + '...'
                                                                : item.description}
                                                        </td>
                                                        <td>
                                                            <div className="flex items-center gap-1">
                                                                <IconComponent className="h-3.5 w-3.5" />
                                                                {
                                                                    item
                                                                        .flowcash_category
                                                                        .name
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {formatRupiah(
                                                                Number(
                                                                    item.amount,
                                                                ),
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <tr className="">
                                                <td colSpan={2}>Total</td>
                                                <td className="font-medium text-teal-500">
                                                    {formatRupiah(incomeAmount)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="w-full">
                                        <table className="w-full table-auto">
                                            <thead className="text-left border-b">
                                                <tr>
                                                    <th>Description</th>
                                                    <th>Category</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        <p className="mt-2 text-center">
                                            No data found.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-md border p-4">
                    <div>
                        <p className="text-sm font-semibold italic">
                            Journal Log Today ({journal?.length})
                        </p>
                    </div>
                    <Separator className="my-2"></Separator>
                    <div className="mx-auto flex w-full flex-col gap-6">
                        {journal?.length === 0 ? (
                            <div className="text-sm italic">
                                Journal log not found.
                            </div>
                        ) : (
                            journal?.map((item, index) => (
                                <div className="grid grid-cols-6 items-baseline" key={index}>
                                    <div className="">
                                        <p className="text-xs italic text-muted-foreground">
                                            {format(item.date, 'dd MMMM yyyy')} {format(item.created_at, 'HH:mm')} 
                                        </p>
                                    </div>
                                    <div className="whitespace-pre-wrap col-span-5">
                                        <p className="text-sm">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
