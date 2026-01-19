<?php

namespace Database\Seeders\demo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HabitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $habits = [
            [ 
                'habit_category_id' => 1, 
                'name' => 'Workout/Exercise', 
                'color' => '#3b82f6',
                'difficulty' => 'medium',
                'icon' => 'Dumbbell', 
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [ 
                'habit_category_id' => 1, 
                'name' => '200+ Hand Grip', 
                'color' => '#0369a1',
                'difficulty' => 'medium',
                'icon' => 'BicepsFlexed', 
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [ 
                'habit_category_id' => 2, 
                'name' => 'Quran', 
                'color' => '#16a34a',
                'difficulty' => 'medium',
                'icon' => 'BookOpen', 
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [ 
                'habit_category_id' => 2, 
                'name' => 'Pray Dhuha', 
                'color' => '#0f766e',
                'difficulty' => 'medium',
                'icon' => 'Clock8', 
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [ 
                'habit_category_id' => 3, 
                'name' => 'Coding', 
                'color' => '#7c3aed',
                'difficulty' => 'medium',
                'icon' => 'CodeXml', 
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [ 
                'habit_category_id' => 3, 
                'name' => 'Duolingo', 
                'color' => '#065f46',
                'difficulty' => 'medium',
                'icon' => 'Languages', 
                'created_at' => now(), 
                'updated_at' => now()
            ],
        ];

        foreach ($habits as $item) {
            \App\Models\Habit::create($item);
        }
    }
}
