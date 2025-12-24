<?php

namespace App\Http\Controllers\Habit;

use App\Models\Habit;
use App\Models\HabitCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class HabitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $habits = Habit::with(['habitCategory'])->get();
            return Inertia::render('habit/habit/index', compact('habits'));
        } catch (\Exception $e) {
            Log::error('Error loading habits: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load habits.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = HabitCategory::get();
        return Inertia::render('habit/habit/create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'habit_category_id' => 'required',
            'name' => 'required|min:3|max:12',
            'color' => 'required',
            'difficulty' => 'required',
            'icon' => 'required'
        ]);

        try {

            $habit = new Habit();
            $habit->habit_category_id = $request->habit_category_id;
            $habit->name = $request->name;
            $habit->color = $request->color;
            $habit->difficulty = $request->difficulty;
            $habit->icon = $request->icon;
            $habit->save();


            return redirect()->route('habits.index')->with('success', 'Habit created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing habit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create habit.');
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
            $categories = HabitCategory::get();
            $habit = Habit::findOrFail($id);
            return Inertia::render('habit/habit/edit', compact('habit', 'categories'));
        } catch (\Exception $e) {
            Log::error('Error loading habit for edit: ' . $e->getMessage());
            return redirect()->route('habits.index')->with('error', 'Habit not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'habit_category_id' => 'required',
            'name' => 'required|min:3|max:12',
            'color' => 'required',
            'difficulty' => 'required',
            'icon' => 'required'
        ]);

        try {
            $habit = Habit::findOrFail($id);
            $habit->habit_category_id = $request->habit_category_id;
            $habit->name = $request->name;
            $habit->color = $request->color;
            $habit->difficulty = $request->difficulty;
            $habit->icon = $request->icon;
            $habit->save();

            return redirect()->route('habits.index')->with('success', 'Habit updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating habit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update habit.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $habit = Habit::findOrFail($id);
            $habit->delete();

            return redirect()->route('habits.index')->with('success', 'Habit deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting habit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete habit.');
        }
    }
}
