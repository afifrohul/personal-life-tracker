<?php

namespace Database\Seeders\demo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AchievementTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $achievementType = [
            [
                'name' => 'Consistency I', 
                'desc' => 'Complete the habit 10 times', 
                'color_code' => '#cbd5e1',
                'trigger' => 'reps',
                'criteria' => 10,
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'Consistency II', 
                'desc' => 'Complete the habit 50 times', 
                'color_code' => '#22c55e',
                'trigger' => 'reps',
                'criteria' => 50,
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'Consistency III', 
                'desc' => 'Complete the habit 100 times', 
                'color_code' => '#3b82f6',
                'trigger' => 'reps',
                'criteria' => 100,
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'Consistency IV', 
                'desc' => 'Complete the habit 500 times', 
                'color_code' => '#a855f7',
                'trigger' => 'reps',
                'criteria' => 500,
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'Consistency V', 
                'desc' => 'Complete the habit 1000 times', 
                'color_code' => '#ef4444',
                'trigger' => 'reps',
                'criteria' => 1000,
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'The Spark', 
                'desc' => 'Complete the habit 7 times in a row', 
                'color_code' => '#fcd34d',
                'trigger' => 'streak',
                'criteria' => 7,
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'The Bonfire', 
                'desc' => 'Complete the habit 30 times in a row', 
                'color_code' => '#fbbf24',
                'trigger' => 'streak',
                'criteria' => 30,
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'The Sprinter', 
                'desc' => 'Complete the habit 365 times in a row', 
                'color_code' => '#f59e0b',
                'trigger' => 'streak',
                'criteria' => 365,
                'created_at' => now(), 
                'updated_at' => now()
            ],
        ];

        foreach ($achievementType as $item) {
            \App\Models\AchievementType::create($item);
        }
    }
}
