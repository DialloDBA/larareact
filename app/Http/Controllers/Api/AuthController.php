<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginFormRequest;
use App\Http\Requests\Api\SignupFormRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function signup(SignupFormRequest $request)
    {
        /** @var User $user */
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
        // return response()->json([
        //     'user' => $user,
        //     'token' => $token
        // ]);
    }
    public function login(LoginFormRequest $request)
    {

        /** @var User $user */
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            // throw ValidationException::withMessages([
            //     'email'=>"Username ou Password Incorrect."
            // ]);
            return response()->json([
                'message' => "Username ou Password Incorrect."
            ],422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
    }
}
