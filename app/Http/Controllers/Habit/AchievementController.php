<?php

namespace App\Http\Controllers\Habit;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\HabitLog;
use App\Models\Habit;
use App\Models\AchievementType;
use App\Models\Achievement;
use Carbon\Carbon;

class AchievementController extends Controller
{

    public function index($id)
    {
        try {

            $achievementType = AchievementType::get();

            $habit = Habit::with(['habitCategory', 'habitLogs', 'achievements'])->findOrFail($id);

            $data = HabitLog::where('habit_id', $id)->get();

            $gridData = collect($data)
                ->map(fn($log) => [
                    'id' => $log->id,
                    'year' => Carbon::parse($log->date)->format('Y'),
                    'date' => $log->date
                ]);

            return Inertia::render('habit/achievement/index', compact(
                'achievementType',
                'habit',
                'gridData'
            ));

        } catch (\Exception $e) {
            Log::error('Error loading habit achievement: ' . $e->getMessage());
            return back()->with('error', 'Failed to load habit achievement.');
        }  
    }

    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'achievement_type_id' => 'required'
        ]);

        try {

            $achievement = new Achievement();
            $achievement->habit_id = $id;
            $achievement->achievement_type_id = $validated['achievement_type_id'];
            $achievement->save();

            return redirect()->back()->with('success', 'Achievement claimed successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing habit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to claim achievement.');
        }
    }
}
