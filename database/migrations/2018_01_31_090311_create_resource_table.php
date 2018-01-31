<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResourceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resource', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id', false, true)->default(0)->commnet('所属项目');
            $table->integer('version_id', false, true)->default(0)->comment('所属版本');
            $table->string('type', 120)->default('')->commnet('资源类型');
            $table->string('url', 500)->default('')->comment('资源地址（系统自动生成）');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resource');
    }
}
