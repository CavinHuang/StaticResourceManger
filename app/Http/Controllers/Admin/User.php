<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\common\Controller;
use Illuminate\Support\Facades\Auth;
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/29 0029
 * Time: 上午 11:48
 */
class User extends Controller{
  //
  public function profile(){

    return $this->ajaxReturn(200, 1, '查询用户信息成功', Auth::guard('api')->user());
  }
}
