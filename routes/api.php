<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware("auth:sanctum")->group(function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout',[AuthController::class,'logout'])->name('api.logout');
    Route::apiResource("users",UsersController::class);
});

Route::controller(AuthController::class)->group(function(){
    Route::post('/login','login')->name('api.login');
    Route::post('/signup','signup')->name('api.signup');
});
