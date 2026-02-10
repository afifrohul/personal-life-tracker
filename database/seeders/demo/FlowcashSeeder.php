<?php

namespace Database\Seeders\Demo;

use Illuminate\Database\Seeder;
use App\Models\Flowcash;
use App\Models\FlowcashCategory;
use Carbon\Carbon;

class FlowcashSeeder extends Seeder
{
    public function run(): void
    {
        $startDate = Carbon::create(2025, 1, 1);
        $endDate = now();

        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {

            Flowcash::create([
                'flowcash_category_id' => rand(1, FlowcashCategory::count()),
                'date' => $date->toDateString(),
                'amount' => rand(20_000, 200_000),
                'description' => fake()->sentence(),
                'type' => 'expense',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            if ($date->day === 2) {
                Flowcash::create([
                    'flowcash_category_id' => rand(1, FlowcashCategory::count()),
                    'date' => $date->toDateString(),
                    'amount' => rand(5_000_000, 6_500_000),
                    'description' => 'Monthly income',
                    'type' => 'income',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
