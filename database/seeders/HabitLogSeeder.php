<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\HabitLog;

class HabitLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $startDate = Carbon::create(2024, 9, 1);
        $endDate   = now();

        $dates = [];
        $date = $startDate->copy();

        // Loop tanggal
        while ($date->lte($endDate)) {

            // berapa habit yang dilakukan hari itu (1–6)
            $habitCountToday = rand(1, 6);

            // ambil habit_id random tanpa duplikasi di hari yang sama
            $habitIds = collect(range(1, 6))
                ->shuffle()
                ->take($habitCountToday)
                ->values();

            foreach ($habitIds as $habitId) {
                HabitLog::create([
                    'habit_id'   => $habitId,
                    'exp_gain'   => 10,
                    'date'       => $date->format('Y-m-d'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            $date->addDay();
        }
    }
}
