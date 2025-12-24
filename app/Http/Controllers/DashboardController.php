<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Habit;
use App\Models\HabitCategory;
use App\Models\HabitLog;
use App\Models\User;
use App\Models\UserProfileStat;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('profileStat');

        $categoryCount = HabitCategory::count();
        $habitCount = Habit::count();
        $habitLogCount = HabitLog::count();
        $expTotal = UserProfileStat::select('total_exp')
            ->first()->total_exp;

        $chartData = HabitLog::select(\DB::raw('date, sum(exp_gain) as exp'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $expGainByCategory = HabitLog::query()
            ->join('habits', 'habit_logs.habit_id', '=', 'habits.id')
            ->join('habit_categories', 'habits.habit_category_id', '=', 'habit_categories.id')
            ->whereNull('habit_logs.deleted_at')
            ->select(
                'habit_categories.name as category',
                \DB::raw('CAST(SUM(habit_logs.exp_gain) AS UNSIGNED) as exp_gain')
            )
            ->groupBy('habit_categories.name')
            ->get();


        $expGainByHabit = HabitLog::query()
            ->join('habits', 'habit_logs.habit_id', '=', 'habits.id')
            ->whereNull('habit_logs.deleted_at')
            ->select(
                'habits.name as habit',
                \DB::raw('CAST(SUM(habit_logs.exp_gain) AS UNSIGNED) as exp_gain')
            )
            ->groupBy('habits.name')
            ->get();


        return Inertia::render('dashboard', compact(
            'user',
            'categoryCount',
            'habitCount',
            'habitLogCount',
            'expTotal',
            'chartData',
            'expGainByCategory',
            'expGainByHabit'
        ));
    }
}
