<?php

namespace App\Services\Habit;

use App\Models\User;
use App\Models\HabitLog;
use App\Services\Level\RevokeExpService;

class UndoHabitCompletionService
{
    public function __construct(
        protected RevokeExpService $revokeExpService
    ) {}

    public function execute(User $user, HabitLog $log): void
    {
       \DB::transaction(function () use ($user, $log) {

            $this->revokeExpService->execute(
                $user,
                $log->exp_gain
            );

            $log->delete();
        });
    }
}
