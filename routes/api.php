<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::prefix('auth')->namespace('\Admin')->group(function($router) {
  $router->post('login', 'Auth\LoginController@login');
  $router->post('logout', 'AuthController@logout');

});

Route::middleware('refresh.token')->namespace('\Admin')->group(function($router) {

  $router->get('profile','User@profile');

  //----------------------------------PROJECT ROUTE---------------------------------------------------------------------------
  $router->post('project', 'Project@save');
  $router->get('project', 'Project@lists');
  $router->delete('project', 'Project@delete');

  //----------------------------------PROJECT VERSION ROUTE--------------------------------------------------------------------
  $router->post('project_version', 'ProjectVersion@save');
  $router->get('project_version', 'ProjectVersion@lists');
  $router->delete('project_version', 'ProjectVersion@delete');


});
