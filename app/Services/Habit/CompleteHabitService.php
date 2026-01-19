<?php

namespace App\Services\Habit;

use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\User;
use App\Services\Level\GrantExpService;

class CompleteHabitService
{
    public function __construct(
        protected GrantExpService $grantExpService
    ) {}

    public function execute(User $user, Habit $habit, string $date): HabitLog
    {
        return \DB::transaction(function () use ($user, $habit, $date) {

            $expGain = match ($habit->difficulty) {
                'easy' => 5,
                'medium' => 10,
                'hard' => 20,
            };

            $log = HabitLog::create([
                'habit_id' => $habit->id,
                'date' => $date,
                'exp_gain' => $expGain,
            ]);

            $this->grantExpService->execute($user, $expGain);

            return $log;
        });
    }
}
