<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestaurantController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

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


require __DIR__.'/auth.php';
