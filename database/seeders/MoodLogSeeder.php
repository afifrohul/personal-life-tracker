<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\MoodLog;

class MoodLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $startDate = Carbon::create(2025, 1, 1);
        $endDate   = now();

        $date = $startDate->copy();

        while ($date->lte($endDate)) {
            MoodLog::create([
                'date'       => $date->format('Y-m-d'),
                'mood_score' => rand(1,5),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $date->addDay();
        }
    }
}
