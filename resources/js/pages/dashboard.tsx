import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarDays, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    user: {
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
}

export default function Dashboard({ user }: DashboardProps) {

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const date = now.toLocaleDateString('en-EN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const time = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const getInitials = useInitials();

    const [progress, setProgress] = useState(
        (user.profile_stat.level_exp / user.profile_stat.exp_to_next_level) *
            100,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex w-full gap-4">
                    <div className="flex-1 space-y-2 rounded-xl border border-primary bg-card p-4">
                        <p className="text-sm font-medium">
                            👋 Welcome to dashboard, {user.name}!
                        </p>
                        <p className="text-sm font-light text-muted-foreground">
                            Small habits today create big changes tomorrow.
                            Let’s keep your habits on track today.
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded-xl border border-primary bg-card px-8">
                        <div className="flex items-center justify-center gap-8">
                            <div className="flex items-center gap-2 text-sm">
                                <CalendarDays className="h-3.5 w-3.5"></CalendarDays>
                                {date}
                            </div>
                            <div className="flex items-center gap-2 font-mono text-sm font-semibold">
                                <Clock className="h-3.5 w-3.5"></Clock>
                                {time}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
