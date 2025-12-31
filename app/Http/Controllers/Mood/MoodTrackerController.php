<?php

namespace App\Http\Controllers\Mood;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\MoodLog;
use Carbon\Carbon;

class MoodTrackerController extends Controller
{

    public function index()
    {
        try {

            $chartData = MoodLog::orderBy('date', 'ASC')->select('date', 'mood_score')->get();

            return Inertia::render('mood/mood-tracker/index', compact('chartData'));

        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }

}
