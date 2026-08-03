import { format } from 'date-fns';
import { Award } from 'lucide-react';

type AchievementType = {
    id: number;
    name: string;
    desc: string;
    color_code: string;
    type: string;
    criteria: number;
    trigger: string;
};

type Achievement = {
    id: number;
    achievement_type: AchievementType;
    achievement_type_id: number;
    created_at: string;
};

interface LatestAchievementBadgeProps {
    data: Achievement;
}

export default function LatestAchievementBadge({
    data,
}: LatestAchievementBadgeProps) {
    return (
        // <div className="flex w-full items-center justify-between rounded border p-2">
        //     <div className="item flex gap-2">
        //         <div
        //             className="w-fit rounded border p-2"
        //             style={{
        //                 backgroundColor: data.achievement_type.color_code,
        //             }}
        //         >
        //             <Award className="h-5 w-5" />
        //         </div>
        //         <div>
        //             <p className="text-sm font-medium">
        //                 {data.achievement_type.name}
        //             </p>
        //             <p className="text-xs text-muted-foreground">
        //                 {data.achievement_type.desc}
        //             </p>
        //         </div>
        //     </div>
        //     <div className="text-xs italic">
        //         Claimed {format(new Date(data.created_at), 'dd MMMM yyyy')}
        //     </div>
        // </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded border p-4">
            <div
                className="w-fit rounded border p-2"
                style={{
                    backgroundColor: data.achievement_type.color_code,
                }}
            >
                <Award className="h-8 w-8" />
            </div>
            <div>
                <p className="text-center text-base font-medium">
                    {data.achievement_type.name}
                </p>
                <p className="text-center text-sm">
                    {data.achievement_type.desc}
                </p>
            </div>
            <div className="text-xs text-muted-foreground italic text-center">
                Claimed {format(new Date(data.created_at), 'dd MMMM yyyy')}
            </div>
        </div>
    );
}
