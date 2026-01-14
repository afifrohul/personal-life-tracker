import { ReactElement } from 'react';

export const colorMap = {
    slate: {
        bg: 'bg-slate-400/10',
        border: 'border-slate-400/20',
        text: 'text-slate-500',
    },
    gray: {
        bg: 'bg-gray-400/10',
        border: 'border-gray-400/20',
        text: 'text-gray-500',
    },
    zinc: {
        bg: 'bg-zinc-400/10',
        border: 'border-zinc-400/20',
        text: 'text-zinc-500',
    },
    neutral: {
        bg: 'bg-neutral-400/10',
        border: 'border-neutral-400/20',
        text: 'text-neutral-500',
    },
    stone: {
        bg: 'bg-stone-400/10',
        border: 'border-stone-400/20',
        text: 'text-stone-500',
    },

    red: {
        bg: 'bg-red-400/10',
        border: 'border-red-400/20',
        text: 'text-red-500',
    },
    orange: {
        bg: 'bg-orange-400/10',
        border: 'border-orange-400/20',
        text: 'text-orange-500',
    },
    amber: {
        bg: 'bg-amber-400/10',
        border: 'border-amber-400/20',
        text: 'text-amber-500',
    },
    yellow: {
        bg: 'bg-yellow-400/10',
        border: 'border-yellow-400/20',
        text: 'text-yellow-500',
    },
    lime: {
        bg: 'bg-lime-400/10',
        border: 'border-lime-400/20',
        text: 'text-lime-500',
    },
    green: {
        bg: 'bg-green-400/10',
        border: 'border-green-400/20',
        text: 'text-green-500',
    },
    emerald: {
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20',
        text: 'text-emerald-500',
    },
    teal: {
        bg: 'bg-teal-400/10',
        border: 'border-teal-400/20',
        text: 'text-teal-500',
    },
    cyan: {
        bg: 'bg-cyan-400/10',
        border: 'border-cyan-400/20',
        text: 'text-cyan-500',
    },
    sky: {
        bg: 'bg-sky-400/10',
        border: 'border-sky-400/20',
        text: 'text-sky-500',
    },
    blue: {
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20',
        text: 'text-blue-500',
    },
    indigo: {
        bg: 'bg-indigo-400/10',
        border: 'border-indigo-400/20',
        text: 'text-indigo-500',
    },
    violet: {
        bg: 'bg-violet-400/10',
        border: 'border-violet-400/20',
        text: 'text-violet-500',
    },
    purple: {
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/20',
        text: 'text-purple-500',
    },
    fuchsia: {
        bg: 'bg-fuchsia-400/10',
        border: 'border-fuchsia-400/20',
        text: 'text-fuchsia-500',
    },
    pink: {
        bg: 'bg-pink-400/10',
        border: 'border-pink-400/20',
        text: 'text-pink-500',
    },
    rose: {
        bg: 'bg-rose-400/10',
        border: 'border-rose-400/20',
        text: 'text-rose-500',
    },
};

interface Props {
    color: keyof typeof colorMap;
    icon?: ReactElement;
    label: string | number;
}

export default function SubtleBadge({ color, icon, label }: Props) {
    const c = colorMap[color];

    return (
        <div
            className={`flex w-fit items-center gap-1 rounded border px-1 py-0.5 font-medium ${c.bg} ${c.border} ${c.text}`}
        >
            {icon}
            <p className="capitalize text-xs">{label}</p>
        </div>
    );
}
