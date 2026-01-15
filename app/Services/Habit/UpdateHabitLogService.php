<?php

namespace App\Services\Habit;

use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\User;
use App\Services\Level\GrantExpService;
use App\Services\Level\RevokeExpService;
use Illuminate\Support\Facades\DB;

class UpdateHabitLogService
{
    public function __construct(
        protected GrantExpService $grantExp,
        protected RevokeExpService $revokeExp,
    ) {}

    public function execute(
        User $user,
        int $habitLogId,
        int $newHabitId,
        string $newDate
    ): HabitLog {
        return DB::transaction(function () use (
            $user,
            $habitLogId,
            $newHabitId,
            $newDate
        ) {

            $habitLog = HabitLog::lockForUpdate()->findOrFail($habitLogId);
            $oldExp = $habitLog->exp_gain;

            $habit = Habit::findOrFail($newHabitId);
            $newExp = match ($habit->difficulty) {
                'easy' => 5,
                'medium' => 10,
                default => 20,
            };

            // update log dulu
            $habitLog->update([
                'habit_id' => $newHabitId,
                'date' => $newDate,
                'exp_gain' => $newExp,
            ]);

            // hitung delta
            $delta = $newExp - $oldExp;

            if ($delta > 0) {
                $this->grantExp->execute($user, $delta);
            } elseif ($delta < 0) {
                $this->revokeExp->execute($user, abs($delta));
            }

            return $habitLog;
        });
    }
}
