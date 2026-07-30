<?php

namespace App\Http\Controllers\Habit;

use App\Models\HabitCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\HabitLog;
use App\Models\Habit;
use App\Models\AchievementType;
use Carbon\Carbon;

class HabitTrackerController extends Controller
{
    public function index(Request $request)
    {
        try {
            $userHabits = Habit::pluck('id')->toArray();

            $filterHabits = $request->input('habits', $userHabits);

            $validHabitIds = array_intersect($filterHabits, $userHabits);

            if (empty($validHabitIds)) {
                $validHabitIds = $userHabits;
            }

            $logs = HabitLog::with('habit')
                ->whereIn('habit_id', $validHabitIds)
                ->get()
                ->map(fn($log) => [
                    'id' => $log->id,
                    'title' => $log->habit->name,
                    'start' => $log->date,
                    'end' => $log->date,
                    'extendedProps' => [
                        'icon' => $log->habit->icon,
                        'color' => $log->habit->color,
                    ],
                ]);

            $habits = Habit::select('id', 'name', 'icon', 'color')->get();

            $categories = HabitCategory::with(['habits'])->get();

            $start = now()->subDays(6)->startOfDay();
            $end = now()->endOfDay();

            $weeklyLog = HabitLog::whereBetween('date', [$start, $end])
                ->get()
                ->groupBy('habit_id');
            
            $dates = collect(range(0, 6))->map(function ($i) {
                $date = now()->subDays(6 - $i);
                return [
                    'key' => $date->format('Y-m-d'),
                    'label' => $date->format('d M'),
                ];
            });

            $chartDataHabit = HabitLog::select(\DB::raw('date, count(*) as habit'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

            $chartDataExp = HabitLog::select(\DB::raw('date, sum(exp_gain) as exp'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

            $expGainByCategory = HabitLog::query()
                ->join('habits', 'habit_logs.habit_id', '=', 'habits.id')
                ->join('habit_categories', 'habits.habit_category_id', '=', 'habit_categories.id')
                ->whereNull('habit_logs.deleted_at')
                ->select(
                    'habit_categories.name as category',
                    \DB::raw('SUM(habit_logs.exp_gain) as exp_gain')
                )
                ->groupBy('habit_categories.name')
                ->get()
                ->each(function ($item) {
                    $item->exp_gain = (int) $item->exp_gain;
                });

            $expGainByHabit = HabitLog::query()
                ->join('habits', 'habit_logs.habit_id', '=', 'habits.id')
                ->whereNull('habit_logs.deleted_at')
                ->select(
                    'habits.name as habit',
                    \DB::raw('SUM(habit_logs.exp_gain) as exp_gain')
                )
                ->groupBy('habits.name')
                ->get()
                ->each(function ($item) {
                    $item->exp_gain = (int) $item->exp_gain;
                });


            return Inertia::render('habit/tracker/index', compact(
                'logs',
                'habits', 
                'validHabitIds',
                'categories',
                'weeklyLog',
                'dates',
                'chartDataHabit',
                'chartDataExp',
                'expGainByCategory',
                'expGainByHabit'
            ));

        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }

    public function show($id)
    {
        try {

            $achievementType = AchievementType::get();

            $habit = Habit::with(['habitCategory', 'habitLogs', 'achievements.achievementType'])->findOrFail($id);

            $data = HabitLog::where('habit_id', $id)->get();

            $chartData = collect($data)
                ->groupBy(function ($item) {
                    return Carbon::parse($item['date'])->format('Y-m');
                })
                ->map(function ($items, $ym) {
                    $date = Carbon::parse($ym . '-01');

                    return [
                        'year'  => $date->year,
                        'month' => $date->format('F'),
                        'habit' => $items->count(),
                    ];
                })
                ->values();

            $gridData = collect($data)
                ->map(fn($log) => [
                    'id' => $log->id,
                    'year' => Carbon::parse($log->date)->format('Y'),
                    'date' => $log->date
                ]);

            $uniqueYears = collect($chartData)
            ->pluck('year')
            ->unique()
            ->values();

            return Inertia::render('habit/tracker/show', compact(
                'achievementType',
                'habit',
                'chartData',
                'uniqueYears',
                'gridData'
            ));

        } catch (\Exception $e) {
            Log::error('Error loading habit tracker: ' . $e->getMessage());
            return back()->with('error', 'Failed to load habit tracker.');
        }   
    }
}
