<?php

namespace App\Http\Controllers\Task;

use App\Models\PersonalTask;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class PersonalTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $personalTasks = PersonalTask::orderBy('created_at', 'DESC')->get();

            return Inertia::render('task/personal-task/index', compact('personalTasks'));
        } catch (\Exception $e) {
            Log::error('Error loading personal tasks: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load personal tasks.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('task/personal-task/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'due_date' => 'nullable',
            'priority' => 'required',
            'status' => 'required',
        ]);

        try {

            $personalTask = new PersonalTask();
            $personalTask->title = $request->title;
            $personalTask->description = $request->description;
            $personalTask->due_date = $request->due_date;
            $personalTask->priority = $request->priority;
            $personalTask->status = $request->status;
            $personalTask->save();

            return redirect()->route('personal-tasks.index')->with('success', 'Personal task created successfully.');

        } catch (\Exception $e) {
            Log::error('Error storing personal task: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create personal task.');
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
            $personalTask = PersonalTask::findOrFail($id);
            return Inertia::render('task/personal-task/edit', compact('personalTask'));
        } catch (\Exception $e) {
            Log::error('Error loading personal task for edit: ' . $e->getMessage());
            return redirect()->route('personal-tasks.index')->with('error', 'Personal task not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'due_date' => 'nullable',
            'priority' => 'required',
            'status' => 'required',
        ]);

        try {

            $personalTask = PersonalTask::findOrFail($id);
            $personalTask->title = $request->title;
            $personalTask->description = $request->description;
            $personalTask->due_date = $request->due_date;
            $personalTask->priority = $request->priority;
            $personalTask->status = $request->status;
            $personalTask->save();

            return redirect()->route('personal-tasks.index')->with('success', 'Personal task updated successfully.');

        } catch (\Exception $e) {
            Log::error('Error updating personal task: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update personal task.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $personalTask = PersonalTask::findOrFail($id);
            $personalTask->delete();

            return redirect()->route('personal-tasks.index')->with('success', 'Personal task deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting personal task: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete personal task.');
        }
    }
}
