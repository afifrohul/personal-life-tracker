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
            $rawDataFinance = Flowcash::selectRaw('
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
            
            $chartDataFinance = collect();

            foreach ($rawDataFinance as $year => $rows) {
                for ($month = 1; $month <= 12; $month++) {
                    $date = Carbon::create($year, $month, 1);

                    $existing = $rows->firstWhere('month_number', $month);

                    $chartDataFinance->push([
                        'year' => (int) $year,
                        'month' => $date->format('F'),
                        'income' => $existing ? (int) $existing->income : 0,
                        'expense' => $existing ? (int) $existing->expense : 0,
                    ]);
                }
            }

            $rawDataExpense = Flowcash::selectRaw('
                    DATE(date) as date,
                    SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as expense
                ')
                ->groupBy('date')
                ->orderBy('date')
                ->get()
                ->keyBy('date');

            $firstDate = Carbon::parse($rawDataExpense->keys()->first());
            $lastDate  = Carbon::parse($rawDataExpense->keys()->last());

            $startDate = $firstDate->copy()->startOfMonth();
            $endDate   = $lastDate->copy()->endOfMonth();

            $chartDataExpense = collect();

            for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
                $key = $date->format('Y-m-d');

                $existing = $rawDataExpense->get($key);

                $chartDataExpense->push([
                    'date' => $key,
                    'expense' => $existing ? (int) $existing->expense : 0,
                ]);
            }

            $uniqueYears = collect($chartDataFinance)
                ->pluck('year')
                ->unique()
                ->values();

            return Inertia::render('finance/tracker/index', compact(
                'chartDataFinance', 
                'chartDataExpense',
                'uniqueYears'
            ));
        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }
}
