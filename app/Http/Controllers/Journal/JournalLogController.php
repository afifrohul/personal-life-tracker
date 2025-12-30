<?php

namespace App\Http\Controllers\Journal;

use App\Models\JournalLog;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class JournalLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if ($request->input('date')) {
                $date = $request->input('date');
            } else {
                $date = now()->format('Y-m-d');
            }

            $logs = JournalLog::orderBy('created_at', 'DESC')->where('date', $date)->get();
            return Inertia::render('journal/journal-log/index', [
                'logs' => $logs,
                'selectedDate' => $date,
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading journal logs: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load journal logs.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if ($request->input('date')) {
            $date = $request->input('date');
        } else {
            $date = now()->format('Y-m-d');
        }
        
        return Inertia::render('journal/journal-log/create', [
            'selectedDate' => $date
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required',
            'content' => 'required'
        ]);

        try {

            $journalLog = new JournalLog();
            $journalLog->date = $request->date;
            $journalLog->content = $request->content;
            $journalLog->save();

            return redirect()->route('journal-logs.index')->with('success', 'Journal log created successfully.');

        } catch (\Exception $e) {
            Log::error('Error storing journal log: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create journal log.');
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
        try {
            $journalLog = JournalLog::findOrFail($id);
            return Inertia::render('journal/journal-log/edit', compact('journalLog'));
        } catch (\Exception $e) {
            Log::error('Error loading journal log for edit: ' . $e->getMessage());
            return redirect()->route('journal-logs.index')->with('error', 'Journal log not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'date' => 'required',
            'content' => 'required'
        ]);

        try {

            $journalLog = JournalLog::findOrFail($id);
            $journalLog->date = $request->date;
            $journalLog->content = $request->content;
            $journalLog->save();

            return redirect()->route('journal-logs.index')->with('success', 'Journal log updated successfully.');

        } catch (\Exception $e) {
            Log::error('Error updating journal log: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update journal log.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $journalLog = JournalLog::findOrFail($id);
            $journalLog->delete();

            return redirect()->route('journal-logs.index')->with('success', 'Journal log deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting journal log: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete journal log.');
        }
    }
}
