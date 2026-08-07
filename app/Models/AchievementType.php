<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AchievementType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'desc', 'image', 'trigger', 'criteria'];

    public function achievements()
    {
        return $this->hasMany(Achievement::class);
    }
}
