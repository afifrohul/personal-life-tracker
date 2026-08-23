import { ChartExpense } from '@/components/chart-expense';
import ChartExpenseByCategory from '@/components/chart-expense-by-category';
import { ChartFinance } from '@/components/chart-finance';
import { ChartFinanceYear } from '@/components/chart-finance-year';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Finance Tracker',
        href: '/finance-tracker',
    },
];

interface IndexProps {
    chartDataFinance: [];
    chartDataExpense: [];
    chartDataFinanceYear: [];
    expenseByCategory: [];
    uniqueYears: [];
}

export default function Index({
    chartDataFinance,
    chartDataExpense,
    chartDataFinanceYear,
    expenseByCategory,
    uniqueYears,
}: IndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Finance Tracker" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <ChartFinance
                        chartData={chartDataFinance}
                        uniqueYears={uniqueYears}
                    />
                </div>
                <div>
                    <ChartExpense
                        chartData={chartDataExpense}
                        uniqueYears={uniqueYears}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ChartFinanceYear chartData={chartDataFinanceYear} />
                    <ChartExpenseByCategory
                        data={expenseByCategory}
                        uniqueYears={uniqueYears}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
