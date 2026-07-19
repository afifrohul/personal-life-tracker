import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habit Tracker',
        href: '/habit-tracker',
    },
];


export default function Profile() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habit Tracker" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
              <p>Profile Page</p>
            </div>
        </AppLayout>
    );
}
