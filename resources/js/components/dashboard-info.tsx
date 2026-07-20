import { Separator } from '@/components/ui/separator';
import { ReactElement } from 'react';

interface DashboardInfoProps {
    icon: ReactElement;
    data: number | string;
    desc: string;
}

export default function DashboardInfo({
    icon,
    data,
    desc,
}: DashboardInfoProps) {
    return (
        <div>
            <Separator />
            <div className="grid grid-cols-2 p-2">
                <div className="flex items-center gap-1">
                    {icon}
                    <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <p className="text-xs font-medium">{data}</p>
            </div>
        </div>
    );
}
