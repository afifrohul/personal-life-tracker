<?php

namespace Database\Seeders\demo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'name' => fake()->sentence(2),
                'description' => fake()->sentence(5),
                'status' => 'in_progress',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => fake()->sentence(2),
                'description' => fake()->sentence(5),
                'status' => 'in_progress',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => fake()->sentence(2),
                'description' => fake()->sentence(5),
                'status' => 'completed',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => fake()->sentence(2),
                'description' => fake()->sentence(5),
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($projects as $item) {
            \App\Models\Project::create($item);
        }

        for ($i = 1; $i < 4; $i++) {
            for ($j = 0; $j < 10; $j++) {
                \App\Models\ProjectTask::create([
                    'project_id' => $i,
                    'title' => fake()->sentence(2),
                    'description' => fake()->sentence(5),
                    'due_date' => now()->addDays(7)->format('Y-m-d'),
                    'priority' => fake()->randomElement(['low', 'medium', 'high']),
                    'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
