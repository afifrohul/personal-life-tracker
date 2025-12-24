<?php

namespace App\Services;

use App\Models\UserProfileStat;
use Illuminate\Support\Facades\DB;

class LevelService
{
    protected int $baseExp = 50;
    protected float $multiplier = 1.15;

    public function expToNextLevel(int $level): int
    {
        return (int) floor(
            $this->baseExp * pow($this->multiplier, $level - 1)
        );
    }

    public function addExp(int $expGain): void
    {
        DB::transaction(function () use ($expGain) {

            $stats = UserProfileStat::findOrFail(1);

            // tambah EXP
            $stats->total_exp += $expGain;
            $stats->level_exp += $expGain;

            // cek level up (bisa multi level)
            while ($stats->level_exp >= $this->expToNextLevel($stats->level)) {
                $needed = $this->expToNextLevel($stats->level);

                $stats->level++;
                $stats->level_exp -= $needed;
            }

            $stats->save();
        });
    }

    public function removeExp(int $expLoss): void
    {
        DB::transaction(function () use ($expLoss) {
            $stats = UserProfileStat::findOrFail(1);

            if (!$stats) return;

            $stats->total_exp = max(0, $stats->total_exp - $expLoss);
            $stats->level_exp = max(0, $stats->level_exp - $expLoss);

            $stats->save();
        });
    }
}
