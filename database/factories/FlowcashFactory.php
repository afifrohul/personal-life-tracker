<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\FlowcashCategory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flowcash>
 */
class FlowcashFactory extends Factory
{
    protected $model = \App\Models\Flowcash::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'flowcash_category_id' => FlowcashCategory::all()->random()->id, // Pilih kategori acak
            'date' => $this->faker->dateTimeBetween('-2 year', 'now'), // Tanggal dalam 1 tahun terakhir
            'amount' => $this->faker->randomFloat(2, 50000, 100000), 
            'description' => $this->faker->sentence(1), // Deskripsi acak
            'type' => $this->faker->randomElement(['income', 'expense']), // Jenis transaksi
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
