import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PersonalTaksForm } from './partials/formPersonalTask';


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Habit - Create', href: '/personal-tasks/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Personal Taks" />
            <div className="container mx-auto p-4">
                <div className="rounded-md border p-4">
                    <h1 className="mb-4 text-xl font-bold">
                        Create Personal Task
                    </h1>
                    <Separator className="my-4" />
                    <PersonalTaksForm submitUrl="/personal-tasks" method="post" />
                </div>
            </div>
        </AppLayout>
    );
}
