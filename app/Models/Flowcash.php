<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Flowcash extends Model
{
    protected $fillable = ['flowcash_category_id', 'date', 'amount', 'description', 'type'];

    public function flowcashCategory()
    {
        return $this->belongsTo(FlowcashCategory::class);
    }
}
