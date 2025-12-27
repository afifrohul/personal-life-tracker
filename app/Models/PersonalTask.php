<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PersonalTask extends Model
{

    use SoftDeletes;

    protected $fillable = ['title', 'description', 'due_date', 'priority', 'status'];


}
