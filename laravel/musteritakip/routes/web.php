<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::resource('/demand', '\App\Http\Controllers\DemandController')->middleware(['auth']);
Route::get('/demand.status/{demandId}/{statusId}', [\App\Http\Controllers\DemandController::class,'status'])
->name('demand.status')
->middleware(['auth']);