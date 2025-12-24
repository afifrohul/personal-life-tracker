<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HabitCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Health', 'icon' => 'BriefcaseMedical', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Religion', 'icon' => 'SunMoon', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Productivity', 'icon' => 'UserCog', 'created_at' => now(), 'updated_at' => now()]
        ];

        foreach ($categories as $item) {
            \App\Models\HabitCategory::create($item);
        }
    }
}
