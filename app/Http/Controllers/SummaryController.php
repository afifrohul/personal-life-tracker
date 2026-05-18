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

    private function compare($current, $previous)
    {
        if ($previous == 0) {
            return [
                'previous' => $previous,
                'change_percent' => 0,
                'trend' => 'neutral',
            ];
        }

        $diff = (($current - $previous) / $previous) * 100;

        return [
            'previous' => $previous,
            'change_percent' => round($diff, 1),
            'trend' => $diff > 0.1
                ? 'up'
                : ($diff < -0.1 ? 'down' : 'neutral'),
        ];
    }

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
                $startDate = now()->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
                $endDate = now()->endOfWeek(Carbon::SATURDAY)->format('Y-m-d');
            }

            $now = now();
            $start = Carbon::parse($startDate);
            $end = Carbon::parse($endDate);

            $previousStart = $start->copy()->subWeek();
            $previousEnd = $end->copy()->subWeek();

            // MOOD
            $currentMoodAvg = MoodLog::whereBetween('date', [$startDate, $endDate])
                ->avg('mood_score') ?? 0;

            $previousMoodAvg = MoodLog::whereBetween('date', [$previousStart, $previousEnd])
                ->avg('mood_score') ?? 0;

            $moodInsight = [
                'value' => round($currentMoodAvg, 2),
                ...$this->compare($currentMoodAvg, $previousMoodAvg),
            ];

            $chartDataMood = MoodLog::whereBetween('date', [$startDate, $endDate])->orderBy('date', 'ASC')->select('date', 'mood_score')->get();
            
            // HABIT
            $currentHabitTotal = HabitLog::whereBetween('date', [$startDate, $endDate])
                ->count();

            $previousHabitTotal = HabitLog::whereBetween('date', [$previousStart, $previousEnd])
                ->count();

            $habitInsight = [
                'value' => $currentHabitTotal,
                ...$this->compare($currentHabitTotal, $previousHabitTotal),
            ];

            $chartDataHabit = HabitLog::whereBetween('date', [$startDate, $endDate])->select(\DB::raw('date, count(*) as habit'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

            // EXP GAIN
            $currentExpTotal = HabitLog::whereBetween('date', [$startDate, $endDate])
                ->sum('exp_gain');

            $previousExpTotal = HabitLog::whereBetween('date', [$previousStart, $previousEnd])
                ->sum('exp_gain');

            $expInsight = [
                'value' => $currentExpTotal,
                ...$this->compare($currentExpTotal, $previousExpTotal),
            ];

            $chartDataExp = HabitLog::whereBetween('date', [$startDate, $endDate])->select(\DB::raw('date, sum(exp_gain) as exp'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    
            // EXPENSE
            $currentExpenseTotal = Flowcash::whereBetween('date', [$startDate, $endDate])
                ->where('type', 'expense')
                ->sum('amount');

            $previousExpenseTotal = Flowcash::whereBetween('date', [$previousStart, $previousEnd])
                ->where('type', 'expense')
                ->sum('amount');

            $expenseInsight = [
                'value' => $currentExpenseTotal,
                ...$this->compare($currentExpenseTotal, $previousExpenseTotal),
            ];

            $rawDataExpense = Flowcash::selectRaw("
                    DATE(date) as date,
                    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
                ")
                ->groupBy('date')
                ->orderBy('date')
                ->get()
                ->mapWithKeys(function ($item) {
                    return [
                        Carbon::parse($item->date)->format('Y-m-d') => $item,
                    ];
                });

            $chartDataExpense = collect();

            $loopEndDate = $now->between($start, $end) ? $now : $end;

            $chartDataExpense = collect();

            for ($date = $start->copy(); $date->lte($loopEndDate); $date->addDay()) {
                $key = $date->format('Y-m-d');

                $existing = $rawDataExpense->get($key);

                $chartDataExpense->push([
                    'date' => $key,
                    'expense' => $existing ? (int) $existing->expense : 0,
                ]);
            }

            return Inertia::render('summary/weekly', [
                'selectedStartDate' => $startDate,
                'selectedEndDate' => $endDate,
                'chartDataMood' => $chartDataMood,
                'chartDataHabit' => $chartDataHabit,
                'chartDataExp' => $chartDataExp,
                'chartDataExpense' => $chartDataExpense,
                'insights' => [
                    'mood' => $moodInsight,
                    'habit' => $habitInsight,
                    'exp_gain' => $expInsight,
                    'expense' => $expenseInsight,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }

    public function monthly(Request $request)
    {
        try {
            if ($request->input('start_date') && $request->input('end_date')) {
                $startDate = $request->input('start_date');
                $endDate = $request->input('end_date');
            } else {
                $startDate = now()->startOfMonth()->format('Y-m-d');
                $endDate = now()->endOfMonth()->format('Y-m-d');
            }

            $now = now();
            $start = Carbon::parse($startDate);
            $end = Carbon::parse($endDate);

            $previousStart = $start->copy()->subMonth();
            $previousEnd = $end->copy()->subMonth();

            // MOOD
            $currentMoodAvg = MoodLog::whereBetween('date', [$startDate, $endDate])
                ->avg('mood_score') ?? 0;

            $previousMoodAvg = MoodLog::whereBetween('date', [$previousStart, $previousEnd])
                ->avg('mood_score') ?? 0;

            $moodInsight = [
                'value' => round($currentMoodAvg, 2),
                ...$this->compare($currentMoodAvg, $previousMoodAvg),
            ];

            $chartDataMood = MoodLog::whereBetween('date', [$startDate, $endDate])->orderBy('date', 'ASC')->select('date', 'mood_score')->get();
            
            // HABIT
            $currentHabitTotal = HabitLog::whereBetween('date', [$startDate, $endDate])
                ->count();

            $previousHabitTotal = HabitLog::whereBetween('date', [$previousStart, $previousEnd])
                ->count();

            $habitInsight = [
                'value' => $currentHabitTotal,
                ...$this->compare($currentHabitTotal, $previousHabitTotal),
            ];

            $chartDataHabit = HabitLog::whereBetween('date', [$startDate, $endDate])->select(\DB::raw('date, count(*) as habit'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

            // EXP GAIN
            $currentExpTotal = HabitLog::whereBetween('date', [$startDate, $endDate])
                ->sum('exp_gain');

            $previousExpTotal = HabitLog::whereBetween('date', [$previousStart, $previousEnd])
                ->sum('exp_gain');

            $expInsight = [
                'value' => $currentExpTotal,
                ...$this->compare($currentExpTotal, $previousExpTotal),
            ];

            $chartDataExp = HabitLog::whereBetween('date', [$startDate, $endDate])->select(\DB::raw('date, sum(exp_gain) as exp'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    
            // EXPENSE
            $currentExpenseTotal = Flowcash::whereBetween('date', [$startDate, $endDate])
                ->where('type', 'expense')
                ->sum('amount');

            $previousExpenseTotal = Flowcash::whereBetween('date', [$previousStart, $previousEnd])
                ->where('type', 'expense')
                ->sum('amount');

            $expenseInsight = [
                'value' => $currentExpenseTotal,
                ...$this->compare($currentExpenseTotal, $previousExpenseTotal),
            ];

            $rawDataExpense = Flowcash::selectRaw("
                    DATE(date) as date,
                    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
                ")
                ->groupBy('date')
                ->orderBy('date')
                ->get()
                ->mapWithKeys(function ($item) {
                    return [
                        Carbon::parse($item->date)->format('Y-m-d') => $item,
                    ];
                });

            $chartDataExpense = collect();

            $loopEndDate = $now->between($start, $end) ? $now : $end;

            $chartDataExpense = collect();

            for ($date = $start->copy(); $date->lte($loopEndDate); $date->addDay()) {
                $key = $date->format('Y-m-d');

                $existing = $rawDataExpense->get($key);

                $chartDataExpense->push([
                    'date' => $key,
                    'expense' => $existing ? (int) $existing->expense : 0,
                ]);
            }

            return Inertia::render('summary/monthly', [
                'selectedStartDate' => $startDate,
                'selectedEndDate' => $endDate,
                'chartDataMood' => $chartDataMood,
                'chartDataHabit' => $chartDataHabit,
                'chartDataExp' => $chartDataExp,
                'chartDataExpense' => $chartDataExpense,
                'insights' => [
                    'mood' => $moodInsight,
                    'habit' => $habitInsight,
                    'exp_gain' => $expInsight,
                    'expense' => $expenseInsight,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }
}
