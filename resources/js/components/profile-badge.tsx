import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type BadgeTier = {
    name: string;
    minExp: number;
    maxExp?: number;
    color: string;
};

const BADGE_TIERS: BadgeTier[] = [
    {
        name: 'Novice',
        minExp: 0,
        maxExp: 499,
        color: '#CD7F32',
    },
    {
        name: 'Apprentice',
        minExp: 500,
        maxExp: 1999,
        color: '#4CAF50',
    },
    {
        name: 'Specialist',
        minExp: 2000,
        maxExp: 4999,
        color: '#2196F3',
    },
    {
        name: 'Expert',
        minExp: 5000,
        maxExp: 14999,
        color: '#9C27B0',
    },
    {
        name: 'Master',
        minExp: 15000,
        color: '#FFC107',
    },
];

function getBadgeTier(totalExp: number): BadgeTier {
    return (
        BADGE_TIERS.find(
            ({ minExp, maxExp }) =>
                totalExp >= minExp &&
                (maxExp === undefined || totalExp <= maxExp),
        ) ?? BADGE_TIERS[0]
    );
}

function formatExpRange(tier: BadgeTier) {
    if (tier.maxExp === undefined) {
        return `${tier.minExp.toLocaleString()}+ EXP`;
    }

    return `${tier.minExp.toLocaleString()}-${tier.maxExp.toLocaleString()} EXP`;
}

function TierBadge({ tier }: { tier: BadgeTier }) {
    return (
        <Badge>
            <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: tier.color }}
            />
            {tier.name}
        </Badge>
    );
}

export default function ProfileBadge({ total_exp }: { total_exp: number }) {
    const currentTier = getBadgeTier(total_exp);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="cursor-pointer"
                    aria-label={`Current badge: ${currentTier.name}`}
                >
                    <TierBadge tier={currentTier} />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Badge Tiers</DialogTitle>
                    <DialogDescription>
                        Your badge tier is determined by your total EXP.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                    {BADGE_TIERS.map((tier) => {
                        const isCurrent = tier.name === currentTier.name;

                        return (
                            <div
                                key={tier.name}
                                className="grid grid-cols-2 items-center gap-2"
                            >
                                <div className="flex items-center gap-2">
                                    <TierBadge tier={tier} />

                                    {isCurrent && (
                                        <span className="text-xs text-muted-foreground italic">
                                            [Current]
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    {formatExpRange(tier)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
