<?php

namespace Database\Seeders\demo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            MoodLogSeeder::class,
            HabitCategorySeeder::class,
            HabitSeeder::class,
            HabitLogSeeder::class,
            FlowcashCategorySeeder::class,
            FlowcashSeeder::class,
            JournalLogSeeder::class,
            PersonalTaskSeeder::class,
            ProjectSeeder::class,
            AchievementTypeSeeder::class
        ]);
    }
}
