import DashboardInfo from '@/components/dashboard-info';
import {
    LuAngry,
    LuFrown,
    LuMeh,
    LuSmile,
    LuSmilePlus,
    LuSticker,
} from 'react-icons/lu';

interface DashboardMoodDataProps {
    moodLogCount: number;
    badMoodCount: number;
    notGoodMoodCount: number;
    okayMoodCount: number;
    goodMoodCount: number;
    greatMoodCount: number;
}

export default function DashboardMoodData({
    moodLogCount,
    badMoodCount,
    notGoodMoodCount,
    okayMoodCount,
    goodMoodCount,
    greatMoodCount,
}: DashboardMoodDataProps) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <div className="bg-muted p-2">
                <p className="text-xs font-semibold">Mood data</p>
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
    );
}
