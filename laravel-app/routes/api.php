<?php

use App\Http\Controllers\API\FAQController;
use App\Http\Controllers\API\FeedbackController;
use App\Http\Controllers\API\LegendController;
use App\Http\Controllers\API\MapController;
use App\Http\Controllers\API\PageController;
use Filament\Http\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DirectoryController;
use App\Http\Controllers\API\ThuadatController;

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

Route::middleware(['web'])->group(function () {
    Route::get('/thuadats/view/{id}', [ThuadatController::class, 'view']);
    Route::get('/thuadats/toggle-favorite/{id}', [ThuadatController::class, 'toggleFavorite']);
    Route::get('/thuadats/increase-view-count/{id}', [ThuadatController::class, 'increaseViewCount']);
});

Route::post('/thuadat-by-info', [ThuadatController::class, 'getByInfo']);
Route::post('/thuadat-by-location', [ThuadatController::class, 'getByLocation']);
Route::post('/thuadat-by-coords', [ThuadatController::class, 'getByCoords']);

Route::get('/maps/builder', [MapController::class, 'builder']);
Route::get('/pages/{slug}', [PageController::class, 'view']);
Route::get('/faqs', [FAQController::class, 'index']);
Route::resource('feedbacks', FeedbackController::class);
Route::get('/legend', [LegendController::class, 'index']);

Route::get('/ip', function (){
    return $_SERVER['REMOTE_ADDR'];
});
