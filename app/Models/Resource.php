<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
  protected $table = 'resource';
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'project_id', 'version_id', 'type', 'url'
  ];
  protected $dates = ['deleted_at'];
}
