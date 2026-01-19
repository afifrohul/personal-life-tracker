<?php

namespace Database\Seeders\demo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JournalLog;
use Carbon\Carbon;

class JournalLogSeeder extends Seeder
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
            JournalLog::create([
                'date'       => $date->format('Y-m-d'),
                'content'    => fake()->sentence(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $date->addDay();
        }
    }
}
