<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    protected $fillable = ['habit_category_id', 'name', 'color', 'icon', 'desc','difficulty', 'icon'];

    public function habitCategory()
    {
        return $this->belongsTo(HabitCategory::class);
    }

    public function habitLogs()
    {
        return $this->hasMany(HabitLog::class);
    }
}
