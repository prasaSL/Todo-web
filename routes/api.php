<?php

use App\Http\Controllers\api\authController;
use App\Http\Controllers\ToDoControler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [authController::class, 'logout']);
    Route::get('/todos/index/{id}', [ToDoControler::class, 'index']);
    Route::post('/todos', [ToDoControler::class, 'store']);
    Route::get('/todos/show/{id}', [ToDoControler::class, 'show']);
    Route::put('/todos/update/{id}', [ToDoControler::class, 'update']);
    Route::delete('/todos/delete/{id}', [ToDoControler::class, 'destroy']);
    Route::put('/todos/complete/{id}', [ToDoControler::class, 'complete']);
});


Route::post('/signup', [authController::class, 'signup']);
Route::post('/login', [authController::class, 'login']);
