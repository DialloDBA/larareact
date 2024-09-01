<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function(){
    Route::post('/login','login')->name('api.login');
    Route::post('/signup','signup')->name('api.signup');
    Route::post('/logout','logout')->name('api.logout');
});
