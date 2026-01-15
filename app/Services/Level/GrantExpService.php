<?php

namespace App\Services\Level;

use App\Models\User;
use App\Models\UserProfileStat;
use Illuminate\Support\Facades\DB;

class GrantExpService
{
    public function execute(User $user, int $exp): void
    {
        \DB::transaction(function () use ($user, $exp) {

            $stats = UserProfileStat::where('user_id', $user->id)
                ->lockForUpdate()
                ->firstOrFail();

            $stats->total_exp += $exp;
            $stats->level_exp += $exp;

            while (
                $stats->level_exp >=
                UserProfileStat::expToNextLevel($stats->level)
            ) {
                $needed = UserProfileStat::expToNextLevel($stats->level);
                $stats->level++;
                $stats->level_exp -= $needed;
            }

            $stats->save();
        });
    }
}
