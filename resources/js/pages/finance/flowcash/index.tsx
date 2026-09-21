import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/format-rupiah';
import { type BreadcrumbItem } from '@/types';
import type { Flowcash, FlowcashCategory, Pagination } from '@/types/data';
import { Head } from '@inertiajs/react';
import { ArrowDownLeft, ArrowUpRight, CircleDollarSign } from 'lucide-react';
import TableFlowcash from './partials/tableFlowcash';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flowcash',
        href: '/flowcashes',
    },
];

interface FlowcashIndexProps {
    allFlowcashes: Pagination<Flowcash>;
    categories: FlowcashCategory[];
    totalIncome: number;
    totalExpense: number;
    filters: {
        search: string;
        category: string;
        type: string;
        perPage: number;
        from: Date;
        to: Date;
    };
}

export default function Index({
    allFlowcashes,
    categories,
    totalIncome,
    totalExpense,
    filters,
}: FlowcashIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Flowcash" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <TableFlowcash
                    paginationData={allFlowcashes}
                    categories={categories}
                    filters={filters}
                />

                <div className="rounded-md border bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Summary</p>

                        <p className="text-xs text-indigo-500 italic">
                            *Totals are based on the filtered flowcashes
                        </p>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-4">
                        <div className="rounded-md border p-3">
                            <div className="flex items-center gap-1">
                                <ArrowDownLeft className="h-3.5 w-3.5 text-teal-600" />
                                <p className="text-xs text-muted-foreground">
                                    Total Income
                                </p>
                            </div>
                            <p className="text-lg font-semibold text-teal-600">
                                {formatRupiah(totalIncome)}
                            </p>
                        </div>

                        <div className="rounded-md border p-3">
                            <div className="flex items-center gap-1">
                                <ArrowUpRight className="h-3.5 w-3.5 text-rose-600" />
                                <p className="text-xs text-muted-foreground">
                                    Total Expense
                                </p>
                            </div>
                            <p className="text-lg font-semibold text-rose-600">
                                {formatRupiah(totalExpense)}
                            </p>
                        </div>

                        <div className="rounded-md border p-3">
                            <div className="flex items-center gap-1">
                                <CircleDollarSign className="h-3.5 w-3.5 text-yellow-600" />
                                <p className="text-xs text-muted-foreground">
                                    Available Balance
                                </p>
                            </div>
                            <p className="text-lg font-semibold text-yellow-600">
                                {formatRupiah(totalIncome - totalExpense)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
