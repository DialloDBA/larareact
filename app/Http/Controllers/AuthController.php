<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::query()->all();
        return response(compact("users"));
    }

    public function categories()
    {
        $categories = User::query()->select('name','id')->limit(10)->get();
        return response(compact("categories"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return [
            'email' => 'required|email', // Enlève la vérification d'existence
            'password' => 'required'
        ];
        return $request->all();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function login(LoginUserRequest $request) {
        $credentials = $request->validated();
        // $credentials['password'] = Hash::make($credentials['password']);
        if(!Auth::attempt($credentials)){
            return response()->json([
                'message' =>"Email ou mot de passe incorrecte.",
            ],422);
        }
        $user = Auth::user();
        $token = $user->createToken(time() * 1000)->plainTextToken;
        return response(compact("user","token"));
        
    }
    public function register(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = $user = User::create($data);
        if($user){
            $token = $user->createToken(time() * 1000)->plainTextToken;
            return response(compact("user", "token"));
        }
        abort(422);
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return '';
    }
}
