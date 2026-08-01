import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Award } from 'lucide-react';
import { useState } from 'react';

type Log = {
    id: number;
    habit_id: number;
    exp_gain: number;
    date: string;
};

type Category = {
    id: number;
    name: string;
    icon: string;
};

type Achievement = {
    id: number;
    habit_id: number;
    achievement_type_id: number;
    created_at: string;
};

type Habit = {
    id: number;
    name: string;
    color: string;
    exp: number;
    icon: string;
    habit_category: Category;
    habit_logs: Log[];
    achievements: Achievement[];
};

type AchievementType = {
    id: number;
    name: string;
    desc: string;
    color_code: string;
    type: string;
    criteria: number;
    trigger: string;
};

interface AllAchievementBadgeProps {
    habit: Habit;
    achievementType: AchievementType;
    longestStreak: number;
}

export default function AllAchievementBadge({
    habit,
    achievementType,
    longestStreak,
}: AllAchievementBadgeProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const claimAchievement = (achievement_type_id: number) => {
        router.post(
            `/habit-tracker/${habit.id}/achievement`,
            {
                achievement_type_id: achievement_type_id,
            },
            {
                onSuccess: () => setIsSubmitting(false),
                onError: () => setIsSubmitting(false),
            },
        );
    };

    return (
        <div className="flex w-full items-center justify-between rounded border p-2">
            <div className="item flex gap-2">
                <div
                    className="w-fit rounded border p-2"
                    style={{
                        backgroundColor: achievementType.color_code,
                    }}
                >
                    <Award className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm font-medium">
                        {achievementType.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {achievementType.desc}
                    </p>
                </div>
            </div>
            {habit.achievements.find(
                (acv) => acv.achievement_type_id === achievementType.id,
            ) ? (
                <div className="text-xs italic">
                    Claimed{' '}
                    {format(
                        new Date(
                            habit.achievements.find(
                                (acv) =>
                                    acv.achievement_type_id ===
                                    achievementType.id,
                            )?.created_at as string,
                        ),
                        'dd MMMM yyyy',
                    )}
                </div>
            ) : (achievementType.trigger === 'reps' &&
                  habit.habit_logs.length >= achievementType.criteria) ||
              (achievementType.trigger === 'streak' &&
                  longestStreak >= achievementType.criteria) ? (
                <Button
                    className="text-xs italic"
                    size={'sm'}
                    onClick={() => claimAchievement(achievementType.id)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Claiming...' : 'Claim'}
                </Button>
            ) : achievementType.trigger === 'reps' ? (
                <div>
                    <p className="text-xs text-muted-foreground italic">
                        {habit.habit_logs.length} / {achievementType.criteria}
                    </p>
                </div>
            ) : achievementType.trigger === 'streak' ? (
                <div>
                    <p className="text-xs text-muted-foreground italic">
                        {longestStreak} / {achievementType.criteria}
                    </p>
                </div>
            ) : (
                <Button
                    className="text-xs italic"
                    size={'sm'}
                    variant={'secondary'}
                    disabled
                >
                    Claim
                </Button>
            )}
        </div>
    );
}
