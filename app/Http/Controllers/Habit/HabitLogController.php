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

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'habit_id' => 'required',
            'date' => 'required'
        ]);

        try {

            $habit = Habit::findOrFail($validated['habit_id']);

            $validated['exp_gain'] = $habit->difficulty === 'easy' ? 5 : ($habit->difficulty === 'medium' ? 10 : 20);

            $log = HabitLog::findOrFail($id);
            $log->habit_id = $validated['habit_id'];
            $log->date = $validated['date'];
            $log->exp_gain = $validated['exp_gain'];
            $log->save();

            return redirect()->back()->with('success', 'Habit log updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error update habit log: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update habit log.');
        }
    }

    public function destroy($id, UndoHabitCompletionService $undoHabitCompletionService)
    {
        $habitLog = HabitLog::findOrFail($id);
        $undoHabitCompletionService->execute($habitLog);

        return redirect()->back()->with('success', 'Habit log deleted.');
    }

}
