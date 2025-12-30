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

            $logs = JournalLog::orderBy('date', 'DESC')->where('date', $date)->get();
            return Inertia::render('journal/log/index', [
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(JournalLog $journalLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JournalLog $journalLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JournalLog $journalLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JournalLog $journalLog)
    {
        //
    }
}
