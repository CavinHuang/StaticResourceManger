<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectVersionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_version', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id', false, true)->default(0)->comment('关联的项目id');
            $table->string('name', 50)->default('')->comment('版本名称');
            $table->text('remake')->comment('版本说明');
            $table->text('update_remake')->comment('更新说明');
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
        Schema::dropIfExists('project_version');
    }
}
