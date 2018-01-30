<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectVersion extends Model
{
  protected $table = 'project_version';
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'project_id', 'name', 'update_remake', 'remake','update_remake'
  ];
  protected $dates = ['deleted_at'];
}
