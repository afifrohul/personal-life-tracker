<?php

namespace App\Http\Controllers\Mood;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\MoodLog;
use Illuminate\Validation\Rule;

class MoodLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {

            $type = $request->input('type', '0');
            $from = $request->input('from');
            $to = $request->input('to');

            // dd($type);

            $all_mood_logs = MoodLog::query()->orderBy('date', 'DESC');

            if ($type !== '0') {
                $all_mood_logs->where('mood_score', (int) $type);
            }

            if ((!empty($from) && !empty($to))) {
                $all_mood_logs->whereBetween('date', [$from, $to]);
            }

            $mood_logs = (clone $all_mood_logs)->paginate(18)->withQueryString();

            $filters = [
                'type' => $type,
                'from' => $from,
                'to' => $to,
            ];


            return Inertia::render('mood/mood-log/index', compact('mood_logs', 'filters'));
        } catch (\Exception $e) {
            Log::error('Error loading mood logs: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load mood logs.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        try {
            $request->validate([
                'date' => [
                    'required',
                    'date',
                    Rule::unique('mood_logs')->whereNull('deleted_at'),
                ],
                'mood_score' => 'required',
            ]);

            $mood_log = new MoodLog();
            $mood_log->date = $request->date;
            $mood_log->mood_score = $request->mood_score;
            $mood_log->save();

            return redirect()->back()->with('success', 'Mood log created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing mood log: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        
        try {
            
            $request->validate([
                'date' => [
                    'required',
                    'date',
                    Rule::unique('mood_logs')->whereNull('deleted_at')->ignore($id),
                ],
                'mood_score' => 'required',
            ]);

            $mood_log = MoodLog::findOrFail($id);
            $mood_log->date = $request->date;
            $mood_log->mood_score = $request->mood_score;
            $mood_log->save();

            return redirect()->back()->with('success', 'Mood log updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating mood log: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $mood_log = MoodLog::findOrFail($id);
            $mood_log->delete();

            return redirect()->back()->with('success', 'Mood log deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting mood log: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed: ' . $e->getMessage());
        }
    }
}
