<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware("auth:sanctum")->group(function(){
    Route::get('/user',function(Request $request){
        return $request->user();
    });
    Route::post('/logout',[AuthController::class,'logout'])->name('api.logout');
    Route::apiResource("users",UsersController::class);
});

Route::post('/login',[AuthController::class,'login'])->name('login');

Route::controller(AuthController::class)->group(function(){
    Route::get('/categories','categories');
    Route::post('/register','register')->name('api.register');
    
});
