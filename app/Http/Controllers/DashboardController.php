<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

use App\Models\Habit;
use App\Models\HabitCategory;
use App\Models\HabitLog;
use App\Models\User;
use App\Models\UserProfileStat;

use App\Models\FlowcashCategory;
use App\Models\Flowcash;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('profileStat');

        $habitCategoryCount = HabitCategory::count();
        $habitCount = Habit::count();
        $habitLogCount = HabitLog::count();
        $expTotal = UserProfileStat::select('total_exp')
            ->first()->total_exp;

        $flowcashCategoryCount = FlowcashCategory::count();
        $flowcashCount = Flowcash::count();

        $totalIncome = Flowcash::where('type', 'income')->sum('amount');
        $totalExpense = Flowcash::where('type', 'expense')->sum('amount');
        $totalBalance = $totalIncome - $totalExpense;

        // Ambil bulan dan tahun saat ini
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // Total pemasukan bulan ini
        $monthlyIncome = Flowcash::where('type', 'income')
            ->whereMonth('date', $currentMonth)
            ->whereYear('date', $currentYear)
            ->sum('amount');

        // Total pengeluaran bulan ini
        $monthlyExpense = Flowcash::where('type', 'expense')
            ->whereMonth('date', $currentMonth)
            ->whereYear('date', $currentYear)
            ->sum('amount');

        // Selisih pemasukan dan pengeluaran bulan ini
        $monthlyDifference = $monthlyIncome - $monthlyExpense;


        return Inertia::render('dashboard', compact(
            'user',
            
            'habitCategoryCount',
            'habitCount',
            'habitLogCount',
            'expTotal',

            'flowcashCategoryCount',
            'flowcashCount',
            'totalIncome',
            'totalExpense',
            'totalBalance',
            'monthlyIncome',
            'monthlyExpense',
            'monthlyDifference'
        ));
    }
}
