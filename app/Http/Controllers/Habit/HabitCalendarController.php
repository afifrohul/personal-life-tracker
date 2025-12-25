<?php

namespace App\Http\Controllers\Habit;

use Illuminate\Http\Request;
use App\Models\HabitCategory;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\HabitLog;
use App\Models\Habit;
use Carbon\Carbon;

class HabitCalendarController extends Controller
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

            return Inertia::render('habit/calendar/index', compact(
                'logs',
                'habits', 
                'validHabitIds',
                'categories',
            ));

        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }
}
