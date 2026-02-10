<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

use App\Models\MoodLog;

use App\Models\Habit;
use App\Models\HabitCategory;
use App\Models\HabitLog;
use App\Models\User;
use App\Models\UserProfileStat;

use App\Models\FlowcashCategory;
use App\Models\Flowcash;

use App\Models\JournalLog;

class SummaryController extends Controller
{
    public function daily(Request $request)
    {
        try {

            if ($request->input('date')) {
                $date = $request->input('date');
            } else {
                $date = now()->format('Y-m-d');
            }

            $mood = MoodLog::where('date', $date)->first()?->mood_score;
            $habit = HabitLog::with('habit')->where('date', $date)->get();
            $exp = HabitLog::with('habit')->where('date', $date)->sum('exp_gain');
            $income = Flowcash::with('flowcashCategory')->where('date', $date)->where('type', 'income')->get();
            $incomeAmount = Flowcash::where('date', $date)->where('type', 'income')->sum('amount');
            $expense = Flowcash::with('flowcashCategory')->where('date', $date)->where('type', 'expense')->get();
            $expenseAmount = Flowcash::where('date', $date)->where('type', 'expense')->sum('amount');
            $journal = JournalLog::where('date', $date)->get();

            return Inertia::render('summary/daily', [
                'selectedDate' => $date,
                'mood' => $mood,
                'habit' => $habit,
                'exp' => (int)$exp,
                'income' => $income,
                'incomeAmount' => (int)$incomeAmount,
                'expense' => $expense,
                'expenseAmount' => (int)$expenseAmount,
                'journal' => $journal
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }

    public function weekly(Request $request)
    {
        try {

            if ($request->input('start_date') && $request->input('end_date')) {
                $startDate = $request->input('start_date');
                $endDate = $request->input('end_date');
            } else {
                $startDate = now()->startOfWeek()->format('Y-m-d');
                $endDate = now()->endOfWeek()->format('Y-m-d');
            }

            $chartDataMood = MoodLog::whereBetween('date', [$startDate, $endDate])->orderBy('date', 'ASC')->select('date', 'mood_score')->get();

            $chartDataHabit = HabitLog::whereBetween('date', [$startDate, $endDate])->select(\DB::raw('date, count(*) as habit'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    
            $chartDataExpense = Flowcash::whereBetween('date', [$startDate, $endDate])->where('type', 'expense')->select(\DB::raw('date, sum(amount) as expense'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

            return Inertia::render('summary/weekly', [
                'selectedStartDate' => $startDate,
                'selectedEndDate' => $endDate,
                'chartDataMood' => $chartDataMood,
                'chartDataHabit' => $chartDataHabit,
                'chartDataExpense' => $chartDataExpense,
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }

    public function monthly(Request $request)
    {
        try {
            return Inertia::render('summary/monthly');
        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }
}
