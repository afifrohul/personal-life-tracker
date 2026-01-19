<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProfileStat;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        UserProfileStat::create(
            ['user_id' => 1],
        );

        // $this->call([
        //     MoodLogSeeder::class,
        //     HabitCategorySeeder::class,
        //     HabitSeeder::class,
        //     HabitLogSeeder::class,
        //     FlowcashCategorySeeder::class,
        //     FlowcashSeeder::class,
        //     JournalLogSeeder::class,
        //     PersonalTaskSeeder::class,
        //     ProjectSeeder::class
        // ]);
    }
}
