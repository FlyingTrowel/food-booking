<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CartController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [RestaurantController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/restaurant', [RestaurantController::class, 'create'])->name('restaurant.create')->middleware(['auth', 'verified']);
Route::get('/restaurant', [RestaurantController::class, 'index'])->name('restaurant.index')->middleware(['auth', 'verified']);
Route::get('/restaurant/{id}/edit', [RestaurantController::class, 'edit'])->name('restaurant.edit')->middleware(['auth', 'verified']);
Route::post('/restaurant/{id}/edit', [RestaurantController::class, 'update'])->name('restaurant.update')->middleware(['auth', 'verified']);
Route::delete('/restaurant/{id}/delete', [RestaurantController::class, 'destroy'])->name('restaurant.destroy')->middleware(['auth', 'verified']);

Route::get('/restaurant/{id}/menu', [MenuController::class, 'index'])->name('menu.index')->middleware(['auth', 'verified']);
Route::get('/restaurant/{id}/createMenu', [MenuController::class, 'create'])->name('menu.create')->middleware(['auth', 'verified']);
Route::post('/restaurant/{id}/storeMenu', [MenuController::class, 'store'])->name('menu.store')->middleware(['auth', 'verified']);
Route::get('/menu/{id}/edit', [MenuController::class, 'edit'])->name('menu.edit')->middleware(['auth', 'verified']);
Route::post('/menu/{id}/update', [MenuController::class, 'update'])->name('menu.update')->middleware(['auth', 'verified']);
Route::delete('/menu/{id}/delete', [MenuController::class, 'destroy'])->name('menu.destroy')->middleware(['auth', 'verified']);

Route::get('/cart', [CartController::class, 'index'])->name('cart.index')->middleware(['auth', 'verified']);
Route::get('/cart/{id}', [CartController::class, 'add'])->name('cart.add')->middleware(['auth', 'verified']);
Route::patch('/cart/{id}/{value}', [CartController::class, 'edit'])->name('cart.edit')->middleware(['auth', 'verified']);
Route::delete('/cart/{id}/delete', [CartController::class, 'destroy'])->name('cart.destroy')->middleware(['auth', 'verified']);


Route::get('/buy/{id}', [RestaurantController::class, 'restaurantPage'])->name('restaurant')->middleware(['auth', 'verified']);



require __DIR__.'/auth.php';
