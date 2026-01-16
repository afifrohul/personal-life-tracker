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

            $view = $request->input('view', 'column');

            if ($view == 'column') {
                $mood_logs = [];
                $mood_logs_column = MoodLog::orderBy('date', 'DESC')->paginate(21)->withQueryString();
            } else if ($view == 'list') {
                $mood_logs = MoodLog::orderBy('date', 'DESC')->get();
                $mood_logs_column = [];
            } else {
                $mood_logs = [];
                $mood_logs_column = [];
            }

            return Inertia::render('mood/mood-log/index', compact('mood_logs', 'mood_logs_column'));
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
        $request->validate([
            'date' => [
                'required',
                'date',
                Rule::unique('mood_logs')->whereNull('deleted_at'),
            ],
            'mood_score' => 'required',
        ]);

        try {

            $mood_log = new MoodLog();
            $mood_log->date = $request->date;
            $mood_log->mood_score = $request->mood_score;
            $mood_log->save();

            return redirect()->back()->with('success', 'Mood log created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing mood log: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create mood log.');
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
        $request->validate([
            'date' => [
                'required',
                'date',
                Rule::unique('mood_logs')->whereNull('deleted_at')->ignore($id),
            ],
            'mood_score' => 'required',
        ]);

        try {

            $mood_log = MoodLog::findOrFail($id);
            $mood_log->date = $request->date;
            $mood_log->mood_score = $request->mood_score;
            $mood_log->save();

            return redirect()->back()->with('success', 'Mood log updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating mood log: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update mood log.');
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
            return redirect()->back()->with('error', 'Failed to delete mood log.');
        }
    }
}
