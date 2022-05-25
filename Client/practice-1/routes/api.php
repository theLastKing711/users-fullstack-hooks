<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\UserController;
use App\Models\Comment;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//customers
Route::get('/customers', [CustomerController::class, 'index']);
Route::get('/customers/{id}', [CustomerController::class, 'show']);
Route::post('/customers', [CustomerController::class, 'store']);
Route::patch('/customers/{id}', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);
//customers comments
Route::get('/customers/{id}/comments', [CustomerController::class, 'getComments']);
Route::post('/customers/{id}/comments', [CustomerController::class, 'addComment']);

//comments
Route::resource('/comments', CommentController::class);
// Route::resource('/comments', [CommentController::class]);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
