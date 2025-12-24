<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\DashboardController;

use App\Http\Controllers\Habit\HabitTrackerController;
use App\Http\Controllers\Habit\HabitCategoryController;
use App\Http\Controllers\Habit\HabitController;
use App\Http\Controllers\Habit\HabitLogController;

use App\Http\Controllers\Finance\FlowcashCategoryController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/habit-tracker', [HabitTrackerController::class, 'index'])->name('habit-tracker.index');
    Route::get('/habit-tracker/{id}', [HabitTrackerController::class, 'show'])->name('habit-tracker.show');

    Route::get('/habit-categories', [HabitCategoryController::class, 'index'])->name('habit-categories.index');
    Route::get('/habit-categories/create', [HabitCategoryController::class, 'create'])->name('habit-categories.create');
    Route::post('/habit-categories', [HabitCategoryController::class, 'store'])->name('habit-categories.store');
    Route::get('/habit-categories/{id}/edit', [HabitCategoryController::class, 'edit'])->name('habit-categories.edit');
    Route::put('/habit-categories/{id}', [HabitCategoryController::class, 'update'])->name('habit-categories.update');
    Route::delete('/habit-categories/{id}', [HabitCategoryController::class, 'destroy'])->name('habit-categories.destroy');
    
    Route::get('/habits', [HabitController::class, 'index'])->name('habits.index');
    Route::get('/habits', [HabitController::class, 'index'])->name('habits.index');
    Route::get('/habits/create', [HabitController::class, 'create'])->name('habits.create');
    Route::post('/habits', [HabitController::class, 'store'])->name('habits.store');
    Route::get('/habits/{id}/edit', [HabitController::class, 'edit'])->name('habits.edit');
    Route::put('/habits/{id}', [HabitController::class, 'update'])->name('habits.update');
    Route::delete('/habits/{id}', [HabitController::class, 'destroy'])->name('habits.destroy');
    Route::get('/habits', [HabitController::class, 'index'])->name('habits.index');
    
    Route::get('/habit-logs', [HabitLogController::class, 'index'])->name('habit-logs.index');
    Route::post('/habit-logs', [HabitLogController::class, 'store'])->name('habit-logs.store');
    Route::delete('/habit-logs/{id}', [HabitLogController::class, 'destroy'])->name('habit-logs.destroy');    

    Route::get('/flowcash-categories', [FlowcashCategoryController::class, 'index'])->name('flowcash-categories.index');
    Route::get('/flowcash-categories/create', [FlowcashCategoryController::class, 'create'])->name('flowcash-categories.create');
    Route::post('/flowcash-categories', [FlowcashCategoryController::class, 'store'])->name('flowcash-categories.store');
    Route::get('/flowcash-categories/{id}/edit', [FlowcashCategoryController::class, 'edit'])->name('flowcash-categories.edit');
    Route::put('/flowcash-categories/{id}', [FlowcashCategoryController::class, 'update'])->name('flowcash-categories.update');
    Route::delete('/flowcash-categories/{id}', [FlowcashCategoryController::class, 'destroy'])->name('flowcash-categories.destroy');

});

require __DIR__.'/settings.php';
