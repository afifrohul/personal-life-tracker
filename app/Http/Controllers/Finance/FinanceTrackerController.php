<?php

namespace App\Http\Controllers\Finance;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\Flowcash;
use App\Models\HabitLog;

class FinanceTrackerController extends Controller
{
    public function index()
    {
        try {
            $rawData = Flowcash::selectRaw('
                    YEAR(date) as year,
                    MONTH(date) as month_number,
                    MONTHNAME(date) as month,
                    SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) as income,
                    SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as expense
                ')
                ->groupBy('year', 'month_number', 'month')
                ->orderBy('year')
                ->orderBy('month_number')
                ->get()
                ->groupBy('year');
            
            $chartData = collect();

            foreach ($rawData as $year => $rows) {
                for ($month = 1; $month <= 12; $month++) {
                    $date = Carbon::create($year, $month, 1);

                    $existing = $rows->firstWhere('month_number', $month);

                    $chartData->push([
                        'year' => (int) $year,
                        'month' => $date->format('F'),
                        'income' => $existing ? (int) $existing->income : 0,
                        'expense' => $existing ? (int) $existing->expense : 0,
                    ]);
                }
            }

            $uniqueYears = collect($chartData)
                ->pluck('year')
                ->unique()
                ->values();

            return Inertia::render('finance/tracker/index', compact('chartData', 'uniqueYears'));
        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }
}
