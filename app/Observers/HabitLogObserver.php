<?php

namespace App\Observers;

use App\Models\HabitLog;
use App\Services\LevelService;

class HabitLogObserver
{
    public function created(HabitLog $habitLog): void
    {
        app(LevelService::class)
            ->addExp($habitLog->exp_gain);
    }

    public function deleted(HabitLog $habitLog): void
    {
        app(LevelService::class)
            ->removeExp($habitLog->exp_gain);
    }
}
