export type User = {
    name: string;
    email: string;
    avatar: string;
    created_at: string;
    profile_stat: {
        level: number;
        level_exp: number;
        remaining_exp: number;
        total_exp: number;
        exp_to_next_level: number;
    };
};

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

    habit_logs: HabitLog[];
    achievements: Achievement[];
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

export type FlowcashCategory = {
    id: number;
    name: string;
    icon: string;
    created_at?: string;
    updated_at?: string;
};

export type Flowcash = {
    id: number;
    icon: string;
    date: string;
    amount: number;
    description: string;
    type: string;

    flowcash_category_id?: number;
    flowcash_category?: FlowcashCategory;
};

export type PersonalTask = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: string;
    status: string;
    created_at?: string;
    updated_at?: string;
};

export type Project = {
    id: number;
    name: string;
    description: string;
    status: string;
    created_at?: string;
    updated_at?: string;
};

export type ProjectTask = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: string;
    status: string;
    created_at?: string;
    updated_at?: string;

    project_id?: number;
    project?: Project;
};

export type JournalLog = {
    id: number;
    date: string;
    content: string;
    created_at?: string;
    updated_at?: string;
};

export type AchievementType = {
    id: number;
    name: string;
    desc: string;
    image: string;
    type: string;
    criteria: number;
    trigger: string;
    created_at?: string;
    updated_at?: string;
};

export type Achievement = {
    id: number;

    created_at?: string;
    updated_at?: string;

    achievement_type?: AchievementType;
    achievement_type_id?: number;

    habit_id?: number;
    habit?: Habit;
};
