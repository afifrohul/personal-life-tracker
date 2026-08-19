import DashboardInfo from '@/components/dashboard-info';
import { LuNotebook, LuNotebookPen } from 'react-icons/lu';

interface DashboardJournalDataProps {
    journalLogCount: number;
    jounalLogThisMonthCount: number;
}

export default function DashboardJournalData({
    jounalLogThisMonthCount,
    journalLogCount,
}: DashboardJournalDataProps) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <div className="bg-muted p-2">
                <p className="text-xs font-semibold">Journal data</p>
            </div>
            <DashboardInfo
                icon={<LuNotebook className="text-indigo-500" />}
                desc="Total Journal Log(s)"
                data={`${journalLogCount} Log(s)`}
            />
            <DashboardInfo
                icon={<LuNotebookPen className="text-fuchsia-500" />}
                desc="Total Journal Log(s) This Month:"
                data={`${jounalLogThisMonthCount} Log(s)`}
            />
        </div>
    );
}
