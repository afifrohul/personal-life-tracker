<?php

namespace Database\Seeders\demo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Habit;
use App\Services\Habit\CompleteHabitService;

class HabitLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $completeHabit = app(CompleteHabitService::class);
        $user = User::firstOrFail();

        $habits = Habit::all();

        $startDate = Carbon::create(2025, 1, 1);
        $endDate = now();

        $date = $startDate->copy();

        while ($date->lte($endDate)) {

            $habits
                ->shuffle()
                ->take(rand(1, min(6, $habits->count())))
                ->each(function (Habit $habit) use ($completeHabit, $user, $date) {
                    $completeHabit->execute(
                        $user,
                        $habit,
                        $date->format('Y-m-d')
                    );
                });

            $date->addDay();
        }
    }
}
