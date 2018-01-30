<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/29 0029
 * Time: 下午 4:00
 */

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\common\Controller;
use Illuminate\Http\Request;
use App\Models\Project as ProjectMdl;
use Illuminate\Support\Facades\DB;

class Project extends Controller {

  /**
   * 保存
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
      $res = ProjectMdl::where('id', $request->id)->update($request->all());
      $isUpdate = true;
    }else{
      $rule = [
        'name' => 'required|max:50',
      ];
      $param = $this->validate($request, $rule);
      $res = ProjectMdl::create($request->all());
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
      $list = ProjectMdl::find($request->id)->versions()->get();
    }else{
      $sql = "select   c.*,  (select   group_concat(name) from project_version   s   where  s.project_id =c.id ) as project_version from  project  c where c.deleted_at=null";
      $list = ProjectMdl::with('versions')->paginate(12);
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

    if(ProjectMdl::destroy($request->ids)){
      return $this->ajaxReturn(200, 1,'操作成功');
    }else{
      return $this->ajaxReturn(200, 0, '操作失败');
    }
  }
}
