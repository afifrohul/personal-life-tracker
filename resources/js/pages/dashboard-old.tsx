import { ChartExp } from '@/components/chart-exp';
import ChartExpGainByCategory from '@/components/chart-exp-gain-by-category';
import ChartExpGainByHabit from '@/components/chart-exp-gain-by-habit';
import DashboardCard from '@/components/dashboard-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Award,
    BadgeCheckIcon,
    Bike,
    CalendarDays,
    ChartNoAxesCombined,
    Clock,
    ScrollText,
    SquareLibrary,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    user: {
        name: string;
        email: string;
        avatar: string;
        created_at: string;
        profile_stat: {
            level: number;
            level_exp: number;
            remaining_exp: number;
            total_exp: number;
            exp_to_next_level: number;
        };
    };
    categoryCount: number;
    habitCount: number;
    habitLogCount: number;
    expTotal: string;
    chartData: [];
    expGainByCategory: [];
    expGainByHabit: [];
}

export default function Dashboard({
    user,
    categoryCount,
    habitCount,
    habitLogCount,
    chartData,
    expGainByCategory,
    expGainByHabit,
}: DashboardProps) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const date = now.toLocaleDateString('en-EN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const time = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const getInitials = useInitials();

    const [progress, setProgress] = useState(
        (user.profile_stat.level_exp / user.profile_stat.exp_to_next_level) *
            100,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex w-full gap-4">
                    <div className="flex-1 space-y-2 rounded-xl border border-primary bg-card p-4">
                        <p className="text-sm font-medium">
                            👋 Welcome to dashboard, {user.name}!
                        </p>
                        <p className="text-sm font-light text-muted-foreground">
                            Small habits today create big changes tomorrow.
                            Let’s keep your habits on track today.
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded-xl border border-primary bg-card px-8">
                        <div className="flex items-center justify-center gap-8">
                            <div className="flex items-center gap-2 text-sm">
                                <CalendarDays className="h-3.5 w-3.5"></CalendarDays>
                                {date}
                            </div>
                            <div className="flex items-center gap-2 font-mono text-sm font-semibold">
                                <Clock className="h-3.5 w-3.5"></Clock>
                                {time}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Card className="flex justify-center border border-primary">
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div>
                                        <Avatar className="h-12 w-12 overflow-hidden rounded-full">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold">
                                                {user.name}
                                            </p>
                                            <Badge
                                                variant="default"
                                                className="bg-blue-500 text-white dark:bg-blue-600"
                                            >
                                                <BadgeCheckIcon />
                                                <p className="text-xs">
                                                    Verified
                                                </p>
                                            </Badge>
                                        </div>
                                        <p className="text-sm font-light">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <ChartNoAxesCombined className="h-3.5 w-3.5 text-primary"></ChartNoAxesCombined>
                                        <p className="text-xs">
                                            LEVEL {user.profile_stat?.level}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="h-3.5 w-3.5 text-primary"></Award>
                                        <p className="text-xs">
                                            {user.profile_stat?.total_exp} EXP
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex justify-center border border-primary">
                        <CardContent>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs">
                                        NEXT LEVEL:{' '}
                                        {user.profile_stat?.level + 1}
                                    </p>
                                    <p className="text-xs">
                                        {user.profile_stat?.remaining_exp} MORE
                                        EXP TO GO
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-xs font-semibold">
                                        {user.profile_stat?.level_exp} /{' '}
                                        {user.profile_stat?.exp_to_next_level}
                                    </p>
                                    <Progress
                                        value={progress}
                                        className="w-full flex-1"
                                    />
                                    <div>
                                        <div className="full flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                                            <p className="text-xs font-semibold">
                                                {user.profile_stat?.level + 1}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <DashboardCard
                        header="Habit Category"
                        icon={SquareLibrary}
                        data={categoryCount}
                        footer="Total Habit Category(s)"
                        link="/categories"
                    />
                    <DashboardCard
                        header="Habit"
                        icon={Bike}
                        data={habitCount}
                        footer="Total Habit(s)"
                        link="/habits"
                    />
                    <DashboardCard
                        header="Habit Log"
                        icon={ScrollText}
                        data={habitLogCount}
                        footer="Total Habit Log(s)"
                        link="/logs"
                    />
                </div>
                <div>
                    <ChartExp chartData={chartData}></ChartExp>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ChartExpGainByCategory
                        data={expGainByCategory}
                    ></ChartExpGainByCategory>
                    <ChartExpGainByHabit
                        data={expGainByHabit}
                    ></ChartExpGainByHabit>
                </div>
            </div>
        </AppLayout>
    );
}
