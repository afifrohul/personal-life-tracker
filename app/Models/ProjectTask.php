<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectTask extends Model
{
    use SoftDeletes;

    protected $fillable = ['project_id', 'title', 'description', 'due_date', 'priority', 'status'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

}
