import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarDays, ChevronLeft } from 'lucide-react';
import { FaCheckCircle, FaStopCircle } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project Detail',
        href: '/projects/show',
    },
];

type Project = {
    id: number;
    name: string;
    description: string;
    status: string;
    created_at: string;
};

interface ShowProps {
    project: Project;
}

export default function Index({ project }: ShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${project.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border p-4">
                    <div className="mx-auto flex w-full flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <Button variant='outline' size='sm' onClick={() => router.get(`/projects`)}>
                                  <ChevronLeft></ChevronLeft>
                                </Button>
                            </div>
                            <h1 className="text-xl font-semibold">
                                {project.name}
                            </h1>
                        </div>
                        <Separator></Separator>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-2">
                                <p className="font-medium">Description</p>
                                <p className="text-sm">
                                    {project.description ||
                                        'No description provided.'}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium">Status</p>
                                <div className="w-fit rounded border px-1 py-0.5">
                                    {project.status === 'completed' ? (
                                        <div className="flex items-center gap-1 text-sm">
                                            <FaCheckCircle className="h-4 text-green-600" />{' '}
                                            Completed
                                        </div>
                                    ) : project.status === 'in_progress' ? (
                                        <div className="flex items-center gap-1 text-sm">
                                            <FiLoader className="h-4" /> In
                                            Progress
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-sm">
                                            <FaStopCircle className="h-4 text-yellow-500" />{' '}
                                            Not Started
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="font-medium">Created At</p>
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4"></CalendarDays>
                                    <p className="text-sm">
                                        {format(
                                            new Date(
                                                project.created_at as string,
                                            ),
                                            'dd MMM yyyy',
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
