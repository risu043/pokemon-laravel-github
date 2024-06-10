<?php
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
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

Route::get('/search', function () {
    return Inertia::render('Search');
})->middleware(['auth', 'verified'])->name('search');

Route::get('/rank', [FavoriteController::class, 'rank'])
    ->middleware(['auth', 'verified'])
    ->name('rank');

Route::resource('favorites', FavoriteController::class)
    ->only(['index', 'store', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::post('/favorites/check', [FavoriteController::class, 'check'])->middleware(['auth', 'verified'])->name('favorites.check');
Route::get('/favorites/count', [FavoriteController::class, 'count'])->middleware(['auth', 'verified'])->name('favorites.count');
Route::get('/favorites/clear', [FavoriteController::class, 'clear'])->middleware(['auth', 'verified'])->name('favorites.clear');


Route::resource('users', UserController::class)
    ->only(['index', 'show'])
    ->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
