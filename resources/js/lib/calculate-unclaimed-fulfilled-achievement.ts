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

type AchievementType = {
    id: number;
    name: string;
    desc: string;
    image: string;
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
