<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Flowcash extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['flowcash_category_id', 'date', 'amount', 'description', 'type'];

    protected $casts = [
        'date' => 'date',
    ];

    public function flowcashCategory()
    {
        return $this->belongsTo(FlowcashCategory::class);
    }
}
