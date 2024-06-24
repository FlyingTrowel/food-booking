<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MobileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
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

Route::get('/order/{id}', [OrderController::class, 'store'])->name('order.store')->middleware(['auth', 'verified']);
Route::get('/order', [OrderController::class, 'index'])->name('order.index')->middleware(['auth', 'verified']);


Route::post('/mobile/register', [MobileController::class, 'register']);
Route::post('/mobile/login', [MobileController::class, 'login']);
Route::get('/mobile/restaurants', [MobileController::class, 'restaurants']);
Route::get('/mobile/{id}/menus', [MobileController::class, 'menus']);
Route::get('/mobile/carts/add/{menu_id}/{user_id}', [MobileController::class, 'addCart']);
Route::get('/mobile/carts/{id}', [MobileController::class, 'carts']);
Route::get('/mobile/carts/checkout/{id}', [MobileController::class, 'checkout']);
Route::get('/mobile/orders/{id}', [MobileController::class, 'orders']);

route::get('/api/{id}/has-restaurant', [MobileController::class, 'hasRestaurant'])->name('has-restaurant');





Route::get('/mobile', function () {
    return 'Hello World';
});





require __DIR__.'/auth.php';
