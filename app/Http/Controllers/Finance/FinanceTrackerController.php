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
    public function index(Request $request)
    {
        try {
            $rawDataFinance = Flowcash::query()
                ->select('date', 'type', 'amount')
                ->get()
                ->groupBy(function ($item) {
                    return $item->date->format('Y');
                })
                ->map(function ($yearItems) {
                    return $yearItems
                        ->groupBy(function ($item) {
                            return $item->date->format('m');
                        })
                        ->map(function ($monthItems) {
                            return [
                                'year' => $monthItems->first()->date->format('Y'),
                                'month_number' => $monthItems->first()->date->format('m'),
                                'month' => $monthItems->first()->date->format('F'),

                                'income' => $monthItems
                                    ->where('type', 'income')
                                    ->sum('amount'),

                                'expense' => $monthItems
                                    ->where('type', 'expense')
                                    ->sum('amount'),
                            ];
                        })
                        ->values();
                });

            $chartDataFinance = collect();

            foreach ($rawDataFinance as $year => $rows) {
                for ($month = 1; $month <= 12; $month++) {
                    $date = Carbon::create($year, $month, 1);

                    $existing = $rows->firstWhere('month_number', $month);

                    $chartDataFinance->push([
                        'year' => (int) $year,
                        'month' => $date->format('F'),
                        'income' => $existing ? (int) $existing['income'] : 0,
                        'expense' => $existing ? (int) $existing['expense'] : 0,
                    ]);
                }
            }

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

            $chartDataFinanceYear = Flowcash::query()
                ->select('date', 'type', 'amount')
                ->get()
                ->groupBy(function ($item) {
                    return $item->date->format('Y');
                })
                ->map(function ($items, $year) {
                    return [
                        'year' => (int) $year,

                        'income' => $items
                            ->where('type', 'income')
                            ->sum('amount'),

                        'expense' => $items
                            ->where('type', 'expense')
                            ->sum('amount'),
                    ];
                })
                ->values();

            $expenseByCategoryYear = $request->input('expenseByCategoryYear', now()->year);
            $expenseByCategoryMonth = $request->input('expenseByCategoryMonth', now()->month);

            $expenseByCategory = Flowcash::query()
                ->join('flowcash_categories', 'flowcashes.flowcash_category_id', '=', 'flowcash_categories.id')
                ->whereNull('flowcashes.deleted_at')
                ->whereYear('date', $expenseByCategoryYear)
                ->whereMonth('date', $expenseByCategoryMonth)
                ->select(
                    'flowcash_categories.name as category',
                    \DB::raw("CAST(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS INTEGER) as expense")
                )->groupBy('flowcash_categories.name')
                ->get();

            $uniqueYears = collect($chartDataFinance)
                ->pluck('year')
                ->unique()
                ->values();

            return Inertia::render('finance/tracker/index', compact(
                'chartDataFinance', 
                'chartDataExpense',
                'chartDataFinanceYear',
                'expenseByCategory',
                'uniqueYears'
            ));
        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }
}
