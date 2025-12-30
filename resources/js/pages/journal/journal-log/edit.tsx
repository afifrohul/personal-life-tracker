import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { JournalLogForm } from './partials/formJournalLog';

interface EditProps {
    journalLog: {
        id: number;
        content: string;
        date: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Journal Log - Edit', href: '/journal-logs/edit' },
];

export default function Edit({ journalLog }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Journal Log" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">Edit Journal Log</h1>
                    <Separator className="my-4" />
                    <JournalLogForm
                        initialData={journalLog}
                        submitUrl={`/journal-logs/${journalLog.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
