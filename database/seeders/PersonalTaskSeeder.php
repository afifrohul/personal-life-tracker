<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersonalTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'title' => fake()->sentence(2),
                'description' => fake()->sentence(5),
                'due_date' => now()->addDays(7)->format('Y-m-d'),
                'priority' => 'low',
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => fake()->sentence(2),
                'description' => fake()->sentence(5),
                'due_date' => now()->addDays(7)->format('Y-m-d'),
                'priority' => 'medium',
                'status' => 'in_progress',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => fake()->sentence(2),
                'description' => fake()->sentence(5),
                'due_date' => now()->addDays(7)->format('Y-m-d'),
                'priority' => 'high',
                'status' => 'completed',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($tasks as $item) {
            \App\Models\PersonalTask::create($item);
        }
    }
}
