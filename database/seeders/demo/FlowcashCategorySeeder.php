<?php

namespace Database\Seeders\demo;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FlowcashCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Savings', 'icon' => 'Landmark', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Consumption', 'icon' => 'Utensils', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Salary', 'icon' => 'Banknote', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Rent', 'icon' => 'House', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Transportation', 'icon' => 'Car', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Other', 'icon' => 'Package', 'created_at' => now(), 'updated_at' => now()],
        ];

        foreach ($categories as $item) {
            \App\Models\FlowcashCategory::create($item);
        }
    }
}
