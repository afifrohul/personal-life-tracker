import { ReactElement } from 'react';

export const colorMap = {
    slate: {
        bg: 'bg-slate-400/10',
        border: 'border-slate-400/20',
        text: 'text-slate-600',
    },
    gray: {
        bg: 'bg-gray-400/10',
        border: 'border-gray-400/20',
        text: 'text-gray-600',
    },
    zinc: {
        bg: 'bg-zinc-400/10',
        border: 'border-zinc-400/20',
        text: 'text-zinc-600',
    },
    neutral: {
        bg: 'bg-neutral-400/10',
        border: 'border-neutral-400/20',
        text: 'text-neutral-600',
    },
    stone: {
        bg: 'bg-stone-400/10',
        border: 'border-stone-400/20',
        text: 'text-stone-600',
    },

    red: {
        bg: 'bg-red-400/10',
        border: 'border-red-400/20',
        text: 'text-red-600',
    },
    orange: {
        bg: 'bg-orange-400/10',
        border: 'border-orange-400/20',
        text: 'text-orange-600',
    },
    amber: {
        bg: 'bg-amber-400/10',
        border: 'border-amber-400/20',
        text: 'text-amber-600',
    },
    yellow: {
        bg: 'bg-yellow-400/10',
        border: 'border-yellow-400/20',
        text: 'text-yellow-600',
    },
    lime: {
        bg: 'bg-lime-400/10',
        border: 'border-lime-400/20',
        text: 'text-lime-600',
    },
    green: {
        bg: 'bg-green-400/10',
        border: 'border-green-400/20',
        text: 'text-green-600',
    },
    emerald: {
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20',
        text: 'text-emerald-600',
    },
    teal: {
        bg: 'bg-teal-400/10',
        border: 'border-teal-400/20',
        text: 'text-teal-600',
    },
    cyan: {
        bg: 'bg-cyan-400/10',
        border: 'border-cyan-400/20',
        text: 'text-cyan-600',
    },
    sky: {
        bg: 'bg-sky-400/10',
        border: 'border-sky-400/20',
        text: 'text-sky-600',
    },
    blue: {
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20',
        text: 'text-blue-600',
    },
    indigo: {
        bg: 'bg-indigo-400/10',
        border: 'border-indigo-400/20',
        text: 'text-indigo-600',
    },
    violet: {
        bg: 'bg-violet-400/10',
        border: 'border-violet-400/20',
        text: 'text-violet-600',
    },
    purple: {
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/20',
        text: 'text-purple-600',
    },
    fuchsia: {
        bg: 'bg-fuchsia-400/10',
        border: 'border-fuchsia-400/20',
        text: 'text-fuchsia-600',
    },
    pink: {
        bg: 'bg-pink-400/10',
        border: 'border-pink-400/20',
        text: 'text-pink-600',
    },
    rose: {
        bg: 'bg-rose-400/10',
        border: 'border-rose-400/20',
        text: 'text-rose-600',
    },
};

interface DashboardProps {
    color: keyof typeof colorMap;
    icon: ReactElement;
    data: number | string;
    desc: string;
    className?: string;
}

export default function DashboardCardInfo({
    color,
    icon,
    data,
    desc,
    className,
}: DashboardProps) {
    const c = colorMap[color];

    return (
        <div
            className={`flex flex-col justify-center rounded-lg border p-4 ${className}`}
        >
            <div className="flex w-full items-center gap-4">
                <div
                    className={`h-10 w-10 rounded-full ${c.bg} ${c.border} flex items-center justify-center border`}
                >
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-semibold">{data}</p>
                    <p className="text-xs">{desc}</p>
                </div>
            </div>
        </div>
    );
}
