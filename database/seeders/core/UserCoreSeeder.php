<?php

namespace Database\Seeders\core;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserProfileStat;

class UserCoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
    }
}
