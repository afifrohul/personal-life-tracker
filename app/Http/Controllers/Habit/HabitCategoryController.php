<?php

namespace App\Http\Controllers\Habit;

use App\Models\HabitCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class HabitCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $categories = HabitCategory::get();
            return Inertia::render('habit/category/index', compact('categories'));
        } catch (\Exception $e) {
            Log::error('Error loading categories: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load categories.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('habit/category/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:12',
            'icon' => 'required'
        ]);

        try {

            HabitCategory::create($validated);

            return redirect()->route('habit-categories.index')->with('success', 'Category created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing category: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create category.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $category = HabitCategory::findOrFail($id);
            return Inertia::render('habit/category/edit', compact('category'));
        } catch (\Exception $e) {
            Log::error('Error loading habit category for edit: ' . $e->getMessage());
            return redirect()->route('habit-categories.index')->with('error', 'Habit category not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:12',
            'icon' => 'required'
        ]);

        try {
            $category = HabitCategory::findOrFail($id);
            $category->update($validated);

            return redirect()->route('habit-categories.index')->with('success', 'Habit category updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating habit category: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update habit category.');
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $category = HabitCategory::findOrFail($id);
            $category->delete();

            return redirect()->route('habit-categories.index')->with('success', 'Habit category deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting habit category: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete habit category.');
        }
    }
}
