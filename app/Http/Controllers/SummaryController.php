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
    public function index(Request $request)
    {
        try {

            if ($request->input('date')) {
                $date = $request->input('date');
            } else {
                $date = now()->format('Y-m-d');
            }

            $mood = MoodLog::where('date', $date)->first()->mood_score;
            $habit = HabitLog::with('habit')->where('date', $date)->get();
            $exp = HabitLog::with('habit')->where('date', $date)->sum('exp_gain');
            $income = Flowcash::with('flowcashCategory')->where('date', $date)->where('type', 'income')->get();
            $incomeAmount = Flowcash::where('date', $date)->where('type', 'income')->sum('amount');
            $expense = Flowcash::with('flowcashCategory')->where('date', $date)->where('type', 'expense')->get();
            $expenseAmount = Flowcash::where('date', $date)->where('type', 'expense')->sum('amount');
            $journal = JournalLog::where('date', $date)->get();

            return Inertia::render('summary', [
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
}
