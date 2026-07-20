<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

use App\Models\MoodLog;

use App\Models\Habit;
use App\Models\HabitCategory;
use App\Models\HabitLog;
use App\Models\User;
use App\Models\UserProfileStat;

use App\Models\FlowcashCategory;
use App\Models\Flowcash;

use App\Models\JournalLog;

use App\Models\PersonalTask;
use App\Models\Project;
use App\Models\ProjectTask;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('profileStat');

        $moodLogCount = MoodLog::count();
        $badMoodCount = MoodLog::where('mood_score', 1)->count();
        $notGoodMoodCount = MoodLog::where('mood_score', 2)->count();
        $okayMoodCount = MoodLog::where('mood_score', 3)->count();
        $goodMoodCount = MoodLog::where('mood_score', 4)->count();
        $greatMoodCount = MoodLog::where('mood_score', 5)->count();

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

        $personalTaskCount = PersonalTask::count();
        $pendingPersonalTaskCount = PersonalTask::where('status', 'pending')->count();
        $inProgressPersonalTaskCount = PersonalTask::where('status', 'in_progress')->count();
        $completedPersonalTaskCount = PersonalTask::where('status', 'completed')->count();
        $projectCount = Project::count();
        $pendingProjectCount = Project::where('status', 'pending')->count();
        $inProgressProjectCount = Project::where('status', 'in_progress')->count();
        $completedProjectCount = Project::where('status', 'completed')->count();
        $projectTaskCount = ProjectTask::count();
        $pendingProjectTaskCount = ProjectTask::where('status', 'pending')->count();
        $inProgressProjectTaskCount = ProjectTask::where('status', 'in_progress')->count();
        $completedProjectTaskCount = ProjectTask::where('status', 'completed')->count();
        $journalLogCount = JournalLog::count();
        $jounalLogThisMonthCount = JournalLog::whereMonth('date', $currentMonth)->count();

        return Inertia::render('dashboard-new', compact(
            'user',

            'moodLogCount',
            'badMoodCount',
            'notGoodMoodCount',
            'okayMoodCount',
            'goodMoodCount',
            'greatMoodCount',
    
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
            'monthlyDifference',

            'journalLogCount',
            'jounalLogThisMonthCount',

            'personalTaskCount',
            'pendingPersonalTaskCount',
            'inProgressPersonalTaskCount',
            'completedPersonalTaskCount',
            'projectCount',
            'pendingProjectCount',
            'inProgressProjectCount',
            'completedProjectCount',
            'projectTaskCount',
            'pendingProjectTaskCount',
            'inProgressProjectTaskCount',
            'completedProjectTaskCount',

        ));
    }
}
