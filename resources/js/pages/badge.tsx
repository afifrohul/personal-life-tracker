import LatestAchievementBadge from '@/components/latest-achievement-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Badge',
        href: '/badge-habit',
    },
];

type Habit = {
    id: number;
    name: string;
    color: string;
    exp: number;
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
    habit_id: number;
    achievement_type_id: number;
    created_at: string;
    habit: Habit;
    achievement_type: AchievementType;
};

interface BadgeProps {
    achievement: Achievement[];
}

export default function Badge({ achievement }: BadgeProps) {
    console.log(achievement);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Badge" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Badge Collection</CardTitle>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Completed Habit Achievement Badge
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {achievement.length > 0 ? (
                                <div className="grid grid-cols-4 gap-2">
                                    {achievement.map((item, index) => (
                                        <LatestAchievementBadge
                                            key={index}
                                            data={item}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <p className="text-xs">No data found.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
