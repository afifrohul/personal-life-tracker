import { Button } from '@/components/ui/button';
import type { AchievementType, Habit } from '@/types/data';
import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';

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
        <div className="flex flex-col items-center justify-center gap-2 rounded border p-4">
            <img
                src={`/badge/${achievementType.image}`}
                alt={achievementType.image}
                className="w-24"
            />
            <div>
                <p className="text-center text-base font-medium">
                    {achievementType.name}
                </p>
                <p className="text-center text-sm">{achievementType.desc}</p>
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
