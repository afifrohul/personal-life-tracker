<?php

namespace App\Http\Controllers\Finance;

use App\Models\FlowcashCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class FlowcashCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $categories = FlowcashCategory::get();
            return Inertia::render('finance/flowcash-category/index', compact('categories'));
        } catch (\Exception $e) {
            Log::error('Error loading flowcash categories: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load flowcash categories.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('finance/flowcash-category/create');
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

            FlowcashCategory::create($validated);

            return redirect()->route('flowcash-categories.index')->with('success', 'Flowcash category created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing flowcash category: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create flowcash category.');
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
            $category = FlowcashCategory::findOrFail($id);
            return Inertia::render('finance/flowcash-category/edit', compact('category'));
        } catch (\Exception $e) {
            Log::error('Error loading flowcash category for edit: ' . $e->getMessage());
            return redirect()->route('flowcash-categories.index')->with('error', 'Flowcash category not found.');
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
            $category = FlowcashCategory::findOrFail($id);
            $category->update($validated);

            return redirect()->route('flowcash-categories.index')->with('success', 'Habit category updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating flowcash category: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update flowcash category.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $category = FlowcashCategory::findOrFail($id);
            $category->delete();

            return redirect()->route('flowcash-categories.index')->with('success', 'Flowcash category deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting flowcash category: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete flowcash category.');
        }
    }
}
