<?php

namespace App\Http\Controllers\Finance;

use App\Models\Flowcash;
use App\Models\FlowcashCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class FlowcashController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {

            $category = $request->input('category', 0);
            $type = $request->input('type', 'all');
            $from = $request->input('from');
            $to = $request->input('to');

            $flowcashes = Flowcash::with(['flowcashCategory'])->orderBy('date', 'DESC');

            if ((!empty($from) && !empty($to))) {
                $flowcashes->whereBetween('date', [$from, $to]);
            }

            if ($category != 0) {
                $flowcashes->where('flowcash_category_id', $category);
            }

            if ($type != 'all') {
                $flowcashes->where('type', $type);
            }
            
            $flowcashes = $flowcashes->get();

            $categories = FlowcashCategory::get();

            return Inertia::render('finance/flowcash/index', compact('flowcashes', 'categories'));
        } catch (\Exception $e) {
            Log::error('Error loading flowcashes: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load flowcashes.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = FlowcashCategory::get();
        return Inertia::render('finance/flowcash/create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'flowcash_category_id' => 'required',
            'date' => 'required',
            'amount' => 'required',
            'description' => 'required',
            'type' => 'required',
        ]);

        try {

            $flowcash = new Flowcash();
            $flowcash->flowcash_category_id = $request->flowcash_category_id;
            $flowcash->date = $request->date;
            $flowcash->amount = $request->amount;
            $flowcash->description = $request->description;
            $flowcash->type = $request->type;
            $flowcash->save();

            return redirect()->route('flowcashes.index')->with('success', 'Flowcash created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing flowcash: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create flowcash.');
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
            $categories = FlowcashCategory::get();
            $flowcash = Flowcash::findOrFail($id);
            return Inertia::render('finance/flowcash/edit', compact('flowcash', 'categories'));
        } catch (\Exception $e) {
            Log::error('Error loading habit for flowcash: ' . $e->getMessage());
            return redirect()->route('flowcashes.index')->with('error', 'Flowcash not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'flowcash_category_id' => 'required',
            'date' => 'required',
            'amount' => 'required',
            'description' => 'required',
            'type' => 'required',
        ]);

        try {

            $flowcash = Flowcash::findOrFail($id);
            $flowcash->flowcash_category_id = $request->flowcash_category_id;
            $flowcash->date = $request->date;
            $flowcash->amount = $request->amount;
            $flowcash->description = $request->description;
            $flowcash->type = $request->type;
            $flowcash->save();

            return redirect()->route('flowcashes.index')->with('success', 'Flowcash updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating flowcash: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update flowcash.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $flowcash = Flowcash::findOrFail($id);
            $flowcash->delete();

            return redirect()->route('flowcashes.index')->with('success', 'Flowcash deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting flowcash: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete flowcash.');
        }
    }
}
