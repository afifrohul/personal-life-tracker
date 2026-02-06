<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SummaryController;

use App\Http\Controllers\Mood\MoodTrackerController;
use App\Http\Controllers\Mood\MoodLogController;

use App\Http\Controllers\Habit\HabitTrackerController;
use App\Http\Controllers\Habit\HabitCalendarController;
use App\Http\Controllers\Habit\HabitCategoryController;
use App\Http\Controllers\Habit\HabitController;
use App\Http\Controllers\Habit\HabitLogController;

use App\Http\Controllers\Finance\FinanceTrackerController;
use App\Http\Controllers\Finance\FlowcashCategoryController;
use App\Http\Controllers\Finance\FlowcashController;

use App\Http\Controllers\Journal\JournalLogController;

use App\Http\Controllers\Task\PersonalTaskController;
use App\Http\Controllers\Task\ProjectController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('daily-summary', [SummaryController::class, 'daily'])->name('summary.daily');
    Route::get('weekly-summary', [SummaryController::class, 'weekly'])->name('summary.weekly');
    Route::get('monthly-summary', [SummaryController::class, 'monthly'])->name('summary.monthly');

    Route::get('/mood-tracker', [MoodTrackerController::class, 'index'])->name('mood-tracker.index');
    Route::get('/mood-logs', [MoodLogController::class, 'index'])->name('mood-logs.index');
    Route::get('/mood-logs/create', [MoodLogController::class, 'create'])->name('mood-logs.create');
    Route::post('/mood-logs', [MoodLogController::class, 'store'])->name('mood-logs.store');
    Route::get('/mood-logs/{id}/edit', [MoodLogController::class, 'edit'])->name('mood-logs.edit');
    Route::put('/mood-logs/{id}', [MoodLogController::class, 'update'])->name('mood-logs.update');
    Route::delete('/mood-logs/{id}', [MoodLogController::class, 'destroy'])->name('mood-logs.destroy');

    Route::get('/habit-categories', [HabitCategoryController::class, 'index'])->name('habit-categories.index');
    Route::get('/habit-categories/create', [HabitCategoryController::class, 'create'])->name('habit-categories.create');
    Route::post('/habit-categories', [HabitCategoryController::class, 'store'])->name('habit-categories.store');
    Route::get('/habit-categories/{id}/edit', [HabitCategoryController::class, 'edit'])->name('habit-categories.edit');
    Route::put('/habit-categories/{id}', [HabitCategoryController::class, 'update'])->name('habit-categories.update');
    Route::delete('/habit-categories/{id}', [HabitCategoryController::class, 'destroy'])->name('habit-categories.destroy');
    
    Route::get('/habit-tracker', [HabitTrackerController::class, 'index'])->name('habit-tracker.index');
    Route::get('/habit-tracker/{id}', [HabitTrackerController::class, 'show'])->name('habit-tracker.show');
    Route::get('/habit-calendar', [HabitCalendarController::class, 'index'])->name('habit-calendar.index');
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
    Route::put('/habit-logs/{id}', [HabitLogController::class, 'update'])->name('habit-logs.update');
    Route::delete('/habit-logs/{id}', [HabitLogController::class, 'destroy'])->name('habit-logs.destroy');    

    Route::get('/finance-tracker', [FinanceTrackerController::class, 'index'])->name('finance-tracker.index');

    Route::get('/flowcash-categories', [FlowcashCategoryController::class, 'index'])->name('flowcash-categories.index');
    Route::get('/flowcash-categories/create', [FlowcashCategoryController::class, 'create'])->name('flowcash-categories.create');
    Route::post('/flowcash-categories', [FlowcashCategoryController::class, 'store'])->name('flowcash-categories.store');
    Route::get('/flowcash-categories/{id}/edit', [FlowcashCategoryController::class, 'edit'])->name('flowcash-categories.edit');
    Route::put('/flowcash-categories/{id}', [FlowcashCategoryController::class, 'update'])->name('flowcash-categories.update');
    Route::delete('/flowcash-categories/{id}', [FlowcashCategoryController::class, 'destroy'])->name('flowcash-categories.destroy');

    Route::get('/flowcashes', [FlowcashController::class, 'index'])->name('flowcashes.index');
    Route::get('/flowcashes/create', [FlowcashController::class, 'create'])->name('flowcashes.create');
    Route::post('/flowcashes', [FlowcashController::class, 'store'])->name('flowcashes.store');
    Route::get('/flowcashes/{id}/edit', [FlowcashController::class, 'edit'])->name('flowcashes.edit');
    Route::put('/flowcashes/{id}', [FlowcashController::class, 'update'])->name('flowcashes.update');
    Route::delete('/flowcashes/{id}', [FlowcashController::class, 'destroy'])->name('flowcashes.destroy');

    Route::get('/personal-tasks', [PersonalTaskController::class, 'index'])->name('personal-tasks.index');
    Route::get('/personal-tasks/create', [PersonalTaskController::class, 'create'])->name('personal-tasks.create');
    Route::post('/personal-tasks', [PersonalTaskController::class, 'store'])->name('personal-tasks.store');
    Route::get('/personal-tasks/{id}/edit', [PersonalTaskController::class, 'edit'])->name('personal-tasks.edit');
    Route::put('/personal-tasks/{id}', [PersonalTaskController::class, 'update'])->name('personal-tasks.update');
    Route::delete('/personal-tasks/{id}', [PersonalTaskController::class, 'destroy'])->name('personal-tasks.destroy');

    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{id}/show', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('/projects/{id}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{id}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    Route::get('/projects/{projectId}/tasks/create', [ProjectController::class, 'createTask'])->name('projects.task.create');
    Route::post('/projects/{projectId}/tasks', [ProjectController::class, 'storeTask'])->name('projects.task.store');
    Route::get('/projects/{projectId}/tasks/{id}/edit', [ProjectController::class, 'editTask'])->name('projects.task.edit');
    Route::put('/projects/{projectId}/tasks/{id}', [ProjectController::class, 'updateTask'])->name('projects.task.update');
    Route::delete('/projects/{projectId}/tasks/{id}', [ProjectController::class, 'destroyTask'])->name('projects.task.destroy');

    Route::get('/journal-logs', [JournalLogController::class, 'index'])->name('journal-logs.index');
    Route::get('/journal-logs/create', [JournalLogController::class, 'create'])->name('journal-logs.create');
    Route::post('/journal-logs', [JournalLogController::class, 'store'])->name('journal-logs.store');
    Route::get('/journal-logs/{id}/edit', [JournalLogController::class, 'edit'])->name('journal-logs.edit');
    Route::put('/journal-logs/{id}', [JournalLogController::class, 'update'])->name('journal-logs.update');
    Route::delete('/journal-logs/{id}', [JournalLogController::class, 'destroy'])->name('journal-logs.destroy');

});

require __DIR__.'/settings.php';
