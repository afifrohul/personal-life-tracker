import DashboardCardInfo from '@/components/dashboard-card-info';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/format-rupiah';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarDays, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    FaFaceAngry,
    FaFaceFrown,
    FaFaceMeh,
    FaFaceSmile,
    FaFaceSmileBeam,
} from 'react-icons/fa6';
import { GiMoneyStack } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import {
    LuArrowDownLeft,
    LuArrowUpRight,
    LuBike,
    LuCheck,
    LuCircleStop,
    LuFolderGit2,
    LuGitMerge,
    LuLoader,
    LuNotebookPen,
    LuScrollText,
    LuSquareLibrary,
    LuSticker,
    LuUserCheck,
    LuWallet,
} from 'react-icons/lu';
import { MdOutlineCategory, MdOutlineWavingHand } from 'react-icons/md';
import { RiCoinsLine, RiHandCoinLine } from 'react-icons/ri';

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
    journalLogCount
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3 flex-1 space-y-2 rounded-md border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300 bg-cyan-100">
                                <MdOutlineWavingHand className="text-cyan-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    Welcome to dashboard, {user.name}!
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Hava a good day. Let’s keep your life on
                                    track today.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center rounded-md border bg-card px-8">
                        <div className="flex items-center justify-center gap-8 italic">
                            <div className="flex items-center gap-2 text-sm">
                                <CalendarDays className="h-3.5 w-3.5"></CalendarDays>
                                {date}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-3.5 w-3.5"></Clock>
                                {time}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full items-center gap-3">
                        <p className="text-xs text-muted-foreground">Mood</p>
                        <div className="h-px w-full rounded border-b"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardCardInfo
                            color="purple"
                            icon={
                                <LuSticker className="text-xl text-purple-600" />
                            }
                            data={moodLogCount}
                            desc="Total Mood Log(s)"
                        />
                        <DashboardCardInfo
                            color="rose"
                            icon={
                                <FaFaceAngry className="text-xl text-rose-600" />
                            }
                            data={badMoodCount}
                            desc="Total Bad Mood(s)"
                        />
                        <DashboardCardInfo
                            color="amber"
                            icon={
                                <FaFaceFrown className="text-xl text-amber-600" />
                            }
                            data={notGoodMoodCount}
                            desc="Total Not Good Mood(s)"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardCardInfo
                            color="yellow"
                            icon={
                                <FaFaceMeh className="text-xl text-yellow-600" />
                            }
                            data={okayMoodCount}
                            desc="Total Okay Mood Log(s)"
                        />
                        <DashboardCardInfo
                            color="green"
                            icon={
                                <FaFaceSmile className="text-xl text-green-600" />
                            }
                            data={goodMoodCount}
                            desc="Total Good Mood(s)"
                        />
                        <DashboardCardInfo
                            color="teal"
                            icon={
                                <FaFaceSmileBeam className="text-xl text-teal-600" />
                            }
                            data={greatMoodCount}
                            desc="Total Great Mood(s)"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full items-center gap-3">
                        <p className="text-xs text-muted-foreground">Habit</p>
                        <div className="h-px w-full rounded border-b"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardCardInfo
                            color="teal"
                            icon={
                                <LuSquareLibrary className="text-xl text-teal-600" />
                            }
                            data={habitCategoryCount}
                            desc="Total Habit Category(s)"
                        />
                        <DashboardCardInfo
                            color="indigo"
                            icon={
                                <LuBike className="text-xl text-indigo-600" />
                            }
                            data={habitCount}
                            desc="Total Habit(s)"
                        />
                        <DashboardCardInfo
                            color="blue"
                            icon={
                                <LuScrollText className="text-xl text-blue-600" />
                            }
                            data={habitLogCount}
                            desc="Total Habit Log(s)"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full items-center gap-3">
                        <p className="text-xs text-muted-foreground">Finance</p>
                        <div className="h-px w-full rounded border-b"></div>
                    </div>
                    <div className="flex gap-4">
                        <DashboardCardInfo
                            color="indigo"
                            icon={
                                <MdOutlineCategory className="text-xl text-indigo-600" />
                            }
                            data={flowcashCategoryCount}
                            desc="Total Flowcash Category(s)"
                        />
                        <DashboardCardInfo
                            color="sky"
                            icon={
                                <GrTransaction className="text-xl text-sky-600" />
                            }
                            data={flowcashCount}
                            desc="Total Flowcash(s)"
                        />
                        <DashboardCardInfo
                            color="teal"
                            icon={
                                <LuWallet className="text-xl text-teal-600" />
                            }
                            data={formatRupiah(totalBalance)}
                            desc="Available Balance"
                            className={'flex-1'}
                        />
                        <DashboardCardInfo
                            color="green"
                            icon={
                                <GiMoneyStack className="text-xl text-green-600" />
                            }
                            data={formatRupiah(totalIncome)}
                            desc="Total Income"
                            className={'flex-1'}
                        />
                        <DashboardCardInfo
                            color="rose"
                            icon={
                                <RiHandCoinLine className="text-xl text-rose-600" />
                            }
                            data={formatRupiah(totalExpense)}
                            desc="Total Expense"
                            className={'flex-1'}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <DashboardCardInfo
                            color="teal"
                            icon={
                                <RiCoinsLine className="text-xl text-teal-600" />
                            }
                            data={formatRupiah(monthlyDifference)}
                            desc="Available Balance This Month"
                        />
                        <DashboardCardInfo
                            color="green"
                            icon={
                                <LuArrowDownLeft className="text-xl text-green-600" />
                            }
                            data={formatRupiah(monthlyIncome)}
                            desc="Total Income This Month"
                        />
                        <DashboardCardInfo
                            color="rose"
                            icon={
                                <LuArrowUpRight className="text-xl text-rose-600" />
                            }
                            data={formatRupiah(monthlyExpense)}
                            desc="Total Expense This Month"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full items-center gap-3">
                        <p className="text-xs text-muted-foreground">Journal</p>
                        <div className="h-px w-full rounded border-b"></div>
                    </div>
                    <div className="">
                        <DashboardCardInfo
                            color="indigo"
                            icon={
                                <LuNotebookPen className="text-xl text-indigo-600" />
                            }
                            data={flowcashCategoryCount}
                            desc="Total Journal Log(s)"
                        />
                    </div>

                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full items-center gap-3">
                        <p className="text-xs text-muted-foreground">Task</p>
                        <div className="h-px w-full rounded border-b"></div>
                    </div>
                    <div className="flex gap-4">
                        <DashboardCardInfo
                            color="purple"
                            icon={
                                <LuUserCheck className="text-xl text-purple-600" />
                            }
                            data={personalTaskCount}
                            desc="Total Personal Task(s)"
                        />
                        <DashboardCardInfo
                            color="rose"
                            icon={
                                <LuCircleStop className="text-xl text-rose-600" />
                            }
                            data={pendingPersonalTaskCount}
                            desc="Total Pending Personal Task(s)"
                        />
                        <DashboardCardInfo
                            color="yellow"
                            icon={
                                <LuLoader className="text-xl text-yellow-600" />
                            }
                            data={inProgressPersonalTaskCount}
                            desc="Total In Progress Personal Task(s)"
                            className={'flex-1'}
                        />
                        <DashboardCardInfo
                            color="green"
                            icon={
                                <LuCheck className="text-xl text-green-600" />
                            }
                            data={completedPersonalTaskCount}
                            desc="Total Completed Personal Task(s)"
                            className={'flex-1'}
                        />
                    </div>
                    <div className="flex gap-4">
                        <DashboardCardInfo
                            color="purple"
                            icon={
                                <LuFolderGit2 className="text-xl text-purple-600" />
                            }
                            data={projectCount}
                            desc="Total Project(s)"
                        />
                        <DashboardCardInfo
                            color="rose"
                            icon={
                                <LuCircleStop className="text-xl text-rose-600" />
                            }
                            data={pendingProjectCount}
                            desc="Total Pending Project(s)"
                        />
                        <DashboardCardInfo
                            color="yellow"
                            icon={
                                <LuLoader className="text-xl text-yellow-600" />
                            }
                            data={inProgressProjectCount}
                            desc="Total In Progress Project(s)"
                            className={'flex-1'}
                        />
                        <DashboardCardInfo
                            color="green"
                            icon={
                                <LuCheck className="text-xl text-green-600" />
                            }
                            data={completedProjectCount}
                            desc="Total Completed Project(s)"
                            className={'flex-1'}
                        />
                    </div>
                    <div className="flex gap-4">
                        <DashboardCardInfo
                            color="purple"
                            icon={
                                <LuGitMerge className="text-xl text-purple-600" />
                            }
                            data={projectTaskCount}
                            desc="Total Project Task(s)"
                        />
                        <DashboardCardInfo
                            color="rose"
                            icon={
                                <LuCircleStop className="text-xl text-rose-600" />
                            }
                            data={pendingProjectTaskCount}
                            desc="Total Pending Project Task(s)"
                        />
                        <DashboardCardInfo
                            color="yellow"
                            icon={
                                <LuLoader className="text-xl text-yellow-600" />
                            }
                            data={inProgressProjectTaskCount}
                            desc="Total In Progress Project Task(s)"
                            className={'flex-1'}
                        />
                        <DashboardCardInfo
                            color="green"
                            icon={
                                <LuCheck className="text-xl text-green-600" />
                            }
                            data={completedProjectTaskCount}
                            desc="Total Completed Project Task(s)"
                            className={'flex-1'}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
