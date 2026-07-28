<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AchievementType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'desc', 'color_code'];

    public function achivements()
    {
        return $this->hasMany(Achievement::class);
    }
}
