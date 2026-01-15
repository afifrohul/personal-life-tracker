<?php

namespace App\Services\Habit;

use App\Models\HabitLog;
use App\Services\Level\RevokeExpService;

class UndoHabitCompletionService
{
    public function __construct(
        protected RevokeExpService $revokeExpService
    ) {}

    public function execute(HabitLog $log): void
    {
       \DB::transaction(function () use ($log) {

            $this->revokeExpService->execute(
                1,
                $log->exp_gain
            );

            $log->delete();
        });
    }
}
