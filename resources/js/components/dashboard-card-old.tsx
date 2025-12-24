import { LucideIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export default function DashboardCard({
    header,
    icon: Icon,
    data,
    footer,
    link,
    className,
}: {
    header: string;
    icon?: LucideIcon | null;
    data: number;
    footer: string;
    link?: string;
    className?: string;
}) {
    return (
        <Card className="p-4">
            <div className={`rounded ${className ?? ''}`}>
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-neutral-500 dark:text-neutral-300">
                            {header}
                        </p>
                        <div>
                            {Icon && (
                                <Icon className="text-sm text-primary" />
                            )}
                        </div>
                    </div>
                    <p className="mt-2 text-2xl font-extrabold">{data}</p>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm font-medium">{footer}</p>
                        {link ? (
                            <Link href={link}>
                                <div className="rounded bg-accent px-1 py-0.5 text-xs underline duration-200 hover:bg-muted ">
                                    Details
                                </div>
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
        </Card>
    );
}
