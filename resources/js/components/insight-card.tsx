import { MoveRight, TrendingDown, TrendingUp } from 'lucide-react';

interface Insight {
    title: string;
    icon: React.ReactElement;
    value: number | string;
    change_percent: number;
    trend: 'up' | 'down' | 'neutral';
    className?: string;
}

export default function InsightCard({
    title,
    icon,
    value,
    change_percent,
    trend,
    className,
}: Insight) {
    return (
        <div
            className={`flex w-full flex-col gap-4 rounded-lg border p-4 ${className || ''}`}
        >
            <div className="flex items-center gap-2">
                <div>{icon}</div>
                <p className="text-sm text-muted-foreground">{title}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
                <p className="font-medium">{value}</p>
            </div>
            <div className="mt-1 flex items-center gap-2">
                <div
                    className={`flex items-center gap-1 rounded ${trend === 'up' ? 'text-teal-600' : trend === 'down' ? 'text-rose-600' : 'text-gray-600'}`}
                >
                    {trend === 'up' ? (
                        <TrendingUp className="h-3 w-3" />
                    ) : trend === 'down' ? (
                        <TrendingDown className="h-3 w-3" />
                    ) : (
                        <MoveRight className="h-3 w-3" />
                    )}
                </div>
                <div
                    className={`rounded border px-1 py-0.5 text-xs font-medium ${trend === 'up' ? 'border-teal-400/20 bg-teal-400/10 text-teal-600' : trend === 'down' ? 'border-rose-400/20 bg-rose-400/10 text-rose-600' : 'border-gray-400/20 bg-gray-400/10 text-gray-600'}`}
                >
                    <p className="italic">
                        {trend === 'up' ? '+' : null}{change_percent}%
                    </p>
                </div>
                <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">
                        from last week
                    </p>
                </div>
            </div>
        </div>
    );
}
