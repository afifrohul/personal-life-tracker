import type { AchievementType, Habit } from "@/types/data";

interface Props {
    habit: Habit;
    achievementType: AchievementType[];
    longestStreak: number;
}

export default function calculateUnclaimedFullfilledAchievement({
    habit,
    achievementType,
    longestStreak,
}: Props) {
    let count = 0;

    const claimedAchievement = habit.achievements.map(
        (item) => item.achievement_type_id,
    );

    const unclaimedAchievement = achievementType.filter(
        (item) => !claimedAchievement.includes(item.id),
    );

    unclaimedAchievement.forEach((item) => {
        if (
            item.trigger === 'reps' &&
            habit.habit_logs.length >= item.criteria
        ) {
            count += 1;
        } else if (
            item.trigger === 'streak' &&
            longestStreak >= item.criteria
        ) {
            count += 1;
        }
    });
    return count;
}
