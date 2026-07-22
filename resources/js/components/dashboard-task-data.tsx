import DashboardInfo from '@/components/dashboard-info';
import {
    LuCheck,
    LuCircleStop,
    LuFolderGit2,
    LuGitMerge,
    LuLoader,
    LuUserCheck,
} from 'react-icons/lu';

interface DashboardTaskDataProps {
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
}

export default function DashboardTaskData({
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
}: DashboardTaskDataProps) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <div className="bg-muted p-2">
                <p className="text-xs font-semibold">Task data</p>
            </div>
            <DashboardInfo
                icon={<LuUserCheck className="text-teal-500" />}
                desc="Total Personal Task(s)"
                data={`${personalTaskCount} Task(s)`}
            />
            <DashboardInfo
                icon={<LuCircleStop className="text-rose-500" />}
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
                icon={<LuFolderGit2 className="text-purple-500" />}
                desc="Total Project(s):"
                data={`${projectCount} Project(s)`}
            />
            <DashboardInfo
                icon={<LuCircleStop className="text-rose-500" />}
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
                icon={<LuGitMerge className="text-purple-500" />}
                desc="Total Project Task(s)"
                data={`${projectTaskCount} Task(s)`}
            />
            <DashboardInfo
                icon={<LuCircleStop className="text-rose-500" />}
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
    );
}
