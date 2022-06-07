<?php

use App\Http\Controllers\SinglePageController;
use Illuminate\Support\Facades\Route;
use Multicaret\Acquaintances\Models\InteractionRelation;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/maps/{path?}', SinglePageController::class)->where('path', '[a-zA-Z0-9-/]+');

Route::get('/', function () {
    return redirect('/maps/tim-kiem-thua-dat');
});

Route::get('/test', function (){
    $user = auth()->user();
//    $user = \Illuminate\Support\Facades\Auth::user();
    $model = \App\Models\Thuadat::find(1164);
    dd($user->viewThuadat([$model]));
////    dd($model);
//    $user->favorite([$model], 1);
//    dd(views($model)->unique()->count());
//    dd($model);
//    dd($user);
//    dd($user->unlike([$model]));



/*
Phân tích vùng được người dùng quan tâm (số lượt xem, đánh giá)
Lưu thửa đất vào tk cá nhân
*/

   return [];
});


