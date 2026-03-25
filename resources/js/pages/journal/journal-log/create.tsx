import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { JournalLogForm } from './partials/formJournalLog';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Journal Log - Create', href: '/journal-logs/create' },
];

interface CreateProps {
    selectedDate: string;
}

export default function Create({ selectedDate }: CreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Journal Log" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="rounded-xl border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Create Journal Log
                    </h1>
                    <Separator className="my-4" />
                    <JournalLogForm
                        initialData={{ date: selectedDate, content: '' }}
                        submitUrl={`/journal-logs`}
                        method="post"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
