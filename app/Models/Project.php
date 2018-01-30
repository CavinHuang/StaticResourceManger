<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
  use SoftDeletes;
  protected $table = 'project';
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name', 'open_url', 'site', 'readme','remake'
  ];
  protected $dates = ['deleted_at'];

  /**
   * 获取博客文章的评论
   */
  public function versions()
  {
    return $this->hasMany('App\Models\ProjectVersion');
  }
}
