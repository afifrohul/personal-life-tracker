<?php

namespace App\Http\Controllers\Task;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $projects = Project::get();
            return Inertia::render('task/project/index', compact('projects'));
        } catch (\Exception $e) {
            Log::error('Error loading projects: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load projects.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('task/project/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'status' => 'required',
        ]);

        try {

            $project = new Project();
            $project->name = $request->name;
            $project->description = $request->description;
            $project->status = $request->status;
            $project->save();

            return redirect()->route('projects.index')->with('success', 'Project created successfully.');

        } catch (\Exception $e) {
            Log::error('Error storing project: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create project.');
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
            $project = Project::findOrFail($id);
            return Inertia::render('task/project/edit', compact('project'));
        } catch (\Exception $e) {
            Log::error('Error loading project for edit: ' . $e->getMessage());
            return redirect()->route('projects.index')->with('error', 'Project not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'status' => 'required',
        ]);

        try {

            $project = Project::findOrFail($id);
            $project->name = $request->name;
            $project->description = $request->description;
            $project->status = $request->status;
            $project->save();

            return redirect()->route('projects.index')->with('success', 'Project updated successfully.');

        } catch (\Exception $e) {
            Log::error('Error updating project: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update project.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $project = Project::findOrFail($id);
            $project->delete();

            return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting project: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete project.');
        }
    }
}
