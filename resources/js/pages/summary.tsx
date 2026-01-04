import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Summary',
        href: '/summary',
    },
];

export default function Summary() {
  return (
     <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Summary" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div className='border rounded-md p-4 text-sm'>Summary page</div>
      </div>
     </AppLayout>
  )
}