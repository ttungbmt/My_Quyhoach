<?php

use App\Http\Controllers\API\DirectoryController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::any('/dir/hc-tinh', [DirectoryController::class, 'hcTinh']);
Route::any('/dir/hc-quan', [DirectoryController::class, 'hcQuan']);
Route::any('/dir/hc-phuong', [DirectoryController::class, 'hcPhuong']);
