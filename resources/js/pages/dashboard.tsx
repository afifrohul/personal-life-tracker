import DashboardFinanceData from '@/components/dashboard-finance-data';
import DashboardHabitData from '@/components/dashboard-habit-data';
import DashboardJournalData from '@/components/dashboard-journal-data';
import DashboardMoodData from '@/components/dashboard-mood-data';
import DashboardTaskData from '@/components/dashboard-task-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowBigRightDash,
    BadgeCheck,
    SquarePlus,
    TrendingUp,
    UserPen,
} from 'lucide-react';
import { useState } from 'react';
import { MdOutlineWavingHand } from 'react-icons/md';

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
    habitCategoryCount: number;
    habitCount: number;
    habitLogCount: number;
    flowcashCategoryCount: number;
    flowcashCount: number;
    totalIncome: number;
    totalExpense: number;
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpense: number;
    monthlyDifference: number;
    personalTaskCount: number;
    pendingPersonalTaskCount: number;
    inProgressPersonalTaskCount: number;
    completedPersonalTaskCount: number;
    projectCount: number;
    pendingProjectCount: number;
    inProgressProjectCount: number;
    completedProjectCount: number;
    projectTaskCount: number;
    pendingProjectTaskCount: number;
    inProgressProjectTaskCount: number;
    completedProjectTaskCount: number;
    moodLogCount: number;
    badMoodCount: number;
    notGoodMoodCount: number;
    okayMoodCount: number;
    goodMoodCount: number;
    greatMoodCount: number;
    journalLogCount: number;
    jounalLogThisMonthCount: number;
}

export default function Dashboard({
    user,
    habitCategoryCount,
    habitCount,
    habitLogCount,
    flowcashCategoryCount,
    flowcashCount,
    totalIncome,
    totalExpense,
    totalBalance,
    monthlyIncome,
    monthlyExpense,
    monthlyDifference,
    personalTaskCount,
    pendingPersonalTaskCount,
    inProgressPersonalTaskCount,
    completedPersonalTaskCount,
    projectCount,
    pendingProjectCount,
    inProgressProjectCount,
    completedProjectCount,
    projectTaskCount,
    pendingProjectTaskCount,
    inProgressProjectTaskCount,
    completedProjectTaskCount,
    moodLogCount,
    badMoodCount,
    notGoodMoodCount,
    okayMoodCount,
    goodMoodCount,
    greatMoodCount,
    journalLogCount,
    jounalLogThisMonthCount,
}: DashboardProps) {
    const getInitials = useInitials();
    const [progress, setProgress] = useState(
        (user.profile_stat.level_exp / user.profile_stat.exp_to_next_level) *
            100,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto pb-4">
                <div className="relative w-full bg-background">
                    <div className="bg-[linear-gradient(to_right,#80808012_1px,transparent_1.5px),linear-gradient(to_bottom,#80808012_1.5px,transparent_1.5px)] bg-size-[32px_32px] dark:bg-[linear-gradient(to_right,#ffffff10_1.5px,transparent_1.5px),linear-gradient(to_bottom,#ffffff10_1.5px,transparent_1.5px)]">
                        <div className="flex flex-col items-center justify-center gap-1.5 py-12">
                            <Avatar className="h-20 w-20 overflow-hidden rounded-full">
                                <AvatarImage
                                    src={`/storage/${user.avatar}`}
                                    alt={user.name}
                                />
                                <AvatarFallback>
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex items-center gap-1">
                                <p className="text-xl font-semibold">
                                    {user.name}
                                </p>
                                <BadgeCheck className="h-6 w-6 fill-blue-500 text-secondary" />
                            </div>

                            <p className="text-sm text-muted-foreground italic">
                                {user.email}
                            </p>

                            <Link href={`/settings/profile`}>
                                <div className="flex items-center gap-1 rounded bg-accent px-1 py-0.5 text-xs duration-200 hover:bg-muted hover:text-muted-foreground">
                                    Edit profile
                                    <UserPen className="h-3 w-3" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 px-4">
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                            <MdOutlineWavingHand className="" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">
                                Welcome to dashboard, {user.name}!
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Hava a good day. Let’s keep your life on track
                                today.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 rounded-lg border p-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <ArrowBigRightDash className="h-3.5 w-3.5 text-primary" />
                                <p className="text-xs">
                                    NEXT LEVEL: {user.profile_stat?.level + 1}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <SquarePlus className="h-3.5 w-3.5 text-primary" />
                                <p className="text-xs">
                                    {user.profile_stat?.remaining_exp} MORE EXP
                                    TO GO
                                </p>
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col gap-2">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-3.5 w-3.5 text-teal-500" />
                                    <p className="text-xs">
                                        <span className="font-semibold">
                                            {user.profile_stat?.level_exp}
                                        </span>
                                        <span> / </span>
                                        <span className="font-medium">
                                            {
                                                user.profile_stat
                                                    ?.exp_to_next_level
                                            }{' '}
                                            XP
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs font-medium">
                                        Level {user.profile_stat?.level}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Progress
                                    value={progress}
                                    className="w-full flex-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 px-4">
                    <div className="flex flex-col gap-4">
                        <DashboardMoodData
                            moodLogCount={moodLogCount}
                            badMoodCount={badMoodCount}
                            notGoodMoodCount={notGoodMoodCount}
                            okayMoodCount={okayMoodCount}
                            goodMoodCount={goodMoodCount}
                            greatMoodCount={greatMoodCount}
                        />
                        <DashboardTaskData
                            personalTaskCount={personalTaskCount}
                            pendingPersonalTaskCount={pendingPersonalTaskCount}
                            inProgressPersonalTaskCount={
                                inProgressPersonalTaskCount
                            }
                            completedPersonalTaskCount={
                                completedPersonalTaskCount
                            }
                            projectCount={projectCount}
                            pendingProjectCount={pendingProjectCount}
                            inProgressProjectCount={inProgressProjectCount}
                            completedProjectCount={completedProjectCount}
                            projectTaskCount={projectTaskCount}
                            pendingProjectTaskCount={pendingProjectTaskCount}
                            inProgressProjectTaskCount={
                                inProgressProjectTaskCount
                            }
                            completedProjectTaskCount={
                                completedProjectTaskCount
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <DashboardHabitData
                            habitCategoryCount={habitCategoryCount}
                            habitCount={habitCount}
                            habitLogCount={habitLogCount}
                        />
                        <DashboardFinanceData
                            flowcashCategoryCount={flowcashCategoryCount}
                            flowcashCount={flowcashCount}
                            totalIncome={totalIncome}
                            totalExpense={totalExpense}
                            totalBalance={totalBalance}
                            monthlyIncome={monthlyIncome}
                            monthlyExpense={monthlyExpense}
                            monthlyDifference={monthlyDifference}
                        />
                        <DashboardJournalData
                            jounalLogThisMonthCount={jounalLogThisMonthCount}
                            journalLogCount={journalLogCount}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
