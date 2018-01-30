<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\common\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

  /**
   * Get a JWT via given credentials.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function login(Request $request)
  {
    // 验证规则，由于业务需求，这里我更改了一下登录的用户名，使用手机号码登录
    $rules = [
      'username'   => [
        'required',
      ],
      'password' => 'required|string|min:6|max:20',
    ];
    // 验证参数，如果验证失败，则会抛出 ValidationException 的异常
    $params = $this->validate($request, $rules);

    $user = User::where('username', $params['username'])->OrWhere('email', $params['username'])->OrWhere('mobile', $params['username'])->get();

    if(!$user) return $this->ajaxReturn(200, 0, '没有这样的用户');

    $userData = $user->first();

    $sign_arr['username'] = $userData->username;
    $sign_arr['password'] = $params['password'];

    if (! $token = auth()->guard('api')->attempt($sign_arr)) {
      return $this->ajaxReturn(200, 0, '账号或密码错误');
    }

    return $this->ajaxReturn(200, 1, '登录成功', $this->respondWithToken($token));
  }

  /**
   * Get the authenticated User.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function me()
  {
    return response()->json(auth()->user());
  }

  /**
   * Log the user out (Invalidate the token).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout()
  {
    auth()->logout();

    return $this->ajaxReturn(200, '注销成功');
  }

  /**
   * Refresh a token.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function refresh()
  {
    return $this->respondWithToken(auth()->refresh());
  }

  /**
   * Get the token array structure.
   *
   * @param  string $token
   *
   * @return \Illuminate\Http\JsonResponse
   */
  protected function respondWithToken($token)
  {
    $info = [
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60,
      'user_info' => auth()->user()
    ];
    return $info;
  }
}
