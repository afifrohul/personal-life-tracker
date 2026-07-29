<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AchievementType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'desc', 'color_code', 'trigger', 'criteria'];

    public function achievements()
    {
        return $this->hasMany(Achievement::class);
    }
}
