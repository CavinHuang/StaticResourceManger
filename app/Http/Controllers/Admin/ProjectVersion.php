<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/30 0030
 * Time: 下午 2:44
 */

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\common\Controller;
use Illuminate\Http\Request;
use App\Models\ProjectVersion as projectVersionMdl;

class ProjectVersion extends Controller {

  /**
   * 保存、添加
   * @methods
   * @desc
   * @author slide
   *
   * @param Request $request
   *
   * @return \Illuminate\Http\JsonResponse
   *
   */
  public function save(Request $request){
    $last_id = $request->id;
    $isUpdate = false;
    if(isset($request->id)){
      $res = projectVersionMdl::where('id', $request->id)->update($request->all());
      $isUpdate = true;
    }else{
      $rule = [
        'name' => 'required|max:50',
      ];
      $param = $this->validate($request, $rule);
      $res = projectVersionMdl::create($request->all());
      $last_id = $res->id;
    }

    if($res){
      return $this->ajaxReturn(200, 1, '操作成功', ['last_id' => $last_id, 'is_update' => $isUpdate]);
    }else{
      return $this->ajaxReturn(200, 0, '操作失败');
    }
  }
  /**
   * 列表
   * @methods
   * @desc
   * @author slide
   *
   */
  public function lists(Request $request){

    if($request->id){
      $list = projectVersionMdl::find($request->id);
    }else{
      $list = projectVersionMdl::leftJoin('project', 'project.id','=','project_version.project_id')->select('project_version.*','project.name as project')->paginate(12);
    }

    return $this->ajaxReturn(200, 1,'查询成功', $list);
  }

  /**
   * 删除
   * @methods
   * @desc
   * @author slide
   *
   * @param $ids
   *
   */
  public function delete(Request $request){
    if(!isset($request->ids) || $request->ids == '') {
      return $this->ajaxReturn(200, 0, '无法完成该操作');
    }

    if(projectVersionMdl::destroy($request->ids)){
      return $this->ajaxReturn(200, 1,'操作成功');
    }else{
      return $this->ajaxReturn(200, 0, '操作失败');
    }
  }
}
