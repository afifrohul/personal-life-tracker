import { format } from 'date-fns';

type AchievementType = {
    id: number;
    name: string;
    desc: string;
    image: string;
    type: string;
    criteria: number;
    trigger: string;
};

type Habit = {
    id: number;
    name: string;
    color: string;
    exp: number;
    icon: string;
};

type Achievement = {
    id: number;
    achievement_type: AchievementType;
    achievement_type_id: number;
    created_at: string;
    habit?: Habit;
};

interface LatestAchievementBadgeProps {
    data: Achievement;
}

export default function LatestAchievementBadge({
    data,
}: LatestAchievementBadgeProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded border p-4">
            <img
                src={`/badge/${data.achievement_type.image}`}
                alt={data.achievement_type.image}
                className="w-24"
            />
            {data.habit ? (
                <div className="text-center text-xs text-muted-foreground italic">
                    [{data.habit?.name}]
                </div>
            ) : null}
            <div>
                <p className="text-center text-base font-medium">
                    {data.achievement_type.name}
                </p>
                <p className="text-center text-sm">
                    {data.achievement_type.desc}
                </p>
            </div>
            <div className="text-center text-xs text-muted-foreground italic">
                Claimed {format(new Date(data.created_at), 'dd MMMM yyyy')}
            </div>
        </div>
    );
}
