<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UsersController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware("auth:sanctum")->group(function(){
    Route::get('/user',function(Request $request){
        return $request->user();
    });
    Route::post('/logout',[AuthController::class,'logout'])->name('api.logout');
    
    Route::apiResource("users",UsersController::class);
    Route::apiResource("posts",PostController::class);
    Route::apiResource("categories",CategoryController::class);
    Route::apiResource("comments",CommentController::class);

});

Route::post('/login',[AuthController::class,'login'])->name('login');

Route::controller(AuthController::class)->group(function(){
    Route::get('/posts','posts');
    Route::get('/categories','categories');
    Route::get('/categories/{slug}','showCategorie');
    Route::post('/register','register')->name('api.register');
});
