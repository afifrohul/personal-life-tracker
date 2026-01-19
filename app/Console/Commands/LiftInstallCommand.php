<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class LiftInstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'lift:install';

    /**
     * The console command description.
     */
    protected $description = 'Install Lift application with optional demo data';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->newLine();
        $this->info('🚀 Welcome to Lift Installer');
        $this->line('An all-in-one self-management application designed to help track daily habits, mood, finances, journaling, and personal projects in a single unified system.');
        $this->newLine();

        /**
         * 1. Database migration choice
         */
        $migrationMode = $this->choice(
            'How do you want to migrate the database?',
            [
                'Fresh migrate (drop all tables)',
                'Normal migrate',
            ],
            0
        );

        if ($migrationMode === 'Fresh migrate (drop all tables)') {
            $this->warn('⚠️ This will wipe all existing data.');
            $this->call('migrate:fresh');
        } else {
            $this->call('migrate');
        }

        /**
         * 2. Seed core data
         */
        $this->newLine();
        $this->info('🌱 Seeding core data...');
        $this->call('db:seed');

        /**
         * 3. Demo data choice
         */
        $this->newLine();
        $installMode = $this->choice(
            'Do you want to install Lift with demo data?',
            [
                'Yes, install demo data',
                'No, start with empty data',
            ],
            1
        );

        if ($installMode === 'Yes, install demo data') {
            $this->info('📊 Seeding demo data...');
            $this->call('db:seed', [
                '--class' => 'Database\\Seeders\\Demo\\DemoSeeder',
            ]);
        }

        /**
         * Done
         */
        $this->newLine();
        $this->info('✅ Lift installation completed successfully.');
        $this->line('You are ready to start using Lift 🚀');
        $this->newLine();

        return Command::SUCCESS;
    }
}
