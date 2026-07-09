<?php

namespace App\Http\Controllers\Habit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Services\Habit\CompleteHabitService;
use App\Services\Habit\UndoHabitCompletionService;
use App\Services\Habit\UpdateHabitLogService;

class HabitLogController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->input('date')) {
                $date = $request->input('date');
            } else {
                $date = now()->format('Y-m-d');
            }

            $habits = Habit::get();
            $logs = HabitLog::with(['habit.habitCategory'])->where('date', $date)->get();
            return Inertia::render('habit/log/index', [
                'logs' => $logs,
                'selectedDate' => $date,
                'habits' => $habits
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading logs: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load logs.');
        }
    }

    public function store(Request $request, CompleteHabitService $completeHabitService) 
    {
        $validated = $request->validate([
            'habit_id' => 'required|exists:habits,id',
            'date' => 'required|date',
        ]);

        $completeHabitService->execute(
            $request->user(),
            Habit::findOrFail($validated['habit_id']),
            $validated['date']
        );

        return redirect()->back()->with('success', 'Habit log created.');
    }

    public function generate(Request $request, CompleteHabitService $completeHabitService) 
    {
        $validated = $request->validate([
            'date' => 'required|date',
        ]);

        $habitLogs = HabitLog::where('date', $validated['date'])->count();

        if ($habitLogs !=0) {
            return redirect()->back()->with('error', "Today's habit log isn't empty.");
        }

        $habits = Habit::pluck('id')->toArray();

        foreach ($habits as $habitId) {

            $habit = Habit::findOrFail($habitId);

            $completeHabitService->execute(
                $request->user(),
                $habit,
                $validated['date']
            );
        }

        return redirect()->back()->with('success', 'Habit log created.');
    }

    public function update(Request $request, UpdateHabitLogService $updateHabitLogService, $id)
    {
        $validated = $request->validate([
            'habit_id' => 'required|exists:habits,id',
            'date' => 'required|date',
        ]);

        $updateHabitLogService->execute(
            auth()->user(),
            $id,
            $validated['habit_id'],
            $validated['date']
        );

        return back()->with('success', 'Habit log updated.');
    }

    public function destroy($id, UndoHabitCompletionService $undoHabitCompletionService)
    {
        $habitLog = HabitLog::findOrFail($id);
        $undoHabitCompletionService->execute(auth()->user(), $habitLog);

        return redirect()->back()->with('success', 'Habit log deleted.');
    }

}
