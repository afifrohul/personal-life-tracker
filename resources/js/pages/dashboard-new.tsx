import DashboardInfo from '@/components/dashboard-info';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/format-rupiah';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ArrowBigRightDash,
    BadgeCheck,
    SquarePlus,
    TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { GrTransaction } from 'react-icons/gr';
import {
    LuAngry,
    LuCheck,
    LuCircleStop,
    LuFolderGit2,
    LuFrown,
    LuGitMerge,
    LuLoader,
    LuMeh,
    LuNotebook,
    LuNotebookPen,
    LuScrollText,
    LuSmile,
    LuSmilePlus,
    LuSquareActivity,
    LuSquareLibrary,
    LuSticker,
    LuUserCheck,
    LuWallet,
} from 'react-icons/lu';
import { MdOutlineCategory, MdOutlineWavingHand } from 'react-icons/md';
import { PiMoneyWavyBold } from 'react-icons/pi';
import { RiHandCoinLine } from 'react-icons/ri';

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto pb-4">
                <div className="relative w-full bg-background">
                    <div className="bg-[linear-gradient(to_right,#80808012_1px,transparent_1.5px),linear-gradient(to_bottom,#80808012_1.5px,transparent_1.5px)] bg-size-[32px_32px] dark:bg-[linear-gradient(to_right,#ffffff10_1.5px,transparent_1.5px),linear-gradient(to_bottom,#ffffff10_1.5px,transparent_1.5px)]">
                        <div className="flex flex-col items-center justify-center gap-1.5 py-12">
                            <Avatar className="h-20 w-20 overflow-hidden rounded-full">
                                <AvatarImage
                                    src={`https://api.dicebear.com/10.x/adventurer-neutral/svg?backgroundColor=f2d3b1&seed=happy`}
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

                            <p className="text-xs text-muted-foreground">
                                {user.email}
                            </p>
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
                        <div className="flex flex-col gap-2 col-span-2">
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
                        <div className="overflow-hidden rounded-lg border">
                            <div className="bg-muted p-2">
                                <p className="text-xs font-semibold">
                                    Mood data
                                </p>
                            </div>
                            <DashboardInfo
                                icon={<LuSticker className="text-purple-500" />}
                                desc="Total Mood Log(s):"
                                data={`${moodLogCount} Log(s)`}
                            />
                            <DashboardInfo
                                icon={<LuAngry className="text-rose-500" />}
                                desc="Total Bad Mood:"
                                data={`${badMoodCount} Log(s)`}
                            />
                            <DashboardInfo
                                icon={<LuFrown className="text-amber-500" />}
                                desc="Total Not Good Mood:"
                                data={`${notGoodMoodCount} Log(s)`}
                            />
                            <DashboardInfo
                                icon={<LuMeh className="text-yellow-500" />}
                                desc="Total Okay Mood:"
                                data={`${okayMoodCount} Log(s)`}
                            />
                            <DashboardInfo
                                icon={<LuSmile className="text-green-500" />}
                                desc="Total Good Mood:"
                                data={`${goodMoodCount} Log(s)`}
                            />
                            <DashboardInfo
                                icon={<LuSmilePlus className="text-teal-500" />}
                                desc="Total Great Mood:"
                                data={`${greatMoodCount} Log(s)`}
                            />
                        </div>
                        <div className="overflow-hidden rounded-lg border">
                            <div className="bg-muted p-2">
                                <p className="text-xs font-semibold">
                                    Habit data
                                </p>
                            </div>
                            <DashboardInfo
                                icon={
                                    <LuSquareLibrary className="text-teal-500" />
                                }
                                desc="Total Habit Category(s):"
                                data={`${habitCategoryCount} Category(s)`}
                            />
                            <DashboardInfo
                                icon={
                                    <LuSquareActivity className="text-indigo-500" />
                                }
                                desc="Total Habit(s):"
                                data={`${habitCount} Habit(s)`}
                            />
                            <DashboardInfo
                                icon={
                                    <LuScrollText className="text-blue-500" />
                                }
                                desc="Total Habit Log(s):"
                                data={`${habitLogCount} Log(s)`}
                            />
                        </div>
                        <div className="overflow-hidden rounded-lg border">
                            <div className="bg-muted p-2">
                                <p className="text-xs font-semibold">
                                    Finance data
                                </p>
                            </div>
                            <DashboardInfo
                                icon={
                                    <MdOutlineCategory className="text-indigo-500" />
                                }
                                desc="Total Flowcash Category(s):"
                                data={`${flowcashCategoryCount} Category(s)`}
                            />
                            <DashboardInfo
                                icon={
                                    <GrTransaction className="text-sky-500" />
                                }
                                desc="Total Flowcash(s):"
                                data={`${flowcashCount} Flowcash(s)`}
                            />
                            <DashboardInfo
                                icon={<LuWallet className="text-teal-500" />}
                                desc="Available Balance:"
                                data={formatRupiah(totalBalance)}
                            />
                            <DashboardInfo
                                icon={
                                    <PiMoneyWavyBold className="text-green-500" />
                                }
                                desc="Total Income:"
                                data={formatRupiah(totalIncome)}
                            />
                            <DashboardInfo
                                icon={
                                    <RiHandCoinLine className="text-rose-500" />
                                }
                                desc="Total Expense:"
                                data={formatRupiah(totalExpense)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="overflow-hidden rounded-lg border">
                            <div className="bg-muted p-2">
                                <p className="text-xs font-semibold">
                                    Journal data
                                </p>
                            </div>
                            <DashboardInfo
                                icon={
                                    <LuNotebook className="text-indigo-500" />
                                }
                                desc="Total Journal Log(s)"
                                data={`${journalLogCount} Logs(s)`}
                            />
                            <DashboardInfo
                                icon={
                                    <LuNotebookPen className="text-fuchsia-500" />
                                }
                                desc="Total Journal Log(s) This Month:"
                                data={`${jounalLogThisMonthCount} Logs(s)`}
                            />
                        </div>
                        <div className="overflow-hidden rounded-lg border">
                            <div className="bg-muted p-2">
                                <p className="text-xs font-semibold">
                                    Task data
                                </p>
                            </div>
                            <DashboardInfo
                                icon={<LuUserCheck className="text-teal-500" />}
                                desc="Total Personal Task(s)"
                                data={`${personalTaskCount} Task(s)`}
                            />
                            <DashboardInfo
                                icon={
                                    <LuCircleStop className="text-rose-500" />
                                }
                                desc="Total Pending Personal Task(s)"
                                data={`${pendingPersonalTaskCount} Task(s)`}
                            />
                            <DashboardInfo
                                icon={<LuLoader className="text-yellow-500" />}
                                desc="Total In Progress Personal Task(s)"
                                data={`${inProgressPersonalTaskCount} Task(s)`}
                            />
                            <DashboardInfo
                                icon={<LuCheck className="text-green-500" />}
                                desc="Total Completed Personal Task(s)"
                                data={`${completedPersonalTaskCount} Task(s)`}
                            />
                            <DashboardInfo
                                icon={
                                    <LuFolderGit2 className="text-purple-500" />
                                }
                                desc="Total Project(s):"
                                data={`${projectCount} Project(s)`}
                            />
                            <DashboardInfo
                                icon={
                                    <LuCircleStop className="text-rose-500" />
                                }
                                desc="Total Pending Project(s):"
                                data={`${pendingProjectCount} Project(s)`}
                            />
                            <DashboardInfo
                                icon={<LuLoader className="text-yellow-500" />}
                                desc="Total In Progress Project(s):"
                                data={`${inProgressProjectCount} Project(s)`}
                            />
                            <DashboardInfo
                                icon={<LuCheck className="text-green-500" />}
                                desc="Total In Progress Project(s):"
                                data={`${completedProjectCount} Project(s)`}
                            />
                            <DashboardInfo
                                icon={
                                    <LuGitMerge className="text-purple-500" />
                                }
                                desc="Total Project Task(s)"
                                data={`${projectTaskCount} Task(s)`}
                            />
                            <DashboardInfo
                                icon={
                                    <LuCircleStop className="text-rose-500" />
                                }
                                desc="Total Pending Project Task(s)"
                                data={`${pendingProjectTaskCount} Task(s)`}
                            />
                            <DashboardInfo
                                icon={<LuLoader className="text-yellow-500" />}
                                desc="Total In Progress Project Task(s)"
                                data={`${inProgressProjectTaskCount} Task(s)`}
                            />
                            <DashboardInfo
                                icon={<LuCheck className="text-green-500" />}
                                desc="Total Completed Project Task(s)"
                                data={`${completedProjectTaskCount} Task(s)`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
