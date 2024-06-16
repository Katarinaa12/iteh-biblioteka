<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SubscriptionTypeController;
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

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::apiResource('books', BookController::class)->only(['index', 'show']);
Route::get('books/{bookId}/preview', [FileController::class, 'getBookPreview']);
Route::get('genres', [GenreController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('upload', [FileController::class, 'uploadFile']);
    Route::get('subscriptions', [SubscriptionController::class, 'index']);
    Route::get('subscriptions-income', [SubscriptionController::class, 'booksIncome']);
    Route::get('subscriptions-summary', [SubscriptionController::class, 'subscriptionsByStatus']);
    Route::post('subscriptions', [SubscriptionController::class, 'store']);
    Route::put('subscriptions/{id}/accept', [SubscriptionController::class, 'accept']);
    Route::put('subscriptions/{id}/reject', [SubscriptionController::class, 'reject']);
    Route::get('books/{bookId}/file', [FileController::class, 'getBookFile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::apiResource('books/{bookId}/subscription-types', SubscriptionTypeController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('books', BookController::class)->only(['store', 'update', 'destroy']);
});
