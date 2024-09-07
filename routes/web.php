<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix("api/app")->name("app.")->group(function(){
    Route::controller(AuthController::class)->group(function(){
        Route::get('/posts','posts')->name("posts.index");
        Route::get('/categories','categories')->name("categories.index");
        Route::get('/categories/{slug}','showCategorie')->name("categories.show");
    });
});
