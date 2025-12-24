<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FlowcashCategory extends Model
{
    protected $fillable = ['name', 'icon'];

    public function flowcashes()
    {
        return $this->hasMany(Flowcash::class);
    }
}
