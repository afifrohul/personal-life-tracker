<?php

namespace App\Http\Controllers\Task;

use App\Models\Project;
use App\Models\ProjectTask;
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
        try {
            $project = Project::with('projectTask')->findOrFail($id);
            return Inertia::render('task/project/show', compact('project'));
        } catch (\Exception $e) {
            Log::error('Error loading project for detail: ' . $e->getMessage());
            return redirect()->route('projects.index')->with('error', 'Project not found.');
        }
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

    // Project Task =========================================================
    public function createTask($projectId)
    {
        return Inertia::render('task/project/project-task/create', [
            'projectId' => $projectId,
        ]);
    }

    public function storeTask(Request $request, $projectId)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'due_date' => 'nullable',
            'priority' => 'required',
            'status' => 'required',
        ]);

        try {

            $projectTask = new ProjectTask();
            $projectTask->project_id = $projectId;
            $projectTask->title = $request->title;
            $projectTask->description = $request->description;
            $projectTask->due_date = $request->due_date;
            $projectTask->priority = $request->priority;
            $projectTask->status = $request->status;
            $projectTask->save();

            return redirect()->route('projects.show', $projectId)->with('success', 'Project task created successfully.');

        } catch (\Exception $e) {
            Log::error('Error storing project task: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create project task.');
        }
    }

    public function editTask($projectId, $id)
    {
        try {
            $projectTask = ProjectTask::findOrFail($id);
            return Inertia::render('task/project/project-task/edit', [
                'projectId' => $projectId,
                'projectTask' => $projectTask
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading project task for edit: ' . $e->getMessage());
            return redirect()->route('projects.show', $projectId)->with('error', 'Project task not found.');
        }
    }

    public function updateTask(Request $request, $projectId, $id)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'due_date' => 'nullable',
            'priority' => 'required',
            'status' => 'required',
        ]);

        try {

            $projectTask = ProjectTask::findOrFail($id);
            $projectTask->title = $request->title;
            $projectTask->description = $request->description;
            $projectTask->due_date = $request->due_date;
            $projectTask->priority = $request->priority;
            $projectTask->status = $request->status;
            $projectTask->save();

            return redirect()->route('projects.show', $projectId)->with('success', 'Project task updated successfully.');

        } catch (\Exception $e) {
            Log::error('Error updating project task: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update project task.');
        }
    }

    public function destroyTask($projectId,$id)
    {
        try {
            $projectTask = ProjectTask::findOrFail($id);
            $projectTask->delete();

            return redirect()->route('projects.show', $projectId)->with('success', 'Project task deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting project task: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete project task.');
        }
    }

}
