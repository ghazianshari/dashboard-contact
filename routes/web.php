<?php

use App\Http\Controllers\AkunController;
use App\Http\Controllers\AkunEwalletController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // // !Akun
    // Route::get('/akun', [AkunController::class, 'index'])->name('akun.index');
    // Route::get('/akun/create', [AkunController::class, 'create'])->name('akun.create');
    // Route::post('/akun', [AkunController::class, 'store'])->name('akun.store');

    // // !Client
    // Route::get('/clients', [ClientController::class, 'index'])->name('clients.index');
    // Route::post('/clients', [ClientController::class, 'store'])->name('clients.store');

    // // !Ewallet
    // Route::get('/ewallet', [AkunEwalletController::class, 'index'])->name('ewallet.index');
    // Route::get('/ewallet/create', [AkunEwalletController::class, 'create'])->name('ewallet.create');
    // Route::post('/ewallet', [AkunEwalletController::class, 'store'])->name('ewallet.store');
});

require __DIR__ . '/settings.php';
