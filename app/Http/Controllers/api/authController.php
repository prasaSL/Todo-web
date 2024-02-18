<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequst;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Builder\Use_;

class authController extends Controller
{
    public function login(LoginRequst $request)
    {
      $data = $request->validated();    

        if(!Auth::attempt($data)){
            return response(['message' => 'Invalid credentials'], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token =  $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));



    }
   

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user=   User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token =    $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));

    }

    public function logout(request $request)
    {
        /** @var User $user */
        $user=$request->user();
        $user->currentAccessToken()->delete;

        return response('', 204);
    }
    
}
