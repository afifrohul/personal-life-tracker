import DashboardInfo from '@/components/dashboard-info';
import { formatRupiah } from '@/lib/format-rupiah';
import { GrTransaction } from 'react-icons/gr';
import { LuArrowDownLeft, LuArrowUpRight, LuWallet } from 'react-icons/lu';
import { MdOutlineCategory } from 'react-icons/md';
import { PiMoneyWavyBold } from 'react-icons/pi';
import { RiCoinsLine, RiHandCoinLine } from 'react-icons/ri';

interface DashboardFinanceDataProps {
    flowcashCategoryCount: number;
    flowcashCount: number;
    totalIncome: number;
    totalExpense: number;
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpense: number;
    monthlyDifference: number;
}

export default function DashboardFinanceData({
    flowcashCategoryCount,
    flowcashCount,
    totalIncome,
    totalExpense,
    totalBalance,
    monthlyIncome,
    monthlyExpense,
    monthlyDifference,
}: DashboardFinanceDataProps) {
    return (
        <div className="overflow-hidden rounded-lg border">
            <div className="bg-muted p-2">
                <p className="text-xs font-semibold">Finance data</p>
            </div>
            <DashboardInfo
                icon={<MdOutlineCategory className="text-indigo-500" />}
                desc="Total Flowcash Category(s):"
                data={`${flowcashCategoryCount} Category(s)`}
            />
            <DashboardInfo
                icon={<GrTransaction className="text-sky-500" />}
                desc="Total Flowcash(s):"
                data={`${flowcashCount} Flowcash(s)`}
            />
            <DashboardInfo
                icon={<LuWallet className="text-teal-500" />}
                desc="Available Balance:"
                data={formatRupiah(totalBalance)}
            />
            <DashboardInfo
                icon={<PiMoneyWavyBold className="text-green-500" />}
                desc="Total Income:"
                data={formatRupiah(totalIncome)}
            />
            <DashboardInfo
                icon={<RiHandCoinLine className="text-rose-500" />}
                desc="Total Expense:"
                data={formatRupiah(totalExpense)}
            />
            <DashboardInfo
                icon={<RiCoinsLine className="text-teal-500" />}
                desc="Available Balance This Month:"
                data={formatRupiah(monthlyDifference)}
            />
            <DashboardInfo
                icon={<LuArrowDownLeft className="text-green-500" />}
                desc="Total Income This Month:"
                data={formatRupiah(monthlyIncome)}
            />
            <DashboardInfo
                icon={<LuArrowUpRight className="text-rose-500" />}
                desc="Total Expense This Month:"
                data={formatRupiah(monthlyExpense)}
            />
        </div>
    );
}
