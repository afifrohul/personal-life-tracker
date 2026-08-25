export type MoodLog = {
    id: number;
    mood_score: number;
    date: string;
    created_at?: string;
    updated_at?: string;
};

export type Category = {
    // Habit Category
    id: number;
    name: string;
    icon: string;
    created_at?: string;
    updated_at?: string;
};

export type Habit = {
    id: number;
    name: string;
    color: string;
    desc?: string;
    difficulty: string;
    icon: string;
    created_at?: string;
    updated_at?: string;

    habit_category_id: string;
    habit_category?: Category;
};

export type HabitLog = {
    id: number;
    exp_gain: number;
    date: string;
    created_at?: string;
    updated_at?: string;

    habit_id: string;
    habit?: Habit;
};
