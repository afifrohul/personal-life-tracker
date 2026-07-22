import DashboardInfo from "@/components/dashboard-info";
import { LuScrollText, LuSquareActivity, LuSquareLibrary } from "react-icons/lu";

interface DashboardHabitDataProps {
    habitCategoryCount: number;
    habitCount: number;
    habitLogCount: number;
}

export default function DashboardHabitData({
    habitCategoryCount,
    habitCount,
    habitLogCount,
}: DashboardHabitDataProps) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <div className="bg-muted p-2">
                <p className="text-xs font-semibold">Habit data</p>
            </div>
            <DashboardInfo
                icon={<LuSquareLibrary className="text-teal-500" />}
                desc="Total Habit Category(s):"
                data={`${habitCategoryCount} Category(s)`}
            />
            <DashboardInfo
                icon={<LuSquareActivity className="text-indigo-500" />}
                desc="Total Habit(s):"
                data={`${habitCount} Habit(s)`}
            />
            <DashboardInfo
                icon={<LuScrollText className="text-blue-500" />}
                desc="Total Habit Log(s):"
                data={`${habitLogCount} Log(s)`}
            />
        </div>
    );
}
