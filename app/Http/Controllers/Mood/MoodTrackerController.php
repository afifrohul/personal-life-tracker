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

    public function index(Request $request)
    {
        try {

            $chartData = MoodLog::orderBy('date', 'ASC')->select('date', 'mood_score')->get();

            $yearMoodDistribution = $request->input('yearMoodDistribution', now()->year);
            $monthMoodDistribution = $request->input('monthMoodDistribution', now()->month);

            $badMoodCount = MoodLog::where('mood_score', 1)->whereYear('date', $yearMoodDistribution)->whereMonth('date', $monthMoodDistribution)->count();

            $notGoodMoodCount = MoodLog::where('mood_score', 2)->whereYear('date', $yearMoodDistribution)->whereMonth('date', $monthMoodDistribution)->count();

            $okayMoodCount = MoodLog::where('mood_score', 3)->whereYear('date', $yearMoodDistribution)->whereMonth('date', $monthMoodDistribution)->count();

            $goodMoodCount = MoodLog::where('mood_score', 4)->whereYear('date', $yearMoodDistribution)->whereMonth('date', $monthMoodDistribution)->count();

            $greatMoodCount = MoodLog::where('mood_score', 5)->whereYear('date', $yearMoodDistribution)->whereMonth('date', $monthMoodDistribution)->count();

            $moodDistribution = collect(
                [
                    ['mood' => 'bad', 'amounts' => $badMoodCount, 'fill' => 'var(--color-bad)'],
                    ['mood' => 'notGood', 'amounts' => $notGoodMoodCount, 'fill' => 'var(--color-notGood)'],
                    ['mood' => 'okay', 'amounts' => $okayMoodCount, 'fill' => 'var(--color-okay)'],
                    ['mood' => 'good', 'amounts' => $goodMoodCount, 'fill' => 'var(--color-good)'],
                    ['mood' => 'great', 'amounts' => $greatMoodCount, 'fill' => 'var(--color-great)'],
                ]
            );

            $uniqueYears = MoodLog::selectRaw('YEAR(date) as year')->distinct()->pluck('year');

            return Inertia::render('mood/mood-tracker/index', compact('chartData', 'moodDistribution', 'uniqueYears'));

        } catch (\Exception $e) {
            Log::error('Error loading data: ' . $e->getMessage());
            return back()->with('error', 'Failed to load data.');
        }
    }

}
