<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Achievement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['habit_id', 'achievement_type_id'];

    public function habit()
    {
        return $this->belongsTo(Habit::class);
    }

    public function achievementType()
    {
        return $this->belongsTo(AchievementType::class);
    }
}
