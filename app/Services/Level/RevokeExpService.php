<?php

namespace App\Services\Level;

use App\Models\User;
use App\Models\UserProfileStat;

class RevokeExpService
{
    public function execute(int $userId, int $exp): void
    {
        $stats = UserProfileStat::where('user_id', $userId)
            ->lockForUpdate()
            ->firstOrFail();

        $stats->total_exp = max(0, $stats->total_exp - $exp);
        $stats->level_exp = max(0, $stats->level_exp - $exp);

        $stats->save();
    }
}